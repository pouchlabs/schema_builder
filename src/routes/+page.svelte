<script>
    import {ThemeSelect,Loader,Button,Card,V1Layout, Tab, Table,Modal,Range,Toggle,Checkbox,Dropdown} from "@sveuikit/core"
      import {Schema} from "$lib/index.js";
    import z from "zod";
    let themes=["light","dark","brand","cupcake","synthwave","business","dracula","acid","silk","retro","nord","bumblebee","emerald","valentine","cyberpank",
        "garden","forest","acqua","halloween","lofi","pastel","fantasy","wireframe","black","luxury","dracula","cymk","silk","abyss","dim","night","winter"
    ]
    function onThe(the){
     console.log(the)
    }
    function start(){
      // https://dummyjson.com/icon/HASH/SIZE/?type=png (or svg)
    fetch('https://dummyjson.com/icon/abc123/150') // png is default
    .then(response => response.blob()) // Convert response to blob
    .then( async blob => {
      let i = document.createElement("img")
     
      const reader = new FileReader()
    // 2. Add a handler for the 'onload' event
    reader.onload = (e) => {
        // 5. Get the result when the 'onload' event is triggered.
        const base64data = reader.result  
        i.setAttribute("src",base64data);             
       document.body.appendChild(i)
    }
    // 3. Add a handler for the 'onerror' event
    reader.onerror = () => {                
        console.log('error')
    }
    // 4. Call 'readAsDataURL' method
    reader.readAsDataURL(blob)
    })
    // Blob {size: SIZE, type: 'image/png'}
    
    }
    function end(){
    console.log("close")
    }
    let autoModal;
    let mSchema = z.object({

    })
   let testschema={schema_id:"kkb",blocks:[{id:"1",name:"userName",type:"text",required:false,default:""},{id:"2",name:"email",type:"email",required:true,default:""}]}
    </script>
<Schema  onSchemaChange={(s)=>{
console.log(s,"change")
}}></Schema>
    
    