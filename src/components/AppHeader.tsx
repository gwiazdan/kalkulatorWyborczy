import React from "react";
import {AppLogoSvg} from "./AppLogoSvg";
import {GithubIcon} from "./GithubIcon.tsx";
import {LinkedInLogoSvg} from "./LinkedInLogoSvg.tsx";


export const AppHeader: React.FC = () => {
    return (
        <>
            <header>
                <nav className="bg-sky-900 border-sky-800">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <div className="inline-flex">
                            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <AppLogoSvg className="h-8"/>
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kalkulator Wyborczy</span>
                            </a>
                        </div>
                        <div className="items-center space-x-3 flex flex-wrap">
                            <a href="https://github.com/gwiazdan">
                                <GithubIcon className="h-8"/>
                            </a>
                            <a href="https://www.linkedin.com/in/norbert-gwiazda-7545a3333/">
                                <LinkedInLogoSvg className="h-8"/>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}