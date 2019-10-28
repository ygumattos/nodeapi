# API for SKY

### Essa aplicação tem como objetivo realizar o sign in a sign up de usuários, gerando tokens JWT que persistem com o mesmo e seu tempo de login não ultrapasse 30min ate que seja necessário renovar.

## Proposta:
- Criar um aplicativo backend que irá expor uma API RESTful de criação de sing up/sign
in.
Todos os endpoints devem somente aceitar e somente enviar JSONs. O servidor
deverá retornar JSON para os casos de endpoint não encontrado também.
O aplicativo deverá persistir os dados.
Todas as respostas de erro devem retornar o objeto:

```js
{
  "mensagem"​ : ​ "mensagem de erro"
}
```
## Sign up
- Este endpoint deverá receber um usuário com os seguintes campos: nome,
email, senha e uma lista de objetos telefone. Seguem os modelos:

```js
{
  "nome"​ : ​ "string"​ ,
  "email"​ : ​ "string"​ ,
  "senha"​ : ​ "string"​ ,
  "telefones"​ : [{
    "numero"​ : ​ "string"​ ,
    "ddd"​ : ​ "string"
  }]
}
```
## Sign in
- Este endpoint irá receber um objeto com e-mail e senha.

```js
{
  "email"​ : ​ "string"​ ,
  "senha"​ : ​ "string"​ ,
}
```

## Buscar usuário
 - Informar usuário no path.
 - Chamadas para este endpoint devem conter um header na requisição de
Authentication com o valor "Bearer {token}" onde {token} é o valor do token
passado na criação ou sign in de um usuário.
- Caso o token sejá valido, seja o mesmo persistido no schema de User e o ultimo lógin seja maior que 30 min, irá retornar o usuário passado no path.

## Sugestão de visualização (Insomnia)

<img src="https://i.ibb.co/94Kx7T7/insomnia.png" alt="insomnia" border="0">

* ``` "base_url": "http://localhost:3001" ```

#### Users
- Sign Up: (POST) base_url/users
- Buscar usuario: (GET) base_url/users/:id

#### Sessions
- Sign in: (POST) base_url/sessions

## Iniciar o projeto:
### Opção 01:
 1. Após fazer o git clone, ir ate a pasta do projeto via terminal e rodar `yarn`.
 2. Certificar que o mongodb está em execução (seja na sua máquina ou container, contanto que exponha a porta 27017).
 3. No terminal utilizar o comando `yarn dev`.
 4. Testar no Insomnia / Postman.

 ### Opção 02:
 1. Após fazer o git clone, ir ate a pasta do projeto via terminal e rodar `docker-compose up`.
 2. Testar no Insomnia / Postman.

## Tecnologias envolvidas:

- NodeJS
- Express
- MongoDB
- Mongoose
- Token JWT
- Input validation with YUP
- BcryptJS
- Moment
