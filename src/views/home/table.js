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

    .card {
      overflow: hidden;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      background: #fff;
      box-shadow: 0 4px 14px rgb(15 23 42 / 8%);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #e2e8f0;
    }

    h2 {
      margin: 0;
      font-size: 1.25rem;
    }

    .count {
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      background: #eff6ff;
      color: #1d4ed8;
      font-size: 0.85rem;
      font-weight: 700;
    }

    .scroll {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }

    th,
    td {
      padding: 0.75rem 1rem;
      text-align: left;
      white-space: nowrap;
    }

    th {
      background: #f8fafc;
      color: #64748b;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid #e2e8f0;
    }

    tbody tr {
      border-bottom: 1px solid #f1f5f9;
    }

    tbody tr:hover {
      background: #f8fafc;
    }

    .muted {
      color: #94a3b8;
    }

    .num {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    .strong {
      font-weight: 600;
    }

    .empty {
      padding: 2.5rem 1rem;
      text-align: center;
      color: #64748b;
      white-space: normal;
    }

    tfoot td {
      font-weight: 700;
      background: #f8fafc;
      border-top: 2px solid #e2e8f0;
    }

    .total {
      color: #1d4ed8;
      font-size: 1.05rem;
    }

    .estado {
      display: inline-block;
      padding: 0.2rem 0.65rem;
      border-radius: 999px;
      font-size: 0.8rem;
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
      <div class="card">
        <div class="header">
          <h2>Listado de pedidos</h2>
          <span class="count">${pedidos.length} ${pedidos.length === 1 ? 'pedido' : 'pedidos'}</span>
        </div>

        <div class="scroll">
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
                ? html`<tr><td class="empty" colspan="8">No hay pedidos registrados todavía</td></tr>`
                : pedidos.map((pedido, index) => html`
                    <tr>
                      <td class="muted">${index + 1}</td>
                      <td class="strong">${pedido.cliente || '—'}</td>
                      <td>${pedido.producto || '—'}</td>
                      <td class="num">${pedido.cantidad ?? '—'}</td>
                      <td class="num">${this.dinero(pedido.precio || 0)}</td>
                      <td class="num strong">${this.dinero(this.subtotal(pedido))}</td>
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
                <td colspan="5">Total</td>
                <td class="num total">${this.dinero(total)}</td>
                <td colspan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `;
  }
}

window.customElements.define('wc-table', Table);
