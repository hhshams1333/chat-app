import { IsNumber, IsNotEmpty } from 'class-validator';

export class JoinChatRoomDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}