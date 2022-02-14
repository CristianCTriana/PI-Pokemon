import React from 'react';
import {Link} from 'react-router-dom';

export default function Landing(){
    return(
        <div>
            <h1>Pokemon</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}