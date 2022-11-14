# iMovies

Banco de dados de uma wishlist de filmes. 

# Sobre

Banco de dados que permite o usuário administrar sua wishlist de filmes; 

podendo acrescentar o filme que deseja assistir com um marcador que define o status do filme em:

+ not watched
+ watching
+ watched

e quando estiver assistido um filme o usuário pode dar ao filme uma nota e/ou uma avaliação;

caso o usuário não queria mais um certo filme em sua wishlist ele pode apagá-lo.

# Documentação da API

## 1. Gêneros

Rota de gêneros.

### POST
Insere um novo gênero de filme da API.

+ POST: /genre 
+ BODY: { "name": "Fantasy"}

### GET 
Retorna todos os gêneros de filmes cadastrados na API e a quantidade de filmes de cada gênero.

+ GET: /genres

## 2. Plataformas

### POST

Insere uma nova plataforma de filme da API.

+ POST: /platform 
+ BODY: { "name": "HBO Max"}

### GET 

Rota de plataformas da API.

Retorna todos as plataformas de filmes cadastrados na API e a quantidade de filmes de cada plataforma.

+ GET: /platforms

## 3. Filmes

Rota de filmes da API.

### POST

Insere um novo filme na API.

+ POST: /movies
+ BODY: { "name": "Harry Potter and the Chamber of Secrets" , "platformId": 3 , "genreId": 11 , "status": "not_watched"}

### GET

Retorna todos os filmes da API.

+ GET: /movies

### PUT

Muda o status do filme já adicionado na API podendo ser "not_watched", "watching", "watched".

+ PUT: /movies/status/:id
+ BODY: { "name" : "watched"}

Muda a nota (rate) e/ou a avaliação (review) de um filme já visto pelo usuário.
+ PUT: /movies/:id
+ BODY : { "name": "Harry Potter and the Chamber of Secrets" , "platformId": 3 , "genreId": 11 , "status": "not_watched", "rate": 8.2, "review": "Though perhaps more enchanting for younger audiences, Chamber of Secrets is nevertheless both darker and livelier than its predecessor, expanding and improving upon the first film's universe"}

### DELETE

Apaga um  filme cadastrado na API.

+ DELETE: /movies/:id

# Tecnologias
+ Typescript
+ PostgreSQL