class DatabasePage {
  elements = {
    menuBancosDeDados: () => cy.contains('Bancos de dados'),
    searchInput: () => cy.get("input[placeholder='Pesquisar']"),
    createBtn: () => cy.contains('button', 'Criar'),
    dbNameInput: () => cy.get("input[placeholder='Nome do item']"),
    saveBtn: () => cy.contains('button', 'Salvar'),
    dbTableRows: () => cy.get('tbody tr')
  };

  visit() {
    // O menu pode estar recolhido, então forçamos o clique na opção
    this.elements.menuBancosDeDados().click({ force: true });
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

  verifyDatabaseInTable(name) {
    this.elements.dbTableRows().should('contain.text', name);
  }

  verifyEmptyState() {
    // No ColmeIA a tabela não tem linhas quando vazia (apenas cabeçalho)
    cy.get('tbody').find('tr').should('not.exist');
  }

  verifyRequiredFieldError() {
    // Verifica se alguma mensagem de erro de campo obrigatório aparece
    cy.contains('obrigatório', { matchCase: false }).should('be.visible');
  }

  verifyDuplicateError() {
    // Verifica se alguma mensagem de erro de duplicação aparece
    cy.contains('já existe', { matchCase: false }).should('be.visible');
  }
  
  verifySuccessMessage() {
    // Geralmente um toast ou swal alert, vamos aguardar sumir o modal ou ver um "sucesso"
    cy.contains('sucesso', { matchCase: false, timeout: 5000 }).should('be.visible');
  }
}

export default new DatabasePage();
