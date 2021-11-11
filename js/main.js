function saveNotes(noteTitle, noteBody) {
  if (noteTitle === "") {
    alert("Note Title is Empty!");
  } else {
    localStorage.setItem(noteTitle, noteBody);
    updateList(noteTitle);
  }
}

function removeNotes(btnid) {
  let titleid = "title" + btnid.substring(3);
  let title = document.getElementById(titleid).innerText;
  localStorage.removeItem(title);
  location.reload();
}

function editNotes(editid) {
  let titleid = "title" + editid.substring(4);
  let title = document.getElementById(titleid).innerHTML;
  document.getElementById("noteTitle").innerHTML = title;
  document.getElementById("noteBody").innerHTML = localStorage.getItem(title);
}

function getAllNotes() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  var all_notes = new Array();
  while (i--) {
    all_notes.push([keys[i], localStorage.getItem(keys[i])]);
  }

  return all_notes;
}

function displayList() {
  let all_notes = getAllNotes();
  let i = all_notes.length;
  x = 0;
  let list = document.getElementsByClassName("notes_list")[0];
  while (x < i) {
    let note_view = document.createElement("div");
    note_view.id = "note" + x;
    note_view.className = "notes__list-item notes__list-item--selected";
    list.appendChild(note_view);

    let new_title = document.createElement("div");
    new_title.id = "title" + x;
    new_title.className = "notes__item-title";
    new_title.innerText = all_notes[x][0];
    note_view.appendChild(new_title);

    var new_body = document.createElement("div");
    new_body.id = "body" + x;
    new_body.className = "notes__item-body";
    new_body.innerHTML = all_notes[x][1];
    note_view.appendChild(new_body);

    var del_button = document.createElement("button");
    del_button.id = "del" + x;
    del_button.className = "notes__btn-del";
    del_button.type = "button";
    del_button.setAttribute("onclick", "removeNotes(id)");
    del_button.innerHTML = "Remove";
    note_view.appendChild(del_button);

    var edit_button = document.createElement("button");
    edit_button.className = "notes__btn-edit";
    edit_button.id = "edit" + x;
    edit_button.type = "button";
    edit_button.setAttribute("onclick", "editNotes(id)");
    edit_button.innerHTML = "Edit";
    note_view.appendChild(edit_button);

    x++;
  }
}
function updateList(noteTitle) {
  let note = localStorage.getItem(noteTitle);
  let list = document.getElementsByClassName("notes_list")[0];

  let note_view = document.createElement("div");
  note_view.id = "note" + x;
  note_view.className = "notes__list-item notes__list-item--selected";
  list.appendChild(note_view);

  let new_title = document.createElement("div");
  new_title.id = "title" + x;
  new_title.className = "notes__item-title";
  new_title.innerText = noteTitle;
  note_view.appendChild(new_title);

  var new_body = document.createElement("div");
  new_body.id = "body" + x;
  new_body.className = "notes__item-body";
  new_body.innerHTML = localStorage.getItem(noteTitle);
  note_view.appendChild(new_body);

  var del_button = document.createElement("button");
  del_button.id = "del" + x;
  del_button.className = "notes__btn-del";
  del_button.type = "button";
  del_button.setAttribute("onclick", "removeNotes(id)");

  del_button.innerHTML = "Remove";

  note_view.appendChild(del_button);

  var edit_button = document.createElement("button");
  edit_button.id = "edit" + x;
  edit_button.className = "notes__btn-edit";
  edit_button.type = "button";
  edit_button.setAttribute("onclick", "editNotes(id)");
  edit_button.innerHTML = "Edit";
  note_view.appendChild(edit_button);
}

function newPage() {
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteBody").value = "";
}
