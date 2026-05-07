// Comandos customizados podem ser adicionados aqui
// Exemplo de comando customizado para login
Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-test="email-input"]').type(email);
  cy.get('[data-test="password-input"]').type(password);
  cy.get('[data-test="login-submit"]').click();
});

// Exemplo de step customizado para organizar melhor os logs
Cypress.Commands.add('step', (message) => {
  Cypress.log({
    displayName: 'STEP',
    message: message,
    consoleProps: () => {
      return { Step: message }
    }
  });
});
