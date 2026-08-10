# Map/Set nâng cao từ gốc: group, quan hệ, window và state đồng bộ

[← Map/Set lõi](01_Core_From_Zero.md) · [Bộ đề thật](04_Programmers_PCCP_Set.md) · [Solutions](../../solutions/03_Map_Set_Programmers_Solutions.md)

Phần này dành cho các đề không còn chỉ là `value → count`. Mỗi lần gặp một Map mới, phải viết ra một câu “key này đại diện ai; value này đại diện điều gì tại đúng thời điểm nào”.

## 1. Group khác frequency ở chỗ value giữ cả một tập item

### Bài toán

Mỗi transaction là `{team, score}`. Trả team có tổng score lớn nhất; hòa lấy team xuất hiện đầu tiên trong input.

Không thể chỉ giữ `bestTeam` ngay từ đầu nếu chưa biết tổng cuối của từng team. Ta group/aggregate trước, sau đó mới chọn.

```js
function highestScoringTeam(transactions) {
  const totalByTeam = new Map();
  const firstSeenOrder = new Map();

  for (let index = 0; index < transactions.length; index += 1) {
    const { team, score } = transactions[index];

    if (!firstSeenOrder.has(team)) {
      firstSeenOrder.set(team, index);
    }

    totalByTeam.set(team, (totalByTeam.get(team) ?? 0) + score);
  }

  let bestTeam = null;
  let bestScore = -Infinity;

  for (const [team, total] of totalByTeam) {
    if (total > bestScore) {
      bestTeam = team;
      bestScore = total;
    }
  }

  return bestTeam;
}
```

Vì `Map` duyệt theo thứ tự key được thêm lần đầu, chỉ update khi `total > bestScore` là đủ để giữ team xuất hiện đầu tiên khi hòa. Tuy nhiên trong bài thi, nếu luật hòa không trùng insertion order, hãy so tie rõ ràng bằng `firstSeenOrder` thay vì dựa ngầm vào nó.

### Khi cần tất cả item của group

`Map<team, array>`: dùng khi output cần danh sách member/item; array giữ duplicate và thứ tự. `Map<team, count>`: dùng khi chỉ cần số lượng/tổng. Đừng giữ array nếu chỉ cần count — state lớn hơn cần thiết làm code khó hơn.

## 2. `Map<key, Set>`: một quan hệ nhiều-nhiều nhưng không đếm trùng

### Bài toán kiểu report

Mỗi record `[reporter, target]` nghĩa là reporter report target. Một reporter report cùng target nhiều lần vẫn chỉ tính một lần. Target có ít nhất `threshold` reporter khác nhau sẽ bị xử lý. Trả số mail mỗi reporter nhận được.

State đầu tiên phải là:

> `reportersByTarget.get(target)` là Set các reporter khác nhau đã report target.

```js
function reportMailCounts(userIds, reports, threshold) {
  const reportersByTarget = new Map();

  for (const [reporter, target] of reports) {
    if (!reportersByTarget.has(target)) {
      reportersByTarget.set(target, new Set());
    }
    reportersByTarget.get(target).add(reporter);
  }

  const mailCountByUser = new Map(userIds.map((id) => [id, 0]));

  for (const [, reporters] of reportersByTarget) {
    if (reporters.size < threshold) continue;
    for (const reporter of reporters) {
      mailCountByUser.set(reporter, mailCountByUser.get(reporter) + 1);
    }
  }

  return userIds.map((id) => mailCountByUser.get(id));
}
```

### Vì sao không `Map<target, array>`?

Với `reports = [['a','x'], ['a','x']]`, array có length 2 nhưng chỉ có một reporter khác nhau. Set làm rule “một cặp chỉ tính một lần” trở thành tính chất mặc định của state, không phải một `if` dễ quên.

**Test phá lỗi:** cùng `[reporter,target]` xuất hiện hai lần; output phải y hệt khi chỉ xuất hiện một lần.

## 3. Frequency trong window: thêm và bớt phải đối xứng

### Bài toán

Đếm vị trí cắt mà nửa trái và nửa phải có cùng số loại topping khác nhau.

Khi di chuyển cut từ trái sang phải, một topping đi từ right sang left. Không đếm lại cả hai nửa tại mỗi cut; giữ state đang sống của hai bên.

