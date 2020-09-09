
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD7XBuQ-Qs39APgNwAcw2lxeHueWa58XmI",
    authDomain: "crud-1-45933.firebaseapp.com",
    databaseURL: "https://crud-1-45933.firebaseio.com",
    projectId: "crud-1-45933",
    storageBucket: "crud-1-45933.appspot.com",
    messagingSenderId: "531758276833",
    appId: "1:531758276833:web:5409567a9ab68524cd57a0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();


//Authentication


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("login").style.display = "none";
    document.getElementById("content_container").style.display = "block";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  }

  else {
    // No user is signed in.
    document.getElementById("login").style.display = "block";
    document.getElementById("content_container").style.display = "none";

  }
});



function signup() {

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  window.alert("User already registered / details are wrong");
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}

function signin() {

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("user not registered / Wrong credentials");
  // ...
});
}

function signout() {
  firebase.auth().signOut();
  window.alert("user signed out");

}















    //Todo list


//ADD A TASK
 function add_task() {
   console.log("add task");
   input_box=document.getElementById('input_box');
   input_date=document.getElementById('input_date');

   if (input_box.value.length!=0 && input_date.value.length!=0) {
     var key=firebase.database().ref().child("unfinished_task").push().key;
     console.log(key);
     var task = {
       title: input_box.value,
       date: input_date.value,
       key: key
     };

     var updates = {};
     updates["/unfinished_task/" + key]=task;
      firebase.database().ref().update(updates);
      create_unfinished_task();
   }
 }


//UPDATE UNFINISHED TASKS
 function create_unfinished_task() {
   unfinished_task_container=document.getElementsByClassName('container')[0];
   unfinished_task_container.innerHTML="";
   task_array=[];

   firebase.database().ref("unfinished_task").once('value',function(snapshot){
     snapshot.forEach(function(childsnapshot) {
       var childkey = childsnapshot.key;
       var childdata = childsnapshot.val();
       task_array.push(Object.values(childdata));
     });

     for (var i,i = 0; i < task_array.length; i++) {
       task_date=task_array[i][0];
       task_key=task_array[i][1];
       task_title=task_array[i][2];

       task_container=document.createElement('div');
       task_container.setAttribute("class","task_container");
       task_container.setAttribute("data-key",task_key);

       task_data=document.createElement('div');
       task_data.setAttribute('id','tesk_data');

       title=document.createElement('p');
       title.setAttribute('id','task_title');
       title.setAttribute('contenteditable',false);
       title.innerHTML = task_title;

       date=document.createElement('p');
       date.setAttribute('id','task_date');
       date.setAttribute('contenteditable',false);
       date.innerHTML = task_date;

       task_tool=document.createElement('div');
       task_tool.setAttribute('id','task_tool');

       task_done_button=document.createElement('button');
       task_done_button.setAttribute('id','task_done_button')
       task_done_button.setAttribute('onclick',"task_done(this.parentElement.parentElement,this.parentElement)");
       fa_done=document.createElement('i');
       fa_done.setAttribute('class','fa fa-check');

       task_edit_button=document.createElement('button');
       task_edit_button.setAttribute('id','task_edit_button')
       task_edit_button.setAttribute('onclick',"task_edit(this.parentElement.parentElement,this)");
       fa_edit=document.createElement('i');
       fa_edit.setAttribute('class','fa fa-pencil');

       task_delete_button=document.createElement('button');
       task_delete_button.setAttribute('id','task_delete_button')
       task_delete_button.setAttribute('onclick',"task_delete(this.parentElement.parentElement)");
       fa_delete=document.createElement('i');
       fa_delete.setAttribute('class','fa fa-trash');

       unfinished_task_container.append(task_container);

       task_container.append(task_data);
       task_data.append(title);
       task_data.append(date);


       task_container.append(task_tool);
       task_tool.append(task_done_button);
       task_done_button.append(fa_done);

       task_tool.append(task_edit_button);
       task_edit_button.append(fa_edit);

       task_tool.append(task_delete_button);
       task_delete_button.append(fa_delete);
     }
   });
 }



