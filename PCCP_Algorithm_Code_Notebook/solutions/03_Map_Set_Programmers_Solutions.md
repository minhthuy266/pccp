# Lời giải bộ Map/Set Programmers/PCCP — JavaScript

[← Danh sách đề](../chapters/03_map_set/04_Programmers_PCCP_Set.md) · [← Index chương](../03_Map_Set.md)

> Mỗi code block là một lời giải độc lập. Khi nộp trên Programmers, đổi tên function thành `solution` nếu cần. Hãy chú ý dòng **Ý nghĩa state**: đó là phần cần nhớ, không phải thuộc lòng toàn bộ code.

## PK-H01 — Người chạy chưa về đích

**Ý nghĩa state:** `remainingByName.get(name)` là số lượt xuất hiện của `name` trong `participant` chưa bị ghép với một lượt hoàn thành.

```js
function findUnfinishedRunner(participant, completion) {
  // Bước 1: Đếm tất cả lượt đăng ký. Map cần thiết vì tên có thể trùng.
  const remainingByName = new Map();

  for (const name of participant) {
    const oldCount = remainingByName.get(name) ?? 0;
    remainingByName.set(name, oldCount + 1);
  }

  // Bước 2: Mỗi người hoàn thành triệt tiêu đúng một lượt đăng ký.
  for (const name of completion) {
    remainingByName.set(name, remainingByName.get(name) - 1);
  }

  // Bước 3: Chỉ còn đúng một name có count dương.
  for (const [name, count] of remainingByName) {
    if (count > 0) {
      return name;
    }
  }

  // Contract bảo đảm luôn có một người chưa hoàn thành.
  return "";
}
```

**Đúng vì:** count ban đầu là số người cùng tên; mỗi completion trừ đúng một người; phần dư chính là người thiếu. **Complexity:** `O(n)` time, `O(n)` space. **Bẫy:** Set làm mất số bản sao; sort được nhưng là `O(n log n)`.

## PK-H02 — Chọn Ponketmon

```js
function maxPonketmonTypes(nums) {
  // Bước 1: Set loại bỏ mã loài trùng nhau.
  const distinctTypeCount = new Set(nums).size;

  // Bước 2: Ta chỉ được lấy đúng một nửa số cá thể.
  const pickCount = nums.length / 2;

  // Bước 3: Không thể lấy nhiều loại hơn số loại hiện có hoặc số lượt chọn.
  return Math.min(distinctTypeCount, pickCount);
}
```

**Complexity:** `O(n)` time và tối đa `O(n)` space. **Bẫy:** trả thẳng `Set.size` khi số loại lớn hơn `N/2`.

## PK-H03 — Danh bạ điện thoại

```js
function hasValidPhoneBook(phoneBook) {
  // Bước 1: Lưu mọi số hoàn chỉnh để lookup trung bình O(1).
  const phoneSet = new Set(phoneBook);

  // Bước 2: Với mỗi số, chỉ sinh prefix ngắn hơn chính nó.
  for (const phone of phoneBook) {
    for (let length = 1; length < phone.length; length++) {
      const prefix = phone.slice(0, length);

      // Bước 3: Prefix cũng là một số hoàn chỉnh => danh bạ không hợp lệ.
      if (phoneSet.has(prefix)) {
        return false;
      }
    }
  }

  return true;
}
```

**Đúng vì:** mọi quan hệ tiền tố `(shorter,longer)` chắc chắn được phát hiện khi duyệt `longer`. **Complexity:** theo tổng số ký tự/prefix được tạo; với độ dài số tối đa 20, thực tế gần `O(n)`. **Bẫy:** lặp đến `length <= phone.length` sẽ tìm thấy chính số đó.

## PK-H04 — Phối trang phục

```js
function countOutfitCombinations(clothes) {
  // Bước 1: Đếm số món độc lập trong từng loại.
  const countByType = new Map();

  for (const [, type] of clothes) {
    countByType.set(type, (countByType.get(type) ?? 0) + 1);
  }

  // Bước 2: Với một loại có count món, có count + 1 lựa chọn:
  // chọn một món hoặc không chọn món nào thuộc loại đó.
  let combinationsIncludingEmpty = 1;

  for (const count of countByType.values()) {
    combinationsIncludingEmpty *= count + 1;
  }

  // Bước 3: Trừ trường hợp không chọn món nào ở tất cả các loại.
  return combinationsIncludingEmpty - 1;
}
```

**Complexity:** `O(n)` time, `O(k)` space với `k` loại. **Bẫy:** cộng count giữa các loại thay vì nhân; quên lựa chọn “không mặc loại này”; quên trừ bộ rỗng.

## PK-H05 — Album hay nhất

```js
function buildBestAlbum(genres, plays) {
  // totalByGenre: genre -> tổng lượt nghe, dùng để xếp hạng thể loại.
  const totalByGenre = new Map();

  // songsByGenre: genre -> danh sách { index, play }, dùng để chọn bài.
  const songsByGenre = new Map();

  // Bước 1: Duyệt mỗi bài đúng một lần và cập nhật cả hai Map.
  for (let index = 0; index < genres.length; index++) {
    const genre = genres[index];
    const play = plays[index];

    totalByGenre.set(genre, (totalByGenre.get(genre) ?? 0) + play);

    if (!songsByGenre.has(genre)) {
      songsByGenre.set(genre, []);
    }
    songsByGenre.get(genre).push({ index, play });
  }

  // Bước 2: Xếp thể loại theo tổng lượt nghe giảm dần.
  const orderedGenres = [...totalByGenre.keys()].sort(
    (a, b) => totalByGenre.get(b) - totalByGenre.get(a),
  );

  // Bước 3: Trong từng thể loại, chọn tối đa hai bài tốt nhất.
  const answer = [];

  for (const genre of orderedGenres) {
    const songs = songsByGenre.get(genre);

    songs.sort((a, b) => {
      // Ưu tiên lượt nghe lớn hơn.
      if (a.play !== b.play) return b.play - a.play;

      // Nếu hòa, ưu tiên index nhỏ hơn.
      return a.index - b.index;
    });

    for (const song of songs.slice(0, 2)) {
      answer.push(song.index);
    }
  }

  return answer;
}
```

