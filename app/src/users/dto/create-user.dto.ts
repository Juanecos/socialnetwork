import { IsString, IsEmail, IsNotEmpty, IsInt, Min, Max, ValidateNested, IsOptional} from 'class-validator';
import { Type } from 'class-transformer';

class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsInt()
  @Min(1)
  @Max(120)
  age: number;
}

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}