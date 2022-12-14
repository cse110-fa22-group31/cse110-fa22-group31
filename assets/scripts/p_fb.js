window.addEventListener('DOMContentLoaded', init);

/** 
 * Import Statements 
 */
 import { generateDropDown, updateCurrClass, filterSubmissions, appendClass} from "./helpers.js";

// the init function will wait for all the dom content to load before running any javascript, so we include all our javascript inside the function
function init() { 
    // may be unnecessary
    // Checks for a classList in local storage; Returns what if it exists 
    // or empty array if not 
    const classList = JSON.parse(localStorage.getItem("classList")) || []; // goated
    generateDropDown(classList);

    let addProfessorClassBtn = document.getElementById('addNewClassBtn');
    let viewFeedbackButton = document.getElementById('viewFeedback'); 
    let GoToModifyPageBtn = document.getElementById('modifyCategories');
    
    let classSelectedBtns = document.getElementById('classSelectedBtns');
    let classSelection = document.getElementById('classSelect');

    // when a class is selected from the dropdown the current class should be changed and the
    // view feedback and modify categories buttons should be unhidden
    classSelection?.addEventListener("change", () => {
        // changes currClass in local storage 
        updateCurrClass();
        // unhide
        classSelectedBtns.hidden = false;
    });


    viewFeedbackButton?.addEventListener("click", () => {
        updateCurrClass();
        // Case of empty local
        const submissions = JSON.parse(localStorage.getItem("submissions")) || []; // goated
        // iterate through array of json object linearly (very slow)
        // only add objects that pertain to the selected class in dropdown

        let currClassSubmissions = filterSubmissions(submissions);
        console.log(currClassSubmissions);
    });

    GoToModifyPageBtn?.addEventListener("click", () => {
        updateCurrClass();
        // Case of empty local
        const submissions = JSON.parse(localStorage.getItem("submissions")) || []; // goated
        // iterate through array of json object linearly (very slow)
        // only add objects that pertain to the selected class in dropdown

        let currClassSubmissions = filterSubmissions(submissions);
        console.log(currClassSubmissions);
    });


    // will add new class based on textbox input
    addProfessorClassBtn?.addEventListener('click', () => appendClass());
}
