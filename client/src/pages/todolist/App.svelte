<script>
  import '../../global.css'
  import TodolistList from './TodolistList.svelte'
  import Todolist from './Todolist.svelte'
  import { onMount, onDestroy } from 'svelte'

  let allTodolist = []
  let currentTodolistId = null
  $: currentTodolist =
    allTodolist.length > 0 && currentTodolistId
      ? allTodolist.filter((todolist) => todolist._id === currentTodolistId)[0]
      : null

  const realtime = setInterval(() => {
    fetchAllTodolist()
  }, 1000)

  async function fetchAllTodolist() {
    const name = await window.todoActions.getName()
    allTodolist = await window.todoActions.getAllTodolist()
  }

  onMount(async () => {
    await fetchAllTodolist()
  })
  onDestroy(() => clearInterval(realtime))

  function onTodolistSelected(todolist) {
    currentTodolistId = todolist._id
  }
</script>

<main>
  <div class="grid grid-cols-12">
    <div class="col-span-3 h-screen">
      <TodolistList
        {allTodolist}
        {onTodolistSelected}
        onTodolistUpdate={fetchAllTodolist}
      />
    </div>
    <div class="col-span-9 h-screen">
      <Todolist
        todolist={currentTodolist}
        onTodolistUpdate={fetchAllTodolist}
      />
    </div>
  </div>
</main>
