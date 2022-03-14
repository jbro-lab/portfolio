//Justis Brown
//Oct 9 2020
var data_array = [];//array used to keep all the original json data
var notCompleteCount = 0;//used so the mark complete button doesn't keep showing up
fetch("https://jsonplaceholder.typicode.com/todos")//fetches jsonplaceholder data
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendData(data);//calls appendData function
})
.catch(function (err) {
    console.log("error: " + err);//logs error
});
function appendData(data) {//appends data to index.html
        var mainContainer = document.getElementById("app");
    for (var i = 0; i < data.length; i++) {
        var p = document.createElement("p");
        let json_array = data[i];
        data_array.push(data[i]);
        p.innerHTML = "[" + i + "]" + 
        "Title: " + json_array.title + "<br>";
        mainContainer.appendChild(p);   
    }
}
function showAllComplete(){//used to show all complete items
    var paragraphs = document.getElementsByTagName("p");
    for(let i = 0; i < data_array.length; i++){
        if (data_array[i].completed){
            paragraphs[i].hidden = false;
        }
        else {
            paragraphs[i].hidden = true;
        }
    }
}
function showAllNotComplete(){//shows all non completed items
    var paragraphs = document.getElementsByTagName("p");
    for(let i = 0; i < data_array.length; i++){
        if (data_array[i].completed){
            paragraphs[i].hidden = true;
        }
        else {
            if(notCompleteCount < 1){//used to make sure mark complete buttons don't keep reappearing 
                let button = document.createElement("INPUT");
                button.value = "Mark Complete";
                button.type = "button";
                button.id = i;
                paragraphs[i].appendChild(button);
                document.getElementById(i).setAttribute("onclick", "markComplete(this.id)")
            }
            paragraphs[i].hidden = false;
        }
    }
    notCompleteCount++;
}
function markComplete(id) {//marks items complete
    let button = document.getElementById(id);
    let parent = document.getElementById(id).parentNode;
    parent.hidden = true;
    button.hidden = true
    data_array[id].completed = true;
}
