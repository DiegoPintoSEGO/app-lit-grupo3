import { LitElement, html, css } from 'lit';

class Router extends LitElement {
    
    static get properties (){
        return {
            name: {
                type: String, attribute: true,
            }
        }
    }
    constructor (){
        super();
    }
    connectedCallback(){
        this.viewportList = this.querySelectorAll ("wc-viewport");
    }
    _listenerGoEvent(event){
        let {to, routerName} = event.data;
        if (routerName === undefined || routerName === this.name) {
            this.viewportList('wc-viewport').forEach((viewport) => {
                viewport.renderView(to);
            });
        }
    }
    render(){
        return html`
        
        `;
    }
}


window.customElements.define("wc-router", Router);
