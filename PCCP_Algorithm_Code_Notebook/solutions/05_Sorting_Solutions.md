# Lời giải — Chapter 05 Sorting

> Mỗi lời giải chốt comparator, post-sort invariant và mutation contract. [Quay lại Practice](../chapters/05_sorting/03_Practice_Ladder.md).

## Tầng 1 — Nhận diện

### S05-R01 `[SORT-01]`
- **Signal/pattern:** numeric ascending. **State:** bản clone đã sort. **Comparator:** `a-b`.
- **Invariant:** prefix theo numeric order. **Full code:** `function numericAscending(values){return [...values].sort((a,b)=>a-b);}`
- **Dry run:** `[2,10,-1]→[-1,2,10]`; default thành `[-1,10,2]`. **Complexity:** O(n log n)/O(n). **Bẫy/recall:** JS default so string.

### S05-R02 `[SORT-01]`
- **Signal:** top 3; input immutable. Sort phù hợp khi cần đúng ba item có thứ tự; nếu chỉ ba giá trị không cần order có thể scan giữ top3.
- **Full code:** `function topThree(values){return [...values].sort((a,b)=>b-a).slice(0,3);}`
- **Invariant:** sau sort, ba vị trí đầu là ba value lớn nhất. **Dry run:** `[4,1,9,7]→[9,7,4]`. **Complexity:** O(n log n); scan có thể O(n). **Recall:** chọn theo output contract.

### S05-R03 `[SORT-02]`
- **Keys:** score desc, time asc, name asc; trả tại first difference.
- **Full code:** `function rankStudents(a){return[...a].sort((x,y)=>y.score-x.score||x.time-y.time||x.name.localeCompare(y.name));}`
- **Invariant:** array lexicographic theo tuple `(-score,time,name)`. **Dry run:** A(9,5),B(9,3)→B,A. **Complexity:** O(n log n). **Bẫy:** cộng tiêu chí không có short-circuit.

### S05-R04 `[SORT-02]`
- **State:** rank Map category; deadline secondary. **Full code:** `function sortTasks(tasks){const rank=new Map([['HIGH',0],['MEDIUM',1],['LOW',2]]);return[...tasks].sort((a,b)=>rank.get(a.category)-rank.get(b.category)||a.deadline-b.deadline);}`
- **Invariant:** category rank không giảm; trong group deadline không giảm. **Dry run:** LOW@1,HIGH@9→HIGH trước. **Complexity:** O(n log n). **Bẫy:** alphabetic category sai custom order.

### S05-R05 `[SORT-03]`
- **Pattern/state:** decorate mỗi occurrence bằng index, rồi sort. **Full code:** `function indicesByValue(values){return values.map((value,index)=>({value,index})).sort((a,b)=>a.value-b.value||a.index-b.index).map(x=>x.index);}`
- **Invariant:** mỗi object giữ identity đúng một occurrence. **Dry run:** `[5,5,1]→[2,0,1]`. **Complexity:** O(n log n). **Bẫy:** `indexOf(5)` trả 0 cho cả hai.

### S05-R06 `[SORT-03]`
- **Comparator:** score desc, explicit original index asc. **Full code:** `function stableScores(values){return values.map((value,index)=>({value,index})).sort((a,b)=>b.value.score-a.value.score||a.index-b.index).map(x=>x.value);}`
- **Invariant:** equal score theo input index. **Dry run:** A10,B10 giữ A,B. **Complexity:** O(n log n). **Recall:** explicit tie làm contract dễ thấy.

### S05-R07 `[SORT-04]`
- **Post-sort relation:** duplicate nếu hai hàng xóm bằng nhau. **Full code:** `function hasDuplicate(values){const a=[...values].sort((x,y)=>x-y);for(let i=1;i<a.length;i+=1)if(a[i]===a[i-1])return true;return false;}`
- **Invariant:** nếu duplicate trong prefix thì đã return; bằng nhau toàn cục sẽ kề. **Dry run:** `[3,1,3]→[1,3,3]→true`. **Complexity:** O(n log n). **Bẫy:** Set O(n) thường tốt hơn nếu chỉ cần duplicate.

