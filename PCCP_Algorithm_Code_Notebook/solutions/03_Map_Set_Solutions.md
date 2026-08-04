# Lời giải — 03 Map và Set

> Chỉ mở sau khi đã lưu nỗ lực. [Quay lại Practice Ladder](../chapters/03_map_set/03_Practice_Ladder.md).

Quy ước: dry run ngắn tập trung vào bước làm state đổi; với bài code, hãy tự trace thêm full input bằng bảng sáu cột.

## Tầng 1 — Nhận diện

### M03-R01 `[MAP-01]`

- **Tín hiệu nhận diện / Pattern:** “đã xuất hiện” → Set membership.
- **State / biến:** `seen` chứa mã ở prefix.
- **Check / Update:** `has(code)` trước `add(code)`.
- **Invariant:** đầu vòng, Set chứa đúng mã trước current.
- **Pseudocode:** scan; nếu có return true; thêm; hết vòng false.
- **Full code:** `function hasRepeatedCode(codes) { const seen = new Set(); for (const code of codes) { if (seen.has(code)) return true; seen.add(code); } return false; }`
- **Dry run:** `[A,B,A]`: `{}`→`{A}`→`{A,B}`→gặp A, true.
- **Complexity:** `O(n)` time, `O(n)` space trung bình.
- **Bẫy / recall:** add trước check dùng chính current. Nhớ: **check old, add current**.

### M03-R02 `[MAP-02]`

- **Tín hiệu / Pattern:** duy nhất + giữ thứ tự → Set + output array.
- **State:** `seen`, `result`; Set không đủ vì còn phải trả representation theo order.
- **Check / Update:** absent → add và push.
- **Invariant:** result là các lần đầu trong prefix.
- **Pseudocode:** scan email; skip seen; add+push.
- **Full code:** `function uniqueEmails(values) { const seen = new Set(); const result = []; for (const value of values) { if (seen.has(value)) continue; seen.add(value); result.push(value); } return result; }`
- **Dry run:** `[a,b,a]`: `[]→[a]→[a,b]→skip`.
- **Complexity:** `O(n)`/`O(n)`.
- **Bẫy / recall:** normalize phải xảy ra trước check; add và push cùng nhánh.

### M03-R03 `[MAP-03]`

- **Tín hiệu / Pattern:** “bao nhiêu lần” → frequency Map.
- **State:** `countByItem`; key=item, value=count prefix.
- **Check / Update:** không cần branch; `old ?? 0`, set `old+1`.
- **Invariant:** count đúng prefix.
- **Pseudocode:** scan và increment.
- **Full code:** `function countItems(items) { const counts = new Map(); for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1); return counts; }`
- **Dry run:** `[x,x]`: `{}`→`x:1`→`x:2`.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** Set mất multiplicity; count bắt đầu 0.

### M03-R04 `[MAP-04]`

- **Tín hiệu / Pattern:** vị trí đầu tiên → Map conditional write.
- **State:** `firstIndexByName`; value=min index.
- **Check / Update:** nếu `!has(name)` mới set.
- **Invariant:** entry là index nhỏ nhất trong prefix.
- **Pseudocode:** scan index; absent thì set.
- **Full code:** `function firstIndexes(names) { const first = new Map(); for (let i = 0; i < names.length; i += 1) if (!first.has(names[i])) first.set(names[i], i); return first; }`
- **Dry run:** `[a,b,a]`: `a:0`, `b:1`, không ghi đè a.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** `get(a)=0` falsy; tồn tại phải dùng `has`.

### M03-R05 `[MAP-05]`

- **Tín hiệu / Pattern:** gần nhất → latest-index Map.
- **State:** key=value, value=index gần nhất bên trái.
- **Check / Update:** đọc old trước, luôn overwrite sau.
- **Invariant:** đầu vòng Map chứa latest trong prefix.
- **Pseudocode:** read; tạo output; set current index.
- **Full code:** `function previousIndexes(values) { const latest = new Map(); const out = []; for (let i = 0; i < values.length; i += 1) { const value = values[i]; out.push(latest.has(value) ? latest.get(value) : -1); latest.set(value, i); } return out; }`
- **Dry run:** `[a,a]`: push -1/set0; push0/set1.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** overwrite trước read cho output chính index hiện tại.

### M03-R06 `[MAP-06]`

- **Tín hiệu / Pattern:** min gap cùng value → latest index + global min.
- **State:** `latest`, `bestGap`.
- **Check / Update:** nếu present, minimize `i-latest`; rồi overwrite.
- **Invariant:** best là min gap trong prefix.
- **Pseudocode:** scan/read gap/min/set.
- **Full code:** `function minGap(values) { const latest = new Map(); let best = Infinity; for (let i = 0; i < values.length; i += 1) { const v = values[i]; if (latest.has(v)) best = Math.min(best, i - latest.get(v)); latest.set(v, i); } return best === Infinity ? -1 : best; }`
- **Dry run:** `[5,5]`: latest absent→0; gap1→best1.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** first index không đủ cho min gap của ba lần xuất hiện.

