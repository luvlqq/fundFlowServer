import { IsNotEmpty, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating: number;
}
