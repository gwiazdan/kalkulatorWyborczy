import React from "react";

interface LinkedInIconProps {
    className?: string;
}

export const LinkedInLogoSvg: React.FC<LinkedInIconProps> = (props) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" className={props.className}>
                <path
                    d="M8 0a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8Zm8.35 10c3.5 0 6.35 2.86 6.35 6.4 0 3.53-2.84 6.4-6.35 6.4A6.37 6.37 0 0 1 10 16.4c0-3.54 2.84-6.4 6.35-6.4m33.03 16.27c7.36 0 12.62 4.5 12.62 13.78V62H51.32V43.8c0-4.99-1.9-7.77-5.85-7.77-4.3 0-6.54 2.9-6.54 7.77V62h-10.3V27.33h10.3V32s3.1-5.73 10.45-5.73m-38.35 1.06h10.74V62H11.03Z"
                    fill="#fff" fillRule="evenodd"/>
            </svg>
        </>
    );
};