### M03-R07 `[MAP-07]`

- **Tín hiệu / Pattern:** cặp và phần bù xác định → complement Map.
- **State:** `indexByValue` của prefix.
- **Check / Update:** has(target-current), rồi set current.
- **Invariant:** Map không chứa current ở lúc check.
- **Pseudocode:** compute needed/check/return/set.
- **Full code:** `function pairSum(values, target) { const indexByValue = new Map(); for (let i = 0; i < values.length; i += 1) { const need = target - values[i]; if (indexByValue.has(need)) return [indexByValue.get(need), i]; indexByValue.set(values[i], i); } return [-1, -1]; }`
- **Dry run:** `[3,3],6`: i0 set 3→0; i1 finds 0.
- **Complexity:** `O(n)`/`O(n)`.
- **Bẫy / recall:** check trước set để hai index khác nhau.

### M03-R08 `[MAP-08]`

- **Tín hiệu / Pattern:** cùng số lần → compare frequency.
- **State:** remaining count từ chuỗi thứ nhất.
- **Check / Update:** char thứ hai phải có remaining>0, rồi decrement.
- **Invariant:** remaining là số bản sao chưa ghép.
- **Pseudocode:** length check; count left; consume right.
- **Full code:** `function sameChars(a, b) { if (a.length !== b.length) return false; const remaining = new Map(); for (const c of a) remaining.set(c, (remaining.get(c) ?? 0) + 1); for (const c of b) { const count = remaining.get(c) ?? 0; if (count === 0) return false; remaining.set(c, count - 1); } return true; }`
- **Dry run:** `aa/ab`: remaining a2; consume a→1; b missing→false.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** Set coi `aa` và `a` như nhau.

### M03-R09 `[MAP-09]`

- **Tín hiệu / Pattern:** gom và giữ records → Map key→array.
- **State:** array riêng cho mỗi initial.
- **Check / Update:** ensure group; push word.
- **Invariant:** group đúng prefix và giữ order.
- **Pseudocode:** derive key/create/push.
- **Full code:** `function groupWords(words) { const groups = new Map(); for (const word of words) { const key = word[0]; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(word); } return groups; }`
- **Dry run:** `ant,apple`: create a:[ant], then push apple.
- **Complexity:** `O(n)` + output.
- **Bẫy / recall:** count không giữ records; không dùng shared array.

### M03-R10 `[MAP-10]`

- **Tín hiệu / Pattern:** one-to-many khác nhau → Map key→Set.
- **State:** `coursesByUser`, mỗi value là Set riêng.
- **Check / Update:** ensure then `add(course)`.
- **Invariant:** Set là unique courses trong prefix.
- **Pseudocode:** scan pairs/create/add.
- **Full code:** `function coursesByUser(pairs) { const result = new Map(); for (const [user, course] of pairs) { if (!result.has(user)) result.set(user, new Set()); result.get(user).add(course); } return result; }`
- **Dry run:** `[u,c],[u,c]`: Set `{c}` không đổi ở lần hai.
- **Complexity:** `O(n)`/`O(number of unique pairs)`.
- **Bẫy / recall:** array giữ duplicate; mỗi user cần `new Set()` riêng.

### M03-R11 `[MAP-11]`

- **Tín hiệu / Pattern:** count rồi argmax có tie.
- **State:** `countByProduct`, `bestName`, `bestCount`.
- **Check / Update:** count cao hơn hoặc hòa và tên nhỏ hơn.
- **Invariant:** best đúng trong entries đã xét.
- **Pseudocode:** count; scan entries với comparator.
- **Full code:** `function mostBought(products) { if (products.length === 0) return null; const counts = new Map(); for (const p of products) counts.set(p, (counts.get(p) ?? 0) + 1); let best = null; let bestCount = -1; for (const [p, count] of counts) if (count > bestCount || (count === bestCount && p < best)) { best = p; bestCount = count; } return best; }`
- **Dry run:** `b:2` chọn b; `a:2` hòa và a<b nên đổi a.
- **Complexity:** `O(n+k)`/`O(k)`.
- **Bẫy / recall:** tie phải nằm trong condition, không để Map “tự chọn”.

### M03-R12 `[MAP-12]`

- **Tín hiệu / Pattern:** event theo id → Map + simulation.
- **State:** `balanceById` là state sau prefix events.
- **Check / Update:** bài này không có invalid; old mặc định 0 rồi set old+delta.
- **Invariant:** sau event i, balance đúng đến i.
- **Pseudocode:** scan event/read/update/return Map.
- **Full code:** `function finalBalances(events) { const balances = new Map(); for (const [, id, delta] of events) balances.set(id, (balances.get(id) ?? 0) + delta); return balances; }`
- **Dry run:** `u:+2,u:-1`: `0→2→1`.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** nếu có validation, compute next → check → commit.

## Tầng 2 — Điền khuyết

