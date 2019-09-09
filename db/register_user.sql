INSERT INTO users
(username, profileImage, password)
VALUES
($1,$2,$3)
RETURNING id, username, profileImage