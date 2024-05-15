

CREATE DATABASE brasileirao;

CREATE TABLE times_serie_a(
id serial primary key,
Time VARCHAR(50)
); 


INSERT INTO times_serie_a (Time)
VALUES 
('Athletico-PR'), ('Atlético-GO'),('Atlético-MG'), ('Bahia-BA'), ('Botafogo-RJ'),
 ('Bragantino-SP'),('Corinthians-SP'),('Criciúma-SC'),('Cruzeiro-MG'),('Cuiabá-MT'),
 ('Flamengo-RJ'),('Fluminense-RJ'), ('Fortaleza-CE'),('Grêmio-RS'),('Internacional-RS'),
 ('Juventude-RS'),('Palmeiras-SP'),('São Paulo-SP'),('Vasco-RJ'),('Vitória-BA');

CREATE TABLE Classificacao_serie_A (
    Posicao INT,
    Time INT REFERENCES times_serie_a(id),
    Pontos INT,
    Jogos INT,
    Vitorias INT,
    Empates INT,
    Derrotas INT,
    GolsMarcados INT,
    GolsSofridos INT,
    SaldoGols INT
);

create table usuarios_permitidos (
	id serial primary key,
	nome text ,
  email text , 
  senha text
	);