//UPDATE FINISHED TASKS
 function create_finished_task() {

   finished_task_container=document.getElementsByClassName('container')[1];
   finished_task_container.innerHTML="";
   task_array_finished=[];

   firebase.database().ref("finished_task").once('value',function(snapshot){
     snapshot.forEach(function(childsnapshot) {
       var childkey = childsnapshot.key;
       var childdata = childsnapshot.val();
       task_array_finished.push(Object.values(childdata));
     });

     for (var i,i = 0; i < task_array_finished.length; i++) {
       task_date=task_array_finished[i][0];
       task_key=task_array_finished[i][1];
       task_title=task_array_finished[i][2];

       task_container=document.createElement('div');
       task_container.setAttribute("class","task_container");
       task_container.setAttribute("data-key",task_key);

       task_data=document.createElement('div');
       task_data.setAttribute('id','tesk_data');

       title=document.createElement('p');
       title.setAttribute('id','task_title');
       title.setAttribute('contenteditable',false);
       title.innerHTML = task_title;

       date=document.createElement('p');
       date.setAttribute('id','task_date');
       date.setAttribute('contenteditable',false);
       date.innerHTML = task_date;

       task_tool=document.createElement('div');
       task_tool.setAttribute('id','task_tool');

       task_delete_button=document.createElement('button');
       task_delete_button.setAttribute('id','task_delete_button')
       task_delete_button.setAttribute('onclick',"task_delete_finished(this.parentElement.parentElement)");
       fa_delete=document.createElement('i');
       fa_delete.setAttribute('class','fa fa-trash');

       finished_task_container.append(task_container);

       task_container.append(task_data);
       task_data.append(title);
       task_data.append(date);

       task_container.append(task_tool);
       task_tool.append(task_delete_button);
       task_delete_button.append(fa_delete);
     }
   });
 }



//DELETE FINISHED TASKS
 function task_delete_finished(task) {
   key=task.getAttribute('data-key');
   task_to_remove=firebase.database().ref("finished_task/"+key);
   task_to_remove.remove();

   task.remove();
 }


//DELETE UNFINISHED TASKS
function task_delete(task) {
  key=task.getAttribute('data-key');
  task_to_remove=firebase.database().ref("unfinished_task/"+key);
  task_to_remove.remove();

  task.remove();
}

//TASK DONE
 function task_done(task,task_tool) {
   finished_task_container=document.getElementsByClassName("container")[1];
   task.removeChild(task_tool);
   finished_task_container.append(task);

   var key=task.getAttribute("data-key");
   var task_obj = {
     title: task.childNodes[0].childNodes[0].innerHTML,
     date: task.childNodes[0].childNodes[1].innerHTML,
     key: key
   };

   var updates = {};
   updates["/finished_task/" + key]=task_obj;
    firebase.database().ref().update(updates);

    task_delete(task);

    create_finished_task();
 }


//TASK EDITING
  function task_edit(task,edit_button) {
   edit_button.style.backgroundColor="#ffed83";
   edit_button.style.color="#fff";
   edit_button.setAttribute("onclick","finish_edit(this.parentElement.parentElement,this)");

   title=task.childNodes[0].childNodes[0];
   title.setAttribute("contenteditable",true);

   date=task.childNodes[0].childNodes[1];
   date.setAttribute("contenteditable",true);
 }
 function finish_edit(task,edit_button) {
   edit_button.style.backgroundColor="#fff";
   edit_button.style.color="#000";

   title=task.childNodes[0].childNodes[0];
   title.setAttribute("contenteditable",false);

   date=task.childNodes[0].childNodes[1];
   date.setAttribute("contenteditable",false);

   var key=task.getAttribute("data-key");
   var task_obj = {
     title: task.childNodes[0].childNodes[0].innerHTML,
     date: task.childNodes[0].childNodes[1].innerHTML,
     key: key
   };

   var updates = {};
   updates["/unfinished_task/" + key]=task_obj;
    firebase.database().ref().update(updates);
 }

 //search
function search() {
  var input = document.getElementById('search').value.toLowerCase();
  // div = document.getElementsByClassName("task_container");
  p=document.getElementsByTagName('p');
  console.log(p);

  for (i = 0; i < p.length; i++) {
    txtValue = p[i].innerHTML || p[i].innerText;
    if (txtValue.toLowerCase().indexOf(input) > -1) {
       p[i].style.display = "";
     }
    else {
       p[i].style.display = "none";
     }
  }

}


 // function(e){
 //   const term=e.target.value.toLowerCase();
 //   const data=list.getElementsByTagName('p');
 //   Array.from(data).forEach(function(book){
 //     const task_name=book.firstElementChild.textContent;
 //     if (task_name.toLowerCase().indexOf(term) != -1) {
 //       book.style.display="block";
 //     }
 //     else {
 //       book.style.display="none";
 //     }
 //   });
 //
 // }
