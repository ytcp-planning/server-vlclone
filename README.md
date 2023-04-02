# Đây là Server nè

### Giải thích cấu trúc folder:

- config/ - Chứa các tập tin cấu hình cho ứng dụng, ví dụ như cấu hình cơ sở dữ liệu, cấu hình email, cấu hình logger, và các biến môi trường.
- controllers/ - Chứa các file xử lý các yêu cầu từ client, ví dụ như xử lý đăng nhập, đăng ký, truy vấn cơ sở dữ liệu và trả về kết quả cho client.
- middleware/ - Chứa các middleware để xử lý các yêu cầu từ client trước khi chúng được đưa tới controllers.
- models/ - Chứa các file định nghĩa cho các đối tượng cơ sở dữ liệu, ví dụ như đối tượng user, đối tượng post, và các quan hệ giữa chúng.
- routes/ - Chứa các file định nghĩa cho các đường dẫn đến các chức năng khác nhau của ứng dụng, và kết nối các yêu cầu từ client với các controllers tương ứng.
- services/ - Chứa các file xử lý logic kinh doanh, ví dụ như kiểm tra thông tin đăng nhập, xác thực, truy vấn cơ sở dữ liệu, và trả về kết quả cho controllers.
- utils/ - Chứa các tiện ích hỗ trợ cho ứng dụng, ví dụ như ghi log, xử lý lỗi, các hàm tiện ích, và các hàm trợ giúp khác.
- index.js - File chạy đầu tiên khi khởi động ứng dụng, thực hiện cấu hình các thành phần cần thiết và khởi tạo server.