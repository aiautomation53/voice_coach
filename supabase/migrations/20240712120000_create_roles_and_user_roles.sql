
create table roles (
  id uuid default gen_random_uuid() not null,
  name text not null,
  primary key (id)
);

create table user_roles (
  user_id uuid not null,
  role_id uuid not null,
  primary key (user_id, role_id),
  foreign key (user_id) references auth.users (id),
  foreign key (role_id) references roles (id)
);

insert into roles (name) values ('admin');

-- And here is the RLS policy to ensure only admins can see all user roles
-- And users can only see their own roles
CREATE POLICY "Enable read access for all users" ON "public"."user_roles"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role_id = (SELECT id FROM roles WHERE name = 'admin')));

ALTER TABLE "public"."user_roles" ENABLE ROW LEVEL SECURITY;
