CREATE TABLE "contactEmails" (
	"email" text PRIMARY KEY NOT NULL,
	CONSTRAINT "contactEmails_email_unique" UNIQUE("email")
);
