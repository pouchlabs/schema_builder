import { mount} from "svelte";
import Event from "eventemitter3";

export const ShcemaEmitter = new Event();
export function addBlock(block,opts={target:document.querySelector(".cont")}){
mount(block,opts)
}