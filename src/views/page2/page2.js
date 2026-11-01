import { LitElement, html, css } from 'lit';

class Page2 extends LitElement {
    
    render(){
        return html`
        <div>
            <h1>Hola desde la pagina 2</h1>
        </div>
        `;
    }
}


window.customElements.define("wc-page2", Page2);
