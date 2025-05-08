# Cursor Student Verification Bypass (for SheerID)

## Mục đích

Script này giúp bạn thay đổi tham số `country` trong request gửi đến SheerID, nhằm hiển thị các trường học của Việt Nam trong trang xác minh sinh viên của Cursor.

---

## Các bước thực hiện

### 🔑 1. Truy cập và đăng nhập Cursor sinh viên
- Mở trang: [https://cursor.com/students](https://cursor.com/students)

---

### ❌ 2. Nếu bạn đã từng xác minh
- Hãy **đăng xuất** khỏi tài khoản SheerID nếu thấy thông báo đã đăng nhập trước đó.
- Sau đó, bấm lại nút **"Verify Status"**, chọn **"Log in again"**.

---

### 🔁 3. Tự động chuyển hướng sang SheerID
- Bạn sẽ được chuyển sang trang xác minh sinh viên của SheerID.

---

### 💻 4. Mở Developer Tools
- Bấm **F12** hoặc click chuột phải → chọn **Inspect**.
- Vào tab **Console**.

---

### 📜 5. Dán đoạn mã sau vào Console và bấm Enter

```javascript
(function () {
    'use strict';

    const originalFetch = window.fetch;
    const TARGET_URL = "orgsearch.sheerid.net/rest/organization/search";

    const updateCountry = (url) => {
        const u = new URL(url, location.origin);
        if (u.searchParams.has('country')) u.searchParams.set('country', 'VN');
        return u.toString();
    };

    window.fetch = function (input, init) {
        let url = typeof input === 'string' ? input :
                  input instanceof Request ? input.url : '';

        if (!url.includes(TARGET_URL)) return originalFetch(input, init);

        const newUrl = updateCountry(url);

        if (typeof input === 'string') {
            return originalFetch(newUrl, init);
        }

        const newRequest = new Request(newUrl, input);
        return originalFetch(newRequest, init);
    };
})();
```

---

### 🌍 7. Chọn quốc gia và tìm kiếm trường học



- Script chỉ thay thế tham số country trong request gửi đi, không thêm trường mới vào hệ thống của SheerID.
- Đây là phương pháp thử để "lách" giới hạn quốc gia, không đảm bảo trường bạn sẽ hiển thị nếu SheerID không hỗ trợ nó.

Mã nguồn gốc dành cho [Tampermonkey extension](https://greasyfork.org/en/scripts/535247-cursor-sheerid-bypass)
