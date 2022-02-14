import React, {  Fragment } from 'react'
import Select from 'react-select'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemon } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);

    useEffect(()=>{
        dispatch(getPokemon());
    },[])

    function handleClick(event){
        event.preventDefault();
        dispatch(getPokemon());
    }

    const optionsName = [
        {value: 'ascendente',label:'Ascendente'},
        {value: 'descendente',label: 'Descendente'}
    ];

    const optionsAttack = [
        {value: 'ascendente',label:'Ascendente'},
        {value: 'descendente',label: 'Descendente'}
    ];

    const optionsType =[
        {value: 'normal', label:'Normal'},
        {value: 'fighting', label:'Fighting'},
        {value: 'flying', label:'Flying'},
        {value: 'poison', label:'Poison'},
        {value: 'ground', label:'Ground'},
        {value: 'rock', label:'Rock'},
        {value: 'bug', label:'Bug'},
        {value: 'ghost', label:'Ghost'},
        {value: 'steel', label:'Steel'},
        {value: 'fire', label:'Fire'},
        {value: 'water', label:'Water'},
        {value: 'grass', label:'Grass'},
        {value: 'electric', label:'Electric'},
        {value: 'psychic', label:'Psychic'},
        {value: 'ice', label:'Ice'},
        {value: 'dragon', label:'Dragon'},
        {value: 'dark', label:'Dark'},
        {value: 'fairy', label:'Fairy'},
        {value: 'unknown', label:'Unknown'},
        {value: 'shadow', label:'Shadow'}
    ];

    const optionsOrigin = [
        {value:'todos', label:'Todos'},
        {value:'creado', label:'Creados'},
        {value:'api', label:'De api'},
    ];

    return (
        <div>
            <Link to="/pokemonform">Crear pokemon</Link>
            <h1>Home Page</h1>
            <button onClick={event => {handleClick(event)}}>Volver a cargar todos los pokemons</button>
            <div>
                <Select options={optionsName} placeholder="Ordernar por nombre" ></Select>
                <Select options={optionsAttack} placeholder="Ordenar por ataque"></Select>
                <Select options={optionsType} placeholder="Ordenar por tipo"></Select>
                <Select options={optionsOrigin} placeholder="Ordenar por origen"></Select>
                {
                    allPokemons?.map((e)=>{
                        return(
                                <Link to={"/pokemons/" + e.id}>
                                    <Card name={e.name} img={e.img} types={e.types} key={e.id}></Card>
                                </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}