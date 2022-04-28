console.log('this is node js project');
// if user add a not use localstorage //
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let title = document.getElementById("title");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj={
        title:title.value,
        text:addTxt.value
    }
    notesObj.push(myObj)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    title.value = "";
    console.log(notesObj)
    showNotes();
})

//function to element from localstorage//

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class=" notesCard card mx-2 my-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deletNote(this.id)" class="btn btn-primary">Delet Note</button>
        </div>
      </div>
        `;
    });
    let notesElm = document.getElementById("notes")
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `nothing to show notes pleas add a notes`
    }

}

//function to delet note//
function deletNote(index) {
    console.log('i am deleting', index)
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
 notesObj.splice(index,1);
 localStorage.setItem("notes", JSON.stringify(notesObj));
 showNotes();
 

}
let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){
    
    let inputVal=search.value.toLowerCase();
    console.log('input event fired')
    let notesCrad=document.getElementsByClassName('notesCard')
    Array.from(notesCrad).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block"
        }
        else{
            element.style.display="none"
        }
        // console.log(cardTxt)
    })
})