**Complexity:** `O(n log n)` do sort; `O(n)` space. **Bẫy:** sort bài toàn cục trước khi group; quên tie index; lấy hai bài dù thể loại chỉ có một.

## PK-M01 — Cuộc đua chạy

**Invariant:** sau mỗi lượt gọi, `players[index]` và `indexByPlayer.get(name)` mô tả cùng một bảng xếp hạng.

```js
function updateRaceRanking(players, callings) {
  // Bước 1: Copy để không sửa mảng input và dựng lookup name -> index.
  const ranking = [...players];
  const indexByPlayer = new Map();

  for (let index = 0; index < ranking.length; index++) {
    indexByPlayer.set(ranking[index], index);
  }

  // Bước 2: Mỗi người được gọi vừa vượt đúng người trước mặt.
  for (const calledName of callings) {
    const calledIndex = indexByPlayer.get(calledName);
    const frontIndex = calledIndex - 1;
    const frontName = ranking[frontIndex];

    // Bước 3: Swap trong array.
    ranking[frontIndex] = calledName;
    ranking[calledIndex] = frontName;

    // Bước 4: Commit hai index trong Map, nếu quên Map sẽ bị stale.
    indexByPlayer.set(calledName, frontIndex);
    indexByPlayer.set(frontName, calledIndex);
  }

  return ranking;
}
```

**Complexity:** `O(players + callings)` time, `O(players)` space. **Bẫy:** dùng `indexOf` trong mỗi lượt thành `O(nm)`; chỉ swap array mà không sửa Map.

## PK-M02 — Điểm kỷ niệm

```js
function calculateMemoryScores(name, yearning, photo) {
  // Bước 1: Ghép mỗi tên với điểm nhớ cùng index.
  const scoreByName = new Map();

  for (let index = 0; index < name.length; index++) {
    scoreByName.set(name[index], yearning[index]);
  }

  // Bước 2: Tính độc lập tổng điểm cho từng ảnh.
  return photo.map((people) => {
    let total = 0;

    for (const person of people) {
      // Tên không có trong Map đóng góp 0 điểm.
      total += scoreByName.get(person) ?? 0;
    }

    return total;
  });
}
```

**Complexity:** `O(n + tổng số tên trong ảnh)` time, `O(n)` space. **Bẫy:** gọi `name.indexOf(person)` cho mọi người trong mọi ảnh.

## PK-M03 — Chọn quýt

```js
function minTangerineKinds(k, tangerine) {
  // Bước 1: Đếm mỗi kích thước có bao nhiêu quả.
  const countBySize = new Map();

  for (const size of tangerine) {
    countBySize.set(size, (countBySize.get(size) ?? 0) + 1);
  }

  // Bước 2: Lấy các nhóm đông nhất trước để dùng ít loại nhất.
  const counts = [...countBySize.values()].sort((a, b) => b - a);

  let selected = 0;
  let kindCount = 0;

  // Bước 3: Cộng cả nhóm cho đến khi đủ ít nhất k quả.
  for (const count of counts) {
    selected += count;
    kindCount++;

    if (selected >= k) {
      return kindCount;
    }
  }

  return kindCount;
}
```

**Đúng vì:** nếu dùng một nhóm nhỏ trước nhóm lớn, đổi sang nhóm lớn không tăng số loại và không giảm số quả; do đó greedy theo count giảm dần tối ưu. **Complexity:** `O(n + u log u)`.

## PK-M04 — Chia bánh cuộn

```js
function countFairRollCakeCuts(topping) {
  // leftTypes chỉ cần membership; rightCount cần multiplicity để xóa đúng lúc.
  const leftTypes = new Set();
  const rightCount = new Map();

  // Bước 1: Ban đầu toàn bộ topping nằm bên phải nhát cắt.
  for (const type of topping) {
    rightCount.set(type, (rightCount.get(type) ?? 0) + 1);
  }

  let fairCutCount = 0;

  // Bước 2: Chỉ xét n - 1 vị trí để hai phần đều không rỗng.
  for (let index = 0; index < topping.length - 1; index++) {
    const type = topping[index];

    // Di chuyển topping hiện tại từ phải sang trái.
    leftTypes.add(type);
    const newRightCount = rightCount.get(type) - 1;

    if (newRightCount === 0) {
      rightCount.delete(type); // size phải phản ánh số loại còn lại.
    } else {
      rightCount.set(type, newRightCount);
    }

    // Bước 3: So số loại, không so tổng số miếng topping.
    if (leftTypes.size === rightCount.size) {
      fairCutCount++;
    }
  }

  return fairCutCount;
}
```

**Complexity:** `O(n)` time, `O(u)` space. **Bẫy:** set count bằng 0 nhưng không delete, làm `Map.size` sai.

## PK-M05 — Sự kiện giảm giá

