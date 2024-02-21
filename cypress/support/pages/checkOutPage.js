export class CheckOutPage {
    
    completarDatos(nombre, apellido, numero){

        cy.get('[data-cy="firstName"]').type(nombre);
        cy.get('[data-cy="lastName"]').type(apellido);
        cy.get('[data-cy="cardNumber"]').type(numero);
    }

    verRecibo(){
        cy.get('[data-cy="purchase"]').click();
    }
};