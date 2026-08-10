# PCCP công khai — Simulation: hiểu đề trước khi code

[← Chương Simulation](../../04_Simulation.md) · [Lời giải P01 →](../../solutions/04_Simulation_PCCP_Solutions.md#p01--băng-bó)

Trang này dạy từng đề PCCP công khai có simulation là logic chính. Không đọc code lời giải trước khi bạn tự chạy được ví dụ bằng tay.

## P01 — Băng bó

Nguồn chính thức: [Programmers 250137](https://school.programmers.co.kr/learn/courses/30/lessons/250137?language=javascript)

### Đề đang kể chuyện gì?

Nhân vật có máu hiện tại. Mỗi giây mà không bị tấn công, nhân vật hồi một lượng máu cố định. Nếu hồi liên tiếp đủ số giây, được thưởng thêm một lần. Nhưng một đòn tấn công xảy ra ở giây đó sẽ:

1. gây sát thương;
2. hủy chuỗi hồi liên tiếp;
3. không cho hồi máu trong chính giây bị đánh.

Nếu máu giảm về `0` hoặc thấp hơn ở một đòn đánh, nhân vật chết ngay và trả `-1`. Nếu sống qua đòn cuối, trả máu còn lại.

Input gồm:

- `bandage = [requiredSeconds, healPerSecond, bonusHeal]`;
- `health`: máu tối đa, đồng thời là máu ban đầu;
- `attacks`: các cặp `[second, damage]`, đã tăng dần theo thời gian.

### Đừng code ngay: mô phỏng một ví dụ cực nhỏ

Giả sử `bandage = [3, 2, 5]`, máu tối đa `20`, các đòn đánh là `[[2, 7], [6, 12]]`.

| Giây | Có đòn đánh? | Máu trước | Làm gì? | Chuỗi hồi sau giây đó | Máu sau |
| ---: | --- | ---: | --- | ---: | ---: |
| 1 | không | 20 | hồi 2, nhưng không vượt 20 | 1 | 20 |
| 2 | có, 7 damage | 20 | trừ 7; không hồi | 0 | 13 |
| 3 | không | 13 | hồi 2 | 1 | 15 |
| 4 | không | 15 | hồi 2 | 2 | 17 |
| 5 | không | 17 | hồi 2, đủ 3 giây nên thưởng 5; clamp max 20 | 0 | 20 |
| 6 | có, 12 damage | 20 | trừ 12; không hồi | 0 | 8 |

Đáp án là `8`.

Hai điều cần nhớ sau mỗi giây là gì?

- `currentHealth`: máu hiện tại;
- `consecutiveHeals`: đã hồi liên tiếp bao nhiêu giây kể từ đòn đánh gần nhất hoặc bonus gần nhất.

Đó là toàn bộ state. Không cần lưu lịch sử mọi giây.

### Rule order — chỗ dễ sai nhất

Tại mỗi giây, phải hỏi **đòn đánh có xảy ra ở giây này không?** trước.

```text
nếu bị đánh:
    trừ damage
    reset consecutiveHeals = 0
    nếu máu <= 0: return -1
nếu không bị đánh:
    hồi healPerSecond, không vượt health
    consecutiveHeals += 1
    nếu consecutiveHeals === requiredSeconds:
        hồi bonusHeal, không vượt health
        reset consecutiveHeals = 0
```

Nếu hồi trước rồi mới trừ damage trong giây có attack, bạn đang thay đổi luật đề.

### Có phải brute force theo từng giây là chậm không?

Không phải lúc nào cũng vậy. Ở đề này, thời điểm tấn công có giới hạn nhỏ đủ để mô phỏng từng giây. Một vòng lặp theo giây là cách ít lỗi nhất, vì luật thay đổi ở từng giây.

Sau này nếu time lên tới hàng tỷ, ta sẽ không thể lặp từng giây; khi đó phải “nhảy” qua khoảng yên tĩnh. Nhưng đừng tối ưu trước khi constraint bắt buộc.

### Pseudocode

```text
currentHealth = health
consecutiveHeals = 0
attackIndex = 0

for second từ 1 đến thời điểm đòn đánh cuối:
    nếu attackIndex đang chỉ một attack ở second:
        currentHealth -= damage
        consecutiveHeals = 0
        attackIndex += 1
        nếu currentHealth <= 0: return -1
    ngược lại:
        currentHealth = min(health, currentHealth + healPerSecond)
        consecutiveHeals += 1
        nếu consecutiveHeals === requiredSeconds:
            currentHealth = min(health, currentHealth + bonusHeal)
            consecutiveHeals = 0

return currentHealth
```

### Test phải tự tạo trước khi xem lời giải

1. Đòn đầu tiên ở giây 1: có được hồi trước khi bị đánh không?
2. Máu vừa bằng 0 sau attack: trả gì?
3. Hồi/bonus vượt máu tối đa: có được vượt không?
4. Attack xuất hiện đúng giây lẽ ra nhận bonus: bonus có xảy ra không?
5. Attack cuối làm chết nhân vật: có còn tiếp tục mô phỏng không?

<details>
<summary>Gợi ý code 1</summary>

Vì attack times tăng dần, không cần `Map`. Một biến `attackIndex` luôn chỉ attack kế tiếp là đủ.

</details>

<details>
<summary>Gợi ý code 2</summary>

`attacks[attackIndex]?.[0] === second` kiểm tra attack ở giây hiện tại mà không lỗi khi đã hết attacks.

</details>

Sau khi tự viết, mới mở [lời giải P01](../../solutions/04_Simulation_PCCP_Solutions.md#p01--băng-bó). Đọc phần dry run và lỗi hay gặp, sau đó đóng lời giải và viết lại trong 10 phút.
