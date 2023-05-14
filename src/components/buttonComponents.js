import React from "react";

const ReactButton = (props) => {
    return <button 
        onClick={() => props.emit_reaction(props.reaction)}
        className="button w-8 h-8 rounded-full cursor-pointer select-none
        active:translate-y-2  active:[box-shadow:0_0px_0_0_#566273]
        active:border-b-[0px] transition-all duration-150 
        [box-shadow:0_8px_0_0_#566273]
        border-[1px] border-slate-500 text-[10px]"
        style={{backgroundColor: props.bgcolor}}
    >
        {props.reaction}
    </button>
};

const FormButton = (props) => {
    return <button
        onClick={() => props.emit_event(props.payload)}
        className='border-2 rounded-md p-2 hover:cursor-pointer hover:bg-gray-400 hover:text-gray-100'
    >
        Send ➡
    </button>
}

export {ReactButton, FormButton};