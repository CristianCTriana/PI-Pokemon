import React from 'react';

export default function Card({name, img, types}){
    return(
        <div>
            <h3>Name: {name}</h3>
            <h3>Type: {types[0].name}   {types[1]?.name}</h3>
            <img src={img} alt='Imagen del pokemon' width='200px' height='250px'></img>
        </div>
    )
}   