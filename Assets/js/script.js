//initialize js code when document is ready
$(document).ready(function(){
    
    //Get current time/hour
    let d = new Date();
    let hour = d.getHours();

    //Set Date and Time
    $('#currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'));  

    //declaring required variables
    let starthour = 8;
    let h12format = "";

    //Create task elements
    for(i=0;i<=9;i++){
        //Logic to form text for work times
        let displayhour = starthour;
        let h12format = "";
        if(starthour < 12){
            h12format = "AM";
        }
        else{
            h12format = "PM";
        }
        if(starthour>12){
            displayhour = starthour - 12;
        }

        //create elements
        let divEl = $('<div>');
        let timeEl = $('<p>').text(displayhour + " " + h12format);
        let taskfield = $('<input>');
        let saveBtn = $('<button>');
        divEl.addClass("row time-block");
        timeEl.addClass("col-2 hour p-2 d-flex justify-content-end");
        taskfield.addClass("col-9");
        saveBtn.addClass("col-1 saveBtn fa fa-save");
        divEl.append(timeEl);
        divEl.append(taskfield);
        divEl.append(saveBtn);
        $('.container').append(divEl);
        
        //color the elements based on time
        if(starthour<hour){
            taskfield.addClass("past");
        }
        else if(starthour==hour){
            taskfield.addClass("present");
        }
        else if(starthour>hour){
            taskfield.addClass("future");
        }
        starthour++;
    }
})