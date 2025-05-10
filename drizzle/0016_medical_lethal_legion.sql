ALTER TABLE "users" ADD COLUMN "favorite_team_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_favorite_team_id_teams_id_fk" FOREIGN KEY ("favorite_team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "favoriteTeam";