import React from "react";
import { useState } from 'react';
import ReactionMenu from "./menuComponents";

const RecElement = (props) => {
    // card component with all recommendation info
    const [reactionAdded, reactionSwitch] = useState(false)

    const handle_reaction = (reaction_type) => {
        reactionSwitch(true)
    }

    return <div className="flex flex-col gap-1 mt-2 mb-4"> 
        <div className='
            flex flex-col scrollbar gap-y-1 border-[1px] justify-start items-center 
            border-slate-400 rounded-md w-24 h-32 md:w-48 md:h-64 overflow-y-scroll p-1
            md:p-2 hover:shadow-md hover:cursor-pointer transition-all duration-100
        '>
            <div className='w-12 h-12 md:w-24 md:h-24 rounded-sm'>
                <img className='w-auto' src={props.logo} alt='vacancy logo'></img>
            </div>
            <div className='flex flex-col gap-2 p-2 text-[9px] md:text-xs break-normal'>
                <h2 className="items-center">{props.name}</h2>
            </div>
        </div>
        {reactionAdded 
            ? null
            : <ReactionMenu pass_emit={(reaction) => {
                    handle_reaction()
                    props.pass_emit(reaction)
                }
            }/>
        }
    </div>
};

const RecRow = (props) => {
    /*
    Components for handling all recommendation-cards
    This component can be used only for recommendations
    */
    return <div className='flex justify-start md:justify-center overflow-x-scroll w-full md:w-auto md:overflow-visible flex-row gap-1 r md:flex-wrap mt-2'>{
        props.recommendations.map(recommendation => (
            <RecElement key={recommendation.id} logo={recommendation.logo} name={recommendation.name} pass_emit={props.pass_emit} />
        ))
    }</div>
};

export default RecRow;
