class LoginPage {
  elements = {
    emailInput: () => cy.get('input#email'),
    passwordInput: () => cy.get('input#password'),
    loginBtn: () => cy.contains('button', 'Entrar'),
    continuarBtn: () => cy.contains('button', 'Continuar')
  };

  visit() {
    cy.visit('/');
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
    
    // Lida com o modal de 'Continuar' específico do ColmeIA
    cy.get('body').then($body => {
      if ($body.find('button:contains("Continuar")').length > 0) {
        cy.contains('button', 'Continuar').click();
      }
    });
  }

  verifyErrorMessage(message) {
    // Assertiva genérica para mensagens de erro visíveis na tela
    cy.contains(message, { matchCase: false }).should('be.visible');
  }

  verifySuccessfulLogin() {
    // Garante que saímos da tela de login
    cy.url().should('not.include', '/login');
  }
}

export default new LoginPage();
