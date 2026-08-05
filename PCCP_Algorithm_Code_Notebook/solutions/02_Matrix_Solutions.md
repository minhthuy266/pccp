# Lời giải — Chapter 02 Matrix

> Chỉ mở sau khi tự ghi shape, mapping/bounds và invariant. [Quay lại Practice](../chapters/02_matrix/03_Practice_Ladder.md).

## Tầng 1 — Nhận diện

### M02-R01 `[MAT-01]`
- **Tín hiệu/Pattern:** mọi ô + conditional accumulator.
- **State:** sum negative của cells đã quét. **Check/Update:** value<0→add.
- **Invariant:** sum đúng processed cells. **Pseudocode:** nested scan/check/add.
- **Full code:** `function sumNegatives(m){let s=0;for(const row of m)for(const v of row)if(v<0)s+=v;return s;}`
- **Dry run:** `[-2,1],[-3]`: 0→-2→-2→-5. **Complexity:** `O(cells)/O(1)`.
- **Bẫy/recall:** ragged matrix dùng `for...of row` nếu được phép.

### M02-R02 `[MAT-01]`
- **Pattern/state:** column count array length cols.
- **Check/Update:** zero→counts[col]++.
- **Invariant:** counts đúng rows processed/cells prefix.
- **Full code:** `function zeroCountsByColumn(m){if(m.length===0)return[];const out=Array(m[0].length).fill(0);for(let r=0;r<m.length;r+=1)for(let c=0;c<m[0].length;c+=1)if(m[r][c]===0)out[c]+=1;return out;}`
- **Dry run:** `[[0,1],[0,0]]`→`[2,1]`. **Complexity:** `O(rc)/O(c)`.
- **Bẫy/recall:** output length cols, not rows.

### M02-R03 `[MAT-02]`
- **Pattern/state:** anti diagonal max; index loop.
- **Check/Update:** value `[i][n-1-i]` better→replace.
- **Invariant:** best anti cells rows 0..i.
- **Full code:** `function antiDiagonalMax(m){let b=m[0][m.length-1];for(let i=1;i<m.length;i+=1)b=Math.max(b,m[i][m.length-1-i]);return b;}`
- **Dry run:** 3×3 anti 3,5,7→7. **Complexity:** `O(n)/O(1)`.
- **Bẫy/recall:** `n-1-i`, square nonempty contract.

### M02-R04 `[MAT-02]`
- **Pattern/state:** union diagonals conditional count.
- **Check/Update:** test main even; anti if different coordinate and even.
- **Invariant:** union cells processed exactly once.
- **Full code:** `function countEvenDiagonalUnion(m){let n=0;for(let i=0;i<m.length;i+=1){if(m[i][i]%2===0)n+=1;const c=m.length-1-i;if(c!==i&&m[i][c]%2===0)n+=1;}return n;}`
- **Dry run:** 1×1 even→1, not2. **Complexity:** `O(n)`.
- **Bẫy/recall:** compare coordinates, not values.

### M02-R05 `[MAT-03]`
- **Pattern/state:** 8 directions + bounds + output coordinates.
- **Check/Update:** inside→push pair.
- **Invariant:** output contains valid directions processed.
- **Full code:** `function eightNeighbors(rows,cols,r,c){const out=[];for(let dr=-1;dr<=1;dr+=1)for(let dc=-1;dc<=1;dc+=1){if(dr===0&&dc===0)continue;const nr=r+dr,nc=c+dc;if(nr>=0&&nr<rows&&nc>=0&&nc<cols)out.push([nr,nc]);}return out;}`
- **Dry run:** corner in 2×2→3 neighbors. **Complexity:** `O(1)`.
- **Bẫy/recall:** exclude `[0,0]`.

### M02-R06 `[MAT-03]`
- **Pattern/state:** four-neighbor conditional count.
- **Check order:** bounds then `grid[nr][nc]==='#'`.
- **Invariant:** count correct for directions processed.
- **Full code:** `function wallNeighbors(g,r,c){let n=0;for(const[dr,dc]of[[-1,0],[1,0],[0,-1],[0,1]]){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<g.length&&nc>=0&&nc<g[0].length&&g[nr][nc]==='#')n+=1;}return n;}`
- **Dry run:** corner tries two outside, two inside. **Complexity:** `O(1)`.
- **Bẫy/recall:** short-circuit bounds before read.

