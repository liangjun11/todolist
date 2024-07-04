<script>
  import TodolistCard from './TodolistCard.svelte'
  export let todolist = null
  export let onTodolistUpdate = () => {}
  let todoContent = ''
  async function onTodoAdd() {
    await window.todoActions.addTodo(todolist._id, todoContent)
    todoContent = ''
    onTodolistUpdate()
  }
</script>

<div class="h-screen px-5 py-5 overflow-y-scroll">
  {#if todolist}
    <div>
      <h1 class="text-3xl">{todolist.name}</h1>
      <div class="tooltip mb-2" data-tip="Share the ID to collaborate">
        <p class="text-base-content/50">ID: {todolist._id}</p>
      </div>
      <div class="grid grid-cols-12 gap-2">
        <input
          type="text"
          placeholder="New todo"
          class="input input-bordered w-full col-span-10"
          bind:value={todoContent}
        />
        <button class="btn btn-primary col-span-2" on:click={onTodoAdd}
          >Add</button
        >
      </div>
    </div>
    <TodolistCard {todolist} state="TODO" {onTodolistUpdate} />
    <TodolistCard {todolist} state="ONGOING" {onTodolistUpdate} />
    <TodolistCard {todolist} state="DONE" {onTodolistUpdate} />
  {:else}
    <div>Select a todolist to start</div>
  {/if}
</div>
