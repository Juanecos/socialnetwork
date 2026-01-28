import { IsEmail, IsString, MinLength, ValidateNested, IsIn, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfileDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsInt()
  @Min(1)
  @Max(120)
  age: number;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}