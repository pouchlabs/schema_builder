<script>
import {setSchema,SchemaEmitter, updateSchema} from "./utils.js";
import './schema.css';
let {id=crypto.randomUUID(),open=false,schema,onSchemaChange=()=>{}}=$props();
import Header from "./header.svelte";
import Footer from "./footer.svelte";
import Container from "./container.svelte";
let state_schema=$state(schema)
$effect(async ()=>{
   if(schema && typeof schema === typeof {}){
    //save provided schema
     if(schema.schema_id && schema.blocks){
      updateSchema(schema.schema_id,schema);
     }
   }else{
   //not provided
   setSchema(id,{schema_id:id,blocks:[]})
   }

  //listeners
  SchemaEmitter.on("schema_update",(data)=>{
    if(typeof onSchemaChange === "function"){
      return onSchemaChange(data);
    }
  })
}) 
</script>
<div>
 <!-- The button to open modal -->
<label for="{state_schema?.schema_id || id}" class="btn">open modal</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="{state_schema?.schema_id || id}" class="modal-toggle" />
<div class:modal-open={open === true} class="modal" role="dialog">
  <div class="modal-box py-1 px-2 min-w-[100vw] max-w-[100vw] h-[100vh]">
      <Header schema_id="{state_schema?.schema_id || id}"></Header>
      <section class="flex p-2 gap-2 align-content-center">
           <div class="w-12 z-5 fixed top-14 left-1">
            <div class="dropdown dropdown-right dropdown-end">
                <div tabindex="0" role="button" class="btn m-1">Click ➡️</div>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
           </div>
           <Container id={state_schema?.schema_id || id}  bind:schema={state_schema} ></Container>
      </section>
        
  </div>
  <label class="modal-backdrop" for="{state_schema?.schema_id || id}">Close</label>
</div>
</div>