```js
function countDiscountStartDays(want, number, discount) {
  // Bước 1: Dựng nhu cầu product -> count.
  const required = new Map();
  for (let index = 0; index < want.length; index++) {
    required.set(want[index], number[index]);
  }

  const windowCount = new Map();
  const windowSize = 10;

  // Helper update đối xứng cho cả add (+1) và remove (-1).
  function changeCount(product, delta) {
    const newCount = (windowCount.get(product) ?? 0) + delta;
    if (newCount === 0) windowCount.delete(product);
    else windowCount.set(product, newCount);
  }

  // Helper kiểm tra cửa sổ hiện tại có đúng mọi nhu cầu không.
  function satisfiesAllRequirements() {
    for (const [product, neededCount] of required) {
      if ((windowCount.get(product) ?? 0) !== neededCount) {
        return false;
      }
    }
    return true;
  }

  // Bước 2: Tạo cửa sổ 10 ngày đầu.
  for (let index = 0; index < windowSize; index++) {
    changeCount(discount[index], 1);
  }

  let answer = satisfiesAllRequirements() ? 1 : 0;

  // Bước 3: Trượt cửa sổ; thêm bên phải và bỏ bên trái.
  for (let right = windowSize; right < discount.length; right++) {
    changeCount(discount[right], 1);
    changeCount(discount[right - windowSize], -1);

    if (satisfiesAllRequirements()) {
      answer++;
    }
  }

  return answer;
}
```

**Complexity:** `O(discount.length * want.length)`; `want.length <= 10` nên xem như tuyến tính. **Bẫy:** chỉ add mà không remove; so thiếu sản phẩm ngoài danh sách (tổng nhu cầu đã cố định bằng 10 nên kiểm tra required là đủ).

## PK-M06 — Nối từ tiếng Anh

```js
function findWordChainFailure(n, words) {
  // Từ đầu tiên luôn được chấp nhận và trở thành lịch sử ban đầu.
  const spoken = new Set([words[0]]);

  for (let index = 1; index < words.length; index++) {
    const previous = words[index - 1];
    const current = words[index];

    const doesNotChain = previous.at(-1) !== current[0];
    const wasAlreadySpoken = spoken.has(current);

    // Bước 1: Check cả hai luật trước khi add current.
    if (doesNotChain || wasAlreadySpoken) {
      // Bước 2: Đổi index 0-based thành số người và số lượt 1-based.
      const person = (index % n) + 1;
      const turn = Math.floor(index / n) + 1;
      return [person, turn];
    }

    // Bước 3: Chỉ từ hợp lệ mới được thêm vào lịch sử.
    spoken.add(current);
  }

  return [0, 0];
}
```

**Complexity:** `O(w)` time, `O(w)` space. **Bẫy:** add trước has; công thức người/lượt bị lệch 1.

## PK-M07 — Tuple

```js
function restoreTuple(s) {
  // Bước 1: Lấy nội dung từng tập con giữa cặp ngoặc đơn.
  // Regex chỉ lấy chuỗi số và dấu phẩy, bỏ hai lớp ngoặc ngoài.
  const groups = s
    .slice(2, -2)
    .split("},{")
    .map((group) => group.split(",").map(Number));

  // Bước 2: Tập ngắn hơn cho biết phần tử xuất hiện sớm hơn trong tuple.
  groups.sort((a, b) => a.length - b.length);

  const seen = new Set();
  const answer = [];

  // Bước 3: Mỗi group dài hơn có đúng một phần tử chưa thấy.
  for (const group of groups) {
    for (const value of group) {
      if (!seen.has(value)) {
        seen.add(value);
        answer.push(value);
      }
    }
  }

  return answer;
}
```

**Complexity:** `O(T log T + tổng số phần tử)` với `T` tập con. **Bẫy:** dựa vào thứ tự tập con trong chuỗi trước khi sort.

## PK-M08 — Phòng chat mở

```js
function buildOpenChatMessages(record) {
  // latestNicknameById luôn giữ nickname mới nhất đã biết của mỗi uid.
  const latestNicknameById = new Map();
  const messageEvents = [];

  // Bước 1: Parse record, cập nhật nickname và chỉ lưu event cần in.
  for (const line of record) {
    const [command, userId, nickname] = line.split(" ");

    if (command === "Enter") {
      latestNicknameById.set(userId, nickname);
      messageEvents.push(["Enter", userId]);
    } else if (command === "Leave") {
      messageEvents.push(["Leave", userId]);
    } else if (command === "Change") {
      latestNicknameById.set(userId, nickname);
    }
  }

  // Bước 2: Sau khi biết nickname cuối cùng, render mọi event.
  return messageEvents.map(([command, userId]) => {
    const nickname = latestNicknameById.get(userId);
    return command === "Enter"
      ? `${nickname}님이 들어왔습니다.`
      : `${nickname}님이 나갔습니다.`;
  });
}
```

**Complexity:** `O(n)` time/space. **Bẫy:** tạo câu ngay lượt đầu khiến câu cũ giữ nickname cũ; lưu `Change` thành một message.

## PK-M09 — Nhận kết quả báo cáo

```js
function countReportEmails(idList, report, k) {
  // reportersByTarget: người bị báo -> Set người báo khác nhau.
  const reportersByTarget = new Map();

  // Bước 1: Set tự loại các báo cáo trùng cùng cặp.
  for (const line of report) {
    const [reporter, target] = line.split(" ");

    if (!reportersByTarget.has(target)) {
      reportersByTarget.set(target, new Set());
    }
    reportersByTarget.get(target).add(reporter);
  }

  // Bước 2: Map id -> index để tăng đúng ô đáp án trong O(1).
  const indexById = new Map();
  for (let index = 0; index < idList.length; index++) {
    indexById.set(idList[index], index);
  }

  const emailCount = Array(idList.length).fill(0);

  // Bước 3: Chỉ người đạt ngưỡng k mới tạo email cho các reporter.
  for (const reporters of reportersByTarget.values()) {
    if (reporters.size < k) continue;

    for (const reporter of reporters) {
      emailCount[indexById.get(reporter)]++;
    }
  }

  return emailCount;
}
```