### M03-F01 `[MAP-03]`

- **Tín hiệu / Pattern:** frequency.
- **State / biến:** `countByValue`; `oldCount` là count trước current.
- **Check / Update:** không branch; mặc định `0`, gọi `set`, cộng `1`.
- **Invariant:** sau vòng, count đúng prefix.
- **Pseudocode:** get old default zero; set old+one.
- **Full code:**

```js
function frequencies(values) {
  const countByValue = new Map();
  for (const value of values) {
    const oldCount = countByValue.get(value) ?? 0;
    countByValue.set(value, oldCount + 1);
  }
  return countByValue;
}
```

- **Dry run:** `[x,x]`: old 0/set1; old1/set2.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** trả Map, không trả size. Nhớ `get ?? 0 → set +1`.

### M03-F02 `[MAP-04]`

- **Tín hiệu / Pattern:** first index.
- **State:** `firstIndexByValue`; index 0 là hợp lệ.
- **Check / Update:** `!firstIndexByValue.has(value)`; set `(value,index)`.
- **Invariant:** value là index nhỏ nhất.
- **Pseudocode:** scan; chỉ ghi nếu absent.
- **Full code:**

```js
function firstPositions(values) {
  const firstIndexByValue = new Map();
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!firstIndexByValue.has(value)) {
      firstIndexByValue.set(value, index);
    }
  }
  return firstIndexByValue;
}
```

- **Dry run:** `[a,a]`: set a→0; lần hai giữ 0.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** `!get(value)` sai với index 0.

### M03-F03 `[MAP-07]`

- **Tín hiệu / Pattern:** complement.
- **State:** prefix `indexByValue`.
- **Check / Update:** needed=`target-current`; `has(needed)`; return stored index; sau đó `set(current,index)`.
- **Invariant:** Map chỉ có index nhỏ hơn current.
- **Pseudocode:** compute/check/return/update.
- **Full code:**

```js
function twoSum(values, target) {
  const indexByValue = new Map();
  for (let index = 0; index < values.length; index += 1) {
    const currentValue = values[index];
    const neededValue = target - currentValue;
    if (indexByValue.has(neededValue)) {
      return [indexByValue.get(neededValue), index];
    }
    indexByValue.set(currentValue, index);
  }
  return [-1, -1];
}
```

- **Dry run:** `[4,4],8`: set at 0; find at 1.
- **Complexity:** `O(n)`/`O(n)`.
- **Bẫy / recall:** mọi blank đều phục vụ “check old before update current”.

## Tầng 3 — Dựng logic

### M03-L01 `[MAP-03]`

- **Tín hiệu / Pattern:** “xuất hiện đúng một lần” + “sớm nhất” → frequency rồi scan.
- **State / nghĩa biến:** Map char→total count; index vòng hai.
- **Check / Update:** lượt một increment; lượt hai check count===1.
- **Invariant:** sau lượt một có count toàn chuỗi; trong lượt hai, chưa có index trước current thỏa.
- **Pseudocode:** count chars; scan index; first count1 return; return -1.
- **Full code:** `function firstUniqueIndex(s) { const counts = new Map(); for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1); for (let i = 0; i < s.length; i += 1) if (counts.get(s[i]) === 1) return i; return -1; }`
- **Dry run:** `aab`: counts a2,b1; i0 no, i1 no, i2 return2.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** không thể kết luận unique ở lần gặp đầu vì còn suffix.

### M03-L02 `[MAP-05]`

- **Tín hiệu / Pattern:** lần gần nhất bên trái → latest index.
- **State:** Map value→latest index; output.
- **Check / Update:** has→push `i-latest`, else -1; luôn set latest=i.
- **Invariant:** đầu vòng Map là latest trong prefix.
- **Pseudocode:** scan/read distance/push/overwrite.
- **Full code:** `function previousDistances(values) { const latest = new Map(); const out = []; for (let i = 0; i < values.length; i += 1) { const v = values[i]; out.push(latest.has(v) ? i - latest.get(v) : -1); latest.set(v, i); } return out; }`
- **Dry run:** `[x,y,x]`: -1,-1,2.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** set trước push cho distance 0.

### M03-L03 `[MAP-09]`

- **Tín hiệu / Pattern:** group giữ toàn bộ record → Map→array.
- **State:** category→amount array.
- **Check / Update:** ensure array then push amount.
- **Invariant:** mỗi group là amounts của prefix theo order.
- **Pseudocode:** scan pair/create group/push/return.
- **Full code:** `function groupAmounts(rows) { const groups = new Map(); for (const [category, amount] of rows) { if (!groups.has(category)) groups.set(category, []); groups.get(category).push(amount); } return groups; }`
- **Dry run:** `[a,2],[a,5]`: a absent→[2]; present→[2,5].
- **Complexity:** `O(n)` plus output.
- **Bẫy / recall:** value phải là array, không phải total nếu contract giữ records.

## Tầng 4 — Pseudocode

