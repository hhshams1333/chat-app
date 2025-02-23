import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRoom } from './chat-room.entity';
import { Message } from './message.entity';
import { CreateChatRoomDto } from './create-chat-room.dto';
import { SendMessageDto } from './send-message.dto';
import { JoinChatRoomDto } from './join-chat-room.dto';
import { JwtAuthGuard } from 'src/jwt.guard';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) { }

    @UseGuards(JwtAuthGuard)
    @Post('rooms')
    async createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
        return this.chatService.createChatRoom(createChatRoomDto.name);
    }

    @UseGuards(JwtAuthGuard)
    @Post('rooms/join')
    async joinChatRoom(@Body() joinChatRoomDto: JoinChatRoomDto): Promise<ChatRoom> {
        return this.chatService.joinChatRoom(joinChatRoomDto.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('rooms/:id/messages')
    async sendMessage(@Param('id') id: number, @Body() sendMessageDto: SendMessageDto): Promise<Message> {
        return this.chatService.sendMessage(id, sendMessageDto.content);
    }

    @Get('rooms/:id/messages')
    async getMessages(@Param('id') id: number): Promise<Message[]> {
        return this.chatService.getMessages(id);
    }
}