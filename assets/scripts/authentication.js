//@ts-check
window.addEventListener('DOMContentLoaded', init);
//var csv = require('jquery-csv');
const csv = require("../../node_modules/jquery-csv/src/jquery.csv");

function init() {
    const emailElement = document.getElementById('emailInput');
    const passwordElement = document.getElementById('passwordInput');
    const radioStudentElement = document.getElementById('student');
    const radioProfessorElement = document.getElementById('professor');
    var attempt = 3; // Variable to count number of attempts.
    // Below function Executes on click of login button.
    function validate() {

        if (emailElement.value == "cse110@ucsd.edu" && passwordElement.value == "group31" && radioStudentElement.checked) {

            window.location = "assets\html\index.html"; // Redirecting to other page.
            return false;
        } else if (emailElement.value == "powell@ucsd.edu" && passwordElement.value == "cse110" && radioProfessorElement.checked) {
            window.location = "assets\html\index.html"; // Redirecting to other page.
            return false;
        } else {
            attempt--; // Decrementing by one.
            alert("You have left " + attempt + " attempt;");
            // Disabling fields after 3 attempts.
            if (attempt == 0) {
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("submit").disabled = true;
                return false;
            }
        }
    }
    /* let loginButton = document.querySelector('.logIN');
     let studentCheck = document.getElementById('student');
     let profCheck = document.getElementById('professor');
     let ifStudent = null;
     
     var arrayed = $.csv.toArray("STUDENT,PROFESSOR,StuPwd,ProfPwds1@ucsd.edu,p1@ucsd.edu,student123,prof123");
     //console.log(arrayed);
     // Check if student is logging in
     studentCheck.addEventListener('click', () => {
         ifStudent = true;
     });
     
     // Check if professor is logging in
     profCheck.addEventListener('click', () => {
         ifStudent = false;
     });

     loginButton.addEventListener('click', () => {
         // If student
             // Check if email and pw in stu csv
                 // if in csv, then login
                 // else, add to csv
         // else 
             // check if email and pw is in prof csv
                 // if in csv, then login
                 // else, add to csv
     });*/


}