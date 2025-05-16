import { mount} from "svelte";
import Event from "eventemitter3";
import deepmerge from "deepmerge";
import localforage from "localforage";
import { nanoid } from "nanoid";
export const SchemaEmitter = new Event();
export function addBlock(block,opts={target:document.querySelector(".cont")}){
mount(block,opts)
}
export async function loadSchema(id){
    try{
       let loaded_schema = JSON.parse(await localforage.getItem(id));
       return loaded_schema
    }catch(er){
     return null
    }
  }

  export async function setSchema(id,data){
    try {
      let found = await loadSchema(id);
      if(!found){
        //save new
        let saved = await localforage.setItem(id,JSON.stringify(data))
        return found
      }
      //update logic
    
    } catch (error) {
      return null
    }
  }
  
  export async function findBlockById(schema_id,id){
    try {
      let schema = await loadSchema(schema_id);
      if(!schema)return null;
      //find
    let found = schema.blocks.find(s=>s.id === id);
    if(!found)return null;
    return found;
 }catch (error) {
    return null
 }
  }
  export async function updateSchema(id,data){
     try {
         let found = await loadSchema(id);
         if(!found){
            SchemaEmitter.emit("schema_update",null)
         }else{
            //update
            let saved = await localforage.setItem(id,JSON.stringify(data));
            SchemaEmitter.emit("schema_update",JSON.parse(saved))
         }

     } catch (error) {
       SchemaEmitter.emit("schema_update",null)
     }
  }
  export function noscript(strCode){
   return strCode.replace(/(<([^>]+)>)/ig,"").replace(/\r\n|\r|\n/g,"").trim();
  }

  export function onBlockEditChange(){
    SchemaEmitter.on("block_change",(res)=>{
        console.log(res)
    })
  }

  export class BlockInit{
    constructor(type="text",id=nanoid(16)){
      this.id = id;
      this.type =type;
      this.name="";
      this.default = "";
      this.required = false;
      this.min= NaN;
      this.max = NaN
    }
  }

 export function getAllBlocks(id){
let cont = document.getElementById(`container_${id}`);
   cont.childNodes.entries().forEach(el=>console.log(el))
 }