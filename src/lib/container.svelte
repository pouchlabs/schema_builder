<script>
    import Sortable from 'sortablejs';
    import Block from "./blocks/block.svelte";
    import {SchemaEmitter} from "./utils.js";
    import {mount} from "svelte";
    let {schema,id}=$props();

    let container;

  $effect(()=>{
    if(container){

    
    new Sortable(container, {
        handle: '.handle', // handle's class
        animation: 150,
         ghostClass: 'bg-primary',
         swapThreshold: 1,
    
    });
    //reorder on drag
    SchemaEmitter.on(`schema_reorder${schema.schema_id}`,()=>{
     let cont = document.getElementById(`container_${schema.schema_id}`)//.i.innerHTML=''
     console.log(cont)
    })
    
    if(schema && schema.schema_id && schema.blocks){
      schema.blocks.forEach(block => {
        mount(Block,{target:container,props:{
            block,
            schema_id:schema.schema_id
          }})
      });  
   }
   }
  })
  </script>
  
  <div  id="container_{schema?.schema_id}" class="min-w-[200px] overflow-auto no-scrollbar cont w-80 ml-14 max-w-[800px] bg-base-100" bind:this={container}>
   
  
  </div>