### M02-R07 `[MAT-04]`
- **Pattern/state:** transpose mapping; output cols×rows.
- **Transition:** out[c][r]=m[r][c].
- **Invariant:** processed source cells mapped once.
- **Full code:** `function transpose(m){if(m.length===0)return[];const out=Array.from({length:m[0].length},()=>Array(m.length));for(let r=0;r<m.length;r+=1)for(let c=0;c<m[0].length;c+=1)out[c][r]=m[r][c];return out;}`
- **Dry run:** 2×3→3×2. **Complexity:** `O(rc)` output.
- **Bẫy/recall:** independent rows.

### M02-R08 `[MAT-04]`
- **Pattern/state:** reflect mapping within same shape.
- **Transition:** out[r][cols-1-c]=m[r][c].
- **Invariant:** source prefix placed.
- **Full code:** `function reflectRows(m){return m.map(row=>[...row].reverse());}`
- **Dry run:** `[1,2,3]→[3,2,1]`. **Complexity:** `O(cells)`.
- **Bẫy/recall:** `row.reverse()` mutates input; clone first.

### M02-R09 `[MAT-05]`
- **Pattern/state:** command simulation; current coordinate.
- **Check/Update:** candidate inside/passable→commit.
- **Invariant:** position after command prefix.
- **Full code:** `function move(g,start,commands){let[r,c]=start;const d={U:[-1,0],D:[1,0],L:[0,-1],R:[0,1]};for(const command of commands){const nr=r+d[command][0],nc=c+d[command][1];if(nr>=0&&nr<g.length&&nc>=0&&nc<g[0].length&&g[nr][nc]!=="#"){r=nr;c=nc;}}return[r,c];}`
- **Dry run:** valid move commits, invalid keeps old. **Complexity:** `O(commands+cells)`.
- **Bẫy/recall:** candidate trước commit.

### M02-R10 `[MAT-05]`
- **Pattern chính/phụ:** flood fill BFS/DFS + MAT-03.
- **State:** stack, visited, count; target color.
- **Update:** mark start; pop; generate valid same-color unseen, mark then push.
- **Invariant:** visited are discovered target cells; each once.
- **Full code:** `function regionSize(g,sr,sc){const seen=Array.from({length:g.length},()=>Array(g[0].length).fill(false));const stack=[[sr,sc]],target=g[sr][sc];seen[sr][sc]=true;let count=0;while(stack.length){const[r,c]=stack.pop();count+=1;for(const[dr,dc]of[[-1,0],[1,0],[0,-1],[0,1]]){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<g.length&&nc>=0&&nc<g[0].length&&!seen[nr][nc]&&g[nr][nc]===target){seen[nr][nc]=true;stack.push([nr,nc]);}}}return count;}`
- **Dry run:** two adjacent same cells mark/push once. **Complexity:** `O(rc)`.
- **Bẫy/recall:** mark on discover, not after repeated pushes.

### M02-R11 `[MAT-01 + ARR-02]`
- **Pattern/state:** nested scan + best coordinate.
- **Check/Update:** strictly greater only; row-major scan keeps row/col smallest tie.
- **Invariant:** best is earliest row-major max processed.
- **Full code:** `function maxCoordinate(m){let br=0,bc=0;for(let r=0;r<m.length;r+=1)for(let c=0;c<m[0].length;c+=1)if(m[r][c]>m[br][bc]){br=r;bc=c;}return[br,bc];}`
- **Dry run:** equal later does not replace. **Complexity:** `O(rc)`.
- **Bẫy/recall:** traversal order and strict comparator implement tie.

### M02-R12 `[MAT-04]`
- **Pattern/state:** counterclockwise coordinate mapping.
- **Transition:** `(r,c)→(cols-1-c,r)`, output cols×rows.
- **Invariant:** processed sources placed.
- **Full code:** `function rotateCounterclockwise(m){if(m.length===0)return[];const rows=m.length,cols=m[0].length,out=Array.from({length:cols},()=>Array(rows));for(let r=0;r<rows;r+=1)for(let c=0;c<cols;c+=1)out[cols-1-c][r]=m[r][c];return out;}`
- **Dry run:** source(0,0) in 2×3→dest(2,0). **Complexity:** `O(rc)`.
- **Bẫy/recall:** clockwise uses `(c,rows-1-r)`; do not mirror wrong axis.

