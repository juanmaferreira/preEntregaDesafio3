export class ShoppingCartPage {
    
    chequearProducto(nombre, precio, cantidad){
        cy.contains(nombre).siblings('#unitPrice').should("have.text", "$ "+ precio.toString());
        cy.contains(nombre).siblings('#totalPrice').should("have.text", "$ "+ (precio*cantidad).toString());
    }

    showTotalPrice(){
        cy.contains('button', 'Show total price').click();
    }

    chequearPrecioAcumulado(precio1, cantidad1, precio2, cantidad2){
        cy.get('#price').should("have.text", ((precio1*cantidad1)+(precio2*cantidad2)).toString());
    }

}