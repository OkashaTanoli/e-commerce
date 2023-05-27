import React from 'react';

function DoubleHeading({ sub, main }: { sub: string, main: string }) {
    return (
        <div>
            <p className='text-xs text-[#0062f5] font-bold tracking-widest text-center'>{sub}</p>
            <h1 className='text-3xl md:text-4xl text-main_dark font-bold text-center mt-4'>{main}</h1>
        </div>
    );
}

export default DoubleHeading;