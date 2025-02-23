import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ChatRoom } from './chat-room.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
    chatRoom: ChatRoom;
}