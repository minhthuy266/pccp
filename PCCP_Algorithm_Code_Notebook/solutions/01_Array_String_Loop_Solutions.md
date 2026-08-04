# Lời giải — Chapter 01 Array, String và Loop

> Chỉ mở sau khi đã ghi state/invariant và test đang sai. [Quay lại bài luyện](../chapters/01_array_string_loop/03_Practice_Ladder.md).

## Tầng 1 — Nhận diện

### A01-R01 `[ARR-01]`
- **Tín hiệu/Pattern:** tổng mọi đóng góp → accumulator.
- **State/biến:** `sumOfSquares` là tổng bình phương prefix.
- **Check/Update:** không branch; cộng `value*value`.
- **Invariant:** trước current, sum đúng prefix trước.
- **Pseudocode:** sum0; scan; add square; return.
- **Full code:** `function sumSquares(a){let s=0;for(const v of a)s+=v*v;return s;}`
- **Dry run:** `[2,3]`: 0→4→13. **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** dùng `^2` là XOR trong JS. Nhớ multiplication.

### A01-R02 `[ARR-02]`
- **Tín hiệu/Pattern:** min + index + tie cuối.
- **State:** best value/index.
- **Check/Update:** `current <= best` để bằng cũng thay; update cả hai.
- **Invariant:** bestIndex lớn nhất trong các index đạt min của prefix.
- **Pseudocode:** init0; loop1; <= update; return index.
- **Full code:** `function lastMinIndex(a){let v=a[0],p=0;for(let i=1;i<a.length;i+=1)if(a[i]<=v){v=a[i];p=i;}return p;}`
- **Dry run:** `[2,1,1]`: 2/0→1/1→1/2. **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** `<` giữ tie đầu; `<=` lấy tie cuối.

### A01-R03 `[ARR-03]`
- **Tín hiệu/Pattern:** bao nhiêu ký tự thỏa → conditional count.
- **State:** digit count prefix.
- **Check/Update:** `c>='0' && c<='9'` → increment.
- **Invariant:** count đúng prefix string.
- **Pseudocode:** scan chars/check range/count.
- **Full code:** `function countDigits(s){let n=0;for(const c of s)if(c>='0'&&c<='9')n+=1;return n;}`
- **Dry run:** `a1!2`: 0→1→1→2. **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** `Number(c)` coi space là 0; char range rõ contract.

### A01-R04 `[ARR-04]`
- **Tín hiệu/Pattern:** tồn tại witness.
- **State:** ngầm “chưa thấy negative”.
- **Check/Update:** value<0→true; hết→false.
- **Invariant:** prefix chưa có negative.
- **Pseudocode:** scan/witness return.
- **Full code:** `function hasNegative(a){for(const v of a)if(v<0)return true;return false;}`
- **Dry run:** `[2,-1,3]`: pass→witness true. **Complexity:** worst `O(n)`.
- **Bẫy/recall:** false phải sau loop.

### A01-R05 `[ARR-04]`
- **Tín hiệu/Pattern:** mọi phần tử → counterexample.
- **State:** ngầm “prefix đều nonempty”.
- **Check/Update:** `row.length===0`→false; hết→true.
- **Invariant:** không có empty trong prefix.
- **Full code:** `function allNonempty(rows){for(const row of rows)if(row.length===0)return false;return true;}`
- **Dry run:** `['a','']`: pass→false. **Complexity:** `O(n)`.
- **Bẫy/recall:** empty array trả true theo every; theo contract.

### A01-R06 `[ARR-05]`
- **Tín hiệu/Pattern:** filter odd + transform square.
- **State:** result đúng prefix.
- **Check/Update:** odd→push square.
- **Invariant:** result chứa bình phương odd theo order.
- **Full code:** `function oddSquares(a){const out=[];for(const v of a)if(Math.abs(v%2)===1)out.push(v*v);return out;}`
- **Dry run:** `[2,-3]`: skip→push9. **Complexity:** `O(n)` + output.
- **Bẫy/recall:** JS `-3%2=-1`, nên check `!==0` hoặc abs.

