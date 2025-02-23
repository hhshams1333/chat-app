import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/entity/chat-room.entity';
import { Message } from 'src/entity/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatRoom)
        private chatRoomRepository: Repository<ChatRoom>,
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) { }

    async createChatRoom(name: string): Promise<ChatRoom> {
        const chatRoom = this.chatRoomRepository.create({ name });
        return this.chatRoomRepository.save(chatRoom);
    }

    async joinChatRoom(id: number): Promise<ChatRoom | never> {
        const chatRoom = await this.chatRoomRepository.findOneBy({ id });
        if (chatRoom)
            return chatRoom
        else
            throw new Error("Chat Room with the given ID Does not Exists")
    }

    async sendMessage(chatRoomId: number, content: string): Promise<Message> {
        const message = this.messageRepository.create({ content });
        const chatRoom = await this.chatRoomRepository.findOneBy({ id: chatRoomId });
        if (message && chatRoom)
            message.chatRoom = chatRoom
        return this.messageRepository.save(message);

    }

    async getMessages(chatRoomId: number): Promise<Message[]> {
        return this.messageRepository.find({ where: { chatRoom: { id: chatRoomId } } });
    }
}