const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Store = require('electron-store')

const API_URL = 'http://localhost:3000'
const USER_NAME_KEY = 'USER_NAME'
const store = new Store()

let win = null

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  })

  if (store.has(USER_NAME_KEY)) {
    win.loadFile('public/todolist.html')
  } else {
    win.loadFile('public/login.html')
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

async function login(event, name) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
  const { name: returnedName } = await response.json()
  store.set(USER_NAME_KEY, returnedName)
  if (win) {
    win.loadFile('public/todolist.html')
  }
}

async function logout(event) {
  store.delete(USER_NAME_KEY)
  win.loadFile('public/login.html')
}

ipcMain.handle('hello-world', async () => {
  try {
    const response = await fetch(`${API_URL}/`)
    return response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
})

async function getName(event) {
  return store.get(USER_NAME_KEY)
}

async function getAllTodolist(event) {
  const response = await fetch(
    `${API_URL}/user/${store.get(USER_NAME_KEY)}/todolists`,
  )
  const result = await response.json()
  return result
}

async function updateTodoState(event, id, state) {
  const response = await fetch(`${API_URL}/todo/${id}/state`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state }),
  })
  const result = await response.json()
  return result
}

async function addTodo(event, todolistId, content) {
  const response = await fetch(`${API_URL}/todolist/${todolistId}/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, ownerName: store.get(USER_NAME_KEY) }),
  })
  const result = await response.json()
  return result
}

async function createTodolist(event, todolistName) {
  const response = await fetch(`${API_URL}/todolist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      todolistName,
      ownerName: store.get(USER_NAME_KEY),
    }),
  })
  const result = await response.json()
  return result
}

async function importTodolist(event, todolistId) {
  const response = await fetch(
    `${API_URL}/user/${store.get(USER_NAME_KEY)}/todolist/${todolistId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  const result = await response.json()
  return result
}

ipcMain.handle('login', login)
ipcMain.handle('logout', logout)
ipcMain.handle('get-name', getName)
ipcMain.handle('get-all-todolist', getAllTodolist)
ipcMain.handle('update-todo-state', updateTodoState)
ipcMain.handle('add-todo', addTodo)
ipcMain.handle('create-todolist', createTodolist)
ipcMain.handle('import-todolist', importTodolist)
