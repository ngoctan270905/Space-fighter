/**
 * Cấu hình giới hạn di chuyển của máy bay người chơi
 */
export const fighterConfig = {
  minX: 50,    // Giới hạn bên trái
  maxX: 1030,  // Giới hạn bên phải
  minY: 120,   // Giới hạn bên dưới
  maxY: 1500,  // Giới hạn bên trên
}

/**
 * Cấu hình thông số đạn bắn
 */
export const bulletConfig = {
  speed: 2200,      // Tốc độ bay của đạn (pixel/giây)
  despawnY: 2400,   // Tọa độ Y để biến mất (vượt quá màn hình)
  leftOffsetX: -45, // Độ lệch X của nòng súng bên trái so với tâm máy bay
  rightOffsetX: 45, // Độ lệch X của nòng súng bên phải so với tâm máy bay
  offsetY: 45,      // Độ lệch Y của họng súng so với tâm máy bay
}

// Số lượng đạn tối đa cho mỗi nòng trong Pool
export const bulletPoolSizePerLane = 30

/**
 * Cấu hình Item tăng tốc độ bắn (Speed Icon)
 */
export const speedIconConfig = {
  fallSpeed: 500,     // Tốc độ rơi
  spawnMinDelay: 2,   // Thời gian chờ tối thiểu giữa các lần spawn (giây)
  spawnMaxDelay: 5,   // Thời gian chờ tối đa giữa các lần spawn (giây)
  spawnY: 2060,       // Tọa độ Y bắt đầu rơi
  despawnY: -140,     // Tọa độ Y để biến mất khi rơi quá màn hình
  minX: 120,          // Giới hạn vùng spawn bên trái
  maxX: 960,          // Giới hạn vùng spawn bên phải
}

/**
 * Cấu hình quái vật (Enemies)
 */
export const quaiConfig = {
  poolSize: 25,         // Số lượng quái tối đa trong Pool
  scale: 1,            // Kích thước quái
  fallSpeed: 300,      // Tốc độ rơi của quái
  spawnMinDelay: 0.1, // Tần suất spawn tối thiểu (giây)
  spawnMaxDelay: 1.1,  // Tần suất spawn tối đa (giây)
  spawnY: 2140,        // Tọa độ Y xuất hiện
  despawnY: -220,      // Tọa độ Y biến mất
  minX: 110,           // Vùng spawn ngẫu nhiên X (min)
  maxX: 970,           // Vùng spawn ngẫu nhiên X (max)
}

/**
 * Cấu hình hiển thị thanh máu (Lượt chơi)
 */
export const livesDisplayConfig = {
  count: 5,     // Số mạng ban đầu
  startX: 20,   // Vị trí X của icon tim đầu tiên
  y: 2300,      // Tọa độ Y của thanh máu
  gap: 55,      // Khoảng cách giữa các icon tim
  scale: 0.7,   // Độ lớn của icon tim
}

/**
 * Cấu hình hiển thị điểm số
 */
export const scoreDisplayConfig = {
  x: 1060,      // Vị trí X hiển thị điểm
  y: 2300,      // Vị trí Y hiển thị điểm
  size: 42,     // Kích thước chữ
}