### M03-P01 `[MAP-01]`

- **Tín hiệu / Pattern:** một giá trị thiếu trong miền → Set membership; cách tổng cũng có thể dùng.
- **State:** Set values; hoặc `expectedSum` và `actualSum`.
- **Check / Update:** Set: scan candidate `0..n`; return absent. Sum: compute `n(n+1)/2 - sum`.
- **Invariant:** Set chứa input; candidate đầu tiên absent là đáp án do thiếu đúng một. Với sum, difference là missing.
- **Pseudocode:** build Set → for candidate 0..n → if absent return.
- **Full code:** `function missingNumber(values) { const present = new Set(values); for (let candidate = 0; candidate <= values.length; candidate += 1) if (!present.has(candidate)) return candidate; }`
- **Dry run:** `[0,2]`: Set `{0,2}`; 0 present,1 absent→1.
- **Complexity:** Set `O(n)` time/space; sum `O(n)`/`O(1)` nhưng cần Number-safe bound.
- **Bẫy / recall:** vòng phải gồm `n`; cách sum cần đảm bảo integer ≤ `Number.MAX_SAFE_INTEGER`.

### M03-P02 `[MAP-10]`

- **Tín hiệu / Pattern:** quan hệ unique hai chiều → Map→Set.
- **State:** `friendsByPerson`.
- **Check / Update:** ensure Set cho a/b; add b vào a và a vào b.
- **Invariant:** sau mỗi pair, mọi edge prefix có đủ hai chiều đúng một lần.
- **Pseudocode:** helper add directed; mỗi pair gọi hai lần.
- **Full code:** `function friendships(pairs) { const map = new Map(); const add = (a,b) => { if (!map.has(a)) map.set(a,new Set()); map.get(a).add(b); }; for (const [a,b] of pairs) { add(a,b); add(b,a); } return map; }`
- **Dry run:** a-b hai lần: Sets vẫn size1.
- **Complexity:** `O(e)`/`O(v+e)` trung bình.
- **Bẫy / recall:** self-edge có được phép hay không phải theo contract; đề chưa cấm thì Set sẽ chứa chính nó.

### M03-P03 `[MAP-11, MAP-14]`

- **Tín hiệu / Pattern:** simulation score + argmax tie first.
- **State:** scoreByTeam, firstOrderByTeam, nextOrder; best ở lượt cuối.
- **Check / Update:** khi team absent, lưu order rồi score0; cộng delta. Lượt cuối compare score, rồi order nhỏ.
- **Invariant:** score đúng prefix; firstOrder bất biến sau lần đầu.
- **Pseudocode:** process events; assign first order; accumulate; scan keys choose `(score desc, order asc)`.
- **Full code:** `function winningTeam(events) { const scores=new Map(), order=new Map(); let next=0; for (const [team,delta] of events) { if (!scores.has(team)) { scores.set(team,0); order.set(team,next); next += 1; } scores.set(team,scores.get(team)+delta); } let best=null; for (const [team,score] of scores) if (best===null || score>scores.get(best) || (score===scores.get(best) && order.get(team)<order.get(best))) best=team; return best; }`
- **Dry run:** A+1,B+2,A+1→A2/B2; A order0 thắng.
- **Complexity:** `O(n+k)`/`O(k)`.
- **Bẫy / recall:** nếu Map key chưa bị delete/reinsert, iteration order đã là first order; lưu riêng làm tie rule minh bạch và bền khi mutation đổi.

## Tầng 5 — Tự code

### M03-C01 `[MAP-08]`

- **Tín hiệu / Pattern:** bằng nhau theo số lần → remaining frequency.
- **State:** `remaining` count required chưa ghép.
- **Check / Update:** length; count required; provided phải có old>0, decrement.
- **Invariant:** trước mỗi provided item, remaining đúng phần required chưa ghép.
- **Pseudocode:** length fail; build; consume; true.
- **Full code:**

```js
function hasBalancedFrequency(required, provided) {
  if (required.length !== provided.length) return false;
  const remaining = new Map();
  for (const value of required) {
    remaining.set(value, (remaining.get(value) ?? 0) + 1);
  }
  for (const value of provided) {
    const oldCount = remaining.get(value) ?? 0;
    if (oldCount === 0) return false;
    remaining.set(value, oldCount - 1);
  }
  return true;
}
```

- **Dry run:** required `a,a,b`; provided `b,a,a`: counts `{a2,b1}`→`b0`→`a1`→`a0`.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** Set sai với multiplicity; không decrement trước validation.

### M03-C02 `[MAP-06]`

- **Tín hiệu / Pattern:** min gap duplicate → latest index.
- **State:** Map latest; `bestGap`.
- **Check / Update:** candidate từ old latest; min; overwrite.
- **Invariant:** best là min gap hoàn chỉnh trong prefix.
- **Pseudocode:** scan/check candidate/min/set; sentinel→-1.
- **Full code:**

