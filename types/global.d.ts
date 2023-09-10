// types/global.d.ts

declare global {
  interface Window {
    YT: {
      Player: YT.Player;
    };
  }
}

export const YT = window.YT
