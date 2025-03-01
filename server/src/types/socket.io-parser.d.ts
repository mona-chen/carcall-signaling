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
  

  declare module 'socket.io' {
    import { Server as HttpServer } from "http";
    export class Server {
      constructor(server: HttpServer, options?: any);
      on(event: string, callback: Function): void;
    }
    export class Socket {
      on(event: string, callback: Function): void;
      emit(event: string, ...args: any[]): void;
    }
  }
  