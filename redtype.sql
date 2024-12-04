CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    highest_wpm INT DEFAULT 0,
    total_words INT DEFAULT 0,
    level INT DEFAULT 0,
    characters INT DEFAULT 0,
    password VARCHAR(255)
);