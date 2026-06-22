import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_cases_result" AS ENUM('no-charge', 'no-suspicion', 'no-referral', 'suspended-indictment', 'not-guilty', 'suspended-sentence', 'probation', 'warrant-dismissed', 'full-win', 'partial-win', 'claim-dismissed', 'mediation', 'custom');
  CREATE TYPE "public"."enum__cases_v_version_result" AS ENUM('no-charge', 'no-suspicion', 'no-referral', 'suspended-indictment', 'not-guilty', 'suspended-sentence', 'probation', 'warrant-dismissed', 'full-win', 'partial-win', 'claim-dismissed', 'mediation', 'custom');
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"cases_find" boolean DEFAULT false,
  	"cases_create" boolean DEFAULT false,
  	"cases_update" boolean DEFAULT false,
  	"cases_delete" boolean DEFAULT false,
  	"categories_find" boolean DEFAULT false,
  	"categories_create" boolean DEFAULT false,
  	"categories_update" boolean DEFAULT false,
  	"categories_delete" boolean DEFAULT false,
  	"media_find" boolean DEFAULT false,
  	"media_create" boolean DEFAULT false,
  	"media_update" boolean DEFAULT false,
  	"media_delete" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  ALTER TABLE "cases_rels" DROP CONSTRAINT "cases_rels_users_fk";
  
  ALTER TABLE "_cases_v_rels" DROP CONSTRAINT "_cases_v_rels_users_fk";
  
  DROP INDEX "cases_rels_users_id_idx";
  DROP INDEX "_cases_v_rels_users_id_idx";
  ALTER TABLE "cases" ADD COLUMN "result" "enum_cases_result";
  ALTER TABLE "cases" ADD COLUMN "result_custom" varchar;
  ALTER TABLE "cases" ADD COLUMN "author_id" integer;
  ALTER TABLE "_cases_v" ADD COLUMN "version_result" "enum__cases_v_version_result";
  ALTER TABLE "_cases_v" ADD COLUMN "version_result_custom" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_author_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_mcp_api_keys_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "payload_mcp_api_keys_id" integer;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  ALTER TABLE "cases" ADD CONSTRAINT "cases_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cases_author_idx" ON "cases" USING btree ("author_id");
  CREATE INDEX "_cases_v_version_version_author_idx" ON "_cases_v" USING btree ("version_author_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  ALTER TABLE "cases_rels" DROP COLUMN "users_id";
  ALTER TABLE "_cases_v_rels" DROP COLUMN "users_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  ALTER TABLE "cases" DROP CONSTRAINT "cases_author_id_users_id_fk";
  
  ALTER TABLE "_cases_v" DROP CONSTRAINT "_cases_v_version_author_id_users_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk";
  
  DROP INDEX "cases_author_idx";
  DROP INDEX "_cases_v_version_version_author_idx";
  DROP INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx";
  DROP INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx";
  ALTER TABLE "cases_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "_cases_v_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "cases_rels" ADD CONSTRAINT "cases_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cases_v_rels" ADD CONSTRAINT "_cases_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cases_rels_users_id_idx" ON "cases_rels" USING btree ("users_id");
  CREATE INDEX "_cases_v_rels_users_id_idx" ON "_cases_v_rels" USING btree ("users_id");
  ALTER TABLE "cases" DROP COLUMN "result";
  ALTER TABLE "cases" DROP COLUMN "result_custom";
  ALTER TABLE "cases" DROP COLUMN "author_id";
  ALTER TABLE "_cases_v" DROP COLUMN "version_result";
  ALTER TABLE "_cases_v" DROP COLUMN "version_result_custom";
  ALTER TABLE "_cases_v" DROP COLUMN "version_author_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_mcp_api_keys_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN "payload_mcp_api_keys_id";
  DROP TYPE "public"."enum_cases_result";
  DROP TYPE "public"."enum__cases_v_version_result";`)
}
