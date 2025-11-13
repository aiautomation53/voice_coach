
-- This script gives admin access to aiautomation53@gmail.com

-- Get the admin role id
do $$
declare
  admin_role_id uuid;
  user_id uuid;
begin
  -- Get the admin role id
  select id into admin_role_id from roles where name = 'admin';

  -- Get the user id
  select id into user_id from auth.users where email = 'aiautomation53@gmail.com';

  -- Add the user to the admin role
  insert into user_roles (user_id, role_id) values (user_id, admin_role_id);
end;
$$;
