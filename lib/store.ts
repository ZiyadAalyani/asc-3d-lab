import {create} from "zustand";
type State={activeTab:string;placed:number;wired:number;running:boolean;setTab:(v:string)=>void;addPart:()=>void;toggleRun:()=>void};
export const useLabStore=create<State>((set)=>({activeTab:"Overview",placed:2,wired:1,running:false,setTab:(activeTab)=>set({activeTab}),addPart:()=>set(s=>({placed:s.placed+1})),toggleRun:()=>set(s=>({running:!s.running}))}));