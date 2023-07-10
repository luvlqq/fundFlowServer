export class GetUserInfoResponse {
  id: number;
  email: string;
  password: string;
  hashRt: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  avatarImg?: string;
  isVerify?: boolean;
  accountStatus?: string;
}
