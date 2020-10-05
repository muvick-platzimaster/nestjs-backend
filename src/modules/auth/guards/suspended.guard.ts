import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

export class SuspendedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest()
    if (user.suspended) {
      throw new UnauthorizedException('user_suspended')
    }
    return true
  }
}
