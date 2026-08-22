import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lessonDirectory = path.join(root, "docs/pccp-700-roadmap/official-lessons");
const bankPath = path.join(root, "PCCP_OFFICIAL_PRACTICE_BANK.csv");
const startMarker = "<!-- dry-run-reconstruction:start -->";
const endMarker = "<!-- dry-run-reconstruction:end -->";

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (character === "," && !quoted) {
      fields.push(current);
      current = "";
    } else current += character;
  }
  fields.push(current);
  return fields;
}

function readBank() {
  const lines = fs.readFileSync(bankPath, "utf8").trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
  });
}

function section(markdown, number) {
  const pattern = new RegExp(`^## ${String(number).padStart(2, "0")}\\.[^\\n]*$`, "m");
  const match = markdown.match(pattern);
  if (!match) return "";
  const start = match.index;
  const next = markdown.slice(start + match[0].length).search(/^##\s+/m);
  const end = next === -1 ? markdown.length : start + match[0].length + next;
  return markdown.slice(start, end).trim();
}

function bodyWithoutHeading(sectionText) {
  return sectionText.replace(/^##[^\n]*\n?/, "").trim();
}

function extractBlueprint(markdown) {
  const blocks = [...markdown.matchAll(/^```text\s*\n([\s\S]*?)^```\s*$/gm)].map(
    (match) => match[1],
  );
  const labels = [
    "OUTPUT",
    "PREPARE",
    "GLOBAL STATE",
    "INIT",
    "MAIN LOOP",
    "CURRENT ITEM",
    "PER-ITERATION STATE",
    "CHECK",
    "BRANCH",
    "UPDATE",
    "POINTER MOVEMENT",
    "STOP / RETURN",
    "CLEANUP",
  ];
  const candidate = blocks
    .map((block) => ({
      block,
      score: labels.filter((label) => block.includes(`${label}:`)).length,
    }))
    .sort((first, second) => second.score - first.score)[0]?.block ?? "";
  const result = {};
  for (const label of labels) {
    const marker = `${label}:`;
    const start = candidate.indexOf(marker);
    if (start === -1) {
      result[label] = "—";
      continue;
    }
    const valueStart = start + marker.length;
    const laterMarkers = labels
      .filter((other) => other !== label)
      .map((other) => {
        const semicolonIndex = candidate.indexOf(`; ${other}:`, valueStart);
        const newlineIndex = candidate.indexOf(`\n${other}:`, valueStart);
        return [semicolonIndex, newlineIndex].filter((index) => index !== -1);
      })
      .flat();
    const newline = candidate.indexOf("\n", valueStart);
    if (newline !== -1) laterMarkers.push(newline);
    const end = laterMarkers.length > 0 ? Math.min(...laterMarkers) : candidate.length;
    result[label] = candidate.slice(valueStart, end).replace(/^\s*;?\s*/, "").trim() || "—";
  }
  return result;
}

function javascriptFence(sectionText) {
  return sectionText.match(/^```(?:js|javascript)\s*\n([\s\S]*?)^```\s*$/m)?.[1]?.trim() ?? "";
}

function findMatchingBrace(code, openingIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let index = openingIndex; index < code.length; index += 1) {
    const character = code[index];
    const next = code[index + 1];
    if (lineComment) {
      if (character === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (character === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (character === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function extractMainFunction(code) {
  const matches = [...code.matchAll(/^function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/gm)]
    .map((match) => {
      const start = match.index;
      const opening = start + match[0].lastIndexOf("{");
      const closing = findMatchingBrace(code, opening);
      return { match, start, opening, closing, bodyLength: closing - opening };
    })
    .filter((candidate) => candidate.closing !== -1);
  const candidate = [...matches].reverse().find((item) => item.bodyLength > 80) ?? matches.at(-1);
  if (!candidate) throw new Error("Không tìm thấy main function trong section 14");
  const { match, start, opening, closing } = candidate;
  return {
    name: match[1],
    header: code.slice(start, opening + 1),
    body: code.slice(opening + 1, closing).replace(/^\n|\n$/g, ""),
  };
}

function braceDelta(line) {
  let delta = 0;
  let quote = null;
  let escaped = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'" || character === "`") quote = character;
    else if (character === "{") delta += 1;
    else if (character === "}") delta -= 1;
  }
  return delta;
}

function topLevelChunks(body) {
  const lines = body.split(/\r?\n/);
  const chunks = [];
  let current = [];
  let depth = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (current.length === 0 && line.trim() === "") continue;
    current.push(line);
    depth += braceDelta(line);
    const trimmed = line.trim();
    const next = lines.slice(index + 1).find((candidate) => candidate.trim() !== "")?.trim() ?? "";
    const statementEnds = depth === 0 && (trimmed.endsWith(";") || trimmed.endsWith("}"));
    if (statementEnds && !/^else\b/.test(next) && !/^catch\b/.test(next)) {
      chunks.push(current.join("\n"));
      current = [];
    }
  }
  if (current.some((line) => line.trim() !== "")) chunks.push(current.join("\n"));
  return chunks;
}

function groupChunks(chunks) {
  if (chunks.length <= 5) return chunks.map((chunk) => [chunk]);
  const groups = [];
  const size = Math.ceil(chunks.length / 5);
  for (let index = 0; index < chunks.length; index += size) groups.push(chunks.slice(index, index + size));
  return groups;
}

function inlineCode(value) {
  return String(value).replace(/`/g, "'").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

function firstConcreteToken(text) {
  return text.match(/`([^`]*(?:\[[^`]*\]|\([^`]*\)|\{[^`]*\})[^`]*)`/)?.[1]
    ?? text.match(/`([^`]+)`/)?.[1]
    ?? "input nhỏ ở dry run phía trên";
}

function richerDryRun(oldTail, primaryDryRun) {
  const matches = [...oldTail.matchAll(/^#{3,6}\s+[^\n]*(?:dry[- ]?run|chạy tay)[^\n]*$/gim)];
  const candidates = matches.map((match) => {
    const start = match.index;
    const rest = oldTail.slice(start + match[0].length);
    const next = rest.search(/^#{3,6}\s+/m);
    return oldTail.slice(start, next === -1 ? oldTail.length : start + match[0].length + next).trim();
  });
  const score = (text) =>
    text.split(/\r?\n/).filter((line) => /^\|/.test(line)).length * 100 + Math.min(text.length, 2_000);
  const best = candidates.sort((first, second) => score(second) - score(first))[0] ?? "";
  const bestTableRows = best
    .split(/\r?\n/)
    .filter((line) => /^\|/.test(line) && !/^\|\s*(?:---|:--)/.test(line)).length;
  if (!best || bestTableRows < 3 || score(best) <= score(primaryDryRun)) return "";
  return best.replace(/^#{3,6}\s+[^\n]*\n?/, "").trim();
}

function firstCodeLine(code, patterns) {
  const lines = code.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  for (const pattern of patterns) {
    const match = lines.find((line) => pattern.test(line));
    if (match) return match;
  }
  return lines[0] ?? "// không có";
}

function firstTopLevelLoop(code) {
  const match = code.match(/^  (for|while)\b[^\n]*/m);
  return match?.[0]?.trim() ?? firstCodeLine(code, [/^for\b/, /^while\b/]);
}

function selectLoopLine(code, blueprint, pattern) {
  const topLevel = [...code.matchAll(/^  (for|while)\b[^\n]*/gm)].map((match) => match[0].trim());
  const recursive = code.match(/^  function\s+(?:dfs|backtrack|search|visit)\b[^\n]*/m)?.[0]?.trim();
  const intent = `${blueprint["MAIN LOOP"] ?? ""} ${pattern}`;
  if (/đệ quy|recursive|backtracking|DFS/i.test(intent) && recursive) return recursive;
  if (/while|heap|priority|binary|đến khi/i.test(intent)) {
    const selected = topLevel.find((line) => /^while\b/.test(line));
    if (selected) return selected;
  }
  if (/for|quét|scan|từng|right|index/i.test(intent)) {
    const selected = topLevel.find((line) => /^for\b/.test(line));
    if (selected) return selected;
  }
  return topLevel.at(-1) ?? recursive ?? firstTopLevelLoop(code);
}

function lastCodeLine(code, pattern) {
  return code
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => pattern.test(line))
    .at(-1) ?? firstCodeLine(code, [pattern]);
}

function familyFor(pattern) {
  if (/Hash|Set|frequency/i.test(pattern)) return "map";
  if (/Stack|Queue/i.test(pattern)) return "stackQueue";
  if (/Sliding|Two-pointers|difference|Prefix/i.test(pattern)) return "window";
  if (/Binary/i.test(pattern)) return "binary";
  if (/Heap|priority/i.test(pattern)) return "heap";
  if (/DP/i.test(pattern)) return "dp";
  if (/backtracking/i.test(pattern)) return "backtracking";
  if (/DFS|BFS|Graph|Tree|MST|Dijkstra/i.test(pattern)) return "graph";
  if (/Greedy|simulation|Sort|scan|bruteforce|cycle|Matrix/i.test(pattern)) return "scan";
  return "scan";
}

const familyLanguage = {
  map: {
    current: "key/occurrence hiện tại",
    movement: "sang occurrence kế tiếp sau khi multiplicity của key đã nhất quán",
    proof: "Mỗi occurrence được đọc đúng theo vòng sở hữu nó; mỗi lần đọc gây số hữu hạn thao tác Map/Set. Nếu có sort, phần sort chi phối; nếu không, các lượt lookup/update cộng lại theo kích thước input.",
    condition: "Với Map/Set, phải phân biệt key chưa tồn tại với count bằng 0 và membership với multiplicity. Default, increment, decrement hoặc delete chỉ xuất hiện nếu contract của bài cần đúng transition đó.",
  },
  stackQueue: {
    current: "phần tử ở top/frontier hiện tại",
    movement: "pop/dequeue đúng phía, rồi mới push/enqueue state mới theo invariant",
    proof: "Đếm số lần một item vào và rời cấu trúc: mỗi item chỉ được push/enqueue theo transition của bài và chỉ được pop/dequeue khi đã hoàn tất vai trò. Nested while không tự động là bình phương nếu item đã rời không quay lại.",
    condition: "Guard cấu trúc không rỗng phải đứng trước mọi lần đọc top/front. Equality có pop hay không, và visited được mark lúc enqueue hay dequeue, lấy đúng từ invariant của bài này.",
  },
  window: {
    current: "biên/current đang đi vào đoạn",
    movement: "dịch đúng left/right hoặc index prefix sau khi representation của đoạn đã được cập nhật",
    proof: "Mỗi biên chỉ tiến về phía trước; một index vào đoạn tối đa một lần và rời tối đa một lần. Với prefix/difference, mỗi ô được ghi và cộng dồn số lần hằng số.",
    condition: "Boundary inclusive/exclusive và vị trí answer update phải khớp đúng đoạn đang đại diện. Với variable window, chỉ đo answer sau khi validity được phục hồi; với prefix/difference, kiểm tra đúng offset n+1.",
  },
  binary: {
    current: "candidate middle của miền tìm kiếm",
    movement: "loại đúng nửa đã được predicate chứng minh không thể chứa boundary",
    proof: "Mỗi decision giảm miền ứng viên ít nhất gần một nửa, nên số lượt là log₂ của độ rộng ban đầu; chi phí tổng còn nhân với chi phí predicate của một lượt.",
    condition: "Predicate phải đơn điệu và interval convention phải nhất quán. Nhánh true có giữ middle hay loại middle phụ thuộc việc tìm first/last feasible; không trộn closed với half-open boundary.",
  },
  heap: {
    current: "phần tử có priority cao nhất ở heap top",
    movement: "push candidate khi nó trở nên khả dụng và pop đúng top khi quyết định",
    proof: "Mỗi item vào heap hữu hạn lần và rời hữu hạn lần; mỗi push/pop tốn O(log n). Cộng thêm bước sort event nếu bài cần sắp arrival.",
    condition: "Condition phải hỏi đúng ý nghĩa heap top sau comparator và sau khi stale entry (nếu có) đã được dọn. Equal priority tiếp tục theo tie-break ghi trong contract, không theo thứ tự tình cờ của array heap.",
  },
  graph: {
    current: "đỉnh hoặc frontier entry hiện tại",
    movement: "chuyển sang neighbor hợp lệ sau guard bounds/visited hoặc push candidate mới vào frontier",
    proof: "Đếm theo representation của graph: traversal thường xử lý mỗi đỉnh hữu hạn lần và xét mỗi cạnh theo adjacency; nếu frontier là heap, mỗi push/pop hợp lệ cộng O(log V).",
    condition: "Guard visited, bounds hoặc stale distance phải chạy trước transition tương ứng. Với BFS, mark visited lúc enqueue để một đỉnh không xếp hàng nhiều lần; với Dijkstra, bỏ entry stale trước khi relax cạnh.",
  },
  backtracking: {
    current: "choice tại depth/index hiện tại",
    movement: "chọn một candidate, recurse sang depth kế tiếp, rồi hoàn tác đúng mutation trước khi thử candidate tiếp",
    proof: "Mỗi node của cây lựa chọn tương ứng một partial solution thực sự được tạo. Thời gian là số node/nhánh được duyệt nhân chi phí kiểm tra; space là độ sâu recursion cộng state đang chọn.",
    condition: "Base case phải hỏi đúng lúc partial solution đã đủ. Guard candidate chạy trước choose; undo phải đối xứng với choose và nằm sau lời gọi đệ quy trong cùng branch.",
  },
  dp: {
    current: "DP state/cell hiện tại",
    movement: "chuyển sang state kế chỉ sau khi mọi dependency của state hiện tại đã sẵn sàng",
    proof: "Đếm số DP state được tính và số transition đọc cho mỗi state. Mỗi state chỉ được chốt theo recurrence một lần; tổng thời gian bằng số state nhân số lựa chọn/dependency thực sự xét.",
    condition: "Base state phải khớp định nghĩa DP; thứ tự loop phải bảo đảm dependency đã tính. Branch không hợp lệ không được ghi đè sentinel hoặc state tốt hơn đã có.",
  },
  scan: {
    current: "item/candidate/event hiện tại",
    movement: "chuyển sang candidate kế sau khi áp dụng đủ rule theo đúng thứ tự",
    proof: "Tách chi phí chuẩn bị (nếu có sort) khỏi traversal. Trong traversal, mỗi item/candidate được xét đúng số lần mô tả bởi loop; không nhân các loop nối tiếp thành tích.",
    condition: "Condition của scan/simulation phải theo đúng tie-break và thứ tự rule của đề. So sánh strict hay non-strict chỉ đổi khi boundary/tie của bài chứng minh, không vì thói quen viết comparator.",
  },
};

const sampleOverrides = {
  OF005: 'genres=["classic","pop","classic","classic","pop"], plays=[500,600,150,800,2500]',
  OF023: 'n=4, wires=[[1,2],[2,3],[3,4]]',
  OF026: 'name="AAAA"',
  OF027: 'number="1924", removeCount=2',
  OF029: 'n=4, costs=[[0,1,1],[1,3,1],[0,2,2],[1,2,5]]',
  OF037: 'computers=[[1,1,0],[1,1,0],[0,0,1]]',
  OF044: 'distance=25, rocks=[2,14,11,21,17], n=2',
  OF045: 'n=4, edge=[[1,2],[1,3],[1,4]]',
  OF046: 'n=3, results=[[1,2],[2,3]]',
  OF047: 'arrows=[0,2,4,6]',
  OF054: 'queue1=[3,2,7,2], queue2=[4,6,5,1]',
  OF052: 'want=["banana","apple","rice","pork","pot"], number=[3,2,2,2,1], discount=["chicken","apple","apple","banana","rice","apple","pork","banana","pork","rice","pot","banana","apple","banana"]',
  OF059: 'n=3, roads=[[1,2,10],[1,2,1],[2,3,1]], limit=2',
  OF060: 'board=[[1]], skills=[[1,0,0,0,0,1]]',
};

function controlHeader(lines, startIndex) {
  const header = [];
  for (let index = startIndex; index < lines.length; index += 1) {
    header.push(lines[index]);
    if (lines[index].includes("{")) break;
    if (lines[index].trim().endsWith(";")) break;
  }
  return header;
}

function progressiveBodies(body) {
  const chunks = topLevelChunks(body);
  const stages = [];
  const completed = [];
  for (const chunk of chunks) {
    const lines = chunk.split(/\r?\n/);
    const first = lines.findIndex((line) => line.trim() !== "");
    const candidateHeader = first === -1 ? [] : controlHeader(lines, first);
    const topControl =
      first !== -1 &&
      /^  (?:for|while|if)\b/.test(lines[first]) &&
      candidateHeader.reduce((sum, line) => sum + braceDelta(line), 0) > 0;
    if (topControl) {
      const outerHeader = candidateHeader;
      const outerIndent = lines[first].match(/^\s*/)?.[0] ?? "  ";
      const skeleton = `${outerHeader.join("\n")}\n${outerIndent}}`;
      stages.push({ body: [...completed, skeleton].join("\n"), kind: "loop", added: skeleton });

      const nestedStart = lines.findIndex(
        (line, index) => index > first && /^    (?:for|while|if)\b/.test(line),
      );
      if (nestedStart !== -1) {
        const nestedHeader = controlHeader(lines, nestedStart);
        if (nestedHeader.reduce((sum, line) => sum + braceDelta(line), 0) <= 0) {
          stages.push({ body: [...completed, chunk].join("\n"), kind: "transition", added: chunk });
          completed.push(chunk);
          continue;
        }
        const prefix = lines.slice(0, nestedStart);
        const nestedIndent = lines[nestedStart].match(/^\s*/)?.[0] ?? "    ";
        const nestedSkeleton = [
          ...prefix,
          ...nestedHeader,
          `${nestedIndent}}`,
          `${outerIndent}}`,
        ].join("\n");
        if (nestedSkeleton.length > skeleton.length) {
          stages.push({
            body: [...completed, nestedSkeleton].join("\n"),
            kind: "condition",
            added: nestedHeader.join(" ").trim(),
          });
        }
        let nestedDepth = 0;
        let nestedEnd = -1;
        for (let index = nestedStart; index < lines.length; index += 1) {
          nestedDepth += braceDelta(lines[index]);
          if (nestedDepth === 0) {
            nestedEnd = index;
            break;
          }
        }
        if (nestedEnd !== -1 && nestedEnd < lines.length - 1) {
          const nestedComplete = [
            ...lines.slice(0, nestedEnd + 1),
            `${outerIndent}}`,
          ].join("\n");
          if (nestedComplete.length > nestedSkeleton.length) {
            stages.push({
              body: [...completed, nestedComplete].join("\n"),
              kind: "transition",
              added: lines.slice(nestedStart, nestedEnd + 1).join("\n"),
            });
          }
        }
      }
      stages.push({ body: [...completed, chunk].join("\n"), kind: "transition", added: chunk });
    } else {
      const kind = /\breturn\b/.test(chunk)
        ? "return"
        : /\b(?:const|let)\b/.test(chunk)
          ? "state"
          : "transition";
      stages.push({ body: [...completed, chunk].join("\n"), kind, added: chunk });
    }
    completed.push(chunk);
  }
  return stages;
}

function checkpointFor(stage, blueprint, row) {
  const lines = stage.added
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && line !== "}" && !line.startsWith("//"));
  const exactLines = lines.slice(0, 5).map((line) => `\`${inlineCode(line)}\``).join(", ");
  if (stage.kind === "state") {
    return `> **Prediction checkpoint — state của ${row.problem_name}:** Những dữ kiện nào trong \`${inlineCode(blueprint["GLOBAL STATE"])}\` phải còn nguyên khi current kế tiếp tới? Block ${exactLines} chạy đúng một lần trước traversal. Nếu đặt nó trong \`${inlineCode(blueprint["MAIN LOOP"])}\`, state nào sẽ bị reset?`;
  }
  if (stage.kind === "loop") {
    return `> **Prediction checkpoint — loop của ${row.problem_name}:** Header ${exactLines} lặp per item, per candidate hay tới khi state rỗng? Current \`${inlineCode(blueprint["CURRENT ITEM"])}\` chỉ tồn tại sau khi loop mở. Hãy chỉ ra brace đóng loop trước khi xem bước kế tiếp; đặt return/cleanup bên trong brace đó sẽ bỏ phần input nào?`;
  }
  if (stage.kind === "condition") {
    return `> **Prediction checkpoint — condition của ${row.problem_name}:** Trước khi chạy ${exactLines}, khoanh từng identifier mà condition đọc và tìm dòng đã gán nó trong function tích lũy đang thấy. Với input dry run, current nào làm câu \`${inlineCode(blueprint.CHECK)}\` true hoặc false? Đưa branch ra khỏi loop sẽ làm identifier current nào hết scope?`;
  }
  if (stage.kind === "return") {
    return `> **Prediction checkpoint — finalization của ${row.problem_name}:** Dòng ${exactLines} chạy per current hay đúng một lần sau khi \`${inlineCode(blueprint["MAIN LOOP"])}\` kết thúc? Trước return, cleanup \`${inlineCode(blueprint.CLEANUP)}\` và output \`${inlineCode(blueprint.OUTPUT)}\` phải ở trạng thái nào? Return sớm sẽ bỏ state pending nào?`;
  }
  return `> **Prediction checkpoint — transition của ${row.problem_name}:** Nhìn các brace đang mở để quyết định ${exactLines} chạy lúc setup, per current hay sau traversal. Dòng nào trong block thật sự thực hiện \`${inlineCode(blueprint.UPDATE)}\`, và movement \`${inlineCode(blueprint["POINTER MOVEMENT"])}\` đã xảy ra hay chưa? Nếu chuyển block qua brace sở hữu current, dữ kiện nào sẽ bị reset hoặc hết scope?`;
}

