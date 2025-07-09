import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './shopping-list-total.module.css'
import Modal from "./modal";

const ShoppingListTotal = () => {
    const limit = 1000;

    const [total, setTotal] = useState(0);

    const [shopList, setShopList] = useState([]);

    const [nameProduct, setNameProduct] = useState('');

    const [priceProduct, setPriceProduct] = useState('');

    const [showModal, setShowModal] = useState(false);

    const nameHandler = (event) => {
        setNameProduct(event.target.value);
    }

    const priceHandler = (event) => {
        setPriceProduct(event.target.value);
    }

    const addProductHandler = () => {
        const newProduct = {
            name: nameProduct,
            price: priceProduct
        }

        setShopList(prev => [...prev, newProduct]);

        setNameProduct('');
        setPriceProduct('');

        const updatedTotal = total + Number(priceProduct);

        if (updatedTotal > limit) {
            setShowModal(true);
        }

        setTotal(prev => (prev + Number(priceProduct)));
        
    }

    const onCloseHandler = () => {
        setShowModal(false);
    }

    const deleteHandler = (index) => {
        const deletedPriceItem = Number(shopList[index].price);
        
        setShopList(shopList.filter((item, i) => i != index));

        setTotal(prev => (prev - deletedPriceItem));
    }

    return (
        <Wrapper>
            <h2>Shopping List Total</h2>
            {showModal && <Modal onCloseHandler={onCloseHandler} text={'Бюджет превышен!!!'} />}
            <div className={styles.holder}>
                <div className={styles['box']}>
                    <div className={styles['add-row']}>
                        <label htmlFor="name">Name product</label>
                        <input value={nameProduct} type="text" id="name" onChange={nameHandler}/>
                    </div>
                    <div className={styles['add-row']}>
                        <label htmlFor="price">Price</label>
                        <input value={priceProduct} type="number" id="price" onChange={priceHandler} />
                    </div>
                    <div className={styles['add-row']}>
                        <button onClick={addProductHandler}>Add product</button>
                    </div>
                </div>
                <div className={styles['box']}>
                    <div className={styles.title}>
                        <span>Product name</span>
                        <span>Price</span>
                    </div>
                    <ul className={styles['product-list']}>
                        {shopList.map((item, index) => (
                            <li key={index}>
                                <span>{item.name}</span>
                                <div>
                                    <span>{item.price}</span>    
                                    <button onClick={() => deleteHandler(index)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles['total-row']}>
                        <span>Limit - {limit} $</span>
                        <span><b>Total - {total} $</b></span>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default ShoppingListTotal;