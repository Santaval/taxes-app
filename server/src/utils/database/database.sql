-- Active: 1743552940664@@biazmgqtxzyx1t6owh5k-mysql.services.clever-cloud.com@21485@biazmgqtxzyx1t6owh5k
CREATE TABLE IF NOT EXISTS transactions (
  `id` VARCHAR(500) NOT NULL PRIMARY KEY,
  `type` ENUM('DEPOSIT', 'WITHDRAWAL') NOT NULL,
  `userID` VARCHAR(500),
  `transactionAmount` DOUBLE,
  `cashbackPercentage` DOUBLE,
  `cashback` DOUBLE NOT NULL,
  `approved` BOOLEAN DEFAULT FALSE,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS users (
  `id` VARCHAR(500) NOT NULL PRIMARY KEY,
  `name` VARCHAR(500) ,
  `firstSurname` VARCHAR(500),
  `secondSurname` VARCHAR(500),
  `email` VARCHAR(500) NOT NULL UNIQUE,
  `phoneNumber` VARCHAR(500),
  `birthdate` DATE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `completedProfile` BOOLEAN DEFAULT FALSE,
  `imageUrl` VARCHAR(500)
);


CREATE TABLE IF NOT EXISTS benefits (
  `id` VARCHAR(500) NOT NULL PRIMARY KEY,
  `title` VARCHAR(500),
  `description` TEXT,
  `monthlyFrequency` INT,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS benefit_usage (
  `id` VARCHAR(500) NOT NULL PRIMARY KEY,
  `userID` VARCHAR(500) NOT NULL,
  `benefitID` VARCHAR(500) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `approved` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`userID`) REFERENCES users (`id`),
  FOREIGN KEY (`benefitID`) REFERENCES benefits (`id`)
);


CREATE TABLE IF NOT EXISTS otps (
  `id` VARCHAR(500) NOT NULL PRIMARY KEY,
  `userID` VARCHAR(500),
  `code` VARCHAR(4) NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP
);



ALTER TABLE transactions ADD CONSTRAINT transactions_userID_fk FOREIGN KEY (`userID`) REFERENCES users (`id`);
ALTER TABLE benefit_usage ADD CONSTRAINT users_benefits_userID_fk FOREIGN KEY (`userID`) REFERENCES users (`id`);