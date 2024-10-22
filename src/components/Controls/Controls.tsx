import React from "react";
import Options from "./Options/Options.tsx";
import {Forms} from "./Forms/Forms.tsx";

export const Controls: React.FC = () => {
    return (
        <>
            <div className="flex flex-col">
                <Forms/>
                <Options/>
            </div>

        </>
    );
};