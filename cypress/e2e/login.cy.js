import LoginPage from '../pages/LoginPage';

describe('Funcionalidade de Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('CT01 - Deve realizar login com sucesso utilizando credenciais válidas', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.email, users.validUser.password);
      LoginPage.verifySuccessfulLogin();
    });
  });

  it('CT02 - Deve exibir mensagem de erro ao realizar login com credenciais inválidas', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.invalidUser.email, users.invalidUser.password);
      LoginPage.verifyErrorMessage('Usuário ou senha incorretos');
    });
  });

  it('CT03 - Deve exibir erro ao tentar login com campos vazios', () => {
    LoginPage.submit();
    LoginPage.verifyErrorMessage('Os campos e-mail e senha são obrigatórios');
  });
});
