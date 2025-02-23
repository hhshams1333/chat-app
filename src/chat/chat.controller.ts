import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRoom } from 'src/entity/chat-room.entity';
import { Message } from 'src/entity/message.entity';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Post('rooms')
    async createChatRoom(@Body('name') name: string): Promise<ChatRoom> {
        return await this.chatService.createChatRoom(name);
    }

    @Post('rooms/:id/join')
    async joinChatRoom(@Param('id') id: number): Promise<ChatRoom | never> {
        return this.chatService.joinChatRoom(id);
    }

    @Post('rooms/:id/messages')
    async sendMessage(@Param('id') id: number, @Body('content') content: string): Promise<Message> {
        return await this.chatService.sendMessage(id, content);
    }

    @Get('rooms/:id/messages')
    async getMessages(@Param('id') id: number): Promise<Message[]> {
        return await this.chatService.getMessages(id);
    }
}