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
    let tasks;

    //Get saved tasks if any
    if(localStorage.getItem('tasks') != null){
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }else{
        tasks = [
            {'8':""},
            {'9':""},
            {'10':""},
            {'11':""},
            {'12':""},
            {'13':""},
            {'14':""},
            {'15':""},
            {'16':""},
            {'17':""}
        ]     
        localStorage.setItem('tasks',JSON.stringify(tasks));   
    }

    //Create task elements
    for(i=8;i<=17;i++){
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
        divEl.attr('id',i);
        timeEl.addClass("col-2 hour p-2 d-flex justify-content-end");
        taskfield.addClass("col-8 col-md-9");
        taskfield.attr('id',i);
        taskfield.val(tasks[i-8][i]);
        saveBtn.addClass("col-md-1 col-2 saveBtn fa fa-save");
        saveBtn.attr('id',i);
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

    //Save button functionality
    $(".saveBtn").click(function() {
        const id = this.id;
        var taskinput = $(`input[id=${id}]`);
        var tasktext = taskinput.val();
        tasks[id-8][id] = tasktext;
        localStorage.setItem('tasks',JSON.stringify(tasks));
    });
})