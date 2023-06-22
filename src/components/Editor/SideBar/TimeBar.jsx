import React, { useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Input, setOptions, localeKo } from '@mobiscroll/react';

setOptions({
    locale: localeKo,
    theme: 'ios',
    themeVariant: 'light'
});

function App() {
    const [start, startRef] = useState(null);
    const [end, endRef] = useState(null);
    
    return (
        <div className='grid gap-4 container my-4'>
            <div className='row1'>
                <Datepicker
                    controls={['calendar']}
                    select="range"
                    startInput={start}
                    endInput={end}
                    calendarType="month"
                    pages={2}
                    touchUi={false}
                    className='hidden'
                />
                <div className="flex items-center justify-center">
                    <div className='col1 ml-6 '>
                        <Input
                            ref={startRef}
                            placeholder="Start">Start
                        </Input>
                    </div>
                    <div className="mx-2"><p>~</p></div>
                    <div className='col2 mr-6'>
                        <Input
                            ref={endRef}
                            placeholder="End">End
                        </Input>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default App;

