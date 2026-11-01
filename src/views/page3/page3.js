import { LitElement, html, css } from 'lit';

class Page3 extends LitElement {
    
    render(){
        return html`
        <div>
            <h1>Hola desde la pagina 3</h1>
        </div>
        `;
    }
}


window.customElements.define("wc-page3", Page3);
