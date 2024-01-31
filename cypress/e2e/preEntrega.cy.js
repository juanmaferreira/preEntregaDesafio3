import { LoginPage } from "../support/pages/loginPage";
import { HomePage } from "../support/pages/homePage";
import { ProductPage } from "../support/pages/productPage"
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe("Actividad pre Entrega", () => {
    let data;
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const shoppingCartPage = new ShoppingCartPage();

    before("",() =>{
        cy.fixture("productos").then(fixtureData => {
            data = fixtureData;
        })
    })

    beforeEach(() => {
        cy.visit('')
        cy.get('#registertoggle').dblclick();
        loginPage.escribirUsuario(Cypress.env().usuario)
        loginPage.escribirContraseña(Cypress.env().password)
        loginPage.clickLogIn();
        homePage.clickOnlineShop();
    });


    it('', () => {
        productPage.agregarProducto(data.producto1.nombre, data.producto1.cantidad);
        productPage.buscarProducto(data.producto2.nombre);
        productPage.agregarProducto(data.producto2.nombre, data.producto2.cantidad);
        productPage.goToShoppingCart();

        shoppingCartPage.chequearProducto(data.producto1.nombre,data.producto1.precio, data.producto1.cantidad);
        shoppingCartPage.chequearProducto(data.producto2.nombre,data.producto2.precio, data.producto2.cantidad);
        shoppingCartPage.showTotalPrice()
        shoppingCartPage.chequearPrecioAcumulado(data.producto1.precio,data.producto1.cantidad,data.producto2.precio,data.producto2.cantidad);
        

    })
    
});