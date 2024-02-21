import { HomePage } from "../support/pages/homePage";
import { ProductPage } from "../support/pages/productPage"
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckOutPage } from "../support/pages/checkOutPage";
import { Recipepage } from "../support/pages/recipePage";

describe("Actividad pre Entrega", () => {
    let data;
    let compra;
    let precioTotal;
    let token;
    const numero = Math.floor(Math.random() * 1000)
    const baseUrl = 'https://pushing-it.onrender.com';
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkOutPage = new CheckOutPage();
    const recipePage = new Recipepage();

    before("Inicialización de los fixtures, creo y me logeo con requests", () => {
        cy.fixture("productos").then(fixtureData => {
            data = fixtureData;
        });

        cy.fixture("datosCompra").then(fixtureCompra => {
            compra = fixtureCompra;
        });

        cy.request({
            method: "POST",
            url: `${baseUrl}/api/register`,
            headers: {
                "authorization": `Bearer ${token}`
            },
            body:
            {
                "username": `pushingit${numero}`,
                "password": "123456!",
                "gender": "M",
                "day": "03",
                "month": "05",
                "year": "2000",

            },
        }).then(respuesta => {
            cy.visit("")
            cy.request({
                method: "POST",
                url: `${baseUrl}/api/login`,
                headers: {
                    "authorization": `Bearer ${token}`
                },
                body:
                {
                    "username": respuesta.body.newUser.username,
                    "password": "123456!"
                },
            }).then(respuesta => {
                console.log(respuesta.body)
                window.localStorage.setItem("nombre", respuesta.body.user.username);
                window.localStorage.setItem("id", respuesta.body.user._id);
                window.localStorage.setItem("token", respuesta.body.token);
            });
        });

        cy.reload();
        homePage.clickOnlineShop();
    });

    it('Test de Compras y pago', () => {
        productPage.agregarProducto(data.Productos[0].nombre, data.Productos[0].cantidad);
        productPage.cambiarProducto();
        productPage.agregarProducto(data.Productos[1].nombre, data.Productos[1].cantidad);
        productPage.goToShoppingCart();

        shoppingCartPage.chequearProducto(data.Productos[0].nombre, data.Productos[0].precio, data.Productos[0].cantidad);
        shoppingCartPage.chequearProducto(data.Productos[1].nombre, data.Productos[1].precio, data.Productos[1].cantidad);
        shoppingCartPage.showTotalPrice()
        precioTotal = shoppingCartPage.chequearPrecioAcumulado(data.Productos);
        shoppingCartPage.goToCheckout();

        checkOutPage.completarDatos(compra.nombre, compra.apellido, compra.cardNumber);
        checkOutPage.verRecibo();

        recipePage.chequearDatos(compra.nombre, compra.apellido, data.Productos[0].nombre, data.Productos[1].nombre, compra.cardNumber, precioTotal);
    });

    after("Elimino el usuario", () => {
        cy.request({
            method: "DELETE",
            url: `${baseUrl}/api/deleteuser/${window.localStorage.getItem("nombre")}`,
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(respuesta => {
        });
    });

});