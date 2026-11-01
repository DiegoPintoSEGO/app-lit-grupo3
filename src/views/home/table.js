import { LitElement, html, css } from 'lit';

/**
 * <wc-table> · Tabla de Gestión de pedidos
 *
 * Recibe: .list  → arreglo de pedidos
 *         [{ cliente, producto, cantidad, precio, fecha, estado }]
 *
 * - Si .list llega vacía, undefined o no es arreglo, muestra "No hay pedidos".
 * - Calcula el subtotal (cantidad × precio) y el total general.
 * - Si falta un campo, muestra "—" en vez de "undefined".
 */
class Table extends LitElement {

  static styles = css`
    :host {
      display: block;
      max-width: 60rem;
      margin: 2rem auto;
      font-family: Arial, sans-serif;
      color: #1e293b;
    }

    h1 {
      font-size: 1.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      box-shadow: 0 4px 14px rgb(15 23 42 / 8%);
    }

    th,
    td {
      padding: 0.6rem 0.8rem;
      border-bottom: 1px solid #e2e8f0;
      text-align: left;
    }

    th {
      background: #f1f5f9;
      color: #334155;
    }

    .num {
      text-align: right;
    }

    .empty {
      padding: 1.5rem;
      text-align: center;
      color: #64748b;
    }

    tfoot td {
      font-weight: 700;
      background: #f8fafc;
    }

    .estado {
      display: inline-block;
      padding: 0.15rem 0.6rem;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .pendiente      { background: #fef3c7; color: #92400e; }
    .en-preparacion { background: #dbeafe; color: #1e40af; }
    .entregado      { background: #dcfce7; color: #166534; }
  `;

  static get properties() {
    return {
      list: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  // Siempre devuelve un arreglo, aunque la propiedad llegue mal
  pedidos() {
    return Array.isArray(this.list) ? this.list : [];
  }

  subtotal(pedido) {
    let total = Number(pedido.cantidad) * Number(pedido.precio);
    return Number.isFinite(total) ? total : 0;
  }

  dinero(valor) {
    return `$${Number(valor).toFixed(2)}`;
  }

  // "En preparación" → "en-preparacion" (para la clase CSS)
  claseEstado(estado) {
    return String(estado || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '-');
  }

  render() {
    let pedidos = this.pedidos();
    let total = pedidos.reduce((suma, pedido) => suma + this.subtotal(pedido), 0);

    return html`
      <h1>Listado de pedidos</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th class="num">Cantidad</th>
            <th class="num">Precio</th>
            <th class="num">Subtotal</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          ${pedidos.length === 0
            ? html`<tr><td class="empty" colspan="8">No hay pedidos registrados</td></tr>`
            : pedidos.map((pedido, index) => html`
                <tr>
                  <td>${index + 1}</td>
                  <td>${pedido.cliente || '—'}</td>
                  <td>${pedido.producto || '—'}</td>
                  <td class="num">${pedido.cantidad ?? '—'}</td>
                  <td class="num">${this.dinero(pedido.precio || 0)}</td>
                  <td class="num">${this.dinero(this.subtotal(pedido))}</td>
                  <td>${pedido.fecha || '—'}</td>
                  <td>
                    <span class="estado ${this.claseEstado(pedido.estado)}">
                      ${pedido.estado || '—'}
                    </span>
                  </td>
                </tr>
              `)}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">Total (${pedidos.length} pedidos)</td>
            <td class="num">${this.dinero(total)}</td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    `;
  }
}

window.customElements.define('wc-table', Table);
