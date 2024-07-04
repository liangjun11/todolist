<script>
  import '../../global.css'
  let name = null
  let isLoading = false
  async function onLoginClicked() {
    isLoading = true
    console.log(name)
    await window.todoActions.login(name)
    isLoading = false
  }
</script>

<main>
  <div class="flex flex-col justify-center h-screen">
    <div class="flex justify-center">
      <div class="card bg-neutral text-neutral-content w-96 h">
        <div class="card-body items-center text-center">
          <h2 class="card-title">Welcome!</h2>
          <input
            type="text"
            placeholder="Type your username to login"
            class="input input-bordered w-full max-w-xs"
            bind:value={name}
          />
          <div class="label">
            <span class="label-text-alt"
              >If the name doesn't exist, a new user will be created</span
            >
          </div>
          <div class="card-actions justify-end">
            <button
              on:click={onLoginClicked}
              class="btn btn-primary {isLoading ? 'btn-disabled' : ''}"
            >
              {#if isLoading}
                <span class="loading loading-spinner"></span>
                Submitting
              {:else}
                Login
              {/if}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