### A01-R07 `[ARR-06]`
- **Tín hiệu/Pattern:** nghiêm ngặt bên phải → suffix scan.
- **State:** suffixSum, result fixed-size.
- **Check/Update:** result[i]=old sum; rồi add current.
- **Invariant:** đầu vòng suffixSum là sum `[i+1..]`.
- **Full code:** `function rightSums(a){const out=Array(a.length);let s=0;for(let i=a.length-1;i>=0;i-=1){out[i]=s;s+=a[i];}return out;}`
- **Dry run:** `[2,3]`: i1 out0,sum3; i0 out3,sum5. **Complexity:** `O(n)/O(n)`.
- **Bẫy/recall:** output trước update cho strict suffix.

### A01-R08 `[ARR-07]`
- **Tín hiệu/Pattern:** run giống nhau dài nhất.
- **State:** current/best run lengths.
- **Check/Update:** same previous→extend, else reset1; max.
- **Invariant:** current kết thúc tại i; best trong prefix.
- **Full code:** `function longestSame(s){if(s.length===0)return 0;let cur=1,best=1;for(let i=1;i<s.length;i+=1){cur=s[i]===s[i-1]?cur+1:1;best=Math.max(best,cur);}return best;}`
- **Dry run:** `aab`: 1→2→1, best2. **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** reset1, không reset0.

### A01-R09 `[ARR-02]`
- **Tín hiệu/Pattern:** best object, comparator hai khóa.
- **State:** best object/index.
- **Check:** priority cao hơn hoặc hòa và createdAt nhỏ hơn.
- **Update:** thay best reference/index.
- **Invariant:** best thắng comparator trong prefix.
- **Full code:** `function bestJob(a){if(a.length===0)return null;let b=0;for(let i=1;i<a.length;i+=1)if(a[i].priority>a[b].priority||(a[i].priority===a[b].priority&&a[i].createdAt<a[b].createdAt))b=i;return a[b];}`
- **Dry run:** p2/t5 rồi p2/t3→thay. **Complexity:** `O(n)`.
- **Bẫy/recall:** comparator viết theo thứ tự ưu tiên.

### A01-R10 `[ARR-07]`
- **Tín hiệu/Pattern:** output theo run → flush/reset.
- **State:** run char/count + groups.
- **Check/Update:** same extend; khác flush và reset; flush cuối.
- **Invariant:** groups chứa run đã kết thúc; state là run mở.
- **Full code:** `function encodeRuns(s){if(s.length===0)return[];const out=[];let c=s[0],n=1;for(let i=1;i<s.length;i+=1){if(s[i]===c)n+=1;else{out.push([c,n]);c=s[i];n=1;}}out.push([c,n]);return out;}`
- **Dry run:** `aab`: a1→a2→flush a2/open b1→flush. **Complexity:** `O(n)`.
- **Bẫy/recall:** run cuối không có separator tự nhiên.

### A01-R11 `[ARR-05]`
- **Tín hiệu/Pattern:** transform rồi filter representation.
- **State:** normalized output.
- **Check/Update:** trim/lowercase trước; nonempty→push.
- **Invariant:** output đúng prefix và giữ order.
- **Full code:** `function cleanWords(a){const out=[];for(const raw of a){const word=raw.trim().toLowerCase();if(word.length>0)out.push(word);}return out;}`
- **Dry run:** `[' A ',' ']`→`['a']`. **Complexity:** theo tổng ký tự.
- **Bẫy/recall:** filter raw trước trim làm `' '` lọt.

### A01-R12 `[ARR-06]`
- **Tín hiệu/Pattern:** gần cuối nhất → scan reverse + early return.
- **State:** không cần collection; suffix đã xác nhận không positive.
- **Check/Update:** first positive từ phải→return index.
- **Invariant:** mọi index lớn hơn current không positive.
- **Full code:** `function lastPositiveIndex(a){for(let i=a.length-1;i>=0;i-=1)if(a[i]>0)return i;return -1;}`
- **Dry run:** `[2,-1,3,0]`: i3 no, i2 return2. **Complexity:** worst `O(n)`.
- **Bẫy/recall:** “last” không bắt buộc lưu latest nếu scan reverse.

## Tầng 2 — Điền khuyết

### A01-F01 `[ARR-02]`
- **Tín hiệu/Pattern:** last min → comparator `<=`.
- **State:** bestValue/bestIndex; init index0.
- **Check/Update:** current `<=` best; replace both.
- **Invariant:** bestIndex là index lớn nhất đạt min prefix.
- **Pseudocode:** init0; loop1; <= update; return bestIndex.
- **Full code:**
```js
function lastIndexOfMinimum(values) {
  let bestValue = values[0];
  let bestIndex = 0;
  for (let index = 1; index < values.length; index += 1) {
    if (values[index] <= bestValue) {
      bestValue = values[index];
      bestIndex = index;
    }
  }
  return bestIndex;
}
```
- **Dry run:** `[1,1]`: init0; equality replaces→1. **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** blanks `0,1,<=,bestIndex`; tie encoded in `<=`.

