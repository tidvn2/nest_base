import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';
import { SortDirection } from '../enums';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +(value || 10))
  @ApiProperty({ description: 'items per page', example: '10', type: 'string' })
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +(value || 10))
  @ApiProperty({
    description: 'Current page number',
    example: '1',
    type: 'string',
  })
  page?: number;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value || '{}'))
  @ApiProperty({
    description: 'Sort by field',
    example: '{ "createdAt": "ASC" }',
    type: 'string',
  })
  order?: Record<string, SortDirection>;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value || '{}'))
  @ApiProperty({
    description: 'Filter by field',
    example: '{ "name": "string" }',
    type: 'string',
  })
  filter?: Record<string, any>;

  @IsOptional()
  @ApiProperty({ description: 'Search', example: '' })
  search?: string;
}
