import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChatRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}