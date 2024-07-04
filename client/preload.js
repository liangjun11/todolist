const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

contextBridge.exposeInMainWorld('todoActions', {
  helloWorld: () => ipcRenderer.invoke('hello-world'),
  login: (name) => ipcRenderer.invoke('login', name),
  logout: () => ipcRenderer.invoke('logout'),
  getName: () => ipcRenderer.invoke('get-name'),
  getAllTodolist: (name) => ipcRenderer.invoke('get-all-todolist'),
  updateTodoState: (id, state) =>
    ipcRenderer.invoke('update-todo-state', id, state),
  addTodo: (todolistId, content) =>
    ipcRenderer.invoke('add-todo', todolistId, content),
  createTodolist: (todolistName) =>
    ipcRenderer.invoke('create-todolist', todolistName),
  importTodolist: (todolistId) =>
    ipcRenderer.invoke('import-todolist', todolistId),
})