```js
function minimumEqualDistance(values) {
  const latestIndexByValue = new Map();
  let bestDistance = Infinity;
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (latestIndexByValue.has(value)) {
      const distance = index - latestIndexByValue.get(value);
      bestDistance = Math.min(bestDistance, distance);
    }
    latestIndexByValue.set(value, index);
  }
  return bestDistance === Infinity ? -1 : bestDistance;
}
```

- **Dry run:** `[5,1,5,5]`: latest5=0; gap2/best2/set2; gap1/best1.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** so với latest đủ vì mọi occurrence cũ hơn tạo gap lớn hơn.

### M03-C03 `[MAP-12]`

- **Tín hiệu / Pattern:** Map + simulation; delete/reinsert ảnh hưởng insertion order.
- **State:** `scoreByName` chỉ chứa score khác 0. Map iteration order là thứ tự insert của lần tồn tại hiện tại.
- **Check / Update:** next=old+delta; next0→delete, khác0→set.
- **Invariant:** sau event, Map chứa đúng người score khác 0, đúng state và order lần thêm hiện tại.
- **Pseudocode:** scan/read next/delete-or-set; return entries.
- **Full code:**

```js
function liveScoreboard(events) {
  const scoreByName = new Map();
  for (const [name, delta] of events) {
    const oldScore = scoreByName.get(name) ?? 0;
    const nextScore = oldScore + delta;
    if (nextScore === 0) {
      scoreByName.delete(name);
    } else {
      scoreByName.set(name, nextScore);
    }
  }
  return [...scoreByName.entries()];
}
```

- **Dry run:** A+2,B+1,A-2,A+3: `{A2}`→`{A2,B1}`→`{B1}`→`{B1,A3}`.
- **Complexity:** `O(n+k)`/`O(k)`.
- **Bẫy / recall:** set score0 thay vì delete giữ sai membership/order; delete rồi add đặt key ở cuối.

## Tầng 6 — Biến thể

### M03-V01 `[MAP-04 → MAP-05]`

- **Tín hiệu / Pattern:** latest index.
- **State đổi:** value từ `firstIndex` thành `latestIndex`.
- **Check / Update:** bỏ điều kiện `!has`; luôn `set(value,index)`.
- **Invariant:** entry là index lớn nhất trong prefix.
- **Pseudocode:** scan; overwrite every occurrence.
- **Full code:** `function latestPositions(values) { const latest = new Map(); for (let i = 0; i < values.length; i += 1) latest.set(values[i], i); return latest; }`
- **Dry run:** `[a,b,a]`: a0,b1,a2.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** first=conditional write; latest=unconditional overwrite.

### M03-V02 `[MAP-03 + MAP-11]`

- **Tín hiệu / Pattern:** frequency + argmax + first tie.
- **State:** counts; firstOrder (có thể dùng Map insertion order); best value/count.
- **Check / Update:** count first; scan entries; update chỉ khi strictly greater.
- **Invariant:** best là max các entries đã scan; hòa giữ entry đầu.
- **Pseudocode:** build counts; argmax strict greater; return object.
- **Full code:** `function frequencyWinner(values) { if (values.length===0) return null; const counts=new Map(); for (const v of values) counts.set(v,(counts.get(v)??0)+1); let bestValue=null,bestCount=-1; for (const [v,count] of counts) if (count>bestCount) { bestValue=v; bestCount=count; } return {value:bestValue,count:bestCount}; }`
- **Dry run:** `[b,a,a,b]`: entries b2,a2; b giữ vì strict `>`.
- **Complexity:** `O(n+k)`/`O(k)`.
- **Bẫy / recall:** `>=` đổi tie thành xuất hiện sau.

### M03-V03 `[MAP-09 → MAP-10]`

- **Tín hiệu / Pattern:** group unique và output theo first order.
- **State:** `Map<key, Set<item>>`; Set giữ insertion order, nên đủ nếu output chỉ cần unique items theo lần đầu. Không cần array thêm.
- **Check / Update:** ensure Set; add item.
- **Invariant:** mỗi Set chứa unique items của group trong prefix theo first insertion.
- **Pseudocode:** group/add; cuối convert Sets thành arrays.
- **Full code:** `function uniqueGroups(rows) { const groups=new Map(); for (const [key,item] of rows) { if (!groups.has(key)) groups.set(key,new Set()); groups.get(key).add(item); } return new Map([...groups].map(([key,set]) => [key,[...set]])); }`
- **Dry run:** `[a,x],[a,x],[a,y]` → a Set x → unchanged → x,y.
- **Complexity:** `O(n)` plus output.
- **Bẫy / recall:** cần giữ duplicate metadata thì Set không đủ; representation phụ thuộc contract.

### M03-V04 `[MAP-03 → MAP-13]`

