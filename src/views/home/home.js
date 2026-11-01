import { LitElement, html, css } from 'lit';
import "./table";
import "./register";

// <wc-home> · Padre de Gestión de pedidos
// - Escucha pedidoRegister del formulario (el evento SUBE)
// - Pasa la lista a la tabla por la propiedad .list (los datos BAJAN)
class Home extends LitElement {
    static get properties() {
        return {
            orderList: { type: Array },
        };
    }

    constructor(){
        super();
        this.orderList = [
            { cliente: "Diego Pinto", producto: "Pizza familiar", cantidad: 1, precio: 14.5, fecha: "2026-10-30", estado: "Entregado" },
            { cliente: "María Gómez", producto: "Hamburguesa", cantidad: 2, precio: 6.25, fecha: "2026-10-31", estado: "En preparación" },
            { cliente: "Juan López", producto: "Jugo natural", cantidad: 3, precio: 1.75, fecha: "2026-11-01", estado: "Pendiente" }
        ];
    }

    // Arreglo NUEVO para que Lit detecte el cambio y vuelva a renderizar
    addList(event){
        this.orderList = [...this.orderList, event.detail];
    }

    render(){
        return html`
            <wc-form-register @pedidoRegister="${this.addList}"></wc-form-register>
            <wc-table .list="${this.orderList}"></wc-table>
        `;
    }
}


window.customElements.define("wc-home", Home);
