export class ShoppingCartPage {
    
    chequearProducto(nombre, precio, cantidad){
        cy.contains(nombre).siblings('#unitPrice').should("have.text", "$ "+ precio.toString());
        cy.contains(nombre).siblings('#totalPrice').should("have.text", "$ "+ (precio*cantidad).toString());
    }

    showTotalPrice(){
        cy.contains('button', 'Show total price').click();
    }

    chequearPrecioAcumulado(productos){
        let totalProductos = 0;
        for(let i=0; i < productos.length; i++){
            totalProductos += productos[i].cantidad* productos[i].precio;
        }
        cy.get('#price').should("have.text", (totalProductos).toString());
        return totalProductos.toString();
    }

    goToCheckout(){
        cy.get('[data-cy="goCheckout"]').click();
    }
}