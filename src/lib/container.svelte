<script>
    import Sortable from 'sortablejs';
    import Block from "./blocks/block.svelte";
    import {loadSchema, SchemaEmitter,updateSchema} from "./utils.js";
    import {mount,onDestroy} from "svelte";
   
    let {schema,id}=$props();

    let container;
    let sortable;
  $effect(()=>{
    if(container){

    
    sortable =  new Sortable(container, {
        handle: '.handle', // handle's class
        animation: 150,
        easing: "cubic-bezier(1, 0, 0, 1)",
         ghostClass: 'bg-primary',
         swapThreshold: 1,
         swap:true,
         autoscroll:true,
         draggable: ".block",
        // Element dragging ended
	onEnd: async function (/**Event*/evt) {
        let schema_to_order = await loadSchema(schema?.schema_id || id);
        let sorted_blocks =[];
         document.querySelectorAll(`.form_${schema?.schema_id || id}`).forEach(form=>{
            sorted_blocks.push(JSON.parse(form.dataset.fields))
         })
        if(sorted_blocks){
            let newdata = {
                schema_id:id || schema_to_order?.schema_id || schema?.schema_id,
                blocks:sorted_blocks
            }
            updateSchema(schema_to_order?.schema_id || schema?.schema_id ||id,newdata);
            //event
            SchemaEmitter.emit("schema_dragend",newdata)
        }
    
       
	},
    
    });
 
    //loop through schema if provided on init
    if(schema && schema.schema_id && schema.schema_id.length>0 && schema.blocks){
      schema.blocks.forEach(block => {
        mount(Block,{target:container,props:{
            block,
            schema_id:schema?.schema_id
          }})
      });  
   }
   }
  })
  onDestroy(()=>{
    if(sortable)sortable.destroy();
  })
  </script>
  
  <div  id="container_{schema?.schema_id}" class="min-w-[200px] min-h-[80vh] flex gap-2 items-center justify-center flex-wrap overflow-auto w-full no-scrollbar mx-auto cont  max-w-[100vw] px-2 py-10 bg-base-100" bind:this={container}>
   
  
  </div>