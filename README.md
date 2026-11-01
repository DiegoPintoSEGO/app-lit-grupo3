# Gestión de pedidos · Equipo N

Funcionalidad del equipo: registrar pedidos y verlos en una tabla con subtotal y total.

## Componentes para otros equipos

Copien **solo** el archivo que necesiten (no `home.js` ni `src/index.js`). Ninguno importa otros archivos del proyecto, solo `lit`.

### `<wc-form-register>` · `src/views/home/register.js`

Emite el evento **`pedidoRegister`** (`bubbles: true`, `composed: true`):

```js
event.detail = {
  cliente: "Diego Pinto",   // String
  producto: "Pizza",        // String
  cantidad: 2,              // Number
  precio: 7.5,              // Number (precio unitario)
  fecha: "2026-11-01",      // String YYYY-MM-DD
  estado: "Pendiente"       // "Pendiente" | "En preparación" | "Entregado"
}
```

Uso:

```js
html`<wc-form-register @pedidoRegister="${this.agregar}"></wc-form-register>`
```

### `<wc-table>` · `src/views/home/table.js`

Recibe la propiedad **`.list`**: arreglo de objetos con los mismos campos de arriba.
Si la lista llega vacía o `undefined` muestra "No hay pedidos registrados". Si falta un campo muestra "—".

```js
html`<wc-table .list="${this.lista}"></wc-table>`
```

Para que la tabla se actualice, pasen un **arreglo nuevo**: `this.lista = [...this.lista, fila]`.

## Ejecutar

```bash
npm install
npm run dev
```
