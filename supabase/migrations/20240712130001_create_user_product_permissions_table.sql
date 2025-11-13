CREATE TABLE user_product_permissions (
  user_id UUID NOT NULL REFERENCES auth.users(id),
  product_id UUID NOT NULL REFERENCES products(id),
  PRIMARY KEY (user_id, product_id)
);