- **Tín hiệu nhận diện:** thống kê cho mọi đoạn liên tiếp dài `k`; các cửa sổ chồng lấn.
- **Pattern chính / phụ:** Sliding Window duyệt biên; `MAP-13` giữ frequency.
- **State / nghĩa biến:** `countByValue` là count trong `[left..right]`; `left` là biên trái; `result` giữ số loại của mỗi window đủ k.
- **Check:** sau khi add right, nếu length>k thì remove đúng một left; khi length===k thì ghi `Map.size`.
- **Update:** add tăng count; remove giảm count và delete khi 0; sau đó `left += 1`.
- **Invariant:** sau bước co, Map là frequency chính xác của window hiện tại có độ dài không quá k.
- **Pseudocode:** scan right → add → nếu quá dài remove left → đủ k push size.
- **Full code:**

```js
function distinctPerWindow(values, k) {
  if (k <= 0 || k > values.length) return [];
  const countByValue = new Map();
  const result = [];
  let left = 0;

  for (let right = 0; right < values.length; right += 1) {
    const entered = values[right];
    countByValue.set(entered, (countByValue.get(entered) ?? 0) + 1);

    if (right - left + 1 > k) {
      const exited = values[left];
      const nextCount = countByValue.get(exited) - 1;
      if (nextCount === 0) countByValue.delete(exited);
      else countByValue.set(exited, nextCount);
      left += 1;
    }

    if (right - left + 1 === k) result.push(countByValue.size);
  }
  return result;
}
```

- **Dry run:** `[1,2,1,3],k=3`: window `1,2,1` có Map `{1:2,2:1}`→2; add3/remove1 tạo `{1:1,2:1,3:1}`→3.
- **Complexity:** `O(n)` time, `O(k)` space.
- **Bẫy / recall:** frequency toàn cục chỉ add; window bắt buộc add và remove đối xứng. Key count0 không được tính trong `Map.size`.

## Transfer Tests

### M03-T01 `[MAP-01 + MAP-12]` — Thẻ ra vào

- **Tín hiệu thực sự quan trọng:** cùng `cardId` có trạng thái inside/outside và event phải hợp lệ theo trạng thái cũ.
- **Chi tiết gây nhiễu:** `time`; do log đã đúng order và không hỏi duration nên không nằm trong state.
- **Dạng gần nhất:** `MAP-01` membership kết hợp `MAP-12` validate-before-commit.
- **Phần giữ / phần sửa:** giữ Set membership; thay “duplicate là đáp án” bằng hai condition theo action; transition có cả add và delete; return thêm size.
- **State / biến:** `insideCards`; `invalidIndex`; `insideCards.size` là số người.
- **Check:** IN invalid nếu has; OUT invalid nếu absent.
- **Update:** valid IN→add; valid OUT→delete.
- **Invariant:** trước event i, Set chứa đúng thẻ đang ở trong sau prefix trước i.
- **Pseudocode:** scan indexed events; validate action với membership; invalid return index+size; commit; hết vòng return -1+size.
- **Full code:**

```js
function auditAccessLog(logs) {
  const insideCards = new Set();

  for (let index = 0; index < logs.length; index += 1) {
    const [, cardId, action] = logs[index];
    const isInside = insideCards.has(cardId);
    const isInvalid = (action === "IN" && isInside)
      || (action === "OUT" && !isInside);

    if (isInvalid) {
      return { invalidIndex: index, peopleInside: insideCards.size };
    }

    if (action === "IN") insideCards.add(cardId);
    else insideCards.delete(cardId);
  }

  return { invalidIndex: -1, peopleInside: insideCards.size };
}
```

- **Dry run:** `A IN, B OUT`: `{}`→A valid/add→`{A}`; B OUT absent→return `{1,1}` không mutate.
- **Complexity:** `O(n)` time, `O(k)` space.
- **Bẫy / cách recall:** dùng time dù không ảnh hưởng; commit trước validation; không xác thực action nếu contract không đảm bảo. Nhớ “state cũ quyết định event hợp lệ”.

### M03-T02 `[MAP-14 + MAP-11]` — Cảm biến kho

- **Tín hiệu thực sự quan trọng:** mỗi sensor chỉ đóng góp reading mới nhất; khi sensor đổi product phải gỡ đóng góp cũ trước khi thêm mới.
- **Chi tiết gây nhiễu:** số event không phải sample count có hiệu lực.
- **Dạng gần nhất:** `MAP-14` nhiều Map đồng bộ; `MAP-11` chọn argmax có tie.
- **Phần giữ / phần sửa:** giữ read-old→remove→add transaction; state đổi từ ánh xạ hai chiều thành `latestBySensor` và aggregate `statsByProduct`; return là argmax average.
- **State / nghĩa biến:** latest sensor→`{product,temperature}`; product→`{sum,count}`; firstOrderByProduct; `bestProduct,bestAverage`.
- **Check:** không validation; lúc chọn best dùng average lớn hơn hoặc hòa và order nhỏ hơn.
- **Update:** nếu sensor có old reading thì subtract khỏi old product; set reading mới; add vào new product.
- **Invariant:** stats bằng tổng/count của đúng một latest reading cho mỗi sensor; firstOrder không đổi.
- **Pseudocode:** assign product order on first event; remove old contribution; add new; cuối scan active stats và compare average/tie.
- **Full code:**

