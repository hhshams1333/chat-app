import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chat/chat-room.entity';
import { Message } from './chat/message.entity';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';


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
    AuthModule,
  ],
})
export class AppModule { }