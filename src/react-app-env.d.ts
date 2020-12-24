/// <reference types="react-scripts" />

export {};
declare global {
  interface Window {
    webkitSpeechRecognition: string;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}
