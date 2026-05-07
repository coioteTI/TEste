import DatabasePage from '../pages/DatabasePage';
import LoginPage from '../pages/LoginPage';

describe('Gerenciamento de Banco de Dados', () => {
  beforeEach(() => {
    // Presumindo que precisamos estar logados para acessar os bancos de dados
    cy.fixture('users').then((users) => {
      LoginPage.visit();
      LoginPage.login(users.validUser.email, users.validUser.password);
    });
    DatabasePage.visit();
  });

  it('CT04 - Deve validar mensagem de tabela vazia', () => {
    // Intercepta a API para forçar um retorno vazio e testar o frontend
    cy.intercept('GET', '**/api/databases', { body: [] }).as('getDatabasesEmpty');
    DatabasePage.visit();
    cy.wait('@getDatabasesEmpty');
    
    DatabasePage.verifyEmptyState();
  });

  it('CT05 - Deve criar um banco de dados com sucesso', () => {
    cy.fixture('database').then((db) => {
      const dbName = `${db.validDatabase.name}_${Date.now()}`; // Garante nome único
      DatabasePage.createDatabase(dbName);
      DatabasePage.verifySuccessMessage();
      DatabasePage.verifyDatabaseInTable(dbName);
    });
  });

  it('CT06 - Deve pesquisar e atualizar a listagem de banco de dados', () => {
    cy.fixture('database').then((db) => {
      // Cria primeiro para ter certeza que existe
      const dbName = `${db.validDatabase.name}_search`;
      DatabasePage.createDatabase(dbName);
      
      // Realiza a pesquisa
      DatabasePage.searchDatabase(dbName);
      DatabasePage.verifyDatabaseInTable(dbName);
      
      // Valida que apenas a linha correta é exibida
      DatabasePage.elements.dbTableRows().should('have.length', 1);
    });
  });

  it('CT07 - Não deve permitir criação com campo obrigatório vazio', () => {
    DatabasePage.createDatabase(''); // Envia nome vazio
    DatabasePage.verifyRequiredFieldError();
  });

  it('CT08 - Não deve permitir criação de banco com nome duplicado', () => {
    cy.fixture('database').then((db) => {
      const duplicateName = db.duplicateDatabase.name;
      
      // Tenta criar o primeiro
      DatabasePage.createDatabase(duplicateName);
      
      // Tenta criar novamente com o mesmo nome
      DatabasePage.createDatabase(duplicateName);
      DatabasePage.verifyDuplicateError();
    });
  });

  it('CT09 - Fluxo principal do usuário (E2E completo)', () => {
    const dbName = `Fluxo_E2E_${Date.now()}`;
    
    cy.step('1. Acessar tela de banco de dados');
    DatabasePage.visit();
    
    cy.step('2. Validar que o banco ainda não existe');
    DatabasePage.searchDatabase(dbName);
    DatabasePage.verifyEmptyState();
    
    cy.step('3. Criar o banco de dados');
    DatabasePage.createDatabase(dbName);
    DatabasePage.verifySuccessMessage();
    
    cy.step('4. Pesquisar e validar a atualização da listagem');
    DatabasePage.elements.searchInput().clear();
    DatabasePage.searchDatabase(dbName);
    DatabasePage.verifyDatabaseInTable(dbName);
  });
});
