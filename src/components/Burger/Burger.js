import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger=(props)=>{ // Outputting Burger Ingredients Dynamically 
    let transformedIngredients= Object.keys(props.ingredients) //getting the array of keys of ingredient object
        .map(igKey=>{
            return[...Array(props.ingredients[igKey])].map((_,i)=>{
                return <BurgerIngredient key={igKey+i} type={igKey}/>
            });
        })
        .reduce((arr,el)=>{ //Flatenning the array of ingredients
            return arr.concat(el)
        },[]);
        if(transformedIngredients.length===0){
            transformedIngredients=<p>Please start adding ingredients!</p>
        }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" /> 
            {transformedIngredients} 
            <BurgerIngredient type="bread-bottom" />
        </div>

    );

};

export default burger;

