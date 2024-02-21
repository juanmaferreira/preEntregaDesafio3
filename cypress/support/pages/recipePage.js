export class Recipepage {
    
    chequearDatos(nombre, apellido, producto1, producto2, tarjeta, total){
        cy.xpath("/html/body/div[4]/div[3]/div/section/div").contains(nombre);
        cy.xpath("/html/body/div[4]/div[3]/div/section/div").contains(apellido);
        cy.xpath("/html/body/div[4]/div[3]/div/section/div").contains(producto1);
        cy.xpath("/html/body/div[4]/div[3]/div/section/div").contains(producto2);
        cy.xpath("/html/body/div[4]/div[3]/div/section/div").contains(tarjeta);
        cy.xpath("/html/body/div[4]/div[3]/div/section/div").contains(total);

        cy.get('[data-cy="thankYou"]').click();
    }
};