```js
function hottestProductByLatestSensors(logs) {
  const latestBySensor = new Map();
  const statsByProduct = new Map();
  const firstOrderByProduct = new Map();
  let nextOrder = 0;

  function changeStats(product, sumDelta, countDelta) {
    const oldStats = statsByProduct.get(product) ?? { sum: 0, count: 0 };
    const nextStats = {
      sum: oldStats.sum + sumDelta,
      count: oldStats.count + countDelta,
    };
    if (nextStats.count === 0) statsByProduct.delete(product);
    else statsByProduct.set(product, nextStats);
  }

  for (const [sensorId, product, temperature] of logs) {
    if (!firstOrderByProduct.has(product)) {
      firstOrderByProduct.set(product, nextOrder);
      nextOrder += 1;
    }

    if (latestBySensor.has(sensorId)) {
      const oldReading = latestBySensor.get(sensorId);
      changeStats(oldReading.product, -oldReading.temperature, -1);
    }

    latestBySensor.set(sensorId, { product, temperature });
    changeStats(product, temperature, 1);
  }

  let bestProduct = null;
  let bestAverage = -Infinity;
  for (const [product, stats] of statsByProduct) {
    const average = stats.sum / stats.count;
    const winsTie = average === bestAverage
      && firstOrderByProduct.get(product) < firstOrderByProduct.get(bestProduct);
    if (average > bestAverage || winsTie) {
      bestProduct = product;
      bestAverage = average;
    }
  }
  return bestProduct;
}
```

- **Dry run:** `S1/A/10, S2/A/20, S1/B/30`: A `{sum30,count2}`; gỡ S1 làm A `{20,1}`; thêm B `{30,1}`; B thắng.
- **Complexity:** `O(n+k)` time, `O(sensors+products)` space.
- **Bẫy / cách recall:** cộng mọi event làm double-count sensor; quên delete product count0; tie theo Map active order khác first-ever order. Nhớ “mỗi sensor có đúng một contribution đang sống”.

### M03-T03 `[MAP-13 + MAP-14]` — Cảnh báo thiết bị

- **Tín hiệu thực sự quan trọng:** mọi đoạn liên tiếp đúng k; một event vào và một event ra; state có hai cấp device→error→count.
- **Chi tiết gây nhiễu:** timestamp và khoảng cách giữa timestamp không ảnh hưởng cửa sổ theo số event.
- **Dạng gần nhất:** `MAP-13` add/remove window; `MAP-14` nhiều loại state/nested Map.
- **Pattern chịu trách nhiệm duyệt / lưu state:** Sliding Window điều khiển hai biên; nested frequency Maps giữ errorCode đang sống của từng device; `qualifyingDevices` giúp return O(1).
- **Phần giữ / phần sửa:** giữ add-right/remove-left và xóa count0; thay Map phẳng bằng `Map<device, Map<error,count>>`; return là số device có inner size≥2.
- **State / nghĩa biến:** `errorsByDevice`; `start`; `qualifyingDevices`; `answers`.
- **Check:** khi inner size chuyển `1→2`, tăng qualifying; khi `2→1`, giảm.
- **Update:** add/remove event đối xứng; delete inner Map ngoài khi rỗng.
- **Invariant:** sau khi co, nested Maps là frequency chính xác của event trong window; qualifying bằng số inner Map có size≥2.
- **Pseudocode:** add event; cập nhật threshold crossing; nếu quá k remove event trái và crossing; đủ k push qualifying.
- **Full code:**

```js
function countAlertingDevicesPerWindow(events, k) {
  if (k <= 0 || k > events.length) return [];
  const errorsByDevice = new Map();
  const answers = [];
  let start = 0;
  let qualifyingDevices = 0;

  function addEvent(deviceId, errorCode) {
    if (!errorsByDevice.has(deviceId)) {
      errorsByDevice.set(deviceId, new Map());
    }
    const errorCounts = errorsByDevice.get(deviceId);
    const oldDistinct = errorCounts.size;
    errorCounts.set(errorCode, (errorCounts.get(errorCode) ?? 0) + 1);
    if (oldDistinct === 1 && errorCounts.size === 2) qualifyingDevices += 1;
  }

  function removeEvent(deviceId, errorCode) {
    const errorCounts = errorsByDevice.get(deviceId);
    const oldDistinct = errorCounts.size;
    const nextCount = errorCounts.get(errorCode) - 1;
    if (nextCount === 0) errorCounts.delete(errorCode);
    else errorCounts.set(errorCode, nextCount);
    if (oldDistinct === 2 && errorCounts.size === 1) qualifyingDevices -= 1;
    if (errorCounts.size === 0) errorsByDevice.delete(deviceId);
  }

  for (let end = 0; end < events.length; end += 1) {
    const [, enteredDevice, enteredError] = events[end];
    addEvent(enteredDevice, enteredError);

    if (end - start + 1 > k) {
      const [, exitedDevice, exitedError] = events[start];
      removeEvent(exitedDevice, exitedError);
      start += 1;
    }

    if (end - start + 1 === k) answers.push(qualifyingDevices);
  }
  return answers;
}
```

