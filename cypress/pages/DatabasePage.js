class DatabasePage {
  // Mapeamento de Elementos
  elements = {
    searchInput: () => cy.get('[data-test="search-db-input"]'),
    createBtn: () => cy.get('[data-test="create-db-btn"]'),
    dbNameInput: () => cy.get('[data-test="db-name-input"]'),
    saveBtn: () => cy.get('[data-test="save-btn"]'),
    dbTable: () => cy.get('[data-test="db-table"]'),
    dbTableRows: () => cy.get('[data-test="db-table"] tbody tr'),
    emptyStateMessage: () => cy.get('[data-test="empty-state-msg"]'),
    errorMessage: () => cy.get('.error-msg'),
    successToast: () => cy.get('.toast-success')
  };

  // Ações
  visit() {
    cy.visit('/databases');
  }

  searchDatabase(name) {
    this.elements.searchInput().should('be.visible').clear().type(name);
  }

  clickCreateDatabase() {
    this.elements.createBtn().should('be.visible').click();
  }

  fillDatabaseName(name) {
    if (name) {
      this.elements.dbNameInput().should('be.visible').clear().type(name);
    } else {
      this.elements.dbNameInput().clear();
    }
  }

  saveDatabase() {
    this.elements.saveBtn().click();
  }

  createDatabase(name) {
    this.clickCreateDatabase();
    this.fillDatabaseName(name);
    this.saveDatabase();
  }

  // Validações
  verifyDatabaseInTable(name) {
    this.elements.dbTableRows().should('contain.text', name);
  }

  verifyEmptyState() {
    this.elements.emptyStateMessage()
      .should('be.visible')
      .and('contain.text', 'Nenhum banco de dados encontrado');
  }

  verifyRequiredFieldError() {
    this.elements.errorMessage()
      .should('be.visible')
      .and('contain.text', 'O campo nome é obrigatório');
  }

  verifyDuplicateError() {
    this.elements.errorMessage()
      .should('be.visible')
      .and('contain.text', 'Já existe um banco de dados com este nome');
  }
  
  verifySuccessMessage() {
    this.elements.successToast()
      .should('be.visible')
      .and('contain.text', 'Criado com sucesso');
  }
}

export default new DatabasePage();