## Tầng 2 — Điền khuyết

### M02-F01 `[MAT-01]`
- **State/Invariant:** total processed cells; rectangular shape.
- **Full code:**
```js
function sumMatrix(matrix) {
  const rows = matrix.length;
  const cols = rows === 0 ? 0 : matrix[0].length;
  let total = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) total += matrix[row][col];
  }
  return total;
}
```
- **Dry run:** 2×3 visits six coordinates. **Complexity:** `O(rc)`.
- **Bẫy/recall:** blanks `length,0,length,rows,cols,row,col`.

### M02-F02 `[MAT-03]`
- **State:** candidate next coordinate.
- **Check/Update:** deltas; bounds use zero and `<`; invalid continue.
- **Full code:**
```js
function validFourNeighbors(rows, cols, row, col) {
  const result = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [rowDelta, colDelta] of directions) {
    const nextRow = row + rowDelta;
    const nextCol = col + colDelta;
    const isInside = nextRow >= 0 && nextRow < rows
      && nextCol >= 0 && nextCol < cols;
    if (!isInside) continue;
    result.push([nextRow, nextCol]);
  }
  return result;
}
```
- **Dry run:** nextCol=cols fails `<cols`. **Complexity:** `O(1)` per direction.
- **Bẫy/recall:** never `<= cols`.

### M02-F03 `[MAT-04]`
- **Mapping:** output `cols×rows`; `[col][rows-1-row]`.
- **Invariant:** source prefix placed.
- **Full code:**
```js
function rotateClockwiseFilled(matrix) {
  if (matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows));
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      rotated[col][rows - 1 - row] = matrix[row][col];
    }
  }
  return rotated;
}
```
- **Dry run:** 2×3 source(1,2)→dest(2,0). **Complexity:** assignment O(1).
- **Bẫy/recall:** shape and formula use different dimensions deliberately.

## Tầng 3 — Dựng logic

### M02-L01 `[MAT-01 + ARR-02]`
- **State:** current rowSum; bestSum/bestRow.
- **Check/Update:** after finishing row, `rowSum >= bestSum` for last tie.
- **Invariant:** current sum complete only after inner loop; best last max among completed rows.
- **Full code:** `function lastMaxRow(m){let best=-1,bestSum=-Infinity;for(let r=0;r<m.length;r+=1){let sum=0;for(const v of m[r])sum+=v;if(sum>=bestSum){bestSum=sum;best=r;}}return best;}`
- **Dry run:** row sums5,5→best0 then best1. **Complexity:** `O(cells)`.
- **Bẫy/recall:** compare before row complete; reset sum each row.

### M02-L02 `[MAT-03]`
- **State:** count directions valid; no matrix needed.
- **Check:** exclude self; bounds.
- **Invariant:** count valid neighbor coordinates among deltas processed.
- **Full code:** `function neighborCount8(rows,cols,r,c){let n=0;for(let dr=-1;dr<=1;dr+=1)for(let dc=-1;dc<=1;dc+=1)if((dr!==0||dc!==0)&&r+dr>=0&&r+dr<rows&&c+dc>=0&&c+dc<cols)n+=1;return n;}`
- **Dry run:** center3×3→8; corner→3. **Complexity:** O(1).
- **Bẫy/recall:** coordinate shape sufficient; value irrelevant.

### M02-L03 `[MAT-05]`
- **Pattern/state:** transactional simulation; current position, temporary candidate path.
- **Check/Update:** simulate steps in temp row/col; any invalid rejects whole command; only then commit current=temp.
- **Invariant:** current is state after committed command prefix; temp is tentative state within command.
- **Full code:** `function moveTransaction(g,start,commands){let[r,c]=start;const d={U:[-1,0],D:[1,0],L:[0,-1],R:[0,1]};for(const[dir,steps]of commands){let tr=r,tc=c,ok=true;for(let s=0;s<steps;s+=1){const nr=tr+d[dir][0],nc=tc+d[dir][1];if(nr<0||nr>=g.length||nc<0||nc>=g[0].length||g[nr][nc]==='#'){ok=false;break;}tr=nr;tc=nc;}if(ok){r=tr;c=tc;}}return[r,c];}`
- **Dry run:** 2-step command second hits wall→current unchanged. **Complexity:** O(total attempted steps).
- **Bẫy/recall:** commit temp each step violates all-or-nothing contract.

