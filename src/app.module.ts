import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entity/chat-room.entity';
import { Message } from './entity/message.entity';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'chat_app',
      entities: [ChatRoom, Message],
      synchronize: true,
    }),
    ChatModule,
  ],
})
export class AppModule { }