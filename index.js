const addStickyNoteBtn = document.getElementById("addStickyNoteBtn");
const noteContainer = document.getElementById("noteContainer");
var searchBar = document.getElementById("searchBar");
var noteCount = 0;

function addStickyNote(){
    createNote("","");
}


//for delete button in note
function delNote(count){
    let myNote = document.getElementById("note"+count);
    myNote.remove();
}


function saveBoard(){

    for(i=0;i<noteContainer.childNodes.length;i++)
    {
        let title = noteContainer.getElementsByClassName("noteTitle")[i].value;
        let content = noteContainer.getElementsByClassName("noteContent")[i].value;
        let note = {
            title: title,
            content: content
        }
        window.localStorage.setItem(i, JSON.stringify(note));
    }
}

function retrieveBoard()
{
    let localStorageKeys = Object.keys(localStorage);
    for(j=0;j<localStorageKeys.length;j++)
    {
        let note=JSON.parse(window.localStorage.getItem(j));
        //console.log(JSON.parse(note));
        createNote(note.title,note.content);
    }
}

function createNote(myTitle, myContent)
{
    if(noteContainer.childNodes.length==0)
    {
        noteCount=1;
    }
    else
    {
        noteCount++;
    }

    let note = document.createElement('div');
    note.className ="note";
    note.id="note"+noteCount;

    let title = document.createElement('textarea');
    title.className="noteTitle";
    title.setAttribute("rows",1);
    title.innerText=myTitle;
    note.appendChild(title);

    //delete button
    let delNoteBtn = document.createElement('button');
    delNoteBtn.className="delNoteBtn";
    delNoteBtn.innerText="X";
    delNoteBtn.id=noteCount;
    delNoteBtn.addEventListener("click", function(){delNote(this.id)});

    note.appendChild(delNoteBtn);

    let content = document.createElement('textarea');
    content.className="noteContent";
    content.setAttribute("rows",5);
    content.innerText=myContent;
    note.appendChild(content);
    
    noteContainer.appendChild(note);  
}

searchBar.addEventListener('keyup',(e)=> {
    let searchKey= e.target.value; //return string

    //first child id starts from 1, length start counting from 1
    for(x=1;x<=noteContainer.childNodes.length;x++)
    {
        var index = x-1;
        var title = noteContainer.getElementsByClassName("noteTitle")[index].value; //return string, node container starts from 0
        var content = noteContainer.getElementsByClassName("noteContent")[index].value; //return string, , node container starts from 0
        var myNote = document.getElementById("note"+x);
        //console.log(title);

        if(title.includes(searchKey) || content.includes(searchKey))
        {
            myNote.style.display = 'block';
            //console.log(title+"match");
        }
        else
        {
            myNote.style.display = 'none';
            //console.log(title+"not match");
        }
    }


});