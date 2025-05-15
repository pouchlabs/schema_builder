<script>
	import {Provider,DefaultLayout,V1Layout,Pill,autoLoadTheme} from "@sveuikit/core";
	import "../app.css"
	function drawerOpened(name){
      console.log(name + "opened")
	}
	function drawerclosed(name){
      console.log(name + "closed")
	}
	let {children} = $props()
	$effect(()=>{
		autoLoadTheme()
	})
</script>
<Provider >

	
		{@render children?.()}

</Provider>