**Complexity:** `O(report + idList)` trung bình. **Bẫy:** dùng array reporter làm trùng email; đếm tổng report thay vì số reporter khác nhau.

## PK-M10 — Tính phí đỗ xe

```js
function calculateParkingFees(fees, records) {
  const [baseTime, baseFee, unitTime, unitFee] = fees;

  // inTimeByCar: xe đang ở trong bãi -> phút đi vào gần nhất.
  const inTimeByCar = new Map();

  // totalMinutesByCar: xe -> tổng phút đã chốt qua các cặp IN/OUT.
  const totalMinutesByCar = new Map();

  function toMinutes(timeText) {
    const [hour, minute] = timeText.split(":").map(Number);
    return hour * 60 + minute;
  }

  // Bước 1: Ghép từng OUT với IN gần nhất của cùng biển số.
  for (const record of records) {
    const [timeText, carNumber, action] = record.split(" ");
    const time = toMinutes(timeText);

    if (action === "IN") {
      inTimeByCar.set(carNumber, time);
    } else {
      const parkedMinutes = time - inTimeByCar.get(carNumber);
      const oldTotal = totalMinutesByCar.get(carNumber) ?? 0;
      totalMinutesByCar.set(carNumber, oldTotal + parkedMinutes);
      inTimeByCar.delete(carNumber);
    }
  }

  // Bước 2: Xe chưa OUT được chốt tại 23:59.
  const endOfDay = 23 * 60 + 59;
  for (const [carNumber, inTime] of inTimeByCar) {
    const oldTotal = totalMinutesByCar.get(carNumber) ?? 0;
    totalMinutesByCar.set(carNumber, oldTotal + endOfDay - inTime);
  }

  // Bước 3: Sort biển số tăng dần rồi áp công thức phí.
  return [...totalMinutesByCar.keys()]
    .sort()
    .map((carNumber) => {
      const total = totalMinutesByCar.get(carNumber);
      if (total <= baseTime) return baseFee;

      const extraUnits = Math.ceil((total - baseTime) / unitTime);
      return baseFee + extraUnits * unitFee;
    });
}
```

**Complexity:** `O(n + c log c)`. **Bẫy:** tính phí từng lần ra thay vì trên tổng ngày; dùng `floor` thay `ceil`; quên xe chưa OUT.

## PK-M11 — Mua đá quý

```js
function shortestGemRange(gems) {
  // Bước 1: targetTypeCount là số loại mà cửa sổ phải chứa.
  const targetTypeCount = new Set(gems).size;
  const windowCount = new Map();

  let left = 0;
  let bestLeft = 0;
  let bestRight = gems.length - 1;

  // Bước 2: Mở rộng right để đưa đá mới vào cửa sổ.
  for (let right = 0; right < gems.length; right++) {
    const rightGem = gems[right];
    windowCount.set(rightGem, (windowCount.get(rightGem) ?? 0) + 1);

    // Bước 3: Khi đã đủ loại, co left hết mức có thể.
    while (windowCount.size === targetTypeCount) {
      const currentLength = right - left;
      const bestLength = bestRight - bestLeft;

      // Chỉ thay khi ngắn hơn; tie giữ đoạn bắt đầu sớm đã gặp trước.
      if (currentLength < bestLength) {
        bestLeft = left;
        bestRight = right;
      }

      const leftGem = gems[left];
      const newCount = windowCount.get(leftGem) - 1;

      if (newCount === 0) windowCount.delete(leftGem);
      else windowCount.set(leftGem, newCount);

      left++;
    }
  }

  // Programmers yêu cầu index 1-based và end inclusive.
  return [bestLeft + 1, bestRight + 1];
}
```

**Invariant:** `windowCount` mô tả chính xác `gems[left..right]`. **Complexity:** `O(n)` vì mỗi đầu mút chỉ đi sang phải. **Bẫy:** không delete count 0; trả index 0-based; cập nhật tie sai.

## PK-M12 — Khóa ứng viên

```js
function countCandidateKeys(relation) {
  const rowCount = relation.length;
  const columnCount = relation[0].length;
  const candidateMasks = [];

  // Bước 1: Duyệt mọi tập cột khác rỗng bằng bitmask.
  for (let mask = 1; mask < 1 << columnCount; mask++) {
    // Bước 2: Minimality — nếu mask chứa một candidate cũ thì bỏ.
    const containsSmallerKey = candidateMasks.some(
      (candidateMask) => (mask & candidateMask) === candidateMask,
    );
    if (containsSmallerKey) continue;

    // Bước 3: Chiếu từng hàng lên các cột trong mask.
    const projectedRows = new Set();

    for (const row of relation) {
      const projection = [];

      for (let column = 0; column < columnCount; column++) {
        if (mask & (1 << column)) {
          projection.push(row[column]);
        }
      }

      // JSON.stringify tránh va chạm kiểu nối chuỗi thiếu delimiter.
      projectedRows.add(JSON.stringify(projection));
    }

    // Bước 4: Đủ số chữ ký bằng số hàng => unique.
    if (projectedRows.size === rowCount) {
      candidateMasks.push(mask);
    }
  }

  return candidateMasks.length;
}
```

**Complexity:** `O(2^C * R * C)`, phù hợp vì `C` nhỏ. **Bẫy:** chỉ kiểm tra unique mà quên minimality; nối value không có cấu trúc gây collision.

## PK-M13 — Người dùng bị cấm

