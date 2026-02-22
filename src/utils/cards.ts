// src/utils/cards.ts

// ✅ ฟังก์ชันสุ่มการ์ดจากรูปทั้งหมด
export function getRandomCards(cardImages: string[]) {
  // สุ่มเรียงใหม่
  const shuffled = [...cardImages].sort(() => Math.random() - 0.5);

  // เลือกมา 10 รูป
  const selected = shuffled.slice(0, 10);

  // ทำเป็นคู่
  const paired = [...selected, ...selected];

  // สุ่มเรียงอีกครั้ง
  return paired.sort(() => Math.random() - 0.5);
}
