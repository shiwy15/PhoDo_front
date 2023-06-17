import React, {useState } from 'react';
import { Eventcalendar } from '@mobiscroll/react'; /* or import any other component */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Input, Page, setOptions, localeKo } from '@mobiscroll/react';

setOptions({
    locale: localeKo,
    theme: 'ios',
    themeVariant: 'light'
});

function App() {
    const [start, startRef] = useState(null);
    const [end, endRef] = useState(null);
    
    return (
    <div className='grid grid-rows-2 gap-4 container my-4'>
        <div className='row1 hidden'>
            <Datepicker select="range" startInput={start} endInput={end} className='w-5'/>
        </div>
        <div className='row2'>
        <div className="flex items-center justify-center"> {/* 부모 div에 flexbox 레이아웃 적용 */}
            <div className='col1 ml-6 '>
                <Input
                    ref={startRef}
                    placeholder="Start"
                    className="text-sm "
                >
                </Input>
            </div>
            <div className="mx-2"><p>~</p></div>
            <div className='col2 mr-6'>
                <Input
                    ref={endRef}
                    placeholder="End"
                    className="text-sm"
                >
                </Input>
            </div>
        </div>
        </div> 
    </div>

);
}


export default App;


    // <div className=''>

    // </div>