### A01-F02 `[ARR-04]`
- **Tín hiệu/Pattern:** exists zero.
- **State:** chưa gặp witness.
- **Check/Update:** `value===0`→true; terminal false.
- **Invariant:** prefix không có zero.
- **Full code:**
```js
function containsZero(values) {
  for (const value of values) {
    if (value === 0) return true;
  }
  return false;
}
```
- **Dry run:** `[1,0]`: continue→true. **Complexity:** worst `O(n)`.
- **Bẫy/recall:** `if (!value)` còn nhận NaN/false nếu mixed types.

### A01-F03 `[ARR-07]`
- **Tín hiệu/Pattern:** longest equal run.
- **State:** current/best.
- **Check/Update:** same extend, else reset1; max(best,current).
- **Invariant:** current kết thúc tại i, best prefix.
- **Full code:**
```js
function longestEqualRun(values) {
  if (values.length === 0) return 0;
  let currentLength = 1;
  let bestLength = 1;
  for (let index = 1; index < values.length; index += 1) {
    if (values[index] === values[index - 1]) currentLength += 1;
    else currentLength = 1;
    bestLength = Math.max(bestLength, currentLength);
  }
  return bestLength;
}
```
- **Dry run:** `[a,a,b]`: 1→2→1, best2. **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** blanks `0,1,1,bestLength,currentLength`.

## Tầng 3 — Dựng logic

### A01-L01 `[ARR-01]`
- **Tín hiệu/Pattern:** weighted accumulation.
- **State/biến:** checksum prefix; index determines weight.
- **Check/Update:** no branch; add `value*(index%3+1)`.
- **Invariant:** checksum contains contributions before i.
- **Pseudocode:** total0; indexed scan; weight; add; return.
- **Full code:** `function checksum(a){let total=0;for(let i=0;i<a.length;i+=1)total+=a[i]*(i%3+1);return total;}`
- **Dry run:** `[2,2,2,2]`: +2,+4,+6,+2=14. **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** modulo applies to index, parentheses matter.

### A01-L02 `[ARR-05]`
- **Tín hiệu/Pattern:** filter + transformed output with original index.
- **State:** result objects for prefix.
- **Check/Update:** length≥3→push `{originalIndex:index,length}`.
- **Invariant:** output exact for prefix, order preserved.
- **Full code:** `function longStringInfo(a){const out=[];for(let i=0;i<a.length;i+=1)if(a[i].length>=3)out.push({originalIndex:i,length:a[i].length});return out;}`
- **Dry run:** `['a','abc']`→skip→push `{1,3}`. **Complexity:** `O(n)` + output.
- **Bẫy/recall:** index after filter is not original index.

### A01-L03 `[ARR-06]`
- **Tín hiệu/Pattern:** count strict suffix → reverse accumulator.
- **State:** `zeroCount` of right suffix; result.
- **Check/Update:** write old count; if current===0 increment.
- **Invariant:** before i, count refers `[i+1..]`.
- **Full code:** `function zerosToRight(a){const out=Array(a.length);let zeros=0;for(let i=a.length-1;i>=0;i-=1){out[i]=zeros;if(a[i]===0)zeros+=1;}return out;}`
- **Dry run:** `[0,1,0]`: i2 out0/zeros1; i1 out1; i0 out1/zeros2. **Complexity:** `O(n)/O(n)`.
- **Bẫy/recall:** write before increment for strict right.

## Tầng 4 — Pseudocode

### A01-P01 `[ARR-02]`
- **Tín hiệu/Pattern:** argmax comparator 3 levels.
- **State:** best index.
- **Check:** higher score; or equal score lower penalty; if both equal keep earlier by not updating.
- **Update:** bestIndex=current.
- **Invariant:** best wins `(score desc, penalty asc, index asc)` in prefix.
- **Pseudocode:** empty rule; best0; scan1; compute `better`; replace; return.
- **Full code:** `function bestAthlete(a){if(a.length===0)return-1;let b=0;for(let i=1;i<a.length;i+=1){const better=a[i].score>a[b].score||(a[i].score===a[b].score&&a[i].penalty<a[b].penalty);if(better)b=i;}return b;}`
- **Dry run:** `(10,5),(10,3),(10,3)`→0→1→keep1. **Complexity:** `O(n)`.
- **Bẫy/recall:** later tie must not replace; comparator order mirrors contract.

