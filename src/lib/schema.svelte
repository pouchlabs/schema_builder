<script>
import {setSchema,SchemaEmitter, updateSchema,loadSchema} from "./utils.js";
import './schema.css';
let {id=crypto.randomUUID(),open=false,schema,onSchemaChange=()=>{}}=$props();
import Header from "./header.svelte";
import Footer from "./footer.svelte";
import Container from "./container.svelte";
let state_schema=$state(schema)
$effect(async ()=>{
   if(state_schema && typeof state_schema === typeof {}){
    //save provided schema
     if(schema.schema_id && schema.blocks){
      if(!await loadSchema(state_schema?.schema_id || id)){
      setSchema(state_schema.schema_id,state_schema);
      }else{
        updateSchema(state_schema.schema_id,state_schema);
      }
     }
   }else{
   //not provided
   setSchema(id,{schema_id:id,blocks:[]})
   }

  //listeners
  SchemaEmitter.on("schema_update",(data)=>{
    SchemaEmitter.emit(`schema_reorder${schema?.schema_id || id}`)
    if(typeof onSchemaChange === "function"){
      return onSchemaChange(data);
    }
    //
   

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
      <section class="flex flex-column p-2 gap-2 overflow-y-auto flex-wrap py-3 px-2">
           n
           <Container id={state_schema?.schema_id || id}  bind:schema={state_schema} ></Container>
           <footer class="sticky bottom-0 h-[40px] ">
              foo
           </footer>
      </section>
        
  </div>
  <label class="modal-backdrop" for="{state_schema?.schema_id || id}">Close</label>
</div>
</div>