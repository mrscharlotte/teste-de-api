/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
   cy.request('usuarios').then(response => {
    return contrato.validateAsync(response.body)
   })
  });

  it('Deve listar usuários cadastrados', () => {
  cy.request({
    method: 'GET',
    url: 'usuarios'
  }).should((response) =>{
    expect(response.status).equal(200)
    expect(response.body).to.have.property('usuarios')
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
      method:'POST',
      url:'usuarios',
      body:{
      "nome": "Fulano da Silva",
      "email": "beltrano@qa.com.br",
      "password": "teste",
      "administrador": "true"
     }
    }).should((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
  })

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarusuarios(token, 'Fulano','da Silva', 'beltrano@qa.com.br', 'true')
    }).should((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Este email já está sendo usado');

it('Deve editar um usuário previamente cadastrado', () => {
  let usuario = 'usuario EBAC ' + Math.floor(Math.random() * 100000000000000);
  let email = 'usuario' + Math.floor(Math.random() * 100000000000000) + '@qa.com.br';
   cy.request({
    method: 'POST',
    url: 'usuarios',
    headers: { authorization: token },
    body: {
      nome: usuario,
      email: email,
      password: 'teste',
      administrador: 'true'
    }
  }).then((resCadastro) => {
    const idUsuario = resCadastro.body._id; // pega o ID retornado
     cy.request({
      method: 'PUT',
      url: 'usuarios/' + idUsuario,
      headers: { authorization: token },
      body: {
        nome: "Fulano da Silva",
        email: "fulano@qa.com",
        password: "teste",
        administrador: "true"
      }
    }).should((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Registro alterado com sucesso');
    });
  });
});


 it('Deve deletar um usuário previamente cadastrado', () => {
  let usuario = 'usuario EBAC ' + Math.floor(Math.random() * 100000000000000);
  let email = 'usuario' + Math.floor(Math.random() * 100000000000000) + '@qa.com.br';

  // Primeiro cadastra o usuário
  cy.cadastrarusuarios(token, 'fabio', 'da Silva', 'teste@ebac.com', 'true')
    .then((resCadastro) => {
      const idUsuario = resCadastro.body._id; // pega o ID retornado

      cy.request({
        method: 'DELETE',
        url: 'usuarios/' + idUsuario,
        headers: { authorization: token }
      }).should((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Registro excluído com sucesso');
      });
    });
});

  });


  });
  })
})
