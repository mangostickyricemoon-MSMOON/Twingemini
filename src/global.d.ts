// src/global.d.ts
import type { Eip1193Provider } from "ethers"; 
// ถ้าใช้ wagmi ก็สามารถ import จาก "wagmi" ได้เช่นกัน

declare global {
  interface Window {
    ethereum?: Eip1193Provider & {
      isMetaMask?: boolean; // ✅ flag ของ MetaMask
    };
  }
}
