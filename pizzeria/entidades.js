"use strict";
exports.__esModule = true;
var Cliente = /** @class */ (function () {
    function Cliente() {
    }
    return Cliente;
}());
exports.Cliente = Cliente;
var Pizza = /** @class */ (function () {
    function Pizza(tipo, size, precio) {
        this.precio = 0.00;
        this.precio = precio;
        this.size = size;
        this.tipo = tipo;
    }
    return Pizza;
}());
exports.Pizza = Pizza;
var Orden = /** @class */ (function () {
    function Orden(pizza, cantidad) {
        var _this = this;
        this.valor_detalle = 0.0;
        this.toString = function () {
            var espacios = "            ";
            return "" + _this.pizza.tipo + espacios.substring(_this.pizza.tipo.length) + _this.pizza.size + espacios.substring(_this.pizza.size.length) + _this.cantidad + espacios.substring(String(_this.cantidad).length) + _this.pizza.precio;
        };
        this.pizza = pizza;
        this.cantidad = cantidad;
        this.valor_detalle = this.cantidad * this.pizza.precio;
    }
    return Orden;
}());
exports.Orden = Orden;
var Pedido = /** @class */ (function () {
    function Pedido() {
        this.ordenes = [];
    }
    Pedido.prototype.mostrar_ordenes = function () {
        this.ordenes.forEach(function (orden) {
            console.log(orden.toString());
        });
    };
    ;
    Pedido.prototype.calcular_total = function () {
        var precio_unitarios = this.ordenes.map(function (valor) {
            return valor.valor_detalle;
        });
        return precio_unitarios.reduce(function (a, b) {
            return a + b;
        }, 0);
    };
    return Pedido;
}());
exports.Pedido = Pedido;
