import React from "react";
import Options from "./Options/Options.tsx";
import {Forms} from "./Forms/Forms.tsx";
import {ElectionsSwitch} from "./ElectionsSwitch.tsx";

export const Controls: React.FC = () => {
    return (
        <>
            <div className="flex flex-col w-full">
                <ElectionsSwitch/>
                <Forms/>
                <Options/>
            </div>

        </>
    );
};