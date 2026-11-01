import { LitElement, html, css } from 'lit';

class Route extends LitElement {
    
    render(){
        return html`
        <slot></slot>
        `;
    }
}


window.customElements.define("wc-route", Route);