## Tầng 4 — Pseudocode

### M02-P01 `[MAT-02]`
- **State:** mainSum, antiSum; center belongs to both so no dedup condition.
- **Transition:** add `[i][i]` and `[i][n-1-i]`; return difference.
- **Invariant:** each sum đúng own diagonal prefix.
- **Full code:** `function diagonalDifference(m){let main=0,anti=0;for(let i=0;i<m.length;i+=1){main+=m[i][i];anti+=m[i][m.length-1-i];}return main-anti;}`
- **Dry run:** 1×1 gives x-x=0. **Complexity:** O(n).
- **Bẫy/recall:** union dedups center; two separate sums do not.

### M02-P02 `[MAT-04]`
- **State/mapping:** dest cols×rows; `(r,c)→(cols-1-c,r)`.
- **Full code:** `function rotateCounter(m){if(m.length===0)return[];const rows=m.length,cols=m[0].length,out=Array.from({length:cols},()=>Array(rows));for(let r=0;r<rows;r+=1)for(let c=0;c<cols;c+=1)out[cols-1-c][r]=m[r][c];return out;}`
- **Dry run:** 2×3 becomes 3×2. **Complexity:** O(rc).
- **Bẫy/recall:** derive with labeled corners, not memorize isolated formula.

### M02-P03 `[MAT-05 + BFS-02]`
- **State:** stack/queue, visited independent rows, count.
- **Check/Update:** start valid1; mark before push; pop and expand 4 neighbors.
- **Invariant:** each discovered 1 marked and enters frontier once.
- **Full code:** `function fillSize(g,sr,sc){if(g[sr][sc]!==1)return 0;const seen=Array.from({length:g.length},()=>Array(g[0].length).fill(false)),stack=[[sr,sc]];seen[sr][sc]=true;let n=0;while(stack.length){const[r,c]=stack.pop();n+=1;for(const[dr,dc]of[[-1,0],[1,0],[0,-1],[0,1]]){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<g.length&&nc>=0&&nc<g[0].length&&!seen[nr][nc]&&g[nr][nc]===1){seen[nr][nc]=true;stack.push([nr,nc]);}}}return n;}`
- **Dry run:** cyclic 2×2 all1 still each cell once.
- **Complexity:** O(rc) time/space.
- **Bẫy/recall:** mark when enqueue/push prevents duplicates.

## Tầng 5 — Tự code

### M02-C01 `[MAT-01 + ARR-02]`
- **State:** per-column min/max; best range/index.
- **Check/Update:** initialize from row0; scan rows; afterward strict smaller keeps first tie.
- **Invariant:** min/max correct rows processed; best correct columns processed.
- **Full code:**
```js
function mostStableColumn(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const minimums = [...matrix[0]];
  const maximums = [...matrix[0]];
  for (let row = 1; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      minimums[col] = Math.min(minimums[col], matrix[row][col]);
      maximums[col] = Math.max(maximums[col], matrix[row][col]);
    }
  }
  let bestColumn = 0;
  for (let col = 1; col < cols; col += 1) {
    if (maximums[col] - minimums[col] < maximums[bestColumn] - minimums[bestColumn]) {
      bestColumn = col;
    }
  }
  return bestColumn;
}
```
- **Dry run:** cols ranges3,1,1→col1 wins; col2 tie stays. **Complexity:** O(rc), O(c).
- **Bẫy/recall:** init Infinity works too; strict `<` implements first tie.

