A api inicia pelo arquivo start.js, na url base: http://localhost:8080


**Registrar Usuário**
----
  Registra um usuário na API

* **URL**

  /api/registrar

* **Method:**
  
  `POST` 

* **Data Params**

  ```json
    {
      "username": "nome do usuário",
      "password": "senha",
      "email": "email do usuário"
    }
  ```

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "data": {
          "username": "nome do usuário",
          "password": "senha",
          "email": "email do usuário"
        }
      }
    ```
    
**Login de usuário**
----
  Faz o login do usuário no sistema, retornando um oken de acesso para as requisições

* **URL**

  /api/login

* **Method:**
  
  `POST` 

* **Data Params**

  ```json
    {
      "username": "nome ou email do usuário",
      "password": "senha"
    }
  ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "token": "json web token"
      }
    ```

**Cadastrar Categoria**
----
  Cadastra uma categoria

* **URL**

  /api/category

* **Method:**
  
  `POST` 

* **Data Params**

  ```json
    {
      "name": "nome da categoria"
    }
  ```

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "data": {
            "id": "id da categoria",
            "name": "nome da categoria"
        }
      }
    ```

**Atualizar Categoria**
----
  Atualiza uma categoria

* **URL**

  /api/category/:id

* **Method:**
  
  `PUT` 

* **Data Params**

  ```json
    {
      "name": "nome da categoria"
    }
  ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "data": {
            "id": "id da categoria",
            "name": "nome da categoria"
        }
      }
    ```

**Deletar Categoria**
----
  Deleta uma categoria

* **URL**

  /api/category/:id

* **Method:**
  
  `DELETE` 

* **Data Params**

  `none`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "message": "Categoria removida"
      }
    ```

**Exibir Categoria**
----
  Exibe dados de uma categoria

* **URL**

  /api/category/:id

* **Method:**
  
  `GET` 

* **Data Params**

  `none`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "data": {
            "id": "id da categoria",
            "name": "nome da categoria"
        }
      }
    ```

**Listar Categoria**
----
  Lista todas as categorias

* **URL**

  /api/category

* **Method:**
  
  `GET` 

* **Data Params**

  `none`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "data": [
            {
                "id": "id da categoria",
                "name": "nome da categoria"
            },
            {
                "id": "id da categoria",
                "name": "nome da categoria"
            },
            {
                "...": "..."
            }
            
        ]
      }
    ```


**Cadastrar Produto**
----
  Cadastra um produto

* **URL**

  /api/product

* **Method:**
  
  `POST` 

* **Data Params**

  ```json
    {
        "categoryId": "id do produto",
        "name": "nome do produto",
        "manufacturingDate": "Data de fabricação do produto (Formato: 2020-07-17T12:55:33.000Z)",
        "perishableProduct": "True ou false, marcando se o produto é perecível",
        "expirationDate": "Data de validade do produto (Formato: 2020-07-17T12:55:33.000Z)",
        "price": "Preço do produto"
    }
  ```

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "data": {
            "categoryId": "id do produto",
            "name": "nome do produto",
            "manufacturingDate": "Data de fabricação do produto (Formato: 2020-07-17T12:55:33.000Z)",
            "perishableProduct": "True ou false, marcando se o produto é perecível",
            "expirationDate": "Data de validade do produto (Formato: 2020-07-17T12:55:33.000Z)",
            "price": "Preço do produto"
        }
      }
    ```

**Atualizar Produto**
----
  Atualiza um produto

* **URL**

  /api/product/:id

* **Method:**
  
  `PUT` 

* **Data Params**
    Os paramêtros que não deseja alterar podem ser especifícados ou não
  ```json
    {
        "categoryId": "id do produto",
        "name": "nome do produto",
        "manufacturingDate": "Data de fabricação do produto (Formato: 2020-07-17T12:55:33.000Z)",
        "perishableProduct": "True ou false, marcando se o produto é perecível",
        "expirationDate": "Data de validade do produto (Formato: 2020-07-17T12:55:33.000Z)",
        "price": "Preço do produto"
    }
  ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "data": {
            "categoryId": "id do produto",
            "name": "nome do produto",
            "manufacturingDate": "Data de fabricação do produto (Formato: 2020-07-17T12:55:33.000Z)",
            "perishableProduct": "True ou false, marcando se o produto é perecível",
            "expirationDate": "Data de validade do produto (Formato: 2020-07-17T12:55:33.000Z)",
            "price": "Preço do produto"
        }
      }
    ```

**Deletar Produto**
----
  Deleta um produto

* **URL**

  /api/product/:id

* **Method:**
  
  `DELETE` 

* **Data Params**

  `none`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "message": "Produto removido"
      }
    ```

**Exibir Produto**
----
  Exibe dados de um produto

* **URL**

  /api/product/:id

* **Method:**
  
  `GET` 

* **Data Params**

  `none`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "data": {
            "categoryId": "id do produto",
            "name": "nome do produto",
            "manufacturingDate": "Data de fabricação do produto (Formato: 2020-07-17T12:55:33.000Z)",
            "perishableProduct": "True ou false, marcando se o produto é perecível",
            "expirationDate": "Data de validade do produto (Formato: 2020-07-17T12:55:33.000Z)",
            "price": "Preço do produto"
        }
      }
    ```

**Listar Produtos**
----
  Lista todos os produtos, com paginação de 10 produtos por página, podendo ser ordenado

* **URL**

  /api/product

* **Method:**
  
  `GET` 

*  **URL Params**

   **Optional:**
 
   `field=[Nome do campo a ser ordenado]`
   `order=[ASC ou DESC]`

* **Data Params**

  `none`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "status": "success",
        "data": [
            {
                "categoryId": "id do produto",
                "name": "nome do produto",
                "manufacturingDate": "Data de fabricação do produto (Formato: 2020-07-17T12:55:33.000Z)",
                "perishableProduct": "True ou false, marcando se o produto é perecível",
                "expirationDate": "Data de validade do produto (Formato: 2020-07-17T12:55:33.000Z)",
                "price": "Preço do produto"
            },
            {
                "categoryId": "id do produto",
                "name": "nome do produto",
                "manufacturingDate": "Data de fabricação do produto (Formato: 2020-07-17T12:55:33.000Z)",
                "perishableProduct": "True ou false, marcando se o produto é perecível",
                "expirationDate": "Data de validade do produto (Formato: 2020-07-17T12:55:33.000Z)",
                "price": "Preço do produto"
            },
            {
                "...": "..."
            }
        ]
      }
    ```
