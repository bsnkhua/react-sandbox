import React, { useState } from "react";
import Wrapper from "../../UI/wrapper";
import ShoppingForm from "./shopping-form";
import ShoppingListItems from "./shopping-list-items";

const ShoppingApp = () => {
    const [productList, setProductList] = useState([]);

    const addProductHandler = (newProduct) => {
        setProductList((prevList) => [...prevList, newProduct]);
    }

    const boughtHandler = (index) => {
        setProductList((prevList) => 
            prevList.map((item, i) =>
                i === index ? {...item, bought: !item.bought} : item
            )
        );
    }

    return (
        <Wrapper>
            <h2>Shopping App</h2>
            <div className='holder'>
                <div className='box'>
                    <ShoppingForm onAddProduct={addProductHandler}/>
                </div>
                <div className='box'>
                    <ShoppingListItems items={productList} onBought={boughtHandler}/>
                </div>
            </div>
        </Wrapper>
    );
};

export default ShoppingApp;