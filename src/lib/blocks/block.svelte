<script>
    import {nanoid} from "nanoid";
    import DefaultBlock from "./default.svelte";
	import {findBlockById,loadSchema,updateSchema} from "../utils.js";

    let {schema_id,block={
        id:nanoid(16) || crypto.randomUUID(),name:"",type:"text",default:"",min:"",max:"",required:false}
        }=$props();
        let b = $state(block)
       
</script>
<div  id={b.id} class="block min-w-[200px] flex-grow-1 flex-shrink-1  max-h-[200px] min-h-[40px]   bg-base-300 my-3 mx-2 shadow-2xl rounded-box p-2 flex gap-2" >
    <span class="handle z-5 cursor-grab w-8 h-8 min-w-6">
        <svg class="w-full " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>
    </span>
    <div class="flex-1">
        <DefaultBlock bind:block={b} id="{b.id}" schema_id="{schema_id}" ></DefaultBlock>
    </div>
    <button class="btn btn-sm p-1 btn-circle z-5 cursor-pointer " id="closebtn-{b.id}" onclick={async (e)=>{
        
        //remove block
        let block_to_remove = await findBlockById(schema_id,b.id);
  if(block_to_remove){
     let schema_to_update = await loadSchema(schema_id);
     let updated = schema_to_update.blocks.filter(b=> b.id !== block_to_remove.id);
     let new_schema = {schema_id,blocks:updated}
     await updateSchema(schema_id,new_schema)
     document.getElementById(`closebtn-${b.id}`).parentElement.remove()
  }
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
    </button>
</div>
