import { LitElement, html, css } from 'lit';

class Navbar extends LitElement {
    static get styles(){
     return css`
        .container-navbar{ 
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 8px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 999px;
        width: fit-content;
        margin: auto;

        }
        `;
    }
    render(){
        return html`
        <div class="container-navbar">
            <wc-link to="/home">
                <wc-button text="Inicio"></wc-button>
            </wc-link to="/page2">
             <wc-link>
                <wc-button text="Pagina 2"></wc-button>
            </wc-link>
             <wc-link to="page3">
                <wc-button text="Pagina 3"></wc-button>
            </wc-link>
        </div>
        `;
    }
}


window.customElements.define("wc-navbar", Navbar);
