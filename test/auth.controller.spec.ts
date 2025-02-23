import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        register: jest.fn().mockResolvedValue({ username: 'test', password: 'hashed' }),
                        login: jest.fn().mockResolvedValue({ access_token: 'jwt-token' }),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should register a user', async () => {
        const result = await authController.register({ username: 'test', password: 'password' });
        expect(result).toEqual({ username: 'test', password: 'hashed' });
    });

    it('should login a user and return access token', async () => {
        const result = await authController.login({ username: 'test', password: 'password' });
        expect(result).toEqual({ access_token: 'jwt-token' });
    });
});
