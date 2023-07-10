export class SendReviewResponse {
  id: number;
  reviewSender: number;
  reviewReciper: number;
  text: string;
  rating: number;
  createdAt: Date;
}
