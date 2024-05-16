# Api--Brasileir-o

## Introdução

 Este projeto é uma implementação de um CRUD (Create, Read, Update, Delete) de uma API RESTful(Baseada no campeonato brasileiro da serie A 2024). A API permite a manipulação de recursos por meio de requisições HTTP aos endpoints especificados.


## Objetivo 

O principal objetivo deste projeto é ampliar e enriquecer meu portfólio pessoal de projetos de desenvolvimento. Com este projeto, busco demonstrar minhas habilidades técnicas, experiência prática e criatividade na área de  desenvolvimento web (backend),

Além disso, este projeto servirá como uma oportunidade para explorar novas tecnologias, aprimorar minhas habilidades existentes e demonstrar meu comprometimento com a aprendizagem contínua no campo da tecnologia.

## Tecnologias Utilizadas

- JAVASCRIPT
- pg
- express
- bcrypt(criptografia de senha)
- dotenv (variáveis de ambiente)
- joi (validações)
- jwt(Autenticação)
- knex (query builder)




## Descrição do projeto : 

- Criação de banco de dados 
- Cadastrar usuário 
- Fazer login 
- Deletar usuário
- Editar usuário
- listar times
- Filtrar times por estado
- Listar tabela por rodada


## **Banco de dados**

Criar um Banco de Dados PostgreSQL chamado `brasileirao` contendo as seguintes tabelas e colunas:  

- clasificacao_serie_a
  - posicao
  - time
  - pontos
  - jogos
  - vitorias
  - empates
  - derrotas
  - golsmarcados
  - golssofridos
  - saldogols

- times_serie_a
  - id
  - time

- usuarios_permitidos
  - id
  - nome
  - email (campo único)
  - senha

- tabela_de_jogos 
  - id_jogo
  - rodada
  - time_mandante
  - time_visitante
  - gols_mandante
  - gols_visitante 


## **times_serie_a

- alimentar a tabela com todos os times que participam da serie A de 2024.

**IMPORTANTE: Deverá ser criado no projeto o arquivo SQL que deverá ser o script de inserção de todas as informações do banco de dados.**


## **Status Codes**

Abaixo, os possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
```

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema. Esse usuário poderá manipular as informações dos resultados dos jogos. 

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

- **REQUISITOS OBRIGATÓRIOS**
  - Validar os campos obrigatórios:
    - nome
    - email
    - senha
  - Validar se o e-mail informado já existe
  - Criptografar a senha antes de persistir no banco de dados
  - Cadastrar o usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```


### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - email
  - senha

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com a propriedade **token** que deverá possuir como valor o token de autenticação gerado e uma propriedade **usuario** que deverá possuir as informações do usuário autenticado, exceto a senha do usuário. 


- **REQUISITOS OBRIGATÓRIOS**

  - Validar os campos obrigatórios:
    - email
    - senha
  - Verificar se o e-mail existe
  - Validar e-mail e senha
  - Criar token de autenticação com id do usuário

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```
## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

### **Validações do token**

- **REQUISITOS OBRIGATÓRIOS**
  - Validar se o token foi enviado no header da requisição (Bearer Token)
  - Verificar se o token é válido
  - Consultar usuário no banco de dados pelo id contido no token informado



  ### **editar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio cadastro.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

- **Resposta**  
  Em caso de **sucesso**, não enviar conteúdo no corpo (body) da resposta.  

- **REQUISITOS OBRIGATÓRIOS**
  - Validar os campos obrigatórios:
    - nome
    - email
    - senha
  - Validar se o novo e-mail já existe no banco de dados para outro usuário
    - Caso já exista o novo e-mail fornecido para outro usuário no banco de dados, a alteração não deve ser permitida (o campo de email deve ser sempre único no banco de dados)
  - Criptografar a senha antes de salvar no banco de dados
  - Atualizar as informações do usuário no banco de dados

  ### **Listar categorias**

#### `GET` `/times`

Essa é a rota que será chamada quando o usuário do sistema quiser listar os times participantes.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (times_serie_a) encontrados.  
  

 ### **Filtrar times por estado**

#### `POST` `/filtro`

Essa é a rota que será chamada quando o usuário quiser buscar os times por estado..  

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - estado
  
  - **REQUISITOS OBRIGATÓRIOS**
  - Validar os campos obrigatórios:
    - estado 
  - O estado , só será valido se for informado com a sigla de dois digitos. Exemplo ; estado: BA 
  - Verificar se possuem times participantes , do estado informado. 

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{{
	"Mensagem": "Times estado BA que participam do campeonato: Bahia-BA,Vitória-BA "
}
}
```

### **Listar tabela por rodada**

#### `GET` `/tabela`

Essa é a rota que será chamada quando o usuário listar todos os jogos realizados por rodada ..  

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - rodada
  
  - **REQUISITOS OBRIGATÓRIOS**
  - Validar os campos obrigatórios:
    - rodada 
  - Verificar se a rodada já aconteceu no campeonato. 
  - Obs.: O campeonato possui o número maximo de 38 rodadas. 

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	{ mensagem: "O campeonato possui 38 rodadas válidas. " }

}

[
	{
		"id_jogo": 1,
		"rodada": 1,
		"time_mandante": "Vitória-BA",
		"time_visitante": "Palmeiras-SP",
		"gols_mandante": 0,
		"gols_visitante": 1
	},
	{
		"id_jogo": 2,
		"rodada": 1,
		"time_mandante": "Criciúma-SC",
		"time_visitante": "Juventude-RS",
		"gols_mandante": 1,
		"gols_visitante": 1
	},

]