declare module 'socket.io-parser' {
    export class Encoder {
      encode(obj: any, callback: (encodedPackets: any[]) => void): void;
    }
  
    export class Decoder {
      on(event: string, callback: (packet: any) => void): void;
      add(encodedPacket: any): void;
      destroy(): void;
    }
  }
  