// Single_Comment.js

class SingleComment extends HTMLElement {
    constructor() {
      super(); // Inheret everything from HTMLElement
      //Attach the shadow DOM to this Web Component (leave the mode open)
      const shadow = this.attachShadow({mode: 'open'});
      //Create an <article> element - This will hold our markup once our data is set
      const newArticle = document.createElement('article');
      //Create a style element - This will hold all of the styles for the Web Component
      const newStyle = document.createElement('style');
      //Insert all of the styles from cardTemplate.html into the <style> element you just made
      newStyle.textContent = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }
    
      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }
    
      p.title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    
      p:not(.title),
      span {
        color: #70757A;
        font-size: 12px;
      }`
      
      shadow.appendChild(newStyle);
      shadow.appendChild(newArticle);
    }
  
    /**
     * Called when the .data property is set on this element.
     *
     *
     *
     * @param {Object} data - The data to pass into must be of the
     *                        following format:
     *                        {
     *                          "title": "string",
     *                          "classname": "string",
     *                          "date": "string",
     *                          "feedBack": "textarea",
     *                        }
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;
  
      console.log(data);
      const addedArticle = this.shadowRoot.querySelector("article");
      
      console.log(data.classname);
      addedArticle.innerHTML=`
        <p class="title">`+data.title+`</p>
        <p class="classname">`+data.classname+`</p>
        <div class="date">
          <span>(`+data.date+`)</span>
        </div>
        <p class="feedback_content">`
          +data.feedBack+
        `</p>
        <button type="button" class="update">Update Feedback</button>
        <button type="button" class="delete">Delete Feedback</button>
      `; // would eventually prefer to change to an icon button or something
    }
  }
  

  customElements.get('the-element')||customElements.define("the-element",SingleComment);