### A01-P02 `[ARR-04]`
- **Tín hiệu/Pattern:** every adjacent relation.
- **State:** prefix nondecreasing; need previous.
- **Check/Update:** loop i=1; if `a[i]<a[i-1]` false; after true.
- **Invariant:** all adjacent pairs ending before i satisfy order.
- **Full code:** `function isNondecreasing(a){for(let i=1;i<a.length;i+=1)if(a[i]<a[i-1])return false;return true;}`
- **Dry run:** `[1,1,0]`: pair 1≥1 pass; 0<1 false. **Complexity:** `O(n)`.
- **Bẫy/recall:** loop from0 reads `a[-1]`; revealing tests `[]`, `[1]`, `[2,1]`.

### A01-P03 `[ARR-07]`
- **Tín hiệu/Pattern:** RLE flush.
- **State:** current char/count + output string.
- **Check/Update:** same extend; different append old and reset; append last after loop.
- **Invariant:** output contains closed runs, state is open run.
- **Full code:** `function encode(s){if(s.length===0)return'';let out='',char=s[0],count=1;for(let i=1;i<s.length;i+=1){if(s[i]===char)count+=1;else{out+=char+String(count);char=s[i];count=1;}}return out+char+String(count);}`
- **Dry run:** `aaabb`: a1→a3; b triggers `a3`, b2; final→`a3b2`. **Complexity:** `O(n)` logical; JS concatenation implementation-dependent.
- **Bẫy/recall:** missing final flush; multi-digit count formatting.

## Tầng 5 — Tự code

### A01-C01 `[ARR-01 + ARR-03]`
- **Tín hiệu/Pattern:** two scalar accumulators in one scan.
- **State:** wrongCount, totalPenalty for prefix.
- **Check/Update:** if answer false, increment and add matching penalty.
- **Invariant:** both fields exactly summarize wrong indices in prefix.
- **Pseudocode:** validate same length if contract needs; scan; false→two updates; return object.
- **Full code:**
```js
function penaltySummary(answers, penalties) {
  let wrongCount = 0;
  let totalPenalty = 0;
  for (let index = 0; index < answers.length; index += 1) {
    if (answers[index] === false) {
      wrongCount += 1;
      totalPenalty += penalties[index];
    }
  }
  return { wrongCount, totalPenalty };
}
```
- **Dry run:** `[true,false,false]`, `[2,3,5]`: no→(1,3)→(2,8).
- **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** `!answer` nhận non-boolean; arrays length contract; updates cùng condition.

### A01-C02 `[ARR-02]`
- **Tín hiệu/Pattern:** best object with two explicit keys and implicit first tie.
- **State:** best order/index.
- **Check/Update:** priority greater or equal priority distance smaller; exact tie no replace.
- **Invariant:** best wins comparator in prefix.
- **Full code:**
```js
function selectOrder(orders) {
  if (orders.length === 0) return null;
  let bestIndex = 0;
  for (let index = 1; index < orders.length; index += 1) {
    const current = orders[index];
    const best = orders[bestIndex];
    const isBetter = current.priority > best.priority
      || (current.priority === best.priority && current.distance < best.distance);
    if (isBetter) bestIndex = index;
  }
  return orders[bestIndex].id;
}
```
- **Dry run:** A p2/d5, B p2/d3, C p2/d3→A→B→keep B.
- **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** return id, not object; exact tie keeps first because condition excludes equality.

### A01-C03 `[ARR-07]`
- **Tín hiệu/Pattern:** longest run by adjacent relation + interval return.
- **State:** runStart; bestStart/bestEnd; current index supplies run end.
- **Check/Update:** difference≤1 continue; else reset start=i; update best only if strictly longer (keeps early tie).
- **Invariant:** runStart..i is longest valid suffix ending i; best is earliest max run in prefix.
- **Full code:**
```js
function longestStableSegment(temperatures) {
  if (temperatures.length === 0) return [-1, -1];
  let runStart = 0;
  let bestStart = 0;
  let bestEnd = 0;

  for (let index = 1; index < temperatures.length; index += 1) {
    const difference = Math.abs(temperatures[index] - temperatures[index - 1]);
    if (difference > 1) runStart = index;

    const currentLength = index - runStart + 1;
    const bestLength = bestEnd - bestStart + 1;
    if (currentLength > bestLength) {
      bestStart = runStart;
      bestEnd = index;
    }
  }
  return [bestStart, bestEnd];
}
```
- **Dry run:** `[3,4,7,6]`: run0..1 best; break at2; 2..3 tie length2, keep 0..1.
- **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** relation is adjacent, not max-min whole run; `>=` would take later tie.

