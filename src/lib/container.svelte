<script>
    import { createSwapy } from 'swapy' 
    import { onDestroy, onMount } from 'svelte'
    import Sortable from 'sortablejs';
    let container =$state()
  $effect(()=>{
    if(container){

    
    new Sortable(container, {
        handle: '.handle', // handle's class
        animation: 150,
    
    });
   }
  })
  </script>
  
  <div class="min-w-[200px] overflow-auto no-scrollbar cont w-80 ml-14 max-w-[800px] bg-base-100" bind:this={container}>
  
  
  </div>