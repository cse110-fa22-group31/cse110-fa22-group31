//@ts-check
window.addEventListener('DOMContentLoaded', init);
//Use localStorage to get what class we want to deal with in this page.
document.getElementById('Classname').innerText = JSON.parse(localStorage.getItem('currClass')).class;

//This variable is used to store current class
var currentClass = "";
function init() {
    /*
     *This part is for professor_modify_category
     */
    const categoryTable = document.getElementById("categorylist");
    currentClass=JSON.parse(localStorage.getItem('currClass')).class;
    //Build a list with the categories of this class.
    var list = JSON.parse(localStorage.getItem(currentClass));
    //Build a category list with delete button.
    if(categoryTable){
        for(let i=0;i<list.length;i++){
            var newRow = categoryTable.insertRow();
            var newCell = newRow.insertCell();
            var newCategory =document.createTextNode(list[i]);
            newCell.appendChild(newCategory);
            //category list for given class
            let cell = newRow.insertCell(1);
            //create delete button for each category
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete Category";
            //when the deleteButton is clicked, the row should be deleted
            deleteButton.onclick = function(){
                deleteButton.parentNode.parentNode.remove();
                deleteCategory(currentClass,list[i]);
            };
            cell.appendChild(deleteButton);
        }
        //Use addCategory to update new category both on this page and in localStorage
        let addCategoryButton = document.getElementById("addCategoryButton");
        addCategoryButton?.addEventListener('click', () => {
        addCategory(currentClass,document.getElementById("addNewCategory").value);
    });
    } 
    

    /* 
     *This Part is for student_add_comment
     */
    const checkboxlist = document.getElementById("ctgrlist");
    //Add checkboxes based on the categories of class
    const currentCategoryList = JSON.parse(localStorage.getItem(currentClass));
    for(let i=0;i<currentCategoryList.length;i++){
        var ctgr = document.createElement("INPUT");
        var ctgrname = document.createTextNode(currentCategoryList[i]);
        //Set attributes for each category
        ctgr.setAttribute("type", "checkbox");
        ctgr.setAttribute("value",currentCategoryList[i]);
        ctgr.setAttribute("name","Categories_of_Class");
        ctgr.innerHTML=currentCategoryList[i];
        //Add category name and checkbox to page
        checkboxlist?.appendChild(ctgrname);
        checkboxlist?.appendChild(ctgr);
    }
    //set the title of page 
    document.getElementById("Classname").innerHTML=currentClass;
    const submitButton = document.getElementById("submitB");
    submitButton?.addEventListener('click', () => {
        //create a new single comment object.
        const commentObject=new Object();
        //Set attribute to this new object
        commentObject["title"] = document.getElementById("FeedbackTitle").value;
        commentObject["classname"] = currentClass;
        var categoryArray=[];
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        for (var i = 0; i < checkboxes.length; i++) {
            categoryArray.push(checkboxes[i].value);
        }
        commentObject["category"]=JSON.stringify(categoryArray);
        commentObject["feedBack"] = document.querySelector("textarea").value;
        commentObject["Anon"] = document.getElementById("yes").checked;
        const temp = document.createElement('the-element');
        temp.data = commentObject;
        const curcomments = getCommentsFromStorage();
        curcomments.push(commentObject);
        saveCommentToStorage(curcomments);
        alert("Feedback submited");
    });
}

/**
 * function NewclassCategory(classname)
 * 
 * Operation: This function is used to assign default categories
 * @author Chris
 * @param className name of the class you want to set default categories.
 */
function NewclassCategory(className){
    var category = ["Exam","Lecture","Discussion"];
    localStorage.setItem(className,JSON.stringify(category));
}

/**
 * function deleteCategory(classname,category)
 * 
 * Operation: This function is used to delete category from localStorage
 * @author Chris
 * @param classname
 * @param category
 */
function deleteCategory(classname,category){
    var currcategory = JSON.parse(localStorage.getItem(classname));
    currcategory = currcategory.filter(function(item) {
        return item !== category
    })
    localStorage.setItem(classname,JSON.stringify(currcategory));
}
/**
 * function addCategory(classname,category)
 * 
 * Operation: This function is used to add a category in localStorage
 * @author Chris
 * @param classname
 * @param category
 */
function addCategory(classname, category){
    var currcategory = JSON.parse(localStorage.getItem(classname));
    currcategory.push(category);
    localStorage.setItem(classname,JSON.stringify(currcategory));
}

/**
 * function saveCommentToStorage(comment)
 * 
 * Operation: This function is used to set comment to localStorage
 * @author Chris
 * @param comment 
 */
function saveCommentToStorage(comment) {
        
    localStorage.setItem("comment",JSON.stringify(comment));
}

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