### M02-C02 `[MAT-03]`
- **State:** peaks output; current `isPeak`.
- **Check/Update:** for each cell test valid neighbors; any neighbor≥current makes false/break; if remains push.
- **Invariant:** `isPeak` means all valid directions processed are smaller.
- **Full code:**
```js
function localPeaks(matrix) {
  const rows = matrix.length;
  if (rows === 0) return [];
  const cols = matrix[0].length;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const peaks = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      let isPeak = true;
      for (const [dr, dc] of directions) {
        const nr = row + dr, nc = col + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        if (matrix[nr][nc] >= matrix[row][col]) { isPeak = false; break; }
      }
      if (isPeak) peaks.push([row, col]);
    }
  }
  return peaks;
}
```
- **Dry run:** 1×1 has no counterexample→peak. **Complexity:** O(rc), output space.
- **Bẫy/recall:** strict greater means equal neighbor disqualifies.

### M02-C03 `[MAT-04]`
- **State:** rotated new matrix.
- **Transition:** map source; transform value with max(0,value) at write.
- **Invariant:** processed source cells mapped/normalized; input untouched.
- **Full code:**
```js
function rotateClockwiseAndClamp(matrix) {
  if (matrix.length === 0) return [];
  const rows = matrix.length, cols = matrix[0].length;
  const output = Array.from({ length: cols }, () => Array(rows));
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      output[col][rows - 1 - row] = Math.max(0, matrix[row][col]);
    }
  }
  return output;
}
```
- **Dry run:** `[[-1,2],[3,-4]]→[[3,0],[0,2]]`. **Complexity:** O(rc).
- **Bẫy/recall:** normalize source would mutate if assigned; transform destination value.

## Tầng 6 — Biến thể

### M02-V01 `[MAT-01 → MAT-02]`
- **Giữ/sửa:** bỏ nested col traversal; một index sinh hai cells; add center condition cho union.
- **Invariant:** union diagonals rows processed. **Full code:** `function diagonalUnion(m){let sum=0;for(let i=0;i<m.length;i+=1){sum+=m[i][i];const c=m.length-1-i;if(c!==i)sum+=m[i][c];}return sum;}`
- **Dry run:** n3 visits 5 unique, không9. **Complexity:** O(n) thay O(n²).
- **Bẫy/recall:** chỉ hợp matrix vuông/contract diagonal.

### M02-V02 `[MAT-03 → MAT-05]`
- **State thêm:** frontier, visited, region result/count.
- **Transition:** neighbor generation lặp cho mỗi popped cell; valid unseen→mark+push.
- **Invariant:** frontier chứa discovered chưa xử lý; visited ngăn vòng.
- **Full code:** `function sameRegionSize(g,sr,sc){const target=g[sr][sc],seen=Array.from({length:g.length},()=>Array(g[0].length).fill(false)),stack=[[sr,sc]];seen[sr][sc]=true;let n=0;while(stack.length){const[r,c]=stack.pop();n+=1;for(const[dr,dc]of[[-1,0],[1,0],[0,-1],[0,1]]){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<g.length&&nc>=0&&nc<g[0].length&&!seen[nr][nc]&&g[nr][nc]===target){seen[nr][nc]=true;stack.push([nr,nc]);}}}return n;}`
- **Dry run:** hai ô kề discover nối tiếp. **Complexity:** O(rc).
- **Bẫy/recall:** MAT-03 chỉ một center; flood fill biến neighbor thành transition lặp.

### M02-V03 `[MAT-04]`
- **Shape:** vẫn cols×rows. **Mapping:** clockwise `(c,rows-1-r)` → counter `(cols-1-c,r)`.
- **Full code:** `function rotateCounterVariant(m){if(m.length===0)return[];const rows=m.length,cols=m[0].length,out=Array.from({length:cols},()=>Array(rows));for(let r=0;r<rows;r+=1)for(let c=0;c<cols;c+=1)out[cols-1-c][r]=m[r][c];return out;}`
- **Dry run:** source top-left sang bottom-left destination.
- **Complexity:** O(rc). **Bẫy/recall:** shape giống nhưng formula không.

## Transfer Tests

