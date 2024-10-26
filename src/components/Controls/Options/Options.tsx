import React from "react";
import MapPaintingOptions from "./MapPaintingOptions.tsx";
import SenateOptions from "./SenateOptions.tsx";
import SinglePartyOptions from "./SinglePartyOptions.tsx";


const Options : React.FC = () => {

    return (
        <>
            <div>
                <div className="py-5 px-5 mx-auto bg-slate-800 mt-6">
                    <details className="group">
                        <summary className="flex justify-between items-center font-bold tracking-wider cursor-pointer list-none">
                            <span>Ustawienia kalkulatora</span>
                            <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor"
                                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"
                                 width="24"><path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                        </summary>
                        <div className="mt-3 group-open:animate-fadeIn">
                            <MapPaintingOptions />
                            <SenateOptions/>
                            <SinglePartyOptions/>
                        </div>
                    </details>
                </div>
            </div>
        </>
    );
};

export default Options;
