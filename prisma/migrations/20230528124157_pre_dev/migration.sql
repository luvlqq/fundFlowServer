-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accountStatus" DROP NOT NULL,
ALTER COLUMN "avatarImg" DROP NOT NULL,
ALTER COLUMN "isVerify" DROP NOT NULL;