### M02-T01 `[MAT-01 + ARR-02]` — Camera nhiệt
- **Tín hiệu thật:** per-row average/count excluding col0, then argmax last tie. **Nhiễu:** timestamp.
- **State:** row sum over cols1.., average, hotCount; bestCount/bestRow.
- **Check/Update:** compute average; count temp>avg; `>=` replace for last tie.
- **Invariant:** row stats correct; best last max among completed rows.
- **Full code:**
```js
function hottestCameraRow(matrix) {
  let bestRow = -1;
  let bestCount = -1;
  for (let row = 0; row < matrix.length; row += 1) {
    let sum = 0;
    for (let col = 1; col < matrix[row].length; col += 1) sum += matrix[row][col];
    const sampleCount = matrix[row].length - 1;
    const average = sum / sampleCount;
    let aboveAverage = 0;
    for (let col = 1; col < matrix[row].length; col += 1) {
      if (matrix[row][col] > average) aboveAverage += 1;
    }
    if (aboveAverage >= bestCount) { bestCount = aboveAverage; bestRow = row; }
  }
  return bestRow;
}
```
- **Dry run:** rows equal counts→later replaces. **Complexity:** O(cells).
- **Bẫy/recall:** denominator excludes timestamp; requires at least one temperature/row.

### M02-T02 `[MAT-04]` — Tem kiểm kho
- **Tín hiệu thật:** target coordinate + transform, không cần materialize. **Nhiễu:** string content other than equality.
- **State:** found source row/col; destination shape cols×rows.
- **Transition:** counterclockwise mapping `(r,c)→(cols-1-c,r)`.
- **Invariant:** once target found, mapped coordinate is final answer.
- **Full code:**
```js
function rotatedTargetCoordinate(matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (matrix[row][col] === target) return [cols - 1 - col, row];
    }
  }
  return [-1, -1];
}
```
- **Dry run:** target at source(1,2) in2×3→dest(0,1). **Complexity:** O(rc) worst/O(1).
- **Bẫy/recall:** destination shape needed to interpret coordinate; unique target enables early return.

## Mini-test M02-M01

### M02-M01.1 `[MAT-01]`
- **State:** border sum; condition `r===0 || r===rows-1 || c===0 || c===cols-1` counts each cell once.
- **Invariant:** sum border cells in processed prefix.
- **Full code:** `function borderSum(m){if(m.length===0)return 0;let s=0;for(let r=0;r<m.length;r+=1)for(let c=0;c<m[0].length;c+=1)if(r===0||r===m.length-1||c===0||c===m[0].length-1)s+=m[r][c];return s;}`
- **Dry run:** 1×3 every cell condition true once. **Complexity:** O(rc).
- **Bẫy/recall:** four separate edge loops double-count corners/1D shapes.

### M02-M01.2 `[MAT-05]`
- **Contract contrast:** valid prefix steps commit; invalid step stops current command, unlike transactional L03.
- **State:** current row/col; each step compute/validate/commit; break command only.
- **Invariant:** position after all valid steps processed so far.
- **Full code:**
```js
function moveUntilBlocked(grid, start, commands) {
  let [row, col] = start;
  const delta = { U: [-1,0], D: [1,0], L: [0,-1], R: [0,1] };
  for (const [direction, steps] of commands) {
    for (let step = 0; step < steps; step += 1) {
      const nr = row + delta[direction][0], nc = col + delta[direction][1];
      if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length || grid[nr][nc] === "#") break;
      row = nr; col = nc;
    }
  }
  return [row, col];
}
```
- **Dry run:** first of 3 steps valid, second blocked→keeps first then next command.
- **Complexity:** O(attempted steps). **Bẫy/recall:** `break` inner loop, not return/all commands.

### M02-M01.3 `[MAT-01, MAT-04]`
- **Observation:** rows of transpose are source columns; no output matrix needed.
- **State:** sums length source cols.
- **Transition:** add `matrix[r][c]` to `sums[c]`.
- **Invariant:** sums are totals of transpose rows for source cells processed.
- **Full code:** `function transposedRowSums(m){if(m.length===0)return[];const sums=Array(m[0].length).fill(0);for(let r=0;r<m.length;r+=1)for(let c=0;c<m[0].length;c+=1)sums[c]+=m[r][c];return sums;}`
- **Dry run:** `[[1,2],[3,4]]`→[4,6]. **Complexity:** O(rc), O(c).
- **Bẫy/recall:** combination can avoid materialization because return only aggregate.

## Cách recall

Viết `rows`, `cols`, source/destination shape và invariant trước. Với neighbor: `delta→candidate→bounds→content→visited`. Với transform: `shape→mapping→assign`. Với movement: `candidate→validate→commit`.
