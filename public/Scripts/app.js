/*
    Author: Hong Viet
    Team: Team Seven
    Course: COMP229 - Fall 2020
    Purpose: Team Project - Survey Site  
*/
// IIFE - Immediately Invoked Function Expression
(function(){

    function Start()
    {
        //console.log("App Started..."); 
        
        let deleteButtons = document.querySelectorAll('.btn-danger');

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event) => {
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/survey-list');
                }
            });
        }
        console.log("App Started...");
    }

    window.addEventListener("load", Start);
    
})();
