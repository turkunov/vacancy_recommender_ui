import React from "react";
import { useState } from 'react';
import { FormButton } from "./buttonComponents";

// form-components for handling answers to each of env attributes

const AgeField = (props) => {
    const [age, changeAge] = useState(0);

    return <div className="flex flex-row gap-2">
        <input 
            type="number" id="quantity" name="quantity" min="14" max="100"
            placeholder="Select your age" 
            className="border-[2px] border-indigo-300 p-1 w-48 h-auto rounded-l-full rounded-tr-full"
            onChange={(event) => changeAge(event.target.value)}
        ></input>

        <FormButton emit_event={props.emit_event} payload={age}/>
    </div>  
};

const SkillField = (props) => {
    const [skill, selectSkill] = useState('геймдев');

    return <div className="flex flex-row gap-2">
        <select
            value={skill}
            onChange={(event) => selectSkill(event.target.value)}
            className="border-[2px] border-indigo-300 p-1 w-48 h-auto rounded-l-full rounded-tr-full" 
        >
            <option value="геймдев">Геймдев</option>
            <option value="акварель">Акварель</option>
        </select>

        <FormButton emit_event={props.emit_event} payload={skill}/>
    </div> 
};

const PreferenceField = (props) => {
    const [preference, changePreference] = useState('');

    return <div className="flex flex-col gap-2">
        <textarea
            type="text"
            placeholder="Enter preferences"
            className='border-[2px] border-indigo-300 p-1 w-56 h-48 max-h-64 rounded-l-md rounded-tr-xl'
            onChange={(event) => changePreference(event.target.value)}
        />
        <FormButton emit_event={props.emit_event} payload={preference}/>
    </div>
};

export {AgeField, SkillField, PreferenceField};