- **Dry run:** events `D1/E1,D1/E2,D2/E1`, k=2: window đầu D1 size2→answer1; add D2/remove D1-E1 làm D1 size1→answer0.
- **Complexity:** `O(n)` average time; space `O(k)` event multiplicity.
- **Bẫy / cách recall:** inner key count0 làm size sai; tăng qualifying ở mọi error mới thay vì chỉ crossing `1→2`; remove không đối xứng add. Nhớ “theo dõi ngưỡng khi size băng qua 2”.

## Mini-test M03-M01

### M03-M01.1 `[MAP-10 + MAP-11]` — Unique pages leader

- **Tín hiệu / Pattern:** relation user→unique pages + argmax first user.
- **State:** `pagesByUser`; Map insertion order là first appearance.
- **Check / Update:** ensure Set, add page; cuối chọn largest size, strict greater.
- **Invariant:** Sets đúng prefix; argmax đúng entries đã scan.
- **Pseudocode:** group unique; scan sizes; return best.
- **Full code:**

```js
function mostCuriousUser(logs) {
  const pagesByUser = new Map();
  for (const [, user, page] of logs) {
    if (!pagesByUser.has(user)) pagesByUser.set(user, new Set());
    pagesByUser.get(user).add(page);
  }
  let bestUser = null;
  let bestCount = -1;
  for (const [user, pages] of pagesByUser) {
    if (pages.size > bestCount) {
      bestUser = user;
      bestCount = pages.size;
    }
  }
  return bestUser;
}
```

- **Dry run:** A/p1,A/p1,B/p2: sizes A1,B1; A thắng first.
- **Complexity:** `O(n)`/`O(unique user-page pairs)`.
- **Bẫy / recall:** count raw visits sai; `>=` phá tie.

### M03-M01.2 `[MAP-06]` — Cặp gần nhất

- **Tín hiệu / Pattern:** latest + best pair; tie `j` nhỏ hơn tự được bảo toàn khi scan tăng dần.
- **State:** latest index; best pair/distance.
- **Check / Update:** candidate if seen; update only distance smaller; then overwrite latest.
- **Invariant:** best là min distance trong prefix; hòa giữ `j` sớm vì gặp trước.
- **Pseudocode:** scan/check gap/update best/set latest.
- **Full code:**

```js
function closestEqualPair(values) {
  const latest = new Map();
  let bestPair = [-1, -1];
  let bestDistance = Infinity;
  for (let j = 0; j < values.length; j += 1) {
    const value = values[j];
    if (latest.has(value)) {
      const i = latest.get(value);
      const distance = j - i;
      if (distance < bestDistance) {
        bestDistance = distance;
        bestPair = [i, j];
      }
    }
    latest.set(value, j);
  }
  return bestPair;
}
```

- **Dry run:** `[a,a,b,b]`: pair[0,1] dist1; later [2,3] tie, giữ j=1.
- **Complexity:** `O(n)`/`O(k)`.
- **Bẫy / recall:** condition `<=` sẽ lấy j muộn hơn; latest tạo min candidate cho mỗi j.

### M03-M01.3 `[MAP-12]` — Inventory validation

- **Tín hiệu / Pattern:** entity state + validate-before-commit.
- **State:** countByItem sau các event hợp lệ trước index.
- **Check / Update:** next=old+delta; nếu next<0 return index; nếu không set.
- **Invariant:** đầu vòng Map là inventory hợp lệ sau prefix trước.
- **Pseudocode:** build initial; scan indexed events; compute/check/commit; -1.
- **Full code:**

```js
function firstInvalidEvent(initialInventory, events) {
  const countByItem = new Map(initialInventory);
  for (let index = 0; index < events.length; index += 1) {
    const [item, delta] = events[index];
    const oldCount = countByItem.get(item) ?? 0;
    const nextCount = oldCount + delta;
    if (nextCount < 0) return index;
    countByItem.set(item, nextCount);
  }
  return -1;
}
```

- **Dry run:** a2; events a-1,a-2: next1 commit; next-1 return1, state không commit.
- **Complexity:** `O(initial+events)`/`O(k)`.
- **Bẫy / recall:** key absent là 0 chỉ vì contract đã chọn; validate rồi commit.

## Cách tự nhớ lại toàn chương

Không nhớ code trước. Viết câu truy vấn mà tương lai hỏi quá khứ, rồi chọn đúng value: `boolean / count / firstIndex / latestIndex / array / Set / entityState`. Sau đó quyết định động từ update: `add / increment / conditional set / overwrite / push / validate-commit`. Cuối cùng viết invariant cho prefix và mới chuyển thành JavaScript.
