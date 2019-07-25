import { LitElement, html, property, customElement, css } from 'lit-element';

@customElement('xvj-card')
export class XvjCard extends LitElement {

    @property() cards = [{
      title: 'A card',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'https://gratisography.com/thumbnails/gratisography-animal-crackers-thumbnail.jpg',
      imageAlt: "",
      url: 'https://inclusive-components.design/cards/',
      extra: 'By heydon Pickering',
      extraUrl: 'http://www.heydonworks.com/',
    }];
    
    static get styles() {
        return css `

        :host() {
          --text-color: #000; 
        }

        .cards > ul {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
            grid-column-gap: 1.5rem;
            grid-row-gap: 1.5rem;
        }

        .card {
          border: 1px solid;
          border-radius: 0.25rem;
          display: flex;
          flex-direction: column;
          position: relative;
          color: var(--text-color, #000);
        }

        .card:hover {
          cursor: pointer;
        }

        .card a {
          color: inherit;
          text-decoration: none;
        }

        .card a:focus {
          text-decoration: underline;
        }

        .card:focus-within a:focus {
          text-decoration: underline;
        }

        .card:focus-within, .card:hover {
            box-shadow: 0 0 0 0.25rem;
        }

        .card, .card .text {
          display: flex;
          flex-direction: column;
          max-width: 60ch;
        }

        .card .text {
          padding: 1rem;
          flex: 1 0 auto;
          display: flex;
          flex-direction: column;
          order: 1;
        }

        .card .text > * + * {
          margin-top: 0.75rem;
        }

        .card .text :last-child {
          margin-top: auto;
        }

        .card .img {
          height: 7rem;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 1rem));
        }

        .card .img img {
          object-fit: cover;
          height: 100%;
          width: 100%;
        }

        .card small a {
          position: relative;
          padding: 0.5rem 0.5rem 0.5rem 0;
        }

        @supports (display: grid) {
            .cards > ul {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
                grid-gap: 1.5rem;
            }

            .card + .card {
                margin-top: 0;
            }
        }

        @media (max-width: 400px) {
          .cards > ul {
            grid-gap: 4.5rem;
          }
        }

      `;
    }
    render() {
        return html `
        <div class="cards">
          <ul>
            ${this.cards.map(card => html`
              <li data-card class="card" @click="${this.navigate(card.url)}">  
                <div class="text">
                    <h2>
                        <a href="${card.url}">${card.title}</a>
                    </h2>
                    <p>${card.content}</p>
                    <small>
                      <a href="${card.extraUrl}">${card.extra}</a>
                    </small>
                </div>
                 <div class="img">
                    <img src="${card.image}" alt="${card.imageAlt}">
                </div>
              </li>  
            `)}
          </ul>
        </div>
      `;
    }

    navigate(url) {
      const cards = this.shadowRoot.querySelectorAll('.card');  
      Array.prototype.forEach.call(cards, card => {  
          let down, up, link = card.querySelector('h2 a');
          card.onmousedown = () => down = +new Date();
          card.onmouseup = () => {
              up = +new Date();
              if ((up - down) < 200) {
                window.location.href = url;
              }
          }
      });
    }
};