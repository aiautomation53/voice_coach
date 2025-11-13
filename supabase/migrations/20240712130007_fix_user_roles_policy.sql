ALTER POLICY "Enable read access for authenticated users" ON "public"."user_roles" USING (auth.uid() = user_id);
