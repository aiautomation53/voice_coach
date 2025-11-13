do $$
declare
  admin_role_id uuid;
  user_id uuid;
begin
  select id into admin_role_id from roles where name = 'admin';
  select id into user_id from auth.users where email = 'aiautomation53@gmail.com';
  insert into user_roles (user_id, role_id) values (user_id, admin_role_id);
end;
$$;