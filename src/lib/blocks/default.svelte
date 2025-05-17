<script>
import deepmerge from "deepmerge";
import {setSchema,loadSchema,noscript,findBlockById,updateSchema,getAllBlocks} from "../utils.js";
	import { boolean } from "zod";

  let {block,schema_id}=$props();
let opts = ["text","number","boolean","json"];
let can_save = $state(false);
let txt = $state(block.type);
async function saveOnEdit(data){
  if(JSON.parse(data).name && JSON.parse(data).name.length >= 2 ){
  can_save = true;
  //up
  
  let block_to_update = await findBlockById(schema_id,JSON.parse(data).id);
  if(block_to_update){
     let schema_to_update = await loadSchema(schema_id);
     let updated = schema_to_update.blocks.filter(b=> b.id !== block_to_update.id);
     updated.push(JSON.parse(data))
     let new_schema = {schema_id,blocks:updated}
     updateSchema(schema_id,new_schema) 
    
  }

  }else{
    can_save=false;
    
  }
 
}
$effect(async ()=>{
 

})
</script>
<div class="flex mx-auto gap-2 flex-wrap ">
  <span id="type_holder{block.id}" class="text-primary text-2xl">{block.type.toUpperCase()}</span>
  <span id="name_holder{block.id}" class="text-md truncated">{block.name}</span>
  
  <!-- The button to open modal -->
<label for="field_edit_modal{block.id}" class="btn btn-sm btn-ghost btn-primary btn-square mx-auto ">
  <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
</label>

<!-- Put this part before </body> tag -->
<input type="checkbox"  id="field_edit_modal{block.id}" class="modal-toggle" />
<div  class="modal  modal-bottom sm:modal-middle" role="dialog">
  <div class="modal-box">
      
<form id="field_form{block.id}" data-type={block.type} data-fields="{JSON.stringify(block)}" class="form_{schema_id}"  >
 
 <select onchange={async(e)=>{
     let el = e.target;
        
      document.getElementById(`type_holder${block.id}`).innerText=el.value;
      block.type = el.value.toLowerCase();
      txt = block.type;
      let form = document.getElementById(`field_form${block.id}`);
      form.dataset.fields = JSON.stringify(block)
       //event
      saveOnEdit(form.dataset.fields)
      form.focus()
  }
    } id="field_select_type{block.id}" name="field_select_type" class="select my-2">
    <option disabled selected>Field Type</option>
    <option selected={block.type === "text"}>Text</option>
    <option selected={block.type === "number"} >Number</option>
    <option selected={block.type === "email"}>Email</option>
    <option selected={block.type === "boolean"}>Boolean</option>
    <option selected={block.type === "date"}>Date</option>
    <option selected={block.type === "time"}>Time</option>
    <option selected={block.type === "list"}>List</option>
    <option selected={block.type === "uuid"}>Uuid</option>
    <option selected={block.type === "base64"}>Base64</option>
    <option selected={block.type === "emoji"}>Emoji</option>
    <option selected={block.type === "ip"}>Ip</option>
    <option selected={block.type === "Url"}>Url</option>
  </select>
  <label class="input my-2">
    <input oninput={async(e)=>{
      e.target.value = e.target.value;
       let el = document.getElementById(`name_holder${block.id}`).innerText=e.target.value;
       block.name = noscript(el).trim();
        txt = block.type;
       let form = document.getElementById(`field_form${block.id}`);
        form.dataset.fields = JSON.stringify(block)
      //event
      
      saveOnEdit(form.dataset.fields)
      //form.focus()
   }
     } type="text" required min="1" max="100" value="{block.name}" name="field_name" id="field_name{block.id}" placeholder="Field Name" />
  
    <span class="badge badge-neutral badge-xs">required</span>
  </label> 


   {#if txt === "text"}
 
   
    

  <input type="number" min="0" name="field_min" id="field_min{block.id}" value="1" placeholder="Field min chars" class="input my-2" />
   <span>max</span>
  <input type="number" min="0" name="field_max" id="field_max{block.id}" value="0" placeholder="Field max chars" class="input my-2" />
  {/if}

  <fieldset class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
    <legend class="fieldset-legend">options</legend>
    <label name="field_required" id="field_required{block.id}" class="label">
      <input type="checkbox"  class="checkbox" />
      Required
    </label>  

  </fieldset>

</form> 
    <div class="modal-action">
      {#if can_save === true}
      <label onchange={()=>{can_save=false}}  id="field_form_save_btn{block.id}" for="field_edit_modal{block.id}" class="btn">save</label>
    
      {/if} 
     
      </div>
  </div>
</div>
</div>
