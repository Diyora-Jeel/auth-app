-- AlterTable
ALTER TABLE "User" ALTER COLUMN "forgot_password_token" DROP NOT NULL,
ALTER COLUMN "forgot_password_token_expiry" DROP NOT NULL,
ALTER COLUMN "verify_token" DROP NOT NULL,
ALTER COLUMN "verify_token_expiry" DROP NOT NULL;
