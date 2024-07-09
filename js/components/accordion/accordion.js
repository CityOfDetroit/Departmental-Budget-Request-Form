export class Accordion {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.accordionItems = [];
    }
  
    // Adds an accordion item with a header and body content
    addItem(headerContent, bodyContent) {
      const itemIndex = this.accordionItems.length;
      const item = {
        header: this.createAccordionHeader(headerContent, itemIndex),
        body: this.createAccordionBody(bodyContent, itemIndex),
      };
      this.accordionItems.push(item);
  
      // Append the accordion item elements to the container
      this.container.appendChild(item.header);
      this.container.appendChild(item.body);
    }
  
    // Creates the header for an accordion item
    createAccordionHeader(content, index) {
      const header = document.createElement('cod-accordion-header');
      header.id = `accordion-header-${index}`;
      header.innerHTML = `<span>${content}</span>`;
    //   header.addEventListener('click', () => this.toggleItem(index));
      return header;
    }
  
    // Creates the body for an accordion item
    createAccordionBody(content, index) {
      const body = document.createElement('cod-accordion-body');
      body.id = `accordion-body-${index}`;
    //   body.style.display = 'none';
      body.innerHTML = `<p>${content}</p>`;
      return body;
    }
  
    // // Toggles an accordion item's visibility
    // toggleItem(index) {
    //   const body = this.accordionItems[index].body;
    //   body.style.display = body.style.display === 'none' ? 'block' : 'none';
    // }
  }