### S05-R08 `[SORT-04]`
- **Sort/state:** left asc; output last interval. **Full code:** `function mergeClosed(a){if(!a.length)return[];const s=a.map(x=>[...x]).sort((x,y)=>x[0]-y[0]||x[1]-y[1]),out=[s[0]];for(let i=1;i<s.length;i+=1){const last=out.at(-1);if(s[i][0]<=last[1])last[1]=Math.max(last[1],s[i][1]);else out.push(s[i]);}return out;}`
- **Invariant:** output là union rời nhau của prefix. **Dry run:** `[1,3],[3,5]→[1,5]`. **Complexity:** O(n log n). **Bẫy:** phải clone pair con.

### S05-R09 `[SORT-04]`
- **Reason:** mọi string có prefix gần nhất nằm cạnh nó trong lexicographic order.
- **Full code:** `function hasPrefixPair(words){const a=[...words].sort();for(let i=1;i<a.length;i+=1)if(a[i].startsWith(a[i-1]))return true;return false;}`
- **Invariant:** scanned adjacent pairs không có prefix. **Dry run:** `['12','123','9']→true`. **Complexity:** O(n log n·L). **Bẫy:** direction `longer.startsWith(shorter)`.

### S05-R10 `[SORT-05]`
- **Pattern:** sorted distinct → rank Map → original order. **Full code:** `function compress(values){const u=[...new Set(values)].sort((a,b)=>a-b),m=new Map(u.map((v,i)=>[v,i]));return values.map(v=>m.get(v));}`
- **Invariant:** equal value equal rank; order preserved. **Dry run:** `[50,-1,50]→[1,0,1]`. **Complexity:** O(n log n). **Bẫy:** rank không bảo toàn distance.

### S05-R11 `[SORT-03]`
- **Decision:** decorate trước; clone+sort values rồi `indexOf` mất occurrence identity.
- **Full code:** `function immutableSourceOrder(values){return values.map((value,index)=>({value,index})).sort((a,b)=>a.value-b.value||a.index-b.index);}`
- **Invariant:** input untouched; mỗi result có source index. **Dry run:** `[2,2]→[{2,0},{2,1}]`. **Complexity:** O(n log n). **Recall:** identity ≠ value.

### S05-R12 `[SORT-01]`
- **Decision:** scan vì output chỉ min/max. **Full code:** `function minMax(values){let min=Infinity,max=-Infinity;for(const value of values){min=Math.min(min,value);max=Math.max(max,value);}return{min,max};}`
- **Invariant:** min/max đúng prefix. **Dry run:** `[3,-2,8]→{-2,8}`. **Complexity:** O(n)/O(1), tốt hơn sort O(n log n). **Bẫy:** empty cần contract; ở đây trả infinities.

## Tầng 2 — Điền khuyết

### S05-F01 `[SORT-01]`
- **Blanks:** `first-second`, `second-first`. **Full code:** `function bothOrders(values){return{ascending:[...values].sort((a,b)=>a-b),descending:[...values].sort((a,b)=>b-a)};}`
- **Invariant:** hai clone độc lập; input giữ nguyên. **Dry run:** `[2,10]→[2,10]` và `[10,2]`. **Complexity:** O(n log n). **Recall:** dấu diễn đạt ai đứng trước.

### S05-F02 `[SORT-02]`
- **Blanks:** `b.score-a.score`, `a.time-b.time`, `localeCompare`. **Full code:** `function orderRecords(records){return[...records].sort((a,b)=>b.score-a.score||a.time-b.time||a.name.localeCompare(b.name));}`
- **Invariant:** tuple `(-score,time,name)`. **Dry run:** tie score xét time. **Complexity:** O(n log n). **Bẫy:** boolean comparator.

### S05-F03 `[SORT-05]`
- **Blanks:** `Set`, `index`, `get`. **Full code:** `function denseRanks(values){const unique=[...new Set(values)].sort((a,b)=>a-b);const rank=new Map(unique.map((value,index)=>[value,index]));return values.map(value=>rank.get(value));}`
- **Dry run:** `[8,2,8]→[1,0,1]`. **Complexity:** O(n log n). **Recall:** transform original array, không phải sorted array.

## Tầng 3 — Dựng logic

