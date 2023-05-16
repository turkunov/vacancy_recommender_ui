import React from "react";
import {ReactButton} from "./buttonComponents";

const ReactionMenu = (props) => {
    // reaction menu with like/dislike buttons that make up for cumReward
    return <div className="flex flex-row justify-evenly gap-1 place-items-center">
        <ReactButton emit_reaction={props.pass_emit} bgcolor="#aafac3" reaction="👍"/>
        <ReactButton emit_reaction={props.pass_emit} bgcolor="#f79eb5" reaction="👎"/>
    </div>
};

export default ReactionMenu;