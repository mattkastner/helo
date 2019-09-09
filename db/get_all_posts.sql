SELECT p.user_id, p.id, p.title, p.imageURL, p.content, u.username, u.profileImage
FROM posts p
JOIN users u ON p.user_id = u.id