### S05-L01 `[SORT-03]`
- **State/comparator:** `{value,index}`, value asc/index desc. **Invariant:** mỗi duplicate là occurrence riêng và sorted prefix đúng `(value,-index)`.
- **Full code:** `function laterFirst(values){return values.map((value,index)=>({value,index})).sort((a,b)=>a.value-b.value||b.index-a.index).map(x=>x.index);}`
- **Dry run:** `[5,2,5,2]→[3,1,2,0]`. **Complexity:** O(n log n)/O(n). **Bẫy:** decorate sau sort.

### S05-L02 `[SORT-04]`
- **Check/update:** overlap `left<=lastRight`; extend with max. Clone every pair.
- **Full code:**
```js
function mergeWithoutMutation(intervals) {
  if (intervals.length === 0) return [];
  const sorted = intervals.map(([left, right]) => [left, right])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const output = [sorted[0]];
  for (let index = 1; index < sorted.length; index += 1) {
    const current = sorted[index], last = output[output.length - 1];
    if (current[0] <= last[1]) last[1] = Math.max(last[1], current[1]);
    else output.push(current);
  }
  return output;
}
```
- **Invariant:** output là union của processed intervals và rời nhau. **Dry run:** `[1,4],[2,3]` giữ `[1,4]`. **Complexity:** O(n log n). **Bẫy:** clone outer chưa đủ.

### S05-L03 `[SORT-05]`
- **State:** sorted unique, Map value→index+1. **Full code:** `function oneBasedCompression(values){const u=[...new Set(values)].sort((a,b)=>a-b),m=new Map(u.map((v,i)=>[v,i+1]));return values.map(v=>m.get(v));}`
- **Invariant:** ranks liên tiếp 1..distinctCount. **Dry run:** `[20,5,20]→[2,1,2]`. **Complexity:** O(n log n). **Bẫy:** output sorted order.

## Transfer Test A

### S05-T01 `[SORT-02/SORT-03]` — Hồ sơ giao hàng
- **Signals:** three-key ordering; final key is occurrence index; timestamp noise. **State:** decorated record/index.
- **Comparator:** priority desc, distance asc, index asc. **Invariant:** input untouched; sorted list đúng first differing criterion.
- **Full code:**
```js
function deliveryOrder(records) {
  return records
    .map((record, inputIndex) => ({ record, inputIndex }))
    .sort((a, b) => b.record.priority - a.record.priority
      || a.record.distance - b.record.distance
      || a.inputIndex - b.inputIndex)
    .map(({ record }) => record.id);
}
```
- **Dry run:** A(2,5),B(2,3),C(2,3)→B,C,A dù timestamp bất kỳ. **Complexity:** O(n log n)/O(n). **Bẫy/recall:** không thêm key đề không yêu cầu.

## Tầng 4 — Pseudocode

### S05-P01 `[SORT-03/SORT-04]`
- **Plan:** decorate; sort value/index; adjacent scan; normalize pair indices and compare difference rồi tuple.
- **Invariant:** best là candidate tối ưu trong adjacent prefix; một global closest pair luôn adjacent theo value.
- **Full code:**
```js
function closestPair(values) {
  if (values.length < 2) return null;
  const sorted = values.map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value || a.index - b.index);
  let best = null;
  for (let i = 1; i < sorted.length; i += 1) {
    const difference = sorted[i].value - sorted[i - 1].value;
    const indices = [sorted[i - 1].index, sorted[i].index].sort((a, b) => a - b);
    if (!best || difference < best.difference ||
        (difference === best.difference && (indices[0] < best.indices[0] ||
         (indices[0] === best.indices[0] && indices[1] < best.indices[1])))) best = { difference, indices };
  }
  return best;
}
```
- **Dry run:** `[4,1,4]` gives diff0 indices[0,2]. **Complexity:** O(n log n). **Bẫy:** tie tuple không phải sorted-value order.

### S05-P02 `[SORT-04]`
- **Rule:** half-open overlap iff `nextStart < currentEnd`; equality opens new group.
- **Full code:** `function halfOpenGroups(a){if(!a.length)return 0;const s=a.map(x=>[...x]).sort((x,y)=>x[0]-y[0]||x[1]-y[1]);let groups=1,end=s[0][1];for(let i=1;i<s.length;i+=1){if(s[i][0]<end)end=Math.max(end,s[i][1]);else{groups+=1;end=s[i][1];}}return groups;}`
- **Invariant:** groups finalized plus current represent union prefix. **Dry run:** `[1,3),[3,5)`→2. **Complexity:** O(n log n). **Bẫy:** dùng `<=` của closed interval.