```js
function countBannedUserSets(userIds, bannedIds) {
  // Hai chuỗi match khi cùng length và mỗi vị trí bằng nhau hoặc pattern là *.
  function matches(userId, pattern) {
    if (userId.length !== pattern.length) return false;

    for (let index = 0; index < userId.length; index++) {
      if (pattern[index] !== "*" && pattern[index] !== userId[index]) {
        return false;
      }
    }
    return true;
  }

  // Bước 1: Tính trước danh sách user index phù hợp cho mỗi pattern.
  const candidatesByPattern = bannedIds.map((pattern) => {
    const candidates = [];
    for (let index = 0; index < userIds.length; index++) {
      if (matches(userIds[index], pattern)) candidates.push(index);
    }
    return candidates;
  });

  const usedIndexes = new Set();
  const completedSets = new Set();

  function dfs(patternIndex) {
    // Bước 2: Đã gán đủ pattern; chuẩn hóa tập để loại thứ tự gán.
    if (patternIndex === bannedIds.length) {
      const signature = [...usedIndexes].sort((a, b) => a - b).join(",");
      completedSets.add(signature);
      return;
    }

    // Bước 3: Thử từng user chưa dùng phù hợp với pattern hiện tại.
    for (const userIndex of candidatesByPattern[patternIndex]) {
      if (usedIndexes.has(userIndex)) continue;

      usedIndexes.add(userIndex);     // choose
      dfs(patternIndex + 1);          // explore
      usedIndexes.delete(userIndex);  // unchoose
    }
  }

  dfs(0);
  return completedSets.size;
}
```

**Complexity:** xấu nhất gần `O(U^B)`, nhưng `U,B <= 8`. **Bẫy:** đếm permutation như các đáp án khác nhau; dùng cùng user cho hai pattern.

## PK-M14 — Ghép tin tức

```js
function newsClusteringScore(str1, str2) {
  function buildBigramCounts(text) {
    const normalized = text.toUpperCase();
    const counts = new Map();

    for (let index = 0; index + 1 < normalized.length; index++) {
      const pair = normalized.slice(index, index + 2);

      // Chỉ nhận đúng hai chữ cái A-Z.
      if (!/^[A-Z]{2}$/.test(pair)) continue;

      counts.set(pair, (counts.get(pair) ?? 0) + 1);
    }

    return counts;
  }

  const countA = buildBigramCounts(str1);
  const countB = buildBigramCounts(str2);

  // Bước 1: Duyệt hợp các key để không bỏ cặp chỉ có ở một phía.
  const allPairs = new Set([...countA.keys(), ...countB.keys()]);
  let intersectionSize = 0;
  let unionSize = 0;

  // Bước 2: Với multiset, giao lấy min và hợp lấy max multiplicity.
  for (const pair of allPairs) {
    const a = countA.get(pair) ?? 0;
    const b = countB.get(pair) ?? 0;
    intersectionSize += Math.min(a, b);
    unionSize += Math.max(a, b);
  }

  // Bước 3: Hai multiset rỗng được định nghĩa similarity bằng 1.
  if (unionSize === 0) return 65536;
  return Math.floor((intersectionSize / unionSize) * 65536);
}
```

**Bẫy:** dùng Set làm mất số bản sao; nhận cặp có số/khoảng trắng; quên uppercase. **Complexity:** `O(str1.length + str2.length)` trung bình.

## PK-M15 — Hạn dữ liệu cá nhân

```js
function findExpiredPrivacies(today, terms, privacies) {
  // Quy đổi YYYY.MM.DD thành trục ngày giả định: mỗi năm 12 tháng, mỗi tháng 28 ngày.
  function toSerialDay(dateText) {
    const [year, month, day] = dateText.split(".").map(Number);
    return year * 12 * 28 + (month - 1) * 28 + (day - 1);
  }

  // Bước 1: Map loại điều khoản -> số tháng hiệu lực.
  const monthsByTerm = new Map();
  for (const term of terms) {
    const [type, monthsText] = term.split(" ");
    monthsByTerm.set(type, Number(monthsText));
  }

  const todayDay = toSerialDay(today);
  const expiredIndexes = [];

  // Bước 2: Ngày hết hiệu lực = ngày thu thập + số tháng * 28.
  for (let index = 0; index < privacies.length; index++) {
    const [startDate, type] = privacies[index].split(" ");
    const expirationDay =
      toSerialDay(startDate) + monthsByTerm.get(type) * 28;

    // Tại đúng expirationDay, dữ liệu đã hết hạn.
    if (todayDay >= expirationDay) {
      expiredIndexes.push(index + 1);
    }
  }

  return expiredIndexes;
}
```

**Complexity:** `O(terms + privacies)`. **Bẫy:** dùng Date thật dù đề quy ước tháng 28 ngày; sai dấu `>=`; quên index 1-based.

## PCCP-MS01 — Tìm nguy cơ va chạm

```js
function countCollisionRisks(points, routes) {
  // Bước 1: Map point id 1-based sang tọa độ để lookup dễ đọc.
  const coordinateByPointId = new Map();
  for (let index = 0; index < points.length; index++) {
    coordinateByPointId.set(index + 1, points[index]);
  }

  // countByTimeAndPosition: "time|row|col" -> số robot có mặt.
  const countByTimeAndPosition = new Map();
  let dangerCount = 0;

  function recordPosition(time, row, col) {
    const key = `${time}|${row}|${col}`;
    const newCount = (countByTimeAndPosition.get(key) ?? 0) + 1;
    countByTimeAndPosition.set(key, newCount);

    // Chỉ lúc 1 -> 2 mới xuất hiện một ô-thời gian nguy hiểm mới.
    // Robot thứ 3 vẫn thuộc cùng một nguy cơ, không tăng thêm.
    if (newCount === 2) dangerCount++;
  }

  // Bước 2: Mô phỏng độc lập đường đi của mỗi robot.
  for (const route of routes) {
    let [row, col] = coordinateByPointId.get(route[0]);
    let time = 0;
    recordPosition(time, row, col);

    for (let routeIndex = 1; routeIndex < route.length; routeIndex++) {
      const [targetRow, targetCol] = coordinateByPointId.get(
        route[routeIndex],
      );

      // Bước 3: Theo luật đề, thay đổi hàng cho đến khi khớp trước.
      while (row !== targetRow) {
        row += row < targetRow ? 1 : -1;
        time++;
        recordPosition(time, row, col);
      }

      // Bước 4: Sau đó mới thay đổi cột.
      while (col !== targetCol) {
        col += col < targetCol ? 1 : -1;
        time++;
        recordPosition(time, row, col);
      }
    }
  }

  return dangerCount;
}
```

