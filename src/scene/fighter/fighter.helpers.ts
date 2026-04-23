/**
 * Tạo một số ngẫu nhiên trong khoảng [min, max]
 * @param min Giá trị tối thiểu
 * @param max Giá trị tối đa
 * @returns Số ngẫu nhiên
 */
export function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

/**
 * Định dạng điểm số hiển thị theo chuẩn chuỗi 4 ký tự
 * Ví dụ: 5 -> "0005", 120 -> "0120"
 * @param value Giá trị điểm số hiện tại
 * @returns Chuỗi điểm số đã định dạng
 */
export function formatScore(value: number) {
  return Math.max(0, value).toString().padStart(4, '0')
}

/**
 * Tính toán khoảng thời gian chờ giữa 2 lần bắn dựa trên tốc độ bắn (shots per second)
 * @param shotsPerSecond Số phát bắn mỗi giây
 * @returns Khoảng thời gian (giây) giữa các lần bắn
 */
export function getFireInterval(shotsPerSecond: number) {
  return 1 / shotsPerSecond
}
