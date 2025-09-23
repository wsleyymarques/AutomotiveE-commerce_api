# API - AutoPeças Shoppe

Esta é a API backend para o sistema de e-commerce AutoPeças Shoppe. Construída com Node.js, Express e Sequelize, e conteinerizada com Docker para facilitar a configuração do ambiente de desenvolvimento.

## Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas na sua máquina:
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
* Um cliente de API como o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

---

## 🚀 Configuração do Ambiente

Siga estes passos para configurar e rodar o projeto localmente.

### 0. Arquivo .env

O arquivo `.env` necessário para rodar o projeto foi enviado em uma nota junto ao e-mail da vaga.  
Além disso, o projeto contém um arquivo `.env-example` que demonstra o formato esperado do `.env`.  
Certifique-se de configurar corretamente as variáveis de ambiente antes de iniciar o servidor.

> ⚠️ Observação: o arquivo `.env` enviado por e-mail já contém todas as chaves configuradas para o AWS S3 funcionar corretamente, possibilitando o upload de imagens de produtos sem necessidade de ajustes adicionais.

### 1. Clonar o Repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DA_PASTA_DO_PROJETO>
```

### 2. Subir o Banco de Dados com Docker Compose

Este projeto já possui um arquivo `docker-compose.yml` configurado para o banco de dados.  
Para iniciar o banco, execute o seguinte comando na raiz do projeto:

```bash
docker-compose up -d
```

### 3. Banco de Dados Pré-populado (Dump)

Um dump do banco de dados local (com produtos e usuários já cadastrados) foi enviado por e-mail.  
Recomendo o uso do [TablePlus](https://tableplus.com/) ou outro cliente de banco de dados de sua preferência para importar esse dump no container criado pelo Docker Compose.

Isso irá facilitar os testes, pois você já terá dados prontos para testar.


## Criar Produto via Postman (com upload de imagem)

**Endpoint**

POST http://localhost:3333/api/products

**Body (form-data)**


| Key   | Tipo | Valor (exemplo)        |
|------:|:----:|-------------------------|
| name  | Text | Mangote                 |
| code  | Text | COD666                  |
| price | Text | 55.70                   |
| image | File | (selecione um .jpg/.png)|

> No Postman, em **Body → form-data**, mude o tipo da chave `image` para **File** e use **Select Files**.

**Resposta (exemplo)**
```json
{
  "id": 11,
  "name": "Mangote",
  "code": "COD666",
  "price": 55.7,
  "imageUrl": "https://s3.amazonaws.com/<bucket>/products/....jpg",
  "createdAt": "2025-09-22T00:00:00.000Z",
  "updatedAt": "2025-09-22T00:00:00.000Z"
}
```
cURL (alternativa ao Postman)

curl -X POST http://localhost:3333/api/products \
-H "Accept: application/json" \
-F "name=Mangote" \
-F "code=COD666" \
-F "price=55.70" \
-F "image=@/caminho/para/arquivo.jpg"

## 📖 Documentação da API (Swagger)

Este projeto conta com uma documentação interativa feita com **Swagger**, onde é possível visualizar e testar todos os endpoints diretamente pelo navegador.

Para acessar, basta rodar o servidor e abrir no navegador:

[http://localhost:3333/api-docs/](http://localhost:3333/api-docs/)

---

## 🌐 Frontend Conectado

Este backend já está totalmente conectado com o repositório do frontend:

[Automotive E-commerce Web](https://github.com/wsleyymarques/AutomotiveE-commerce_web)

O frontend foi construído em **React + Vite** e consome diretamente esta API, permitindo testar todo o fluxo (login, listagem de produtos, carrinho, etc.).

---

## ▶️ Como Rodar o Projeto

Após configurar o `.env` e subir o banco de dados com Docker Compose, basta instalar as dependências e iniciar o servidor com:

```bash
npm install
npm run dev
```

O servidor será iniciado na porta **3333** por padrão.

## 📋 Sobre Este Projeto (Vaga – PARTE 2)

Este repositório foi desenvolvido especificamente para atender aos requisitos da vaga (PARTE 2: Implementação Prática – mini e-commerce de peças automotivas). Abaixo listo os itens solicitados e como foram atendidos:

### ✅ Stack
- **Backend:** Node.js + Express + Sequelize + MySQL (via Docker Compose)
- **Frontend:** React + Vite + Axios
- **Autenticação:** JWT simples
- **Banco:** MySQL local (Docker). *Observação:* há dump com dados e também migrations para facilitar a execução.

### ✅ Endpoints Obrigatórios
- `POST /api/auth/register` – cadastro de usuário
- `POST /api/auth/login` – login (retorna JWT)
- `GET /api/products` – listar produtos (com paginação)
- `GET /api/products/search?q=termo` – buscar produtos por nome/código
- `GET /api/cart` – listar itens do carrinho do usuário logado
- `POST /api/cart` – adicionar item ao carrinho
- `PUT /api/cart/:id` – atualizar quantidade
- `DELETE /api/cart/:id` – remover item

### ✅ Requisitos Técnicos
- Middleware de autenticação **JWT**
- Validação básica de dados (**express-validator**)
- Senhas criptografadas (**bcrypt**)
- Tratamento de erros e respostas **JSON** padronizadas com status HTTP corretos
- **CORS** configurado

### ✅ Funcionalidades Essenciais (Fluxo do Usuário)
- **Acesso:** login e cadastro
- **Busca:** por nome ou código
- **Carrinho:** adiciona produtos, altera quantidades e remove itens

### 🎯 Bônus AWS (implementado)
- Upload de imagem de produto para **AWS S3** (habilitado).  
  *O `.env` enviado por e-mail já contém as chaves para o S3 funcionar perfeitamente.*

### 📦 Entrega
- Repositório Git com código do **backend** (este) e **frontend**
- Commits organizados e descritivos
- **README** com instruções de configuração e execução
- Arquivo **.env.example**
- Scripts de inicialização (`npm run dev`, entre outros)

*Observação final:* Foquei em fazer funcionar primeiro, usando ferramentas que já domino, com commits frequentes e este README claro para facilitar a avaliação – conforme as **DICAS IMPORTANTES** da vaga.
