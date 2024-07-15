//Caso de Prueba 1: Consultar una Orden de Compra Existente
describe('Consultar una Orden de Compra', () => {
  it('Consultar una orden de compra existente', () => {
    cy.request('GET', 'https://petstore.swagger.io/v2/store/order/1')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
      });
  });
});
//2. Buscar la Orden de Compra Creada
describe('Buscar la Orden de Compra Creada', () => {
  it('Crear y buscar una orden de compra', () => {
    cy.request('POST', 'https://petstore.swagger.io/v2/store/order', {
      id: 2,
      petId: 1,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: true
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 2);

      cy.request('GET', 'https://petstore.swagger.io/v2/store/order/2')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', 2);
        });
    });
  });
});
//3.Verificar el Inventario de Ventas
describe('Verificar el Inventario de Ventas', () => {
  it('Verificar el inventario de ventas', () => {
    cy.request('GET', 'https://petstore.swagger.io/v2/store/inventory')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
      });
  });
});
//4. Eliminar una Orden de Compra
describe('Eliminar una Orden de Compra', () => {
  it('Eliminar una orden de compra existente', () => {
    // Primero, se crea una orden de compra
    cy.request('POST', 'https://petstore.swagger.io/v2/store/order', {
      id: 3,
      petId: 1,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: true
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 3);

      // Luego, elimina la orden de compra creada
      cy.request('DELETE', 'https://petstore.swagger.io/v2/store/order/3')
        .then((response) => {
          expect(response.status).to.eq(200);
        });

      // Verificar que la orden de compra ha sido eliminada
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/store/order/3',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
