/**
 * Helpers.js
 * 
 * Function definitions here to declutter 
 * driver js files (professorFeedback.js etc..)
 * @author Christian Velasquez
 */

/**
 * Exports for Professor Feedback.js
 */

    /**
    * function getSpecificComments()
    * Reads Array of Json Objects 'comments' from localStorage
    * Only the specified class' comments are appended to array that is returned
    * If nothing is found in localStorage for 'comments', an empty array
    * is returned instead.
    * 
    * @author Christian
    * @param classTitle identifier used to parse Json object's classname keys
    * @returns {Array<Object>} An array of class specific comments found in localStorage
    */
export function getSpecificComments(classTitle) {
    // Case of empty local
    if (localStorage.getItem('comment') == null) {
        const emptyArray = [];
        return emptyArray;
    }
    else {
        const str = localStorage.getItem("comment");
        const jsoned = JSON.parse(str);
        // iterate through array of json object linearly (very slow)
        // only add objects that pertain to the selected class in dropdown
        const filteredArray = [];
        for (const arrIdx in jsoned) {
            if (jsoned[arrIdx].classname == classTitle) {
            filteredArray.push(jsoned[arrIdx]);
            }
        }
        return filteredArray;
    }
}

    /**
    * function generateSpecificComments()
    * Uses Specific comments retrieved from local storage
    * to create dynamically create new html elements
    * 
    * @author Christian
    * @param classTitle identifier used to retrieve specific comments
    */
 export function generateSpecificComments(classTitle) {
    let currentComments = getSpecificComments(classTitle);
    // fill local with specific comments 
    if (localStorage.getItem('currentComments') == undefined) {
        // currentComments will change every time a new class is selected from
        // drop down menu  
        localStorage.setItem("currentComments", JSON.stringify(currentComments)); 
        createElems(currentComments);
        return;
    }
    else {
        document.getElementsByClassName('commentLinks');
        createElems(localStorage.getItem("currentComments"));
        return;
    }
}

    /**
    * function createElems()
    * Uses local storage currentComments to build html elements
    * dynamically, expects jsonObjArray to not be null
    * 
    * @author Christian
    * @param jsonObjArray This key's (jsonObjArray's) local storage held value 
    */
export function createElems(jsonObjArray) {
    // linear creation of elements (slow?)
    for (let i = 0; i < jsonObjArray.length; i++) {
        // may change to jsonObjArray[i].title
        let parentDiv = document.getElementsByClassName('commentLinks')[0];
        // create elements & insert all required data 
        let aElem = document.createElement('a');
        aElem.setAttribute('class','Alinks')
        console.log(jsonObjArray);
        aElem.innerText = jsonObjArray[i].classname;
        parentDiv.appendChild(aElem);
        //const dummy = document.getElementById("1"); //should be adding new comment boxes above this (serves as a refrecne point everything will add ontop of it)
        //document.body.insertBefore(commBox, dummy);
        }
        return;
}

    /**
    * function generateDropDown() 
    * Populates an HTML select element with option elements
    * built from the passed in array (grabbed from localStorage)
    *
    * @author Christian
    * @param classList Parsed Array from Local Storage
    */
export function generateDropDown(classList) {
    // Will build the initial select element 
    let dropDownMenu = document.getElementById("classSelect");
    dropDownMenu.hidden = false;
    // populate the select element with only a initial value
    dropDownMenu.innerHTML = '<option value = "">See All</option>';
    // will fill the select element with new htlm option elements pertaining 
    // to the contents within the passed in array 
    for (let i = 0; i < classList.length; i++) {
      // appends directly the the html document
      // could be attached to a shadow dom maybe?
        const temp = document.createElement('option');
        temp.value = classList[i];
        temp.innerHTML = classList[i];
        dropDownMenu?.append(temp);
    }
}

    /**
    * function updateCurrClass()
    * Continually replaces the value in localStorage's 
    * currClass key mapping with HTML select elements
    * highlighted option
    *
    * @author Christian
    */
export function updateCurrClass() {
    let currClass = {
        class : document.getElementById("classSelect").value,
    }
    localStorage.setItem('currClass', JSON.stringify(currClass));
}
 /**
    * function filterSubmissions()
    * Filters out all feedback and keeps only what pertains to
    * our current class value from local storage 
    *
    * @author Christian
    * @param submissions Parsed array of all feedback 
    * @return {Array<object>} of feedback that has className == our currClass
    */
  export function filterSubmissions(submissions) {
    // initialize array incase nothing gets added 
    const filteredArray = [];
    // linear search for submissions that match our currClass value
    for (const arrIdx in submissions) {
        // if a match is found add it to our array
        if (submissions[arrIdx].className ==  JSON.parse(localStorage.getItem('currClass')).class) {
        filteredArray.push(submissions[arrIdx]);
        }
    }
    return filteredArray;
}
    /**
    * function NewclassCategory(classname)
    * 
    * Operation: This function is used to assign default categories
    * @author Chris
    * @param className
    */
function NewclassCategory(className){
    var category = ["Exam","Lecture","Discussion"];
    localStorage.setItem(className,JSON.stringify(category));
}

/**
 * function appendClass() 
 * Saves user's new course input to local storage
 * Reloads the page so the user sees their changes in the Select HTML element
 * upon opening the dropdown 
 *
 * @author Christian 
 */
export function appendClass() {
    console.log("Sanity Check");
    // Parse our storage for a classList; If none exists, create an empty array for it
    const classList = JSON.parse(localStorage.getItem("classList")) || []; // goated
    // Add user's input from the textbox into our array pulled from local storage 
    let classValue = document.getElementById('newClass')?.value;
    classList?.push(classValue);
    // resubmit our array with the newly added class to local storage 
    localStorage.setItem("classList", JSON.stringify(classList));
    NewclassCategory(classValue); // Attaches default categories to this class for local storage
    console.log('Succesfuly added new class');
    // reload after submitting a new class so user sees their submission right away 
    location.reload();
}
/**
 * END Exports for Professor Feedback.js
 */

/**
 * Exports for add_feedback.js
 */

/**
 * function appendComment()
 * Takes user's inputs and saves their contents to local storage 
 * Appends this new objects as an element of the submission array 
 * in local storage 
 *
 * @author Christian 
 */
export function appendComment() {
    // pull current submissions from localStorage 
    // NOTE: submissions is an array of JSON objects 
    const submits = localStorage.getItem('submissions');
    // save each user's input to variables  
    let course = document.getElementsById('Classname').value;
    let title = document.getElementById('FeedbackTitle').value;
    let content = document.getElementById('stucommenttxt').value;
    // create new object and assign its key's with values 
    // from user's inputs 
    let newSubmit = {};
    newSubmit.title = title;
    newSubmit.className = course;
    newSubmit.date = "today";
    newSubmit.feedBack = content;
    newSubmit.category = "TODO"
    // append object to submissions array 
    submits.parse().push(newSubmit);
}