```js
function countFairToppingCuts(toppings) {
  const rightCount = new Map();
  for (const topping of toppings) {
    rightCount.set(topping, (rightCount.get(topping) ?? 0) + 1);
  }

  const leftKinds = new Set();
  let answer = 0;

  for (const topping of toppings) {
    leftKinds.add(topping);

    const nextRightCount = rightCount.get(topping) - 1;
    if (nextRightCount === 0) rightCount.delete(topping);
    else rightCount.set(topping, nextRightCount);

    if (leftKinds.size === rightCount.size) answer += 1;
  }

  return answer;
}
```

`rightCount.size` chỉ đúng nghĩa “số loại ở nửa phải” nếu key count 0 bị xóa. Đây là lý do `delete` không phải tối ưu vụn vặt mà là một phần invariant.

### Rule di chuyển state

```text
left thêm topping
right giảm topping
nếu count right = 0: xóa key
so hai số loại
```

Đổi `left`/`right` hoặc so trước update sẽ thay đổi nghĩa vị trí cắt. Hãy vẽ nửa trái/nửa phải của một input 4 phần tử để chọn contract trước code.

## 4. Canonical key: cùng trạng thái phải tạo cùng key

Một Map không tự hiểu `[row, col]` và `[row, col]` là cùng tọa độ: hai array khác reference. Khi key là tổ hợp, chuẩn hóa nó.

```js
function countRepeatedStates(states) {
  const countByState = new Map();

  for (const { time, row, col } of states) {
    const key = `${time}|${row}|${col}`;
    countByState.set(key, (countByState.get(key) ?? 0) + 1);
  }

  let repeatedStateCount = 0;
  for (const count of countByState.values()) {
    if (count >= 2) repeatedStateCount += 1;
  }
  return repeatedStateCount;
}
```

Ba điều cần kiểm tra:

1. Key chứa đủ mọi dimension có ý nghĩa (`time` không được bỏ nếu collision phụ thuộc thời gian).
2. Cùng state luôn tạo chuỗi y hệt.
3. Hai state khác không thể vô tình thành cùng key; delimiter rõ ràng giúp tránh `1,23` lẫn `12,3`.

Trong bài graph lớn, có thể dùng Map lồng (`Map<time, Map<row, Set<col>>>`) để tránh serialize; chọn representation làm code ít nhầm nhất.

## 5. State đồng bộ: một event có thể phải update hai Map

Cuộc đua chạy là mẫu điển hình. `players[index]` cho biết ai ở vị trí index; `positionByPlayer.get(name)` cho biết vị trí của một người. Calling `name` vượt người ngay trước nên cả hai representation phải thay đổi cùng lúc.

```js
function applyRaceCallings(players, callings) {
  const positionByPlayer = new Map();
  for (let index = 0; index < players.length; index += 1) {
    positionByPlayer.set(players[index], index);
  }

  for (const player of callings) {
    const currentPosition = positionByPlayer.get(player);
    const frontPosition = currentPosition - 1;
    const frontPlayer = players[frontPosition];

    players[frontPosition] = player;
    players[currentPosition] = frontPlayer;
    positionByPlayer.set(player, frontPosition);
    positionByPlayer.set(frontPlayer, currentPosition);
  }

  return players;
}
```

Invariant sau mỗi calling:

```text
với mọi index i: positionByPlayer.get(players[i]) === i
```

Nếu bạn update array nhưng không update Map, calling tiếp theo sẽ lấy vị trí cũ. Nếu đề cấm mutate input, clone `players` trước khi làm transition; contract quyết định chuyện này.

## 6. Mixed test Map/Set: không ghi pattern

1. Logs `[time, deviceId, room]`: đếm số cặp `(time, room)` có ít nhất hai device khác nhau. Duplicate log của cùng device chỉ tính một lần.
2. `orders = [{buyer, product}]`: trả product được nhiều buyer khác nhau mua nhất, hòa lấy product xuất hiện sớm nhất. Viết mỗi Map/Set đang lưu gì.
3. Một stream số: trả độ dài ngắn nhất của đoạn liên tiếp chứa đủ ba loại `A,B,C`. Ai điều khiển biên đoạn, Map giữ gì, và count 0 xử lý ra sao?

Làm xong mới mở [Practice Ladder](03_Practice_Ladder.md) và bộ bài thật. Nếu vướng câu 3, đó là Map frequency + sliding window: Map chỉ là helper state, Window quyết định `left/right`.
