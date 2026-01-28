import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdatePublicacionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsString()
  published_date?: string;
}
