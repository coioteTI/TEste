describe('Sistema Básico - Testes E2E Completos', () => {
  beforeEach(() => {
    // Acessa o app local servido pelo nosso Node.js
    cy.visit('http://localhost:3000/demo-app/index.html');
  });

  it('CT01 - Deve cadastrar um novo usuário com sucesso', () => {
    cy.get('[data-test="register-link"]').click();
    
    // Preenche formulário de cadastro
    cy.get('[data-test="name-input"]').type('Usuário QA Teste');
    cy.get('[data-test="reg-email-input"]').type('qa.novo@demo.com');
    cy.get('[data-test="reg-password-input"]').type('senha123Segura!');
    
    // Submete e verifica
    cy.get('[data-test="register-btn"]').click();
    cy.contains('Usuário cadastrado com sucesso!').should('be.visible');
    
    // Após 1.5s ele redireciona de volta ao login
    cy.url().should('include', 'index.html');
  });

  it('CT02 - Deve realizar login com sucesso e ir ao Dashboard', () => {
    // Preenche login com credenciais corretas simuladas no frontend
    cy.get('[data-test="email-input"]').type('teste@demo.com');
    cy.get('[data-test="password-input"]').type('123456');
    cy.get('[data-test="login-btn"]').click();
    
    // Verifica redirecionamento e header
    cy.url().should('include', 'dashboard.html');
    cy.get('[data-test="dashboard-title"]').should('contain.text', 'Bem-vindo');
  });

  it('CT03 - Deve barrar login e exibir erro para credenciais inválidas', () => {
    // Preenche com erro
    cy.get('[data-test="email-input"]').type('hacker@demo.com');
    cy.get('[data-test="password-input"]').type('senhaerrada');
    cy.get('[data-test="login-btn"]').click();
    
    // Assertiva
    cy.contains('Credenciais inválidas').should('be.visible');
    cy.url().should('not.include', 'dashboard.html');
  });

  it('CT04 - [BUG] Deve garantir que o campo de senha no cadastro esconda os caracteres (Falha Intencional)', () => {
    // Acessa a página de cadastro
    cy.get('[data-test="register-link"]').click();
    
    // Verifica se o campo de senha é do tipo "password" para garantir a segurança dos dados.
    // Como injetamos um BUG na aplicação mudando o tipo para "text", este teste irá FALHAR.
    // Isso demonstrará a utilidade do Cypress em achar quebras de segurança na UI!
    cy.get('[data-test="reg-password-input"]')
      .should('have.attr', 'type', 'password');
  });
});
