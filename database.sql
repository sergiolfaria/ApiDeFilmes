CREATE TABLE filmes (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(255),
    diretor VARCHAR(255),
    ano_lancamento INT,
    genero VARCHAR(255),
    sinopse TEXT,
    classificacao VARCHAR(5),
    user_id VARCHAR(255)
);

INSERT INTO filmes (id, titulo, diretor, ano_lancamento, genero, sinopse, classificacao) VALUES
('018bfa51-5309-734d-876a-63c04d2a7968', 'Star Wars: Episódio III - A Vingança dos Sith', 'George Lucas', 2005, 'Ficção Científica', 'Durante as Guerras Clônicas, Anakin Skywalker é seduzido pelo lado sombrio da Força e se transforma no temível Darth Vader. Ao mesmo tempo, a República Galáctica se transforma no Império Galáctico, levando à ascensão do Império e à queda dos Jedi.', 'PG-13','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa51-94bb-7171-afa3-010f43c95cde', 'Vingadores: Ultimato', 'Anthony Russo, Joe Russo', 2019, 'Ação', 'Os Vingadores se reúnem para desfazer as ações de Thanos e restaurar o equilíbrio no universo.', 'PG-13','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa51-cbd1-77a9-9eec-ed200b22b8d4', 'Forrest Gump', 'Robert Zemeckis', 1994, 'Drama', 'A vida de Forrest Gump, um homem com QI abaixo da média, mas uma alma pura, testemunha e influencia vários eventos importantes na história dos Estados Unidos.', 'PG-13','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa52-024b-7674-8843-2c96f552fa0f', 'Titanic', 'James Cameron', 1997, 'Romance', 'O romance épico de Jack e Rose durante a viagem inaugural do Titanic, que termina em tragédia.', 'PG-13','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa52-348f-729c-b6d6-80a137477af0', 'Matrix', 'Lana Wachowski, Lilly Wachowski', 1999, 'Ficção Científica', 'Um hacker descobre a verdade sobre a realidade e sua participação em uma guerra contra máquinas inteligentes.', 'R','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa53-1e5b-7e1e-86bd-69af0f3e5c7a', 'O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', 2001, 'Fantasia', 'Um hobbit é encarregado de destruir um poderoso anel para evitar que caia nas mãos do mal.', 'PG-13','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa53-4883-7bc3-8ceb-2c051124c943', 'O Rei Leão', 'Roger Allers, Rob Minkoff', 1994, 'Animação', 'Um jovem leão príncipe foge de casa apenas para aprender o verdadeiro significado de responsabilidade e valentia.', 'G','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa53-64e7-74c1-b26b-baa622f7c4d3', 'Interestelar', 'Christopher Nolan', 2014, 'Ficção Científica', 'Um grupo de exploradores viaja através de um buraco de minhoca espacial em busca de um novo lar para a humanidade.', 'PG-13','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa53-a037-75a7-b26e-a1c841dab7f0', 'Pantera Negra', 'Ryan Coogler', 2018, 'Ação', 'T''Challa, o rei recém-corado de Wakanda, deve defender seu país contra os inimigos internos e externos.', 'PG-13','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa53-c991-746a-97da-d3fb1e061e18', 'Star Wars: Episódio IV - Uma Nova Esperança', 'George Lucas', 1977, 'Ficção Científica', 'Um jovem fazendeiro chamado Luke Skywalker se junta a um grupo rebelde para combater o malvado Império Galáctico e resgatar a Princesa Leia.', 'PG','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa53-ecfb-7667-bf42-dc1605dd78e9','O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', 2001, 'Fantasia', 'Um hobbit chamado Frodo precisa destruir um anel poderoso para impedir o mal de Sauron.', 'PG-13','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1'),
('018bfa54-4721-7ed1-bb9d-0aadf1dd415d','Harry Potter e a Pedra Filosofal', 'Chris Columbus', 2001, 'Fantasia', 'Harry Potter descobre que é um bruxo e começa sua jornada em Hogwarts.', 'PG','018bf59b-ea51-7a7b-9ebb-72f4d027b3b1');
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('default', 'admin')) NOT NULL
);