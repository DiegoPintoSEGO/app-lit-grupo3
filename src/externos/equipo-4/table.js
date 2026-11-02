import { LitElement, html, css } from "lit";

class Table extends LitElement {

    static properties = {
        list: { type: Array }
    };

    constructor() {
        super();
        this.list = [];
    }

    static styles = css `
    :host {
      display: block;
      width: 100%;
    }

    .contenedor {
      background: white;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #dce5f0;
    }

    .encabezado {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    h2 {
      color: #173b65;
      margin: 0;
    }

    .contador {
      background: #e8f0fb;
      color: #2457a6;
      padding: 7px 12px;
      border-radius: 20px;
      font-size: 13px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 13px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #edf3fb;
      color: #173b65;
    }

    tbody tr:hover {
      background: #f8fafc;
    }

    .vacio {
      text-align: center;
      color: #64748b;
      padding: 25px;
    }
  `;

    render() {
            return html `
      <div class="contenedor">

        <div class="encabezado">
          <h2>Proveedores registrados</h2>
          <span class="contador">
            ${this.list.length} proveedores
          </span>
        </div>

        <table>
          <thead>
            <tr>
              <th>N.º</th>
              <th>Razón social</th>
              <th>RUC</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
            </tr>
          </thead>

          <tbody>
            ${this.list.length === 0
              ? html`
                  <tr>
                    <td colspan="6" class="vacio">
                      No hay proveedores registrados.
                    </td>
                  </tr>
                `
              : this.list.map((provider, index) => html`
                  <tr>
                    <td>${index + 1}</td>
                    <td>${provider.name ?? ""}</td>
                    <td>${provider.ruc ?? ""}</td>
                    <td>${provider.email ?? ""}</td>
                    <td>${provider.phone ?? ""}</td>
                    <td>${provider.address ?? ""}</td>
                  </tr>
                `)
            }
          </tbody>
        </table>

      </div>
    `;
  }
}

customElements.define("wc-table", Table);