<script>
  import { onMount } from 'svelte'
  export let allTodolist = []
  export let onTodolistSelected = () => {}
  export let onTodolistUpdate = () => {}
  let username = null
  let activeTodolist = null
  let titleOrId = ''

  onMount(async () => {
    username = await window.todoActions.getName()
  })

  async function onLogoutClicked() {
    await window.todoActions.logout()
  }

  function onTodolistClicked(todolist) {
    activeTodolist = todolist._id
    onTodolistSelected(todolist)
  }

  async function onNewTodolistClicked() {
    await window.todoActions.createTodolist(titleOrId)
    titleOrId = ''
    onTodolistUpdate()
  }

  async function onImportTodolistClicked() {
    await window.todoActions.importTodolist(titleOrId)
    titleOrId = ''
    onTodolistUpdate()
  }
</script>

<div class="h-screen bg-base-300 flex flex-col">
  <div class="px-5 pt-5 pb-2 flex justify-between content-center">
    <div class="tooltip tooltip-bottom" data-tip={username ? username : 'User'}>
      <div class="avatar online placeholder">
        <div class="bg-neutral text-neutral-content w-8 rounded-full">
          <span class="text-xl">{username ? username.charAt(0) : 'U'}</span>
        </div>
      </div>
    </div>
    <button class="btn btn-outline btn-sm" on:click={onLogoutClicked}
      >Logout</button
    >
  </div>
  <div class="overflow-y-scroll">
    <ul class="menu menu-md rounded-box max-w-xs">
      {#each allTodolist as todolist}
        <li>
          <a
            class={todolist._id === activeTodolist ? 'active' : ''}
            on:click={() => onTodolistClicked(todolist)}>{todolist.name}</a
          >
        </li>
      {/each}
    </ul>
  </div>
  <div class="p-2 pb-5 mt-auto">
    <div class="px-2">
      <input
        type="text"
        placeholder="Enter title or ID"
        class="input input-bordered w-full"
        bind:value={titleOrId}
      />
    </div>
    <div class="flex justify-around mt-2">
      <button class="btn btn-primary w-5/12" on:click={onNewTodolistClicked}
        >New</button
      >
      <button
        class="btn btn-secondary w-5/12"
        on:click={onImportTodolistClicked}>Join</button
      >
    </div>
  </div>
</div>
