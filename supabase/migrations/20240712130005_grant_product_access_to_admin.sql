do $$
DECLARE
    user_id_to_grant UUID;
BEGIN
    -- Find the user ID for the specified email
    SELECT id INTO user_id_to_grant FROM auth.users WHERE email = 'aiautomation53@gmail.com';

    -- If the user exists, grant them permissions to all products
    IF user_id_to_grant IS NOT NULL THEN
        INSERT INTO user_product_permissions (user_id, product_id)
        SELECT user_id_to_grant, id FROM products
        ON CONFLICT (user_id, product_id) DO NOTHING;
    END IF;
END;
$$;