## Tầng 6 — Biến thể

### A01-V01 `[ARR-02]`
- **Tín hiệu/Pattern:** same comparator, exact tie rule changes.
- **State:** unchanged.
- **Check/Update:** add third condition `priority equal && distance equal` so later replaces; equivalently use distance `<=` inside priority tie.
- **Invariant:** best wins, exact tie has largest index.
- **Full code:** `function selectLatestTie(a){if(a.length===0)return null;let b=0;for(let i=1;i<a.length;i+=1)if(a[i].priority>a[b].priority||(a[i].priority===a[b].priority&&a[i].distance<=a[b].distance))b=i;return a[b].id;}`
- **Dry run:** B/C exact tie→C replaces. **Complexity:** `O(n)`.
- **Bẫy/recall:** `<=` is only safe inside equal-priority branch.

### A01-V02 `[ARR-06]`
- **Tín hiệu/Pattern:** inclusive suffix.
- **State:** suffix max including current after update.
- **Check/Update:** update suffix first, then result[i]=suffix.
- **Invariant:** after update at i, suffix is max `[i..n-1]`.
- **Full code:** `function suffixMaxInclusive(a){const out=Array(a.length);let m=null;for(let i=a.length-1;i>=0;i-=1){if(m===null||a[i]>m)m=a[i];out[i]=m;}return out;}`
- **Dry run:** `[3,1]`: i1 update1/out1; i0 update3/out3. **Complexity:** `O(n)/O(n)`.
- **Bẫy/recall:** strict suffix writes before; inclusive writes after.

### A01-V03 `[ARR-07 → ARR-05]`
- **Tín hiệu/Pattern:** enumerate runs, not choose best.
- **State:** open run value/start + output groups; remove best.
- **Check/Update:** on change push old group, reset; push final after loop.
- **Invariant:** output has closed runs; state is current open run.
- **Full code:**
```js
function listRuns(values) {
  if (values.length === 0) return [];
  const runs = [];
  let runValue = values[0];
  let runStart = 0;
  for (let index = 1; index < values.length; index += 1) {
    if (values[index] !== runValue) {
      runs.push([runValue, runStart, index - runStart]);
      runValue = values[index];
      runStart = index;
    }
  }
  runs.push([runValue, runStart, values.length - runStart]);
  return runs;
}
```
- **Dry run:** `[a,a,b]`: open a0; at2 flush `[a,0,2]`; final `[b,2,1]`.
- **Complexity:** `O(n)` + output.
- **Bẫy/recall:** length at break is `index-runStart`; final uses `n-runStart`.

## Transfer Tests

### A01-T01 `[ARR-01 + ARR-02]` — Trạm pin
- **Tín hiệu quan trọng:** tổng theo station rồi chọn max positive/tie first. **Gây nhiễu:** timestamp không dùng.
- **Dạng gần nhất:** nhiều accumulator theo danh sách station + best comparator; không có skeleton mới.
- **State/biến:** `totals[i]`; best station index; station list/order do contract cung cấp.
- **Check/Update:** tìm station index, cộng charge; sau log scan totals, chỉ total>0, update strictly greater.
- **Invariant:** totals đúng prefix log; best đúng stations đã scan và hòa giữ first.
- **Pseudocode:** init totals0; events accumulate; scan stations positive argmax; return id/null.
- **Full code:**
```js
function bestChargingStation(stationIds, logs) {
  const totals = Array(stationIds.length).fill(0);
  for (const [, stationId, charge] of logs) {
    const stationIndex = stationIds.indexOf(stationId);
    totals[stationIndex] += charge;
  }
  let bestIndex = -1;
  for (let index = 0; index < totals.length; index += 1) {
    if (totals[index] <= 0) continue;
    if (bestIndex === -1 || totals[index] > totals[bestIndex]) bestIndex = index;
  }
  return bestIndex === -1 ? null : stationIds[bestIndex];
}
```
- **Dry run:** ids A,B; A+2,B+3,A+1→totals[3,3], scan strict greater keeps A.
- **Complexity:** `O(events*stations)`; stations≤5 nên `O(events)` operationally, `O(stations)` space.
- **Bẫy/recall:** nếu station không nhỏ cố định, `indexOf` lặp cần MAP-03; tie dựa station list/input rule.

