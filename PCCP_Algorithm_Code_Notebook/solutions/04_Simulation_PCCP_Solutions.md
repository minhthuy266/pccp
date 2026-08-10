# Lời giải PCCP công khai — Simulation

[← Bài học đề thật](../chapters/04_simulation/04_PCCP_Public_Problems.md)

## P01 — Băng bó

Nguồn: [Programmers 250137](https://school.programmers.co.kr/learn/courses/30/lessons/250137?language=javascript)

### Cách nghĩ

Đề không hỏi “tổng máu hồi được bao nhiêu”, vì attack có thể cắt chuỗi hồi và bonus. Ta phải mô phỏng đúng thứ tự từng giây.

State sau khi xử lý xong một giây gồm:

- `currentHealth`: máu sau mọi rule của giây đó, luôn không vượt `health`;
- `consecutiveHeals`: số giây hồi liên tiếp chưa đổi thành bonus;
- `attackIndex`: vị trí attack chưa xử lý đầu tiên.

Vì `attacks` đã theo thời gian tăng dần, chỉ cần tiến `attackIndex`; không cần tìm lại attack bằng cách quét cả mảng ở mỗi giây.

### JavaScript

```js
function bandageSurvival(bandage, health, attacks) {
  const [requiredSeconds, healPerSecond, bonusHeal] = bandage;
  const lastAttackSecond = attacks[attacks.length - 1][0];

  let currentHealth = health;
  let consecutiveHeals = 0;
  let attackIndex = 0;

  for (let second = 1; second <= lastAttackSecond; second += 1) {
    const nextAttack = attacks[attackIndex];
    const isAttackedNow = nextAttack !== undefined && nextAttack[0] === second;

    if (isAttackedNow) {
      // Attack xảy ra trong giây này nên không hồi máu.
      currentHealth -= nextAttack[1];
      consecutiveHeals = 0;
      attackIndex += 1;

      // Chết thì đề yêu cầu dừng ngay.
      if (currentHealth <= 0) return -1;
      continue;
    }

    // Không bị đánh: hồi máu cơ bản của một giây thành công.
    currentHealth = Math.min(health, currentHealth + healPerSecond);
    consecutiveHeals += 1;

    // Đủ số giây liên tiếp thì nhận bonus đúng một lần và mở combo mới.
    if (consecutiveHeals === requiredSeconds) {
      currentHealth = Math.min(health, currentHealth + bonusHeal);
      consecutiveHeals = 0;
    }
  }

  return currentHealth;
}
```

### Dry run ngắn

Với `bandage=[3,2,5]`, `health=20`, `attacks=[[2,7],[6,12]]`:

| Giây | Nhánh | Máu sau | Combo sau |
| ---: | --- | ---: | ---: |
| 1 | heal | 20 | 1 |
| 2 | attack | 13 | 0 |
| 3 | heal | 15 | 1 |
| 4 | heal | 17 | 2 |
| 5 | heal + bonus | 20 | 0 |
| 6 | attack | 8 | 0 |

### Vì sao code đúng?

Ở đầu mỗi vòng, `currentHealth` và `consecutiveHeals` mô tả đúng nhân vật sau giây trước; `attackIndex` chỉ đúng attack chưa xử lý đầu tiên. Vòng lặp xét mọi giây đúng một lần. Nếu có attack, code áp dụng attack và reset combo theo luật. Nếu không có, code áp dụng đúng một lần hồi rồi thưởng khi đủ số giây. Vì thế sau giây cuối, `currentHealth` là đáp án; nếu có chết, code trả `-1` ngay tại giây đầu tiên vi phạm.

### Complexity và bẫy

- Thời gian: `O(lastAttackSecond)`, bộ nhớ phụ: `O(1)`.
- Đừng hồi ở giây bị attack.
- Đừng quên clamp sau **cả** hồi cơ bản và bonus.
- `consecutiveHeals` phải reset khi attack và sau bonus.
- Check chết ngay sau attack; không để code vô tình hồi lại người đã chết.
