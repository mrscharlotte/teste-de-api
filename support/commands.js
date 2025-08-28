Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })
 
 Cypress.Commands.add('cadastrarusuarios', (token,nome,sobrenome,email,senha) => {
    return cy.request({
        method: 'POST',
        url: 'produtos',          // substitua pela URL completa se necessário
        headers: { authorization: token },
        body: {
            "nome": nome,
            "sobrenome": sobrenome,
            "email": email,
            "quantidade": senha
        },
        failOnStatusCode: false    // opcional, só se quiser tratar manualmente
    });
});