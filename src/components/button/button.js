import { LitElement, html, css } from 'lit';

class Button extends LitElement {
    static get properties() {
        return {
            text: { Type: String, attribute: true },
        };
    }
    constructor() {
        super();
        this.text = "Save";
        
    }
    static get styles(){
        return css`
        button{
            all: initial;
            background-color: #5de33f;
            font-family: cursive;
            margin-right: 20px;
            width: 150px;
            border-radius: 10px;
            text-align: center;
            padding: 2px;
            cursor: pointer;
        }
        `
    }        
    
    firstUpdated(){
        this.button = this.shadowRoot.querySelector("button");
    }
    
    mousePressListener(event){
        this.button.style.backgroundColor = "pink";
    }

    mouseReleaseListener(event){
        this.button.style.backgroundColor = "#5de33f";
    }

    render(){
        return html`
            <button @mousedown="${this.mousePressListener}" @mouseup="${this.mouseReleaseListener}">
                ${this.text}
            </button>
        `;
    }
}

window.customElements.define("wc-button", Button);
