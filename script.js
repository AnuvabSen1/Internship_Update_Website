// Script to handle adding and removing tasks
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var tasks = [];

// Load tasks from local storage if available
if (localStorage.getItem("tasks")) {
	tasks = JSON.parse(localStorage.getItem("tasks"));
	renderTasks();
}

function createTaskElement(task) {
  var li = document.createElement("li");
  li.className = "task";

  var taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = task.name;

  var taskLink = document.createElement("a");
  taskLink.setAttribute("href", task.link);
  taskLink.setAttribute("target", "_blank");
  taskLink.innerHTML = "&#128279;"; // link symbol

  taskText.appendChild(taskLink);
  li.appendChild(taskText);

  var deleteButton = document.createElement("button");
  deleteButton.className = "delete-task";
  deleteButton.textContent = "X";
  li.appendChild(deleteButton);

  return li;
}


function renderTasks() {
	for (var i = 0; i < tasks.length; i++) {
		var li = document.createElement("li");
		var taskText = document.createElement("span");
		taskText.classList.add("task-text");
		taskText.textContent = tasks[i].name;
		li.appendChild(taskText);

		// Create a link element for the task if it has a link value
		if (tasks[i].link) {
			var taskLink = document.createElement("a");
			taskLink.setAttribute("href", tasks[i].link);
			taskLink.setAttribute("target", "_blank");
			taskLink.textContent = " (Link)";
			taskText.appendChild(taskLink);
		}

		var editInput = document.createElement("input");
		editInput.type = "text";
		editInput.classList.add("edit-input");
		editInput.style.display = "none";
		li.appendChild(editInput);

		var editBtn = document.createElement("button");
		var editText = document.createTextNode("Edit");
		editBtn.appendChild(editText);
		editBtn.classList.add("edit");
		editBtn.addEventListener("click", editTask);
		li.appendChild(editBtn);

		var deleteBtn = document.createElement("button");
		var deleteText = document.createTextNode("Delete");
		deleteBtn.appendChild(deleteText);
		deleteBtn.classList.add("delete");
		deleteBtn.addEventListener("click", removeTask);
		li.appendChild(deleteBtn);

		var linkBtn = document.createElement("button");
		var linkText = document.createTextNode("Link");
		linkBtn.appendChild(linkText);
		linkBtn.classList.add("link");
		linkBtn.addEventListener("click", addLink);
		li.appendChild(linkBtn);

		taskList.appendChild(li);
	}
}

function updateButtonSpacing(li) {
  const buttons = li.querySelectorAll("button");
  const numButtons = buttons.length;

  for (let i = 0; i < numButtons; i++) {
    buttons[i].style.marginRight = "0"; // Remove margin-right
  }
}



function saveTasks() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
	if (taskInput.value === "") {
		alert("Please enter a task!");
	} else {
		var task = {
			name: taskInput.value,
			link: "" // Initialize link value to empty string
		};
		tasks.push(task);
		saveTasks();

		var li = document.createElement("li");
		var taskText = document.createElement("span");
		taskText.classList.add("task-text");
		taskText.textContent = taskInput.value;
		li.appendChild(taskText);

		var editInput = document.createElement("input");
		editInput.type = "text";
		editInput.classList.add("edit-input");
		editInput.style.display = "none";
		li.appendChild(editInput);

		var editBtn = document.createElement("button");
		var editText = document.createTextNode("Edit");
		editBtn.appendChild(editText);
		editBtn.classList.add("edit");
		editBtn.addEventListener("click", editTask);
		li.appendChild(editBtn);

		var deleteBtn = document.createElement("button");
		var deleteText = document.createTextNode("Delete");
		deleteBtn.appendChild(deleteText);
		deleteBtn.classList.add("delete");
		deleteBtn.addEventListener("click", removeTask);
		li.appendChild(deleteBtn);

		var linkBtn = document.createElement("button");
		var linkText = document.createTextNode("Link");
		linkBtn.appendChild(linkText);
		linkBtn.classList.add("link");
		linkBtn.addEventListener("click", addLink);
		li.appendChild(linkBtn);

		taskList.appendChild(li);
		taskInput.value = "";
	}
}

function removeTask() {
	var li = this.parentNode;
	var ul = li.parentNode;
	var taskText = li.querySelector(".task-text").textContent;
	var taskIndex = tasks.findIndex(function(task) {
		return task.name === taskText;
	});
	tasks.splice(taskIndex, 1);
	saveTasks();
	ul.removeChild(li);
}





function editTask() {
	var li = this.parentNode;
	var taskText = li.querySelector(".task-text");
	var editInput = li.querySelector(".edit-input");
	var editBtn = li.querySelector(".edit");
	var containsClass = li.classList.contains("edit-mode");

	if (containsClass) {
		taskText.textContent = editInput.value;
		editBtn.textContent = "Edit";
	} else {
		editInput.value = taskText.textContent;
		editBtn.textContent = "Save";
	}

	editInput.style.display = containsClass ? "none" : "block";
	taskText.style.display = containsClass ? "block" : "none";

	li.classList.toggle("edit-mode");
}

function addLink() {
  var li = this.parentNode;
  var link = prompt("Please enter a URL:");
  if (link !== null && link !== "") {
    var taskText = li.querySelector(".task-text");
    var taskIndex = tasks.findIndex(function(task) {
      return task.name === taskText.textContent;
    });
    tasks[taskIndex].link = link;
    saveTasks();

    var taskLink = document.createElement("a");
    taskLink.setAttribute("href", link);
    taskLink.setAttribute("target", "blank");
    taskLink.innerHTML = "<span style='text-decoration:none;'>&#128279;</span>"; // link symbol without underline
    taskText.innerHTML = taskText.textContent.replace(/link/gi, "");
    taskText.appendChild(taskLink);
  }
}






function updateButtonSpacing(li) {
  const buttons = li.querySelectorAll("button");
  const numButtons = buttons.length;
  const buttonWidth = buttons[0].offsetWidth;
  const totalWidth = numButtons * buttonWidth;
  const availableWidth = li.offsetWidth - taskList.offsetWidth;
  const marginRight = (availableWidth - totalWidth) / (numButtons - 1);

  for (let i = 0; i < numButtons; i++) {
    buttons[i].style.marginRight = `${marginRight}px`;
  }
}
