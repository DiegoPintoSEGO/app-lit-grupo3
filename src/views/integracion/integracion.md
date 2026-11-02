# Integración con el componente de otro equipo

## 1. Datos

| Campo | Valor |
|---|---|
| Equipo | Equipo 3 · Gestión de pedidos |
| Equipo externo | Equipo 4 · Gestión de proveedores |
| Repositorio externo | https://github.com/Raxii/app-lit-grupo1 |
| Archivo externo | src/views/home/table.js → copiado en src/externos/equipo-4/table.js |
| Commit usado | e5d1199 |

## 2. Componentes y roles

(Rol 4)

## 3. Flujo de comunicación

(Rol 4)

## 4. Dificultades

(Rol 4)

## 5. Evaluación del componente externo

| Aspecto | Nota (0–5) | Evidencia |
|---|---|---|
| API clara | 3 | La propiedad .list tiene un nombre claro, pero no hay README: los campos (name, ruc, email, phone, address) se descubrieron leyendo el código. Su main está vacío y el componente estaba solo en la rama taller-integracion. list no declara su tipo y lit-plugin marca .list con "Type 'any[]' is not assignable to 'never[]'". |
| Evento bien construido | No aplica | <wc-table> solo recibe datos y no emite eventos. El evento de esta integración (pedidoRegister) es de nuestro formulario. |
| Robustez | 3 | Con la lista vacía muestra "No hay proveedores registrados." y los campos faltantes no salen como undefined (?? ""). El texto con HTML se muestra escapado. Pero si .list llega undefined lanza TypeError: Cannot read properties of undefined (reading 'length') (table.js:81). Detalle menor: muestra "1 proveedores". |
| Encapsulamiento | 5 | Sus estilos están en el shadow DOM: no afectaron nuestro formulario y nuestros estilos no la rompieron. |
| Reutilización | 4 | Se usó copiándola sin cambios y solo depende de lit. La etiqueta genérica wc-table choca con nuestra tabla, así que tuvimos que evitar importar la nuestra. |

Issue abierto: https://github.com/Raxii/app-lit-grupo1/issues/2

## 6. Uso de IA

(Rol 4)

## 7. Aportes del equipo

(Rol 4)