### S05-P03 `[SORT-02]`
- **State:** extension rank Map, fallback rank 3; keys rank asc,size desc,name asc.
- **Full code:** `function sortFiles(files){const r=new Map([['js',0],['ts',1],['md',2]]);return[...files].sort((a,b)=>(r.get(a.extension)??3)-(r.get(b.extension)??3)||b.size-a.size||a.name.localeCompare(b.name));}`
- **Invariant:** tuple `(extensionRank,-size,name)`. **Dry run:** unknown after md. **Complexity:** O(n log n). **Bẫy:** `||` với rank0; dùng `??`, không `||` khi lấy rank.

## Tầng 5 — Tự code

### S05-C01 `[SORT-02]` — Hạng thi đấu
- **Comparator/output:** score desc, penalty asc, name asc; map position index+1. **Invariant:** record tại position k đúng thứ k.
- **Full code:** `function standings(records){return[...records].sort((a,b)=>b.score-a.score||a.penalty-b.penalty||a.name.localeCompare(b.name)).map((record,index)=>({...record,position:index+1}));}`
- **Dry run:** A(10,5),B(10,2)→B pos1,A pos2. **Complexity:** O(n log n)/O(n). **Bẫy:** đây không phải shared rank.

### S05-C02 `[SORT-04]` — Lịch bảo trì
- **State:** current merged interval + total finalized length. **Check:** closed overlap `start<=end`; final add after loop.
- **Full code:**
```js
function maintenanceCoverage(intervals) {
  if (intervals.length === 0) return 0;
  const sorted = intervals.map(([start, end]) => [start, end])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let [start, end] = sorted[0], total = 0;
  for (let i = 1; i < sorted.length; i += 1) {
    if (sorted[i][0] <= end) end = Math.max(end, sorted[i][1]);
    else { total += end - start; [start, end] = sorted[i]; }
  }
  return total + end - start;
}
```
- **Invariant:** total là length nhóm đã chốt; `[start,end]` là union group cuối. **Dry run:** `[1,4],[3,8],[10,11]→7+1=8`. **Complexity:** O(n log n). **Bẫy:** quên group cuối; độ dài continuous không `+1`.

### S05-C03 `[SORT-03/SORT-04]` — Cặp gần nhất có nguồn
- **Pattern:** giống S05-P01; implementation hoàn chỉnh là `closestPair` với null khi ít hơn hai phần tử.
- **Full code:**
```js
function closestPairWithSource(values) {
  if (values.length < 2) return null;
  const items = values.map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value || a.index - b.index);
  let answer = { difference: Infinity, indices: [Infinity, Infinity] };
  for (let i = 1; i < items.length; i += 1) {
    const difference = items[i].value - items[i - 1].value;
    const indices = [items[i - 1].index, items[i].index].sort((a, b) => a - b);
    const lexSmaller = indices[0] < answer.indices[0] ||
      (indices[0] === answer.indices[0] && indices[1] < answer.indices[1]);
    if (difference < answer.difference || (difference === answer.difference && lexSmaller)) answer = { difference, indices };
  }
  return answer;
}
```
- **Invariant:** answer tối ưu theo `(difference,index0,index1)` trong adjacent prefix. **Dry run:** `[7,1,7,2]→{0,[0,2]}`. **Complexity:** O(n log n). **Bẫy:** duplicate và tie.

## Tầng 6 — Biến thể

### S05-V01 `[SORT-02/SORT-03]`
- **Change:** decorate `inputIndex`; thay final name criterion bằng index asc.
- **Full code:** `function tieByArrival(records){return records.map((record,inputIndex)=>({record,inputIndex})).sort((a,b)=>b.record.score-a.record.score||a.record.penalty-b.record.penalty||a.inputIndex-b.inputIndex).map(x=>x.record);}`
- **Invariant:** key chính đúng; full tie giữ arrival. **Dry run:** B và A full tie giữ input. **Complexity:** O(n log n). **Recall:** final tie là dữ liệu, không phải cảm tính.

