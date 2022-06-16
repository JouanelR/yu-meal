CREATE TABLE Users(
   id INT,
   pseudo VARCHAR(50),
   email VARCHAR(50),
   password VARCHAR(100),
   PRIMARY KEY(id)
);

CREATE TABLE Dislikes(
   id_recette INT,
   id INT NOT NULL,
   PRIMARY KEY(id_recette),
   FOREIGN KEY(id) REFERENCES Users(id)
);

CREATE TABLE Allergenes(
   ingredient VARCHAR(50),
   id INT NOT NULL,
   PRIMARY KEY(ingredient),
   FOREIGN KEY(id) REFERENCES Users(id)
);

CREATE TABLE Likes(
   id_recette INT,
   id INT NOT NULL,
   PRIMARY KEY(id_recette),
   FOREIGN KEY(id) REFERENCES Users(id)
);

CREATE TABLE Favoris(
   id_recette INT,
   id INT NOT NULL,
   PRIMARY KEY(id_recette),
   FOREIGN KEY(id) REFERENCES Users(id)
);
