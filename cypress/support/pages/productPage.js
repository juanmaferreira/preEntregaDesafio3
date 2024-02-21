export class ProductPage {

    cambiarProducto(){
        cy.xpath("/html/body/div[1]/div/div[2]/div[2]/div/button[2]").click();
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