<script>
  let {schema_id}=$props();
    import {addBlock,BlockInit,loadSchema,updateSchema} from "./utils.js";
import Block from "./blocks/block.svelte";
import { mount } from "svelte";

async function initOnAdd(id,block){
   //mount 
   let state_b= $derived(block)
   mount(Block,{target:document.querySelector(".cont"),props:{
                block: state_b,
                schema_id:schema_id
              }})
  let block_to_add = block;
    if(block_to_add){
       let schema_to_update = await loadSchema(id);
       if(schema_to_update && typeof schema_to_update.blocks === typeof []){
       schema_to_update.blocks?.push(block_to_add);
       updateSchema(id,schema_to_update)
       }
    }
}
</script>
<div class="navbar sticky px-2 top-1 z-50 rounded-box min-h-8 h-12 bg-base-100 shadow-lg">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-md btn-primary btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm gap-2 dropdown-content flex-wrap overflow-auto max-h-[200px]   bg-base-200 rounded-box lg:min-w-max z-1 mt-3  p-2 shadow-2xl">
          <li>
              <button onclick={(e)=>{let newblock = new BlockInit("text"); 
              initOnAdd(schema_id,newblock);
              }}>Text</button>
          </li>
          <li>
            <button onclick={(e)=>{let newblock = new BlockInit("email"); 
            initOnAdd(schema_id,newblock);
            }}>Email</button>
        </li>
        <li>
          <button onclick={(e)=>{let newblock = new BlockInit("number"); 
          initOnAdd(schema_id,newblock);
          }}>Number</button>
      </li>
      <li>
        <button onclick={(e)=>{let newblock = new BlockInit("date"); 
        initOnAdd(schema_id,newblock);
        }}>Date</button>
    </li>
    <li>
      <button onclick={(e)=>{let newblock = new BlockInit("time"); 
        initOnAdd(schema_id,newblock);
        }}>Time</button>
     </li>
     <li>
      <button onclick={(e)=>{let newblock = new BlockInit("list"); 
        initOnAdd(schema_id,newblock);
        }}>List</button>
     </li>
     <li>
      <button onclick={(e)=>{let newblock = new BlockInit("boolean"); 
         initOnAdd(schema_id,newblock);
        }}>Boolean</button>
      </li>
      <li>
        <button onclick={(e)=>{let newblock = new BlockInit("uuid"); 
           initOnAdd(schema_id,newblock);
          }}>Uuid</button>
        </li>
        <li>
          <button onclick={(e)=>{let newblock = new BlockInit("emoji"); 
             initOnAdd(schema_id,newblock);
            }}>Emoji</button>
          </li>
          <li>
            <button onclick={(e)=>{let newblock = new BlockInit("url"); 
               initOnAdd(schema_id,newblock);
              }}>Url</button>
            </li>
            <li>
              <button onclick={(e)=>{let newblock = new BlockInit("ip"); 
                 initOnAdd(schema_id,newblock);
                }}>Ip</button>
              </li>
              <li>
                <button onclick={(e)=>{let newblock = new BlockInit("base64"); 
                   initOnAdd(schema_id,newblock);
                  }}>Base64</button>
                </li>
      </ul>
      </div>
    </div>
    <div class="navbar-center">
     
    </div>
    <div class="navbar-end">
     b
   
    </div>
  </div>
 