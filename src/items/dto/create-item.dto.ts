import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  description: string;
}
