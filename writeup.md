# Writeup: WD4E Capstone - Option 1: Demo your portfolio (designed from scratch)

- **Tên thử thách:** WD4E Capstone - Option 1: Demo your portfolio (designed from scratch)
- **Thể loại:** Web / Responsive Design
- **Đường dẫn giải quyết ngắn gọn:**
  1. Tạo thư mục dự án `portfolio` và thiết kế giao diện từ đầu (designed from scratch) bằng HTML5, CSS3 và JavaScript thuần. Giao diện tích hợp đầy đủ các phần: Hero, About, Projects, Contact, và Footer.
  2. Thực hiện thiết kế đáp ứng (Responsive Design) theo nguyên lý mobile-first, sử dụng Flexbox và CSS Grid. Định nghĩa các breakpoint: tablet tại `768px` và desktop tại `1024px`.
  3. Đảm bảo cấu trúc HTML5 chuẩn mực, tuân thủ nghiêm ngặt các quy tắc WAVE/WCAG về khả năng tiếp cận (A11y) và kiểm tra chuẩn W3C Validator (sử dụng skip link, thuộc tính `alt` mô tả đầy đủ, nhãn ARIA, thẻ tiêu đề có phân cấp rõ ràng `h1` -> `h2` -> `h3`, và chỉ định rõ kích thước ảnh `width`/`height`).
  4. Triển khai 4 tính năng nâng cao ("Four Extras"):
     - **Extra 1 (Dark Mode Toggle):** Nút chuyển đổi giao diện Dark/Light mode dựa trên CSS Custom Variables, tự động đồng bộ theo cấu hình hệ thống (`prefers-color-scheme`) và lưu trạng thái vào `localStorage`.
     - **Extra 2 (Interactive Project Filter):** Sử dụng JavaScript để lọc động các thẻ dự án theo danh mục (All, Responsive, Interactive, Accessibility) đi kèm hiệu ứng chuyển động mượt mà.
     - **Extra 3 (Animations & Hover Effects):** Tích hợp CSS keyframe animation tạo hiệu ứng nhấp nhô nhẹ cho hình minh họa SVG (`blob-bounce`) và các vi hiệu ứng (micro-interactions) khi người dùng di chuột hoặc focus bàn phím vào các thành phần tương tác.
     - **Extra 4 (Print-Optimized Stylesheet):** Cấu hình block `@media print` giúp tối ưu hóa toàn bộ trang web thành định dạng CV/Resume tối giản, trắng đen, tự động ẩn đi thanh menu điều hướng, nút chuyển theme, các nút bộ lọc, và form liên hệ khi người dùng in ra giấy hoặc lưu sang file PDF.
  5. Đăng ký repository mới có tên `portfolio` trên GitHub bằng token được cấp.
  6. Khởi tạo Git và thực hiện đẩy toàn bộ mã nguồn lên nhánh chính `main`.
  7. Kích hoạt dịch vụ GitHub Pages để lưu trữ trang web tĩnh.
- **Kết quả / Link đã deploy:** https://duylmaoxd.github.io/portfolio/

## Các lệnh đã sử dụng

```bash
# Tạo cấu trúc thư mục dự án
mkdir -p /home/mdy/Downloads/ctf/portfolio/css
mkdir -p /home/mdy/Downloads/ctf/portfolio/js
mkdir -p /home/mdy/Downloads/ctf/portfolio/images

# Copy các hình ảnh SVG tài nguyên an toàn từ dự án trước
cp /home/mdy/Downloads/ctf/WD4E-Advanced_Styling_with_Responsive_Design/RD-week4-final_project_starter/images/*.svg /home/mdy/Downloads/ctf/portfolio/images/

# Tạo repo trên GitHub
curl -s -X POST -H "Authorization: token <PAT>" -H "Accept: application/vnd.github.v3+json" https://api.github.com/user/repos -d '{"name":"portfolio", "description":"Personal Portfolio designed from scratch - Coursera Web Design Capstone", "private":false, "has_pages":true}'

# Cấu hình Git và push mã nguồn
git init
git checkout -b main
git config user.email "duylmaoxd@users.noreply.github.com"
git config user.name "duylmaoxd"
git add .
git commit -m "Initialize portfolio designed from scratch"
git remote add origin https://<PAT>@github.com/duylmaoxd/portfolio.git
git push -u origin main

# Kích hoạt GitHub Pages
curl -s -X POST -H "Authorization: token <PAT>" -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/duylmaoxd/portfolio/pages -d '{"source":{"branch":"main","path":"/"}}'
```
