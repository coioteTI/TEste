# 🚀 Automação de Testes E2E com Cypress

Projeto profissional de automação de testes End-to-End desenvolvido com Cypress. O foco deste projeto é garantir a qualidade da aplicação validando as funcionalidades de Login e Gerenciamento de Banco de Dados. Este repositório foi desenvolvido especificamente como modelo para Testes Técnicos de vagas QA Pleno/Júnior Avançado.

## 📁 Estrutura do Projeto

O projeto foi estruturado utilizando o padrão **Page Objects**, garantindo escalabilidade, fácil manutenção e reutilização de código. A separação de responsabilidades segue as melhores práticas de QA.

```text
qa-cypress/
 ├── cypress/
 │   ├── e2e/              # Cenários de teste (spec files com describes e its)
 │   ├── fixtures/         # Massa de dados estática (.json)
 │   ├── pages/            # Page Objects (seletores e ações encapsuladas)
 │   ├── support/          # Configurações globais e custom commands (e2e.js, commands.js)
 │
 ├── cypress.config.js     # Arquivo de configuração do Cypress
 ├── package.json          # Dependências do projeto e scripts
 └── README.md             # Documentação do projeto
```

## 🛠️ Tecnologias Utilizadas

- **[Cypress](https://www.cypress.io/)**: Framework rápido e moderno de automação de testes E2E.
- **JavaScript**: Linguagem base do projeto.
- **Node.js**: Ambiente de execução.
- **ESLint**: Linter para garantir padronização e evitar más práticas de código.

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (Versão 16 ou superior)
- Git (Para versionamento do código)

## 🚀 Como instalar e executar

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/qa-cypress.git
cd qa-cypress
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure a URL da Aplicação:**
Acesse o arquivo `cypress.config.js` na raiz do projeto e altere a propriedade `baseUrl` para a URL real da aplicação ou ambiente de staging que será testado.
```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://exemplo-aplicacao-qa.com', // Altere a URL aqui
  }
});
```

4. **Execute os testes no modo Interativo (com interface visual):**
```bash
npm run cypress:open
```

5. **Execute os testes em modo Headless (ideal para CI/CD):**
```bash
npm run test
```

## 🧪 Cenários Automatizados

O mapeamento de testes foi planejado focando em fluxos essenciais e cenários de exceção:

✅ **Login (`login.cy.js`):**
1. `CT01` - Login com sucesso utilizando credenciais válidas.
2. `CT02` - Validação de login inválido (usuário ou senha incorretos).
3. `CT03` - Prevenção de envio de formulário com campos obrigatórios vazios.

✅ **Gerenciamento de Bancos de Dados (`database.cy.js`):**
4. `CT04` - Validação de Empty State da tabela (tabela vazia).
5. `CT05` - Criação de banco de dados com sucesso.
6. `CT06` - Pesquisa de banco de dados / Atualização dinâmica da listagem.
7. `CT07` - Bloqueio de criação ao deixar o campo obrigatório vazio.
8. `CT08` - Prevenção de criação de nomes de bancos de dados duplicados.
9. `CT09` - Fluxo principal do usuário (End-to-End Completo unindo pesquisa, empty state e criação).

## 🐞 Sugestões de Bugs Encontrados (Hipotéticos)

Durante a exploração da aplicação e fase de escrita de testes, alguns cenários comuns costumam revelar falhas de implementação. Abaixo, exemplos de bugs que esta suíte de automação ajudaria a capturar ou que merecem atenção dos desenvolvedores:

1. **[Visual] Problema no estado vazio:** A mensagem "Nenhum banco de dados encontrado" demora muito para aparecer após uma busca vazia ou não aparece quando o último banco é deletado (problema de estado reativo no front).
2. **[Validação Front-End] Tratamento de espaços em branco:** O sistema permite criar bancos de dados usando apenas caracteres de "espaço em branco" (`     `). O sistema deve aplicar a função `.trim()` no front-end e no back-end.
3. **[Tratamento de Erros] Falhas não amigáveis:** Quando a API de criação de banco cai ou retorna 500 (Internal Server Error), a interface exibe o erro bruto ou trava a tela sem feedback. A expectativa seria um "Toast" ou modal genérico de "Erro inesperado, tente mais tarde".
4. **[Regra de Negócio] Case-sensitivity de nomes duplicados:** O sistema bloqueia duplicadas se criarmos "BaseDeDados", mas aceita a criação de "basededados". Idealmente a chave no banco de dados deve tratar unicidade ignorando o formato das letras.
5. **[Segurança] SQL/XSS Injection no campo Nome:** A aplicação não sanitiza nomes de bancos de dados como `<script>alert(1)</script>`, permitindo falhas de XSS (Cross Site Scripting) na listagem.

## 💎 Boas Práticas QA Implementadas

- **Seletores Confiáveis (`data-test`):** O projeto foi criado visando a resiliência. Utilizou-se atributos customizados como `[data-test="elemento"]` em vez de `.classes` ou `#ids` que mudam frequentemente.
- **Page Object Model (POM):** Classes estruturadas dentro de `cypress/pages`, com clara separação entre elementos e ações, o que enxuga drasticamente os arquivos `.cy.js`.
- **Isolamento de Estado (Independência):** Todo teste reinicia no `beforeEach`, não há dependência de um teste rodar e preparar dados para o próximo (evitando falso-positivos).
- **Massa de Teste Externa (`fixtures`):** Credenciais e payloads alocados na pasta de fixtures como `.json`.
- **Custom Commands (`commands.js` e `e2e.js`):** Criação de ações globais úteis como o comando personalizado `cy.step()` para logar passos detalhados, e scripts para omitir requisições XHR desnecessárias da view do Cypress.
- **Espera Dinâmica (Asserts e Intercepts):** Substituição de comandos `cy.wait(tempoFixo)` por assertivas como `should('be.visible')` ou aguardar requisições finalizarem via `cy.intercept().as()`.

## 📤 Como subir este projeto para o seu GitHub (Para o Candidato)

Caso vá apresentar este código em seu teste, rode estes comandos em seu terminal na raiz do projeto `qa-cypress`:

```bash
git init
git add .
git commit -m "feat: setup inicial do projeto cypress com page objects e massa de dados"
git branch -M main
# Substitua com a URL real do seu repositório vazio
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
git push -u origin main
```
