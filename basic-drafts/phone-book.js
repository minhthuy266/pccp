const checkPhone = (phone_book) => {
  // Bước 1: Đưa tất cả số điện thoại vào Set để tra cứu nhanh.
  // Bước 2: Tạo từng tiền tố ngắn hơn của mỗi số.
  // Bước 3: Trả về false nếu tiền tố cũng là một số trong danh bạ.
  const phoneSet = new Set(phone_book);

  for (const phone of phone_book) {
    for (let i = 1; i < phone.length; i++) {
      const prefix = phone.slice(0, i);

      if (phoneSet.has(prefix)) {
        return false;
      }
    }
  }

  return true;
};

console.log(checkPhone(["119", "97674223", "1195524421"]));
