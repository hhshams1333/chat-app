import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { User } from './user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.register(createUserDto.username, createUserDto.password);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
        return this.authService.login(loginUserDto.username, loginUserDto.password);
    }
}