import template from 'app.html';

/**
 * Web Component (App).
 */
customElements.define('app', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'})
      .innerHTML = template;
  }
});
