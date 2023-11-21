#!/bin/bash

# Pedir ao usuário para inserir o nome do projeto
read -p "Digite o nome do seu projeto TypeScript: " nome_projeto

# Verificar se o diretório já existe
if [ -d "$nome_projeto" ]; then
  echo "Diretório '$nome_projeto' já existe. Por favor, escolha outro nome para o seu projeto."
else
 
# Remover espaços em branco dos lados e converter para minúsculas
nome_projeto=$(echo "$nome_projeto" | xargs | tr '[:upper:]' '[:lower:]')

# Verificar se o diretório já existe
if [ -d "$nome_projeto" ]; then
  echo "Diretório '$nome_projeto' já existe. Por favor, escolha outro nome para o seu projeto."
else
  # Criar o diretório do projeto
  mkdir "$nome_projeto"
  cd "$nome_projeto"

  # ... Restante do script
fi
  # Criar a estrutura de pastas
  mkdir src
  mkdir build

  # Criar arquivos necessários
  touch src/index.ts
  echo 'console.log("Hello, TypeScript!");' >src/index.ts
  touch tsconfig.json
  touch package.json

  # Configurar tsconfig.json
  echo '{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
}' >tsconfig.json

  # Configurar package.json
  echo '{
  "name": "'$nome_projeto'",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "tsc && node ./build/index.js",
    "dev": "nodemon --exec ts-node src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/cors": "^2.8.14",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^8.5.1",
    "@types/knex": "^0.16.1",
    "@types/uuid": "^8.3.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^8.5.1",
    "knex": "^3.0.1",
    "pg": "^8.3.3",
    "typescript": "^5.2.2",
    "uuid": "^8.3.2"
    "uuidv7": "^0.6.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
' >package.json

  # Instalar as dependências
  npm install
  npx uuidv7

  echo "Projeto TypeScript '$nome_projeto' criado com sucesso."
fi