**Complexity:** `O(tổng số bước của mọi robot)` time/space. **Bẫy:** đếm cặp robot thay vì đếm vị trí-thời gian; quên vị trí lúc `time=0`; đi cột trước hàng.

## PCCP-MS02 — Khai thác dầu

```js
function maxOilFromOneColumn(land) {
  const rows = land.length;
  const cols = land[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const oilByColumn = Array(cols).fill(0);
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // Bước 1: Mỗi BFS tìm trọn một mỏ dầu đúng một lần.
  for (let startRow = 0; startRow < rows; startRow++) {
    for (let startCol = 0; startCol < cols; startCol++) {
      if (land[startRow][startCol] === 0 || visited[startRow][startCol]) {
        continue;
      }

      const queue = [[startRow, startCol]];
      let head = 0;
      let componentSize = 0;
      const touchedColumns = new Set();
      visited[startRow][startCol] = true;

      while (head < queue.length) {
        const [row, col] = queue[head++];
        componentSize++;
        touchedColumns.add(col);

        for (const [dr, dc] of directions) {
          const nextRow = row + dr;
          const nextCol = col + dc;
          const isInside =
            nextRow >= 0 &&
            nextRow < rows &&
            nextCol >= 0 &&
            nextCol < cols;

          if (
            isInside &&
            land[nextRow][nextCol] === 1 &&
            !visited[nextRow][nextCol]
          ) {
            // Mark khi enqueue để một ô không bị đưa vào queue nhiều lần.
            visited[nextRow][nextCol] = true;
            queue.push([nextRow, nextCol]);
          }
        }
      }

      // Bước 2: Cộng cả mỏ đúng một lần cho mỗi cột nó chạm.
      for (const col of touchedColumns) {
        oilByColumn[col] += componentSize;
      }
    }
  }

  // Bước 3: Chọn cột khoan thu được tổng dầu lớn nhất.
  return Math.max(...oilByColumn);
}
```

**Complexity:** `O(rows * cols)` time, `O(rows * cols)` space. **Bẫy:** cộng theo từng ô làm một mỏ bị tính nhiều lần trong cùng cột; BFS lại cho từng cột; dùng `shift()` khiến queue chậm.

## PCCP-MS03 — Khôi phục biểu thức

```js
function restoreUnknownExpressions(expressions) {
  // Parse "A + B = C" thành object để không split lặp lại.
  const parsed = expressions.map((expression) => {
    const [left, operator, right, , result] = expression.split(" ");
    return { expression, left, operator, right, result };
  });

  // Bước 1: Cơ số phải lớn hơn mọi chữ số xuất hiện trong input.
  let largestDigit = 0;
  for (const expression of expressions) {
    for (const character of expression) {
      if (/\d/.test(character)) {
        largestDigit = Math.max(largestDigit, Number(character));
      }
    }
  }

  // Tính biểu thức trong một base và trả kết quả hệ 10.
  function evaluate(item, base) {
    const leftValue = Number.parseInt(item.left, base);
    const rightValue = Number.parseInt(item.right, base);
    return item.operator === "+"
      ? leftValue + rightValue
      : leftValue - rightValue;
  }

  // Bước 2: Thử mọi base 2..9 hợp lệ về chữ số.
  const candidateBases = [];
  for (let base = Math.max(2, largestDigit + 1); base <= 9; base++) {
    let isValid = true;

    // Bước 3: Base phải làm đúng mọi biểu thức có đáp án đã biết.
    for (const item of parsed) {
      if (item.result === "X") continue;

      const expectedDecimal = Number.parseInt(item.result, base);
      if (evaluate(item, base) !== expectedDecimal) {
        isValid = false;
        break;
      }
    }

    if (isValid) candidateBases.push(base);
  }

  // Bước 4: Khôi phục từng biểu thức X bằng tất cả base còn lại.
  return parsed
    .filter((item) => item.result === "X")
    .map((item) => {
      const possibleResults = new Set();

      for (const base of candidateBases) {
        const decimalResult = evaluate(item, base);
        possibleResults.add(decimalResult.toString(base));
      }

      // Chỉ một chuỗi kết quả ở mọi base => xác định được duy nhất.
      const restored =
        possibleResults.size === 1 ? [...possibleResults][0] : "?";

      return `${item.left} ${item.operator} ${item.right} = ${restored}`;
    });
}
```

**Complexity:** tối đa 8 cơ số × số biểu thức, tức `O(n)`. **Bẫy:** chỉ thử một base; quên chữ số trong kết quả đã biết khi tính base nhỏ nhất; so kết quả hệ 10 thay vì chuỗi biểu diễn trong từng base.

---

## PK-X01 — Tìm số nguyên tố

