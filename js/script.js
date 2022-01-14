const taskInput = document.querySelector('.input')
const addTaskBtn = document.querySelector('.add-task')
const taskList = document.querySelector('.tasks-list')

const themeColorMenuBtn = document.querySelector('.theme-color')
const themeColorMenu = document.querySelector('.theme-color-picker-menu')
const mainColorPicker = document.querySelector('.main-color')
const secondaryColorPicker = document.querySelector('.secondary-color')
let root = document.documentElement

let ID = 0
let taskNameBeforeEdit
let isAnotherTaskEdited = false
const createElement = (tagOfElement, arrayOfClasses) => {
	let newElement = document.createElement(tagOfElement)
	arrayOfClasses.forEach(classToAdd => {
		newElement.classList.add(classToAdd)
	})

	return newElement
}
const createBtn = (arrayOfBtnClasses, arrayOfIconClasses, onClickFunction) => {
	let newBtn = createElement('button', arrayOfBtnClasses)
	let btnIcon = createElement('i', arrayOfIconClasses)
	newBtn.appendChild(btnIcon)
	newBtn.onclick = onClickFunction
	return newBtn
}
const makeTaskDone = task => {
	task.children[0].classList.toggle('task-done')
}
const getTaskbuttonsToNormal = task => {
	task.children[1].onclick = function () {
		makeTaskDone(task)
	}
	task.children[2].onclick = function () {
		deleteTask(task)
	}
}
const submitEditTask = (task, taskNameAfterEdit) => {
	let newTaskName = createElement('p', ['task-name'])
	let taskInput = task.querySelector('.task-name')
	newTaskName.textContent = taskNameAfterEdit
	task.appendChild(newTaskName)
	task.replaceChild(newTaskName, taskInput)
	let editBtn = createBtn(['edit', 'task-btn', 'btn'], ['fas', 'fa-pen'], function () {
		editTask(newTask)
	})
	task.appendChild(editBtn)
	getTaskbuttonsToNormal(task)
	isAnotherTaskEdited = false
}
const applyEditTask = task => {
	submitEditTask(task, taskInput.value)
}
const cancelEditTask = task => {
	submitEditTask(task, taskNameBeforeEdit)
}
const editTask = task => {
	if (!isAnotherTaskEdited) {
		let newInput = createElement('input', ['task-name', 'edit-input'])
		let taskName = task.querySelector('.task-name')
		newInput.value = taskName.textContent
		taskNameBeforeEdit = taskName.textContent
		task.appendChild(newInput)
		task.replaceChild(newInput, taskName)
		task.removeChild(task.children[3])
		task.children[1].onclick = function () {
			applyEditTask(task)
		}
		task.children[2].onclick = function () {
			cancelEditTask(task)
		}
		isAnotherTaskEdited = true
	}
}
const deleteTask = task => {
	task.classList.remove('show-anim')
	setTimeout(() => {
		task.classList.add('show-anim-reverse')
	}, 0)
	setTimeout(() => {
		task.parentElement.removeChild(task)
	}, 400)
}
const createNewTask = () => {
	let newTask = createElement('div', ['task', 'show-anim'])
	newTask.setAttribute('ID', ID)
	ID++
	let taskName = createElement('p', ['task-name'])
	taskName.textContent = taskInput.value

	let doneBtn = createBtn(['done', 'task-btn', 'btn'], ['fas', 'fa-check'], function () {
		makeTaskDone(newTask)
	})
	let deleteBtn = createBtn(['delete', 'task-btn', 'btn'], ['fas', 'fa-times'], function () {
		deleteTask(newTask)
	})
	let editBtn = createBtn(['edit', 'task-btn', 'btn'], ['fas', 'fa-pen'], function () {
		editTask(newTask)
	})

	newTask.appendChild(taskName)
	newTask.appendChild(doneBtn)
	newTask.appendChild(deleteBtn)
	newTask.appendChild(editBtn)
	return newTask
}
const addTask = () => {
	newTask = createNewTask()
	taskList.appendChild(newTask)
}

addTaskBtn.addEventListener('click', addTask)
themeColorMenuBtn.addEventListener('click', () => {
	if (themeColorMenu.classList.contains('hidden')) {
		themeColorMenu.classList.remove('theme-picker-anim-reverse')
		setTimeout(() => {
			themeColorMenu.classList.toggle('hidden')
		})
		setTimeout(() => themeColorMenu.classList.toggle('theme-picker-anim'), 0)
	} else {
		themeColorMenu.classList.remove('theme-picker-anim')
		setTimeout(() => themeColorMenu.classList.toggle('theme-picker-anim-reverse'), 0)
		setTimeout(() => {
			themeColorMenu.classList.toggle('hidden')
		}, 400)
	}
})
mainColorPicker.addEventListener('input', e => {
	root.style.setProperty('--main-color', e.target.value)
})
secondaryColorPicker.addEventListener('input', e => {
	root.style.setProperty('--second-color', e.target.value)
})
