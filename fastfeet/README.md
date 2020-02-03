## Iniciando a aplicação Gobarber

<strong>Definindo estrutura</strong>

- `yarn init`
- `yarn add express`

<strong>Instlando Nodemon & Sucrase</strong>

- `yarn add sucrase nodemon -D`
√ Com isso é possível utilizar a syntax de import e export.
√ Cofigura o arquivo nodemon.json

{
  "execMap": {
    "js": "node -r sucrase/register"
  }
}

<strong>Configurando o Postgres com Docker</strong>

- `https://hub.docker.com/_/postgres`
- Executando a imagem do postgres no docker
- `docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

<strong>Configurando Eslint</strong>

- `yarn eslint --init`
- `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`: intslando o Prettier

- `yarn add sequelize`: instalando o sequelize
- `yarn add sequelize-cli -D`

- `yarn add pg pg-hstore`: dialect do postgres
