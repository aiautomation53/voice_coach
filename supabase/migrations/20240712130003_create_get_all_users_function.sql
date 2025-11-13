CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  id UUID,
  email TEXT
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT id, email FROM auth.users;
$$;