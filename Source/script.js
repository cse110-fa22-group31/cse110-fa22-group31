//@ts-check
window.addEventListener('DOMContentLoaded', init);

// the init function will wait for all the dom content to load before running any javascript, so we include all our javascript inside the function
function init() {
    let newFeedbackButton = document.getElementById('newFeedback'); // this button triggers the dialog box
    let saveButton = document.getElementById('saveButton'); // this button is used inside the dialog box
    let dialog = document.querySelector('dialog'); // this element is the dialog box itself
    let cancelButton = document.getElementById('cancelButton'); // this button is used inside the dialog box
    let firstRow = null; // this is the first row of the table
    let currentRow = null; // this is the row that is currently selected and is under work 
    let viewFeedbackButton = document.getElementById('viewFeedback'); // element for view feedback button show trigger the feedbacks dialog box to open
    let viewFeedbackDialog = document.getElementById('feedbackListTable'); //this dialog box will be triggered by view feedbacks button and
    let closeFeedbackDialog = document.getElementById('closeButton'); // close the feedbacks dialog box
    let confirmationMessage = document.getElementById('confirmationMessage'); // just a confirmation meessage to assure the user that the input has been saved. the feedback can be seen by clicking view feedback button

    //when the newFeedbackButton is clicked, th dialog box should open
    newFeedbackButton.addEventListener('click', () => {
        if (typeof dialog.showModal === "function") { // check if the dialog is already open or not
            dialog.showModal(); // open the dialog box
        }
    });

    // when the cancelButton inside the dialog box is clicked, the dialog box should close
    cancelButton.addEventListener('click', () => {
        dialog.close();
    });

    //when save button is clicked, the class name, date and feedback needs to be saved and ready to be shown
    saveButton.addEventListener('click', () => {
        let dialogInput = {};
        dialogInput.className = document.getElementById("title").value;
        dialogInput.date = document.getElementById("date").value;
        dialogInput.feedBack = document.querySelector("textarea").value;
        const commentObject=new Object();
        commentObject["classname"] = dialogInput.className;
        commentObject["date"] = dialogInput.date;
        commentObject["feedBack"] = dialogInput.feedBack;
        const temp = document.createElement('the-element');
        temp.data = commentObject;
        const curcomments = getCommentsFromStorage();
        curcomments.push(commentObject);
        saveCommentToStorage(curcomments);
        resetForm();
        console.log("saved");
        confirmationMessage.textContent = "Feedback saved!";
    });
    function saveCommentToStorage(comment) {
        
        localStorage.setItem("comment",JSON.stringify(comment));
      }

    // after each save button click, the form needs to be cleared so for next new feedback it will be ready
    let resetForm = () => {
        document.getElementById("title").value = "";
        document.getElementById("date").value = "";
        document.querySelector("textarea").value = "";
        currentRow = null;
    }

   
    // this will trigger the dialog box that has all the feedbacks so the user can see them
    viewFeedbackButton.addEventListener('click', () => {
        // Get the recipes from localStorage
        let comments = getCommentsFromStorage();
        // Add each recipe to the <main> element
        addCommentsToDocument(comments);
    });

    /**
    * Reads 'comments' from localStorage and returns an array of
    * all of the comments found (parsed, not in string form). If
    * nothing is found in localStorage for 'comments', an empty array
    * is returned.
    * @returns {Array<Object>} An array of recipes found in localStorage
    */
    function getCommentsFromStorage() {
        if (localStorage.getItem('comment') == null) {
            const emptyArray = [];
            return emptyArray;
        }
        const str = localStorage.getItem("comment");
        return JSON.parse(str);
    }

    /**
    * Takes in an array of recipes and for each recipe creates a
    * new <recipe-card> element, adds the recipe data to that card
    * using element.data = {...}, and then appends that new recipe
    * to <main>
    * @param {Array<Object>} comments An array of recipes
    */
    function addCommentsToDocument(comments) {
  
    const main = document.querySelector("main");
    if(comments==null) return;
    for(let i =0; i<comments.length;i++){
      const temp = document.createElement('the-element');
      temp.data=comments[i];
      main.appendChild(temp);
    }
}
    // this will close the dialog box that has the feedbacks list
    closeFeedbackDialog.addEventListener('click', () => {
        viewFeedbackDialog.close();
    });


}