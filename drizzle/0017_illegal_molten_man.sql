CREATE TABLE "favorite_teams" (
	"user_id" uuid NOT NULL,
	"team_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contactEmails" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "contactEmails" CASCADE;--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_favorite_team_id_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "favorite_teams" ADD CONSTRAINT "favorite_teams_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_teams" ADD CONSTRAINT "favorite_teams_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "favorite_team_id";