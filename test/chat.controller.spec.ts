import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from 'src/chat/chat.controller';
import { ChatService } from 'src/chat/chat.service';

describe('ChatController', () => {
    let chatController: ChatController;
    let chatService: ChatService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChatController],
            providers: [
                {
                    provide: ChatService,
                    useValue: {
                        createChatRoom: jest.fn().mockResolvedValue({ id: 1, name: 'Test Room' }),
                        joinChatRoom: jest.fn().mockResolvedValue({ id: 1, name: 'Test Room' }),
                        sendMessage: jest.fn().mockResolvedValue({ id: 1, content: 'Hello' }),
                        getMessages: jest.fn().mockResolvedValue([{ id: 1, content: 'Hello' }]),
                    },
                },
            ],
        }).compile();

        chatController = module.get<ChatController>(ChatController);
        chatService = module.get<ChatService>(ChatService);
    });

    it('should create a chat room', async () => {
        const result = await chatController.createChatRoom({ name: 'Test Room' });
        expect(result).toEqual({ id: 1, name: 'Test Room' });
    });

    it('should join a chat room', async () => {
        const result = await chatController.joinChatRoom({ id: 1 });
        expect(result).toEqual({ id: 1, name: 'Test Room' });
    });

    it('should send a message', async () => {
        const result = await chatController.sendMessage(1, { content: 'Hello' });
        expect(result).toEqual({ id: 1, content: 'Hello' });
    });

    it('should get messages from a chat room', async () => {
        const result = await chatController.getMessages(1);
        expect(result).toEqual([{ id: 1, content: 'Hello' }]);
    });
});
