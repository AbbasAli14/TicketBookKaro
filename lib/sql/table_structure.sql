--User Table

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `contact_no` int NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--Theatre Table

CREATE TABLE `theatres` (
  `theatre_id` int NOT NULL AUTO_INCREMENT,
  `theatre_name` varchar(255) NOT NULL,
  `theatre_image` varchar(255) NOT NULL,
  PRIMARY KEY (`theatre_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--Movies_Theatres Table

CREATE TABLE `movies_theatres` (
  `movie_id` int NOT NULL,
  `theatre_id` int NOT NULL,
  `showtime` time NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--Movies_Actors Table

CREATE TABLE `movies_actors` (
  `movie_id` int NOT NULL,
  `actor_id` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--Movies Table

CREATE TABLE `movies` (
  `movie_id` int NOT NULL AUTO_INCREMENT,
  `movie_name` varchar(255) NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `description` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `movie_poster` varchar(255) NOT NULL,
  `bg_image` varchar(255) NOT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--Booking_Seats Table

CREATE TABLE `booking_seats` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `theatre_id` int NOT NULL,
  `showtime` time NOT NULL,
  `booking_date` date NOT NULL,
  `seat_id` varchar(5) NOT NULL,
  PRIMARY KEY (`booking_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--Actors Table

CREATE TABLE `actors` (
  `actor_id` int NOT NULL AUTO_INCREMENT,
  `actor_name` varchar(255) NOT NULL,
  `actor_image` varchar(255) NOT NULL,
  PRIMARY KEY (`actor_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
