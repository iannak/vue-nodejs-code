# Aplicação Node.js com MongoDB usando Docker Compose

Esta é uma aplicação Node.js com MongoDB configurada para ser executada usando o Docker Compose.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes pré-requisitos instalados em seu ambiente de desenvolvimento:

- Docker: Verifique se o Docker está instalado corretamente executando o comando `docker --version` no terminal.
- Docker Compose: Verifique se o Docker Compose está instalado corretamente executando o comando `docker-compose --version` no terminal.

## Configuração

1. Clone este repositório para o seu ambiente de desenvolvimento.

```
git clone <URL_DO_REPOSITORIO>
```

2. Navegue para o diretório do projeto.

```
cd <NOME_DO_DIRETORIO>
```

3. Instale as dependências do projeto.

```npm install```

## Executando a aplicação com o Docker Compose

1. Inicie os serviços usando o Docker Compose.
```docker-compose up```

2. O Docker Compose irá construir a imagem do contêiner para a aplicação Node.js e iniciar os serviços app e mongodb.

3. Após a execução bem-sucedida, você verá a mensagem "Servidor pronto em http://localhost:3000" no terminal.

4. Acesse a aplicação em seu navegador web usando o seguinte URL: http://localhost:3000

5. Para interromper a execução dos serviços, pressione Ctrl + C no terminal e execute o seguinte comando:
```
docker-compose down
```

## Estrutura do projeto
Explicação da estrutura de diretórios e arquivos do projeto:

- app/: Diretório contendo os arquivos da aplicação Node.js.
- app/index.js: Arquivo principal da aplicação.
- app/routes/participantsRoutes.js: Arquivo contendo as rotas da aplicação.
- app/controllers/participantsController.js: Arquivo contendo os controladores da aplicação.
- Dockerfile: Arquivo de configuração do Docker para construir a imagem do contêiner da aplicação Node.js.
- docker-compose.yml: Arquivo de configuração do Docker Compose para definir os serviços da aplicação.

## Contribuição
Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Este projeto está licenciado sob a Licença MIT.

Certifique-se de substituir `<URL_DO_REPOSITORIO>` pelo URL do seu repositório Git e `<NOME_DO_DIRETORIO>` pelo nome do diretório do seu projeto.

Personalize o arquivo `README.md` conforme necessário para atender às especificidades da sua aplicação.

Espero que isso ajude a criar um arquivo `README.md` completo com instr
