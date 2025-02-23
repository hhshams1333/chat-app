import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async register(username: string, password: string): Promise<User> {
        const user = await this.userService.findOne(username);
        if (user) {
            throw new ConflictException('Username already exists')
        }
        return this.userService.create(username, password);
    }

    async login(username: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.id };
        console.log(payload)
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }
}