```js
function countPrimePermutations(numbers) {
  const digits = [...numbers];
  const used = Array(digits.length).fill(false);
  const generatedNumbers = new Set();

  // Bước 1: DFS tạo mọi chuỗi có độ dài từ 1 đến numbers.length.
  function generate(currentText) {
    if (currentText.length > 0) {
      // Number tự bỏ số 0 đầu; Set loại các kết quả số học trùng nhau.
      generatedNumbers.add(Number(currentText));
    }

    for (let index = 0; index < digits.length; index++) {
      if (used[index]) continue;

      used[index] = true;
      generate(currentText + digits[index]);
      used[index] = false;
    }
  }

  // Bước 2: Kiểm tra prime đến căn bậc hai.
  function isPrime(value) {
    if (value < 2) return false;

    for (let divisor = 2; divisor * divisor <= value; divisor++) {
      if (value % divisor === 0) return false;
    }
    return true;
  }

  generate("");

  // Bước 3: Đếm các giá trị khác nhau thỏa primality.
  let answer = 0;
  for (const value of generatedNumbers) {
    if (isPrime(value)) answer++;
  }
  return answer;
}
```

**Complexity:** số permutation tối đa nhỏ vì chuỗi dài không quá 7; primality `O(sqrt(value))`. **Bẫy:** đếm cùng số nhiều lần khi có chữ số lặp hoặc số 0 đầu.

## PK-X02 — Áo thể dục

```js
function maxStudentsWithUniform(n, lost, reserve) {
  const lostSet = new Set(lost);
  const reserveSet = new Set(reserve);

  // Bước 1: Người vừa mất vừa có dự phòng phải dùng áo cho chính mình.
  for (const student of reserve) {
    if (lostSet.has(student)) {
      lostSet.delete(student);
      reserveSet.delete(student);
    }
  }

  // Bước 2: Xử lý học sinh mất áo theo thứ tự tăng dần.
  // Ưu tiên người bên trái để tránh chặn cơ hội của học sinh kế tiếp.
  const orderedLost = [...lostSet].sort((a, b) => a - b);

  for (const student of orderedLost) {
    if (reserveSet.has(student - 1)) {
      reserveSet.delete(student - 1);
      lostSet.delete(student);
    } else if (reserveSet.has(student + 1)) {
      reserveSet.delete(student + 1);
      lostSet.delete(student);
    }
  }

  // Bước 3: Chỉ những người còn trong lostSet không có áo.
  return n - lostSet.size;
}
```

**Complexity:** `O(l log l)` do sort lost. **Bẫy:** không loại giao lost/reserve; một áo cho hai người; duyệt lost không có thứ tự.

## PK-X03 — Biểu diễn bằng N

```js
function minNUsage(N, number) {
  // dp[count] chứa mọi giá trị tạo được bằng đúng count chữ số N.
  const dp = Array.from({ length: 9 }, () => new Set());

  for (let count = 1; count <= 8; count++) {
    // Bước 1: Thêm số ghép N, NN, NNN...
    dp[count].add(Number(String(N).repeat(count)));

    // Bước 2: Chia count thành leftCount + rightCount.
    for (let leftCount = 1; leftCount < count; leftCount++) {
      const rightCount = count - leftCount;

      for (const left of dp[leftCount]) {
        for (const right of dp[rightCount]) {
          dp[count].add(left + right);
          dp[count].add(left - right);
          dp[count].add(left * right);

          // Tránh chia 0; Math.trunc đúng phép chia lấy phần nguyên.
          if (right !== 0) {
            dp[count].add(Math.trunc(left / right));
          }
        }
      }
    }

    // Bước 3: count tăng dần nên lần đầu thấy number là tối thiểu.
    if (dp[count].has(number)) return count;
  }

  return -1;
}
```

**Complexity:** phụ thuộc số state khác nhau trong các Set, giới hạn 8 tầng. **Bẫy:** dùng một Set chung làm mất số lần dùng N; quên phép nối; chia cho 0.

## PK-X04 — Hành trình du lịch

```js
function buildTravelRoute(tickets) {
  // Bước 1: Gom các đích đến theo sân bay xuất phát.
  const destinationsByAirport = new Map();

  for (const [from, to] of tickets) {
    if (!destinationsByAirport.has(from)) {
      destinationsByAirport.set(from, []);
    }
    destinationsByAirport.get(from).push(to);
  }

  // Sort giảm dần để pop() lấy đích từ điển nhỏ nhất trong O(1).
  for (const destinations of destinationsByAirport.values()) {
    destinations.sort((a, b) => b.localeCompare(a));
  }

  // Bước 2: Hierholzer — đi sâu khi còn vé; hết vé mới chốt sân bay.
  const stack = ["ICN"];
  const reversedRoute = [];

  while (stack.length > 0) {
    const airport = stack.at(-1);
    const destinations = destinationsByAirport.get(airport);

    if (destinations && destinations.length > 0) {
      stack.push(destinations.pop()); // dùng đúng một ticket
    } else {
      reversedRoute.push(stack.pop());
    }
  }

  // Bước 3: Route được chốt từ cuối về đầu nên cần reverse.
  return reversedRoute.reverse();
}
```

**Complexity:** `O(E log E)` do sort các cạnh. **Bẫy:** greedy chọn sân bay nhỏ nhất rồi không backtrack; dùng Set cho ticket làm mất vé trùng.

## PK-X05 — Ghép mảnh puzzle

