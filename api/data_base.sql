CREATE DATABASE IF NOT EXISTS data_base;

USE data_base;

CREATE TABLE advertisement (
    id_advertisement INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    contract VARCHAR(255),
    shortDescription VARCHAR(255),
    detailDescription VARCHAR(255),
    id_companies INT,
    FOREIGN KEY (id_companies) REFERENCES companies(id_companies)
);

CREATE TABLE companies (
    id_companies INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    locationAdress VARCHAR(255),
    sector VARCHAR(255)
);

CREATE TABLE peoples (
    id_peoples INT PRIMARY KEY AUTO_INCREMENT,
    lastName VARCHAR(255),
    firstName VARCHAR(255),
    status VARCHAR(255),
    tel VARCHAR(255),
    email VARCHAR(255),
    mdp VARCHAR(255),
    token VARCHAR(255)
);

CREATE TABLE application (
    id_application INT PRIMARY KEY AUTO_INCREMENT,
    emailSent VARCHAR(255),
    id_advertisement INT,
    id_peoples INT,
    FOREIGN KEY (id_advertisement) REFERENCES advertisement(id_advertisement),
    FOREIGN KEY (id_peoples) REFERENCES peoples(id_peoples)
);