### S05-V02 `[SORT-04]`
- **Change:** closed `nextStart <= currentEnd` thành half-open `nextStart < currentEnd`.
- **Full code:** `function mergeHalfOpen(a){if(!a.length)return[];const s=a.map(x=>[...x]).sort((x,y)=>x[0]-y[0]||x[1]-y[1]),o=[s[0]];for(let i=1;i<s.length;i+=1){const z=o.at(-1);if(s[i][0]<z[1])z[1]=Math.max(z[1],s[i][1]);else o.push(s[i]);}return o;}`
- **Dry run:** `[1,3],[3,5]` giữ hai đoạn. **Complexity:** O(n log n). **Bẫy:** endpoint semantics.

### S05-V03 `[SORT-05]`
- **Change:** competition rank của distinct value là vị trí đầu tiên trong sorted full array +1, nên có gaps.
- **Full code:** `function competitionRanks(values){const sorted=[...values].sort((a,b)=>a-b),m=new Map();for(let i=0;i<sorted.length;i+=1)if(!m.has(sorted[i]))m.set(sorted[i],i+1);return values.map(v=>m.get(v));}`
- **Invariant:** rank(v)=1+#elements strictly smaller. **Dry run:** `[10,20,20,30]→[1,2,2,4]`. **Complexity:** O(n log n). **Bẫy:** distinct index tạo dense rank.

## Transfer Test B

### S05-T02 `[SORT-05]` — Mã cảm biến
- **Signals:** normalize first; compression ignores device id; restore input order. **State:** normalized records, unique ranks.
- **Full code:**
```js
function rankSensorReadings(readings) {
  const normalized = readings.map(({ deviceId, raw }) => ({
    deviceId,
    normalized: Math.round(raw / 5) * 5
  }));
  const unique = [...new Set(normalized.map((item) => item.normalized))]
    .sort((a, b) => a - b);
  const rank = new Map(unique.map((value, index) => [value, index]));
  return normalized.map((item) => ({ ...item, rank: rank.get(item.normalized) }));
}
```
- **Invariant:** normalized equal → equal rank; output item i thuộc input i. **Dry run:** A12→10,B14→15,C11→10 gives ranks0,1,0. **Complexity:** O(n log n)/O(n). **Bẫy:** rank raw trước normalize; sort output; mutate records.

## Mini-test S05-M01

### S05-M01.1 `[SORT-02]`
- **Comparator:** chuỗi x đứng trước y nếu `xy` lớn hơn `yx`. **Invariant:** không có adjacent swap nào làm chuỗi lớn hơn.
- **Full code:** `function largestNumber(numbers){const a=numbers.map(String).sort((a,b)=>(b+a).localeCompare(a+b));const joined=a.join('');return joined[0]==='0'?'0':joined;}`
- **Dry run:** `[3,30,34]→34,3,30→"34330"`. **Complexity:** O(n log n·L). **Bẫy:** numeric descending sai; all zeros.

### S05-M01.2 `[SORT-04]`
- **Pattern:** sort starts/ends; half-open means end at same time releases before start. Two pointers track active/max.
- **Full code:** `function minimumRooms(meetings){const starts=meetings.map(x=>x[0]).sort((a,b)=>a-b),ends=meetings.map(x=>x[1]).sort((a,b)=>a-b);let i=0,j=0,active=0,best=0;while(i<starts.length){if(starts[i]<ends[j]){active+=1;best=Math.max(best,active);i+=1;}else{active-=1;j+=1;}}return best;}`
- **Invariant:** active là meetings started chưa ended trước next event. **Dry run:** `[1,3),[3,5)` uses one room. **Complexity:** O(n log n). **Bẫy:** empty works because loop skipped; zero-length meetings cần contract loại bỏ.

### S05-M01.3 `[SORT-02]`
- **Keys:** length asc, lexicographic asc; clone first.
- **Full code:** `function orderWords(words){return[...words].sort((a,b)=>a.length-b.length||a.localeCompare(b));}`
- **Invariant:** tuple `(length,word)` nondecreasing; original untouched. **Dry run:** `['bb','a','aa']→['a','aa','bb']`. **Complexity:** O(n log n·L)/O(n). **Bẫy:** calling `words.sort` mutates input.
