CREATE TABLE songs (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255),

    artist VARCHAR(255),

    album VARCHAR(255),

    url TEXT,

    lyrics LONGTEXT,

    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY(url(255))

);