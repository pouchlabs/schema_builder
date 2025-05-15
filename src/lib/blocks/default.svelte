<script>
  import localforage from "localforage";
  let {type="text",id,schema_id}=$props();
let opts = ["text","number","boolean","json"];
let schema;
async function loadSchema(id){
  try{
   console.log(id)
  }catch(er){

  }
}

function noscript(strCode){
 return strCode.replace(/(<([^>]+)>)/ig,"").replace(/\r\n|\r|\n/g,"").trim();
}
function saveOnEdit(field,data,id){
   loadSchema(schema_id)
   console.log(field,data,id)
}
function onFormChange(e,id){
   let save_btn = document.getElementById(`field_form_save_btn${id}`);
   let form = document.getElementById(`field_form${id}`);
 let current_el = e.target || e.srcElement;


   if(current_el.name === "field_name"){
      //save back
      if(current_el.value.length > 2){
        current_el.value = current_el.value;
        saveOnEdit(current_el.name,noscript(document.querySelector(`#${current_el.id}`).value),id);
        
      }
   };
    if(current_el.name === "field_default"){
       //save back
       if(current_el.value.length > 0){
        current_el.value = current_el.value;
        saveOnEdit(current_el.name,document.querySelector(`#${current_el.id}`).value,id);
      }else{
        saveOnEdit(current_el.name,"",id);
      }
   };


   form.focus()

}
</script>
<div class="flex mx-auto gap-2 ">
  <span class="text-primary text-2xl">{type}</span>
  <!-- The button to open modal -->
<label for="field_edit_modal{id}" class="btn btn-sm btn-ghost btn-primary btn-square mx-auto ">
  <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="field_edit_modal{id}" class="modal-toggle" />
<div class="modal  modal-bottom sm:modal-middle" role="dialog">
  <div class="modal-box">
      
<form id="field_form{id}" data-type={type} data-fields  onchange={(e)=>onFormChange(e,id)}>
 <input type="text" required min="1" max="100" value="" name="field_name" id="field_name{id}" placeholder="Field Name" class="input" />
   {#if type === "text" }
  <textarea name="field_default" id="field_default{id}" placeholder="default" value="" class="textarea textarea-xs"></textarea>
  <input type="number" min="0" name="field_min" id="field_min{id}" value="1" placeholder="Field min chars" class="input" />
  <input type="number" min="0" name="field_max" id="field_max{id}" value="0" placeholder="Field max chars" class="input" />
  {/if}
  <fieldset class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
    <legend class="fieldset-legend">options</legend>
    <label name="field_required" id="field_required{id}" class="label">
      <input type="checkbox"  class="checkbox" />
      Required
    </label>

  </fieldset>

</form> 
    <div class="modal-action">
       <label disabled id="field_form_save_btn{id}" for="field_edit_modal{id}" class="btn">save</label>
    </div>
  </div>
</div>
</div>