### A01-T02 `[ARR-07]` — Chuỗi tín hiệu
- **Tín hiệu quan trọng:** adjacent parity alternation; longest run; tie ending later. **Gây nhiễu:** device.
- **Phần giữ/sửa:** giữ runStart/best; relation đổi sang parity khác; tie condition dùng `>=` để later end replace; return object.
- **State:** `segmentStart`, `winnerStart`, `winnerEnd`.
- **Check/Update:** same parity→reset at current; otherwise continue; current length `>=` best→replace.
- **Invariant:** segmentStart..i là alternating suffix; winner là longest prefix, hòa end lớn hơn.
- **Full code:**
```js
function longestAlternatingSignal(readings) {
  if (readings.length === 0) return { start: -1, end: -1, length: 0 };
  let segmentStart = 0;
  let winnerStart = 0;
  let winnerEnd = 0;

  for (let index = 1; index < readings.length; index += 1) {
    const previousParity = Math.abs(readings[index - 1].level % 2);
    const currentParity = Math.abs(readings[index].level % 2);
    if (currentParity === previousParity) segmentStart = index;

    const candidateSize = index - segmentStart + 1;
    const winnerSize = winnerEnd - winnerStart + 1;
    if (candidateSize >= winnerSize) {
      winnerStart = segmentStart;
      winnerEnd = index;
    }
  }
  return { start: winnerStart, end: winnerEnd, length: winnerEnd - winnerStart + 1 };
}
```
- **Dry run:** levels 2,4,3: at1 same reset1, tie length1 later wins; at2 alternate length2 wins `[1,2]`.
- **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** negative odd modulo; `>=` implements later-end tie; device is noise.

## Mini-test A01-M01

### A01-M01.1 `[ARR-01 + ARR-02]`
- **Pattern/state:** compute digit sum per number; best sum/index, `>=` for last tie.
- **Invariant:** bestIndex cuối cùng đạt max digit sum prefix.
- **Full code:**
```js
function lastIndexWithMaximumDigitSum(values) {
  let bestIndex = -1;
  let bestSum = -1;
  for (let index = 0; index < values.length; index += 1) {
    let number = values[index];
    let digitSum = 0;
    do {
      digitSum += number % 10;
      number = Math.floor(number / 10);
    } while (number > 0);
    if (digitSum >= bestSum) {
      bestSum = digitSum;
      bestIndex = index;
    }
  }
  return bestIndex;
}
```
- **Dry run:** `[19,28]`: sums10/10, `>=` picks1. **Complexity:** `O(total digits)`.
- **Bẫy/recall:** number0 needs do-while; contract nonnegative.

### A01-M01.2 `[ARR-05]`
- **Pattern/state:** build output characters.
- **Check/update:** ASCII alphabet range then uppercase push.
- **Invariant:** output normalized alphabet chars of prefix.
- **Full code:** `function uppercaseLetters(s){const out=[];for(const c of s){const lower=c.toLowerCase();if(lower>='a'&&lower<='z')out.push(c.toUpperCase());}return out;}`
- **Dry run:** `a1!B`→A,skip,skip,B. **Complexity:** `O(n)`.
- **Bẫy/recall:** contract alphabet likely ASCII; Unicode cần khác.

### A01-M01.3 `[ARR-06, ARR-07]`
- **Pattern/state:** scan reverse only suffix final; count until counterexample.
- **Check/update:** positive→count; first nonpositive→break.
- **Invariant:** count là số positive liên tiếp từ end qua suffix đã scan.
- **Full code:** `function positiveSuffixLength(a){let count=0;for(let i=a.length-1;i>=0;i-=1){if(a[i]<=0)break;count+=1;}return count;}`
- **Dry run:** `[1,-1,2,3]`: from right count1→2→break. **Complexity:** worst `O(n)`.
- **Bẫy/recall:** đây không phải tổng số positive; break là transition kết thúc run.

## Cách recall

Viết trước “state mô tả prefix hay suffix nào?”. Sau đó chọn động từ: combine, replace best, increment, early return, push, reverse-update hay extend/reset. Nếu không nói được loop start bằng invariant, chưa code.
