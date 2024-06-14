import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private connectionAttempts = new Map<string, number>();
  private activeConnections = new Map<string, number>();
  private readonly MAX_CONNECTION_ATTEMPTS = 10; // X attempts per minute
  private readonly MAX_ACTIVE_CONNECTIONS = 5; // Y active connections at a time

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const clientIp = context.switchToWs().getClient().handshake.address;
    
    if (!this.connectionAttempts.has(clientIp)) {
      this.connectionAttempts.set(clientIp, 0);
    }
    if (!this.activeConnections.has(clientIp)) {
      this.activeConnections.set(clientIp, 0);
    }

    this.connectionAttempts.set(clientIp, this.connectionAttempts.get(clientIp) + 1);

    if (this.connectionAttempts.get(clientIp) > this.MAX_CONNECTION_ATTEMPTS) {
      throw new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
    }

    if (this.activeConnections.get(clientIp) >= this.MAX_ACTIVE_CONNECTIONS) {
      throw new HttpException('Too many active connections', HttpStatus.TOO_MANY_REQUESTS);
    }

    this.activeConnections.set(clientIp, this.activeConnections.get(clientIp) + 1);

    context.switchToWs().getClient().once('disconnect', () => {
      this.activeConnections.set(clientIp, this.activeConnections.get(clientIp) - 1);
    });

    return next.handle();
  }
}
