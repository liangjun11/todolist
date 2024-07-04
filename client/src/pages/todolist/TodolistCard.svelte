<script>
  import TodolistCardStrategies from './TodolistCardStrategies'
  export let todolist = null
  export let state = 'ONGOING'
  export let onTodolistUpdate = () => {}

  $: todos = todolist
    ? todolist.todos.filter((todo) => todo.state === state)
    : null

  async function updateTodoState(id, state) {
    await window.todoActions.updateTodoState(id, state)
    onTodolistUpdate()
  }
</script>

{#if todos && todos.length > 0}
  <div
    class="bg-{TodolistCardStrategies[state]
      .backgroundColor} rounded-lg mt-3.5 p-2 text-{TodolistCardStrategies[
      state
    ].textColor}"
  >
    <h1>{TodolistCardStrategies[state].title}</h1>
    {#each todos as todo}
      <div class="p-2 hover:bg-white/30 rounded flex justify-between group">
        <p>{todo.content}</p>
        <div class="group-hover:block hidden">
          {#if TodolistCardStrategies[state].secondaryActionLabel}
            <button
              class="btn btn-xs"
              on:click={() =>
                updateTodoState(
                  todo._id,
                  TodolistCardStrategies[state].secondaryActionState,
                )}>{TodolistCardStrategies[state].secondaryActionLabel}</button
            >
          {/if}
          <button
            class="btn btn-xs"
            on:click={() =>
              updateTodoState(
                todo._id,
                TodolistCardStrategies[state].primaryActionState,
              )}>{TodolistCardStrategies[state].primaryActionLabel}</button
          >
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div></div>
{/if}
