-- migrate:up
CREATE TABLE oh (
    id int NOT NULL PRIMARY KEY);

-- migrate:down
DROP TABLE oh;
