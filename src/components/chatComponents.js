import React from "react";
import agentLogo from '../agent.webp'
import userLogo from '../user.webp'

const Bubble = (props) => {
    // chat bubble related to user messages on the right
    return <div className="flex flex-row gap-1 justify-end">
        <div className="flex max-w-48 h-auto rounded-l-full rounded-tr-full bg-slate-400 place-items-center justify-center">
            <p className="text-[10px] max-w-48 md:text-xs text-slate-50 p-3 font-light">{props.content}</p>
        </div>
        <div className="w-6 h-6 md:w-10 md:h-10">
            <img className="w-auto h-auto rounded-full" src={userLogo} alt='user logo'></img>
        </div>
    </div>
};

const ReverseBubble = (props) => { 
    // chat bubble related to system messages on the left
    return <div className="flex flex-row gap-1 items-center">
        <div className="w-6 h-6 md:w-10 md:h-10">
            <img className="w-auto h-auto rounded-full" src={agentLogo} alt='agent logo'></img>
        </div>
        <div className="flex max-w-48 h-auto rounded-r-full rounded-tl-full bg-slate-400 place-items-center justify-center">
            <p className="text-[10px] max-w-48 md:text-xs text-slate-50 p-2 font-light">{props.content}</p>
        </div>
    </div>
}

export {Bubble, ReverseBubble};