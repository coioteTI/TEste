class LoginPage {
  // Mapeamento de Elementos
  elements = {
    emailInput: () => cy.get('[data-test="email-input"]'),
    passwordInput: () => cy.get('[data-test="password-input"]'),
    loginBtn: () => cy.get('[data-test="login-submit"]'),
    errorMessage: () => cy.get('[data-test="error-message"]'),
    dashboardHeader: () => cy.get('h1').contains('Dashboard')
  };

  // Ações
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    this.elements.emailInput().should('be.visible').clear().type(email);
  }

  fillPassword(password) {
    this.elements.passwordInput().should('be.visible').clear().type(password, { log: false });
  }

  submit() {
    this.elements.loginBtn().should('be.visible').click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }

  // Validações
  verifyErrorMessage(message) {
    this.elements.errorMessage().should('be.visible').and('contain.text', message);
  }

  verifySuccessfulLogin() {
    cy.url().should('include', '/dashboard');
    this.elements.dashboardHeader().should('be.visible');
  }
}

export default new LoginPage();
