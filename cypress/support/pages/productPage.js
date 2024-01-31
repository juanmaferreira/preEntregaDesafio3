export class ProductPage {

    buscarProducto(nombre){
        cy.xpath("/html/body/div[1]/div/div[2]/div[1]/input").type(nombre);
    }

    agregarProducto(nombre, cantidad){
        for (let i=0; i < cantidad ; i++){
            cy.xpath(`//p[text()='${nombre}']`).siblings('div').find('button').last().click();
            cy.contains('button', 'Close').click();
        }
    }

    goToShoppingCart(){
        cy.xpath("//button[text()='Go to shopping cart']").click();
    }
    
};