import { LitElement, html, css } from 'lit';
import "../home/register.js";              // formulario de NUESTRO equipo (Grupo 3 · pedidos)
import "../../externos/equipo-4/table.js";  // tabla del Grupo 4 (proveedores), copiada sin cambios

// OJO: no importar ../home/home.js ni ../home/table.js
// Nuestra tabla también se llama <wc-table> y chocaría con la del Grupo 4.

/**
 * <wc-integracion> · Padre del taller
 * - Dueño del estado `lista`.
 * - Escucha `pedidoRegister` del formulario (el evento SUBE).
 * - Pasa `lista` a la tabla del Grupo 4 por la propiedad .list (los datos BAJAN).
 */
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

  // ADAPTADOR (rol 2)
  // El formulario (Grupo 3) envía:  { cliente, producto, cantidad, precio, fecha, estado }
  // La tabla (Grupo 4) espera:      { name, ruc, email, phone, address }
  // Convertimos aquí, en el padre. Nunca dentro del componente externo.
  agregar(event) {
    let pedido = event.detail || {};
    let cantidad = Number(pedido.cantidad) || 0;
    let precio = Number(pedido.precio) || 0;
    let total = (cantidad * precio).toFixed(2);

    let fila = {
      name: pedido.cliente || "Sin cliente",       // Razón social ← cliente
      ruc: "—",                                    // un pedido no tiene RUC
      email: "—",                                  // ni correo
      phone: "—",                                  // ni teléfono
      address: `${cantidad} × ${pedido.producto || "Sin producto"} · $${total} · ${pedido.estado || "Pendiente"}`,
    };

    console.log("detail recibido:", pedido, "→ fila adaptada:", fila);

    // Arreglo NUEVO para que Lit vuelva a renderizar la tabla
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