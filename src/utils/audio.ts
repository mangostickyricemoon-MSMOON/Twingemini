// src/utils/audio.ts

// ✅ Hover sound
export function playHoverSound() {
  const audio = new Audio(`${import.meta.env.BASE_URL}Hover.mp3`);
  audio.play().catch(err => console.error("Hover sound failed:", err));
}

// ✅ Click sound
export function playClickSound() {
  const audio = new Audio(`${import.meta.env.BASE_URL}Confirm.mp3`);
  audio.play().catch(err => console.error("Click sound failed:", err));
}
