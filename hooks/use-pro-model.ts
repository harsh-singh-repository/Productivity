import {create} from "zustand";

type ProModelStore = {
    isOpen:boolean;
    onOpen:(id:string)=>void;
    onClose:()=>void;
}

export const useProModal= create<ProModelStore>((set)=>({
   isOpen:false,
   onOpen: ()=> set({isOpen:true}),
   onClose: ()=>set({isOpen:false})
}))