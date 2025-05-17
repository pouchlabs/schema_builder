<script>
import {setSchema,SchemaEmitter, updateSchema,loadSchema,genZodSchema} from "./utils.js";
import './schema.css';
let {id=crypto.randomUUID(),open=false,schema,onSchemaChange=()=>{},footer,onZodSchema=()=>{}}=$props();
import Header from "./header.svelte";
import Footer from "./footer.svelte";
import Container from "./container.svelte";
import {onDestroy} from "svelte";
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
  SchemaEmitter.on("schema_update",async (data)=>{
  
    if(typeof onSchemaChange === "function"){
      return onSchemaChange(data);
    }
    //
    
   

  })
  if(state_schema){
    if(typeof onZodSchema === "function"){
      //gen zod schema
      let zschema = await genZodSchema(state_schema?.schema_id);
      return onZodSchema(zschema)
    }
  }
}) 
onDestroy(async ()=>{
 console.log("des")
})
</script>
<div>
 <!-- The button to open modal -->
<label for="{state_schema?.schema_id || id}" class="btn">open modal</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="{state_schema?.schema_id || id}" class="modal-toggle" />
<div class:modal-open={open === true} class="modal todo add close func" role="dialog">
  <div class="modal-box overflow-x-hidden py-1 px-2 min-w-[100vw] max-w-[100vw] h-[100vh]">
      <Header schema_id="{state_schema?.schema_id || id}"></Header>
      <section class="flex flex-column p-2 gap-2 overflow-y-auto flex-wrap py-3 px-2">
        <span class="text-2xl my-2 mx-2 truncated">{state_schema?.schema_id || id}</span>
           
           <Container id={state_schema?.schema_id || id}  bind:schema={state_schema} ></Container>
           
      </section>
      <footer class="sticky  left-0 z-50 bottom-0 bg-base-100 shadow-2xl w-[100vw] h-[40px] ">
        {@render footer?.()}
     </footer>
  </div>
  <label class="modal-backdrop" for="{state_schema?.schema_id || id}">Close</label>
</div>
</div>