-- migrate:up
INSERT INTO users(
  id,
  email,
  password,
  name,
  phone) VALUES
  (1,"aet", "sdg","asdf","0123");

-- migrate:down

