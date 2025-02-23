import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chat-room.entity';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoom, Message]), // وارد کردن Entity ها
  ],
  controllers: [ChatController],
  providers: [ChatService, Repository<ChatRoom>, Repository<Message>],
  exports: [ChatService]
})
export class ChatModule { }