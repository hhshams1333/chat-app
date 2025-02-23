import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
  imports: [UserModule]
})
export class AuthModule {}
