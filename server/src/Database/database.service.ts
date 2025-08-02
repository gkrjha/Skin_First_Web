import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private isConnected = false;
  private url = process.env.DB_URI;
  onModuleInit() {
    this.isConnected = true;
    console.log('DB Connected');
  }
  onApplicationShutdown(signal: string) {
    this.isConnected = false;
    console.log(`Db Disconnected and Signal::${signal}`);
  }
  getStatus() {
    return this.isConnected ? 'Connected' : 'Disconnected';
  }
}
