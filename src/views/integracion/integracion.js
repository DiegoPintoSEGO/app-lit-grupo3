import { LitElement, html, css } from 'lit';
import "../home/register.js";              // formulario de NUESTRO equipo (Grupo 3 · pedidos)
import "../../externos/equipo-4/table.js";  // tabla del Grupo 4 (proveedores), copiada sin cambios

// OJO: no importar ../home/home.js ni ../home/table.js
// Nuestra tabla también se llama <wc-table> y chocaría con la del Grupo 4.

class Integracion extends LitElement {

  static styles = css`
    :host {
      display: block;
      max-width: 60rem;
      margin: 0 auto;
      font-family: Arial, sans-serif;
    }
  `;

  static get properties() {
    return {
      lista: { type: Array },
    };
  }

  constructor() {
    super();
    this.lista = [];
  }

  // Recibe el pedido del formulario y lo agrega con un arreglo NUEVO
  // para que Lit detecte el cambio y vuelva a renderizar la tabla.
  agregar(event) {
    let fila = event.detail;
    this.lista = [...this.lista, fila];
  }

  render() {
    return html`
      <wc-form-register @pedidoRegister="${this.agregar}"></wc-form-register>
      <wc-table .list="${this.lista}"></wc-table>
    `;
  }
}

window.customElements.define('wc-integracion', Integracion);