```js
function fillPuzzleBoard(gameBoard, table) {
  const size = gameBoard.length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // Bước 1: Trích mọi component có targetValue khỏi một board.
  function extractShapes(board, targetValue) {
    const visited = Array.from({ length: size }, () => Array(size).fill(false));
    const shapes = [];

    for (let startRow = 0; startRow < size; startRow++) {
      for (let startCol = 0; startCol < size; startCol++) {
        if (board[startRow][startCol] !== targetValue || visited[startRow][startCol]) {
          continue;
        }

        const queue = [[startRow, startCol]];
        const cells = [];
        let head = 0;
        visited[startRow][startCol] = true;

        while (head < queue.length) {
          const [row, col] = queue[head++];
          cells.push([row, col]);

          for (const [dr, dc] of directions) {
            const nextRow = row + dr;
            const nextCol = col + dc;
            const isInside =
              nextRow >= 0 && nextRow < size && nextCol >= 0 && nextCol < size;

            if (
              isInside &&
              !visited[nextRow][nextCol] &&
              board[nextRow][nextCol] === targetValue
            ) {
              visited[nextRow][nextCol] = true;
              queue.push([nextRow, nextCol]);
            }
          }
        }

        shapes.push(cells);
      }
    }
    return shapes;
  }

  // Đưa shape về góc (0,0), sort tọa độ rồi serialize.
  function normalize(cells) {
    const minRow = Math.min(...cells.map(([row]) => row));
    const minCol = Math.min(...cells.map(([, col]) => col));
    return cells
      .map(([row, col]) => [row - minRow, col - minCol])
      .sort((a, b) => a[0] - b[0] || a[1] - b[1])
      .map(([row, col]) => `${row},${col}`)
      .join(";");
  }

  // Bước 2: Sinh bốn phép xoay; chọn signature nhỏ nhất làm canonical key.
  function canonicalSignature(originalCells) {
    let cells = originalCells.map(([row, col]) => [row, col]);
    const signatures = [];

    for (let rotation = 0; rotation < 4; rotation++) {
      signatures.push(normalize(cells));
      cells = cells.map(([row, col]) => [col, -row]);
    }

    signatures.sort();
    return signatures[0];
  }

  const holes = extractShapes(gameBoard, 0);
  const pieces = extractShapes(table, 1);

  // Bước 3: Đếm số mảnh sẵn có theo canonical shape.
  const pieceCountByShape = new Map();
  for (const piece of pieces) {
    const key = canonicalSignature(piece);
    pieceCountByShape.set(key, (pieceCountByShape.get(key) ?? 0) + 1);
  }

  // Bước 4: Ghép mỗi lỗ với đúng một mảnh cùng key.
  let filledCellCount = 0;
  for (const hole of holes) {
    const key = canonicalSignature(hole);
    const availableCount = pieceCountByShape.get(key) ?? 0;

    if (availableCount > 0) {
      filledCellCount += hole.length;
      pieceCountByShape.set(key, availableCount - 1);
    }
  }

  return filledCellCount;
}
```

**Complexity:** BFS tuyến tính theo số ô; canonicalization sort tọa độ từng component. **Bẫy:** chỉ so một hướng xoay; dùng bounding box mà không so chính xác shape; dùng một mảnh nhiều lần.

## PK-X06 — Đếm số phòng

```js
function countRooms(arrows) {
  const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
  const dc = [0, 1, 1, 1, 0, -1, -1, -1];

  let row = 0;
  let col = 0;
  let roomCount = 0;

  const visitedVertices = new Set(["0,0"]);
  const visitedEdges = new Set();

  function vertexKey(r, c) {
    return `${r},${c}`;
  }

  // Cạnh vô hướng: A->B và B->A phải có cùng key.
  function edgeKey(r1, c1, r2, c2) {
    const first = vertexKey(r1, c1);
    const second = vertexKey(r2, c2);
    return first < second ? `${first}|${second}` : `${second}|${first}`;
  }

  // Bước 1: Mỗi arrow đi hai nửa bước để bắt giao điểm đường chéo.
  for (const direction of arrows) {
    for (let halfStep = 0; halfStep < 2; halfStep++) {
      const nextRow = row + dr[direction];
      const nextCol = col + dc[direction];
      const nextVertex = vertexKey(nextRow, nextCol);
      const edge = edgeKey(row, col, nextRow, nextCol);

      // Bước 2: Đi cạnh mới tới đỉnh cũ sẽ khép đúng một cycle mới.
      if (visitedVertices.has(nextVertex) && !visitedEdges.has(edge)) {
        roomCount++;
      }

      // Bước 3: Commit cả đỉnh và cạnh rồi di chuyển.
      visitedVertices.add(nextVertex);
      visitedEdges.add(edge);
      row = nextRow;
      col = nextCol;
    }
  }

  return roomCount;
}
```

**Complexity:** `O(arrows.length)` time/space. **Bẫy:** chỉ lưu đỉnh mà không lưu cạnh; đếm lại khi đi trên cạnh cũ; không nhân đôi bước nên bỏ giao điểm hai đường chéo.

---

## Bảng recall cuối bộ

| Dấu hiệu trong đề | State nên nghĩ tới |
| --- | --- |
| đã thấy, không trùng, visited | `Set` |
| số lần xuất hiện | `Map<key,count>` |
| tra thuộc tính theo tên/id | `Map<id,value>` |
| swap liên tục theo tên | array + `Map<name,index>` |
| group rồi sort | `Map<group,array>` + total Map |
| cửa sổ chứa đủ loại | `Map<value,count>` + delete khi count 0 |
| nhiều người liên hệ một đối tượng | `Map<target,Set<source>>` |
| trạng thái tổ hợp không quan tâm thứ tự | Set chữ ký chuẩn hóa |
| tọa độ + thời gian | Map key cấu trúc đã serialize |

Nếu code sai, đừng sửa ngẫu nhiên. Hãy viết lại một câu: “Sau vòng hiện tại, Map/Set đang chứa chính xác cái gì?” rồi kiểm tra từng update có duy trì câu đó không.
