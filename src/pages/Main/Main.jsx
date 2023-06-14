import styled from 'styled-components';
import * as React from 'react';
import { useState } from 'react';


export const MainPage =() => {
    const [changeColor, setChangeColor] = useState(false)

    //function for handleClick
    const handleClick =() => {
        setChangeColor(!changeColor)
    }
    return (
        <React.Fragment>
            <section>
                <div>
                    <button
                    onClick={handleClick} 
                    className={`px-20 py-10 text-3xl vapiltalize font-bold text-white rounded-lg ${(changeColor === true)? 'bg-green-700' : 'bg-blue-700'}`}>
                    PhoDo
                    </button>
                </div>
            </section>
        </React.Fragment>
    )
}