function cumulativeConstruction(main, blueprint, row) {
  const stages = progressiveBodies(main.body);
  const blocks = [];
  blocks.push(
    `**Bước 1 — function contract/shell**\n\n` +
      `> **Prediction checkpoint — ${row.problem_name}:** Function này bao toàn bộ lời giải, không chạy per item. Input phải đúng contract ở trên. Nếu đóng brace rồi đặt state bên ngoài, state không còn thuộc lời giải.\n\n` +
      `\`\`\`js\n${main.header}\n}\n\`\`\``,
  );
  stages.forEach((stage, index) => {
    const role = {
      state: "state/initialization",
      loop: "main loop và scope",
      condition: "condition/inner branch",
      transition: "transition và movement",
      return: "cleanup/return",
    }[stage.kind];
    blocks.push(
      `**Bước ${index + 2} — ${role}**\n\n` +
        `${checkpointFor(stage, blueprint, row)}\n\n` +
        `\`\`\`js\n${main.header}\n${stage.body}\n}\n\`\`\``,
    );
  });
  return blocks.join("\n\n");
}

function buildReconstruction(markdown, oldTail, row) {
  const contract = bodyWithoutHeading(section(markdown, 1));
  const bound = bodyWithoutHeading(section(markdown, 2));
  const dryRun = bodyWithoutHeading(section(markdown, 15));
  const extraDryRun = richerDryRun(oldTail, dryRun);
  const complexity = bodyWithoutHeading(section(markdown, 9));
  const errors = bodyWithoutHeading(section(markdown, 17));
  const finalCode = javascriptFence(section(markdown, 14));
  const main = extractMainFunction(finalCode);
  const blueprint = extractBlueprint(`${markdown}\n${oldTail}`);
  const family = familyLanguage[familyFor(row.pattern)];
  const sample = sampleOverrides[row.bank_id] ?? firstConcreteToken(dryRun);
  const stateLine = firstCodeLine(main.body, [/^(?:const|let)\s+/, /new Map|new Set|\[\]/]);
  const loopLine = selectLoopLine(main.body, blueprint, row.pattern);
  const conditionLine = firstCodeLine(main.body, [/^if\b/, /^while\b/]);
  const updateLine = firstCodeLine(main.body, [/\.set\(/, /\.push\(/, /\+=|-=|\+\+|--/, /^[A-Za-z_$][\w$.[\]]*\s*=/]);
  let movementLine = firstCodeLine(main.body, [
    /\b(?:index|depth|row|column|step)\s*\+\s*1/,
    /\+\+|--|\+=\s*1|-=\s*1/,
    /\b(?:head|left|right|index|depth)\b/,
  ]);
  if (/for\s*(?:\.\.\.|tăng|right|index)|quét từng|duyệt từng/i.test(blueprint["POINTER MOVEMENT"])) {
    movementLine = loopLine;
  }
  if (/pop\s+(?:heap|queue|stack)|heap\s+pop/i.test(blueprint["POINTER MOVEMENT"])) {
    movementLine = firstCodeLine(main.body, [/\.pop\(/, /\.dequeue\(/, /head\+\+/]);
  }
  const returnLine = lastCodeLine(main.body, /^return\b/);
  const errorBullets = errors.split(/\r?\n/).filter((line) => /^-\s+/.test(line)).slice(0, 3);
  if (errorBullets.length < 3) {
    const inlineErrors = errors
      .replace(/^[-*]\s+/gm, "")
      .split(/[;\n]+/)
      .map((item) => item.trim())
      .filter((item) => item.length >= 8);
    for (const item of inlineErrors) {
      if (errorBullets.length >= 3) break;
      errorBullets.push(`- ${item}`);
    }
  }
  while (errorBullets.length < 3) errorBullets.push(`- Đảo thứ tự transition của ${row.problem_name}`);
  const revealingInputs = [sample, ...`${oldTail}\n${dryRun}\n${errors}`.matchAll(/`([^`\n]+)`/g)]
    .map((match) => typeof match === "string" ? match : match[1].trim())
    .filter(
      (value) =>
        /^(?:\[|\{|"|')/.test(value) ||
        /(?:,|→|target\s*=|people\s*=|times\s*=|limit\s*=)/i.test(value),
    )
    .filter((value) => !/^(?:O\(|new\s|return\s|const\s|let\s|function\s)/.test(value))
    .filter((value) => value.length <= 120)
    .filter((value, index, values) => values.indexOf(value) === index);
  while (revealingInputs.length < 3) revealingInputs.push(sample);
  const correctBlockFor = (error) => {
    if (/return|trả sớm/i.test(error)) return returnLine;
    if (/BFS|FIFO/i.test(error)) return loopLine;
    if (/stale|visited/i.test(error)) return conditionLine;
    if (/set|map|count|default|init|nan|duplicate|trùng|lưu value|representation/i.test(error)) return stateLine;
    if (/if.*while|condition|so sánh|strict|<=|>=|check|branch/i.test(error)) return conditionLine;
    if (/pointer|index|head|left|right|low|high|mid|tiến|dịch/i.test(error)) return movementLine;
    return updateLine;
  };
  const escapeRow = (value) => inlineCode(value).replace(/\n/g, " ");
  const noDecisionBranch = /không\s+(?:cần|có)[^.;\n]*branch|không cần nhánh|không branch/i.test(blueprint.CHECK);
  const conditionExplanation = noDecisionBranch
    ? `- **Điều kiện của nhịp:** Blueprint nói “${escapeRow(blueprint.CHECK)}”, nên current không cần một nhánh true/false riêng. Loop \`${escapeRow(loopLine)}\` tự xác định current nào được đọc; thêm \`if\` sẽ tạo một quyết định không có trong contract.`
    : `- **Câu hỏi trước branch:** “${escapeRow(blueprint.CHECK)}”. Trong dry run \`${sample}\`, đối chiếu dòng làm condition true và dòng làm condition false; code tương ứng bắt đầu tại \`${escapeRow(conditionLine)}\`.`;
  const stockCleanupFailure = row.bank_id === "OF011" ? `
#### Learner failure case — cleanup đặt nhầm trong main \`for\`

Learner đã viết đúng main \`for\` và resolve \`while\`, nhưng đặt cleanup stack **trước dấu \`}\` đóng main \`for\`**. Với biến thể khởi tạo answer bằng 0, code sai có scope này:

\`\`\`js
function stockPriceDurationsWrong(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  for (let i = 0; i < prices.length; i++) { // MAIN FOR MỞ
    while (stack.length > 0 && prices[stack.at(-1)] > prices[i]) { // RESOLVE WHILE THUỘC FOR
      const previous = stack.pop();
      answer[previous] = i - previous;
    }
    stack.push(i);

    while (stack.length > 0) { // SAI: cleanup chạy sau MỖI current
      const previous = stack.pop();
      answer[previous] = prices.length - 1 - previous;
    }
  } // MAIN FOR ĐÓNG QUÁ MUỘN

  return answer;
}
\`\`\`

Với \`prices=[1,2,3,2,3]\`, cuối \`i=0\` stack vừa nhận index 0 rồi cleanup pop ngay thành rỗng; cuối \`i=1\` index 1 cũng bị xóa. Vì cleanup làm rỗng stack sau mọi iteration, tới \`i=3\` giá 2 không còn thấy index 2 (giá 3), nên giá tương lai không thể resolve duration \`answer[2]=1\`. Một index đã bị pop không còn reference nào để main resolve-while tìm lại.

> **Prediction checkpoint:** Cleanup này chạy per current hay một lần sau traversal? Nó chỉ được biết “index không bao giờ gặp giá thấp hơn” sau khi đã đọc **toàn bộ** prices. Đặt trong main loop biến “chưa thấy giá thấp hơn *đến hiện tại*” thành “sẽ không bao giờ thấy giá thấp hơn”.

Scope đúng đóng main \`for\` trước, rồi mới mở cleanup \`while\`; \`return\` đứng sau cả hai:

\`\`\`js
function stockPriceDurationsWithCleanup(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  for (let i = 0; i < prices.length; i++) { // MAIN FOR MỞ
    while (stack.length > 0 && prices[stack.at(-1)] > prices[i]) { // RESOLVE WHILE Ở TRONG FOR
      const previous = stack.pop();
      answer[previous] = i - previous;
    }
    stack.push(i);
  } // MAIN FOR ĐÓNG — đã đọc hết current

  while (stack.length > 0) { // CLEANUP WHILE Ở SAU FOR
    const previous = stack.pop();
    answer[previous] = prices.length - 1 - previous;
  }

  return answer; // RETURN SAU CLEANUP
}
\`\`\`

Riêng câu hỏi “vì sao phải \`while\`, không phải \`if\`” dùng \`[3,4,2]\`: tại \`i=2\`, giá 2 resolve index 1 rồi vẫn còn resolve index 0; \`if\` chỉ pop một index và bỏ sót \`answer[0]=2\`.
` : "";
  const oldTailDemoted = oldTail
    .trim()
    .replace(/^##\s+/gm, "#### ")
    .replace(/^###\s+/gm, "##### ");

  return `${startMarker}
## Dry run → Code reconstruction — ${row.bank_id} ${row.problem_name}

Phần này dùng chính contract, dry run, Blueprint và code executable của **${row.problem_name}** để dựng lại lời giải; pattern kiểm soát là \`${row.pattern}\`. Các section 01–18 phía trên vẫn là theory/reference, còn pipeline dưới đây tập trung vào việc tự đặt state, loop, brace và update order.

### Problem contract

${contract}

**Giới hạn quyết định implementation:** ${bound}

### Concrete dry run

**Concrete input:** \`${sample}\`

${dryRun}

${extraDryRun ? `**Dry run chi tiết bổ sung đã có trong lesson:**\n\n${extraDryRun}\n` : ""}

Decision ledger của **${row.problem_name}** nối \`${escapeRow(blueprint["GLOBAL STATE"])}\` với đúng block code; mỗi inner action trong input \`${sample}\` là một lượt riêng.

| Iteration/current item | State before | Exact condition with real dry-run values | Action / pointer movement | State after | Answer/output change |
| --- | --- | --- | --- | --- | --- |
| Khởi tạo cho \`${sample}\` | Chưa có state của ${row.problem_name} | Contract và input đã hợp lệ | ${escapeRow(blueprint.INIT)} | ${escapeRow(blueprint["GLOBAL STATE"])} | Chưa chốt output |
| ${escapeRow(blueprint["CURRENT ITEM"])} đi vào | ${escapeRow(blueprint["PER-ITERATION STATE"])} | Với \`${sample}\`, hỏi: ${escapeRow(blueprint.CHECK)} | ${escapeRow(blueprint.BRANCH)}; ${escapeRow(blueprint["POINTER MOVEMENT"])} | ${escapeRow(blueprint["GLOBAL STATE"])} sau branch vừa chọn | ${escapeRow(blueprint.OUTPUT)} chỉ đổi ở branch ghi answer |
| Transition của current | ${escapeRow(blueprint["GLOBAL STATE"])} trước mutation trong dòng dry run tương ứng | Condition ở dòng concrete phía trên vừa true/false đúng như giá trị đã ghi | ${escapeRow(blueprint.UPDATE)} | ${escapeRow(blueprint["GLOBAL STATE"])} đã commit current; invariant của ${row.problem_name} được phục hồi | ${escapeRow(blueprint.OUTPUT)} sau đúng assignment của dòng đó |
| Kết thúc traversal | Không còn current/candidate cần xét | Điều kiện stop của loop không còn đúng | ${escapeRow(blueprint.CLEANUP)}; ${escapeRow(blueprint["STOP / RETURN"])} | Không còn state pending ngoài contract | Return output hoàn tất |

### Vietnamese action narrative

> Trong **${row.problem_name}**, ${family.current} đi vào → đọc \`${escapeRow(blueprint["PER-ITERATION STATE"])}\` từ state đang sống → hỏi đúng câu \`${escapeRow(blueprint.CHECK)}\` → đi nhánh \`${escapeRow(blueprint.BRANCH)}\` → thực hiện \`${escapeRow(blueprint.UPDATE)}\` → ${family.movement} → chỉ chốt \`${escapeRow(blueprint.OUTPUT)}\` ở vị trí mà invariant đã đúng → ${escapeRow(blueprint.CLEANUP)} → ${escapeRow(blueprint["STOP / RETURN"])}.

Với **${row.problem_name}**, chuỗi “đọc ${escapeRow(blueprint["CURRENT ITEM"])} → hỏi ${escapeRow(blueprint.CHECK)} → đổi ${escapeRow(blueprint.UPDATE)} → di chuyển” là nguồn trực tiếp của từng dòng code; không thêm mutation ngoài chuỗi này.

### State derivation

| Information that must survive | Variable/state | Exact meaning | Initial value | Why |
| --- | --- | --- | --- | --- |
| Thông tin toàn cục còn cần cho lượt sau của ${row.problem_name} | \`${escapeRow(blueprint["GLOBAL STATE"])}\` | State chung mà mọi current đọc hoặc mutate | \`${escapeRow(blueprint.INIT)}\` | Trước lượt đầu chưa có transition nào được commit |
| Đối tượng đang được xét | \`${escapeRow(blueprint["CURRENT ITEM"])}\` | Current của đúng iteration/candidate hiện tại | Do \`${escapeRow(blueprint["MAIN LOOP"])}\` cung cấp | Không cần giữ sau khi transition của current hoàn tất |
| Dữ kiện tạm để chọn branch | \`${escapeRow(blueprint["PER-ITERATION STATE"])}\` | Giá trị chỉ đúng cho current đang xét | Tính sau khi current tồn tại | Tính sớm hơn sẽ dùng index/state cũ |
| Kết quả phải sống tới return | \`${escapeRow(blueprint.OUTPUT)}\` | Contract output của ${row.problem_name} | Theo init và sentinel trong code | Cho phép answer update đúng tie/default của bài |

Representation không được đổi tùy tiện: code bắt đầu state bằng \`${escapeRow(stateLine)}\`; lựa chọn này giữ đúng thông tin mà check \`${escapeRow(blueprint.CHECK)}\` cần ở lượt sau.

### Loop and condition derivation

- **Nhịp lặp:** \`${escapeRow(blueprint["MAIN LOOP"])}\`. Đây là lý do code dùng block bắt đầu bởi \`${escapeRow(loopLine)}\`, thay vì chọn loop theo thói quen.
${conditionExplanation}
- **Tiến triển:** ${escapeRow(blueprint["POINTER MOVEMENT"])}. Nếu state/pointer không đổi, loop có thể xét lại cùng candidate hoặc giữ representation lệch current.
- **Thứ tự:** phải hoàn thành \`${escapeRow(blueprint.UPDATE)}\` ở scope sở hữu current rồi mới chuyển nhịp. Dòng movement chính là \`${escapeRow(movementLine)}\`.
- **Cleanup:** ${escapeRow(blueprint.CLEANUP)}. Nếu là “không cần”, state đã hoàn tất ngay trong main loop; nếu có, block chỉ chạy sau khi traversal đã cung cấp đủ thông tin.

**Kiểm tra theo family cho ${row.problem_name}:** ${family.condition}

### Vietnamese logic → code

| Vietnamese action from the dry run | Information required | Exact code | Why here |
| --- | --- | --- | --- |
| Tạo state sống qua các lượt của ${row.problem_name} | ${escapeRow(blueprint["GLOBAL STATE"])} | \`${escapeRow(stateLine)}\` | Trước main traversal để không reset lịch sử |
| Mở nhịp xét current/candidate | ${escapeRow(blueprint["MAIN LOOP"])} | \`${escapeRow(loopLine)}\` | Block sở hữu current và mọi branch của nó |
| Hỏi câu quyết định | ${escapeRow(blueprint.CHECK)} | \`${escapeRow(conditionLine)}\` | Chỉ đọc sau khi guard/state cần thiết đã tồn tại |
| Commit transition của bài | ${escapeRow(blueprint.UPDATE)} | \`${escapeRow(updateLine)}\` | Ở đúng branch/inner iteration đã chứng minh mutation hợp lệ |
| Tiến sang state/candidate kế | ${escapeRow(blueprint["POINTER MOVEMENT"])} | \`${escapeRow(movementLine)}\` | Sau read/update theo invariant của ${row.problem_name} |
| Hoàn tất và trả contract output | ${escapeRow(blueprint.CLEANUP)} | \`${escapeRow(returnLine)}\` | Sau mọi finalization bắt buộc, không return non-final state |

### Cumulative code construction

Mỗi bước của **${row.problem_name}** là **toàn bộ \`${main.name}\` đã dựng tới lúc đó**; brace đang thấy chính là scope thật. Helper của lời giải (nếu có) chỉ được gọi sau khi state mà nó cần đã tồn tại.

${cumulativeConstruction(main, blueprint, row)}

### Block scope and placement

| Block | Correct scope/location | Why | What breaks if moved |
| --- | --- | --- | --- |
| \`${escapeRow(stateLine)}\` | Trước traversal trong main function | ${escapeRow(blueprint["GLOBAL STATE"])} phải sống qua các lượt | Đặt trong loop làm reset lịch sử của ${row.problem_name} |
| \`${escapeRow(blueprint["CURRENT ITEM"])}\` | Bên trong iteration/candidate hiện tại | Current phụ thuộc loop hiện tại | Đặt ngoài dùng current cũ hoặc chưa có index |
| \`${escapeRow(conditionLine)}\` | Sau khi state guard/current đã sẵn | Condition đọc ${escapeRow(blueprint["PER-ITERATION STATE"])} | Check sớm đọc state thiếu; check muộn có thể mutate nhầm branch |
| \`${escapeRow(updateLine)}\` | Trong branch/inner loop đã chọn | Mutation chỉ hợp lệ khi ${escapeRow(blueprint.CHECK)} | Đưa ra ngoài áp dụng update cho cả case false |
| \`${escapeRow(movementLine)}\` | ${escapeRow(blueprint["POINTER MOVEMENT"])} | Bảo đảm progress và đồng bộ representation | Move trước read/update bỏ current; không move có thể lặp vô hạn |
| Cleanup: ${escapeRow(blueprint.CLEANUP)} | Sau main traversal nếu contract yêu cầu | Chỉ lúc đó mới biết state nào còn pending | Đặt trong main loop kết luận sớm hoặc xóa state cần cho current tương lai |
| \`${escapeRow(returnLine)}\` | Sau finalization của main function | Output phải đạt ${escapeRow(blueprint.OUTPUT)} | Return sớm bỏ candidate/state chưa xử lý |

Scope checkpoint của **${row.problem_name}** dùng \`${sample}\`: dừng ngay khi \`${escapeRow(blueprint["GLOBAL STATE"])}\` lệch invariant, ghi state trước/sau block bị chuyển và không chờ tới output cuối.

${stockCleanupFailure}

### Full-code dry run

Chạy toàn bộ \`${main.name}\` với \`${sample}\`; theo dõi đúng output \`${escapeRow(blueprint.OUTPUT)}\` qua các block sau:

| Code block reached | Pending state before | Mutation / assignment now | Intermediate output | Why assignment is valid now |
| --- | --- | --- | --- | --- |
| State initialization | Chưa có state | ${escapeRow(blueprint.INIT)} | Output ở default/sentinel | Chưa có current nào đủ dữ kiện để chốt |
| Main loop lấy current | ${escapeRow(blueprint["GLOBAL STATE"])} | ${escapeRow(blueprint["CURRENT ITEM"])} | Chưa tự động đổi answer | Current mới chỉ được đọc |
| Check và branch | ${escapeRow(blueprint["PER-ITERATION STATE"])} | ${escapeRow(blueprint.UPDATE)} | Đổi đúng như từng dòng dry run gốc | Condition ${escapeRow(blueprint.CHECK)} vừa được xác nhận |
| Pointer/frontier/index movement | State của current đã commit | ${escapeRow(blueprint["POINTER MOVEMENT"])} | Giữ output vừa chốt | Không đọc lại cùng current với state cũ |
| Cleanup/return | ${escapeRow(blueprint.CLEANUP)} | ${escapeRow(blueprint["STOP / RETURN"])} | ${escapeRow(blueprint.OUTPUT)} | Không còn transition bắt buộc nào chưa chạy |

Trong **${row.problem_name}**, chỉ dòng thực hiện \`${escapeRow(blueprint.UPDATE)}\` được đổi output; state còn pending theo \`${escapeRow(blueprint["GLOBAL STATE"])}\` phải sống tới branch hoặc cleanup sở hữu nó.

### Realistic wrong implementations

| Wrong implementation | Small failing input | First wrong iteration | Root cause | Correct block |
| --- | --- | --- | --- | --- |
| ${escapeRow(errorBullets[0].replace(/^-\s+/, ""))} | \`${escapeRow(revealingInputs[0])}\` | Lượt đầu của \`${escapeRow(blueprint["CURRENT ITEM"])}\` mà \`${escapeRow(blueprint.CHECK)}\` quyết định branch | ${escapeRow(errorBullets[0].replace(/^-\s+/, ""))} | \`${escapeRow(correctBlockFor(errorBullets[0]))}\` ở đúng scope |
| ${escapeRow(errorBullets[1].replace(/^-\s+/, ""))} | \`${escapeRow(revealingInputs[1])}\` | Ngay transition đầu tiên thực hiện \`${escapeRow(blueprint.UPDATE)}\` trên boundary/duplicate của input | ${escapeRow(errorBullets[1].replace(/^-\s+/, ""))} | \`${escapeRow(correctBlockFor(errorBullets[1]))}\` với init/strictness của ${row.problem_name} |
| ${escapeRow(errorBullets[2].replace(/^-\s+/, ""))} | \`${escapeRow(revealingInputs[2])}\` | Lượt đầu movement \`${escapeRow(blueprint["POINTER MOVEMENT"])}\` xảy ra trước/sau sai assignment | ${escapeRow(errorBullets[2].replace(/^-\s+/, ""))} | \`${escapeRow(correctBlockFor(errorBullets[2]))}\` trước/sau movement đúng như mapping |

### Complexity proof from movements

${complexity}

**Proof từ operation của ${row.problem_name}:** ${family.proof} Main loop được mô tả là \`${escapeRow(blueprint["MAIN LOOP"])}\`; movement là \`${escapeRow(blueprint["POINTER MOVEMENT"])}\`. Vì vậy phải cộng chi phí các phase nối tiếp và chỉ nhân khi một phase thật sự chạy trọn bên trong mỗi lượt ngoài. Auxiliary space chính là state \`${escapeRow(blueprint["GLOBAL STATE"])}\`, không tính output nếu convention của bài tách output.

### Reconstruction exercises

1. **Level 1 — Mapping support:** Che section 14 và toàn bộ cumulative code. Dùng bảng Vietnamese logic → code để dựng lại ${row.problem_name}; test \`${sample}\` và test boundary ở section 16. Không mở code cho tới khi tự đặt xong brace.
2. **Level 2 — Action support:** Che cả mapping. Chỉ dùng action narrative và concrete dry run; tự suy ra \`${escapeRow(blueprint["GLOBAL STATE"])}\`, condition \`${escapeRow(blueprint.CHECK)}\`, update order và vị trí movement. Thêm một input làm branch ngược với dry run.
3. **Level 3 — Exam simulation:** Chỉ xem Problem contract và bound của ${row.problem_name}. Trong một trang trắng, viết state meaning/init, loop ownership, strictness, transition order, movement proof, complexity và complete function. Chạy ít nhất ba test: normal branch, edge/boundary, và revealing test từ bảng lỗi; không xem đáp án trong lúc dựng.

### Additional preserved problem-specific drills and notes

${oldTailDemoted || "Không có appendix cũ; toàn bộ evidence nằm trong pipeline phía trên."}
${endMarker}`;
}

const rows = readBank().filter((row) => row.priority !== "RESERVED_MOCK");
const changed = [];
for (const row of rows) {
  const lessonPath = path.join(lessonDirectory, `${row.bank_id}.md`);
  if (!fs.existsSync(lessonPath)) throw new Error(`Thiếu lesson ${row.bank_id}`);
  const markdown = fs.readFileSync(lessonPath, "utf8");
  const markerIndex = markdown.indexOf(startMarker);
  let before;
  let oldTail;
  if (markerIndex !== -1) {
    before = markdown.slice(0, markerIndex).trimEnd();
    const existing = markdown.slice(markerIndex);
    const appendixHeading = "### Additional preserved problem-specific drills and notes";
    const appendixStart = existing.indexOf(appendixHeading);
    const appendixEnd = existing.lastIndexOf(endMarker);
    oldTail = appendixStart === -1
      ? ""
      : existing.slice(appendixStart + appendixHeading.length, appendixEnd).trim();
  } else {
    const section18 = section(markdown, 18);
    const section18Start = markdown.indexOf(section18);
    const section18End = section18Start + section18.length;
    before = markdown.slice(0, section18End).trimEnd();
    oldTail = markdown.slice(section18End).trim();
  }
  const reconstruction = buildReconstruction(before, oldTail, row);
  fs.writeFileSync(lessonPath, `${before}\n\n${reconstruction}\n`, "utf8");
  changed.push(row.bank_id);
}

console.log(`Upgraded reconstruction sections: ${changed.length}/${rows.length} (${changed.join(", ")}).`);
