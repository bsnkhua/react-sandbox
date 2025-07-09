import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './shopping-list.module.css'

const ShoppingList = () => {

    const [shopList, setShopList] = useState([]);

    const shopListHandler = () => {
        if (inputText != '') {
            setShopList([...shopList, {
                name: inputText,
                purchased: false
            }]);
            setInputText('');
        }
    }

    const [inputText, setInputText] = useState('');

    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    }

    const onDeleteHandler = (index) => {
        setShopList(shopList.filter((item, i) => i != index));
    }

    const purchasedHandler = (index) => {
        const updatedList = [...shopList];

        updatedList[index] = {
            ...updatedList[index],
            purchased: !updatedList[index].purchased
        }

        setShopList(updatedList);
    }

    return (
        <Wrapper>
            <h2>Shopping List</h2>
            <div className={styles.row}>
                <input type="text" value={inputText} onChange={inputTextHandler}/>
                <button onClick={shopListHandler}>Add item</button>
            </div>
            {shopList.length > 0 && <ul className={styles.list}>
                {shopList.map((item, index) => (
                    <li key={index} className={item.purchased ? `${styles.done}` : ''}>
                        <div className={styles.name}>
                            {item.name}
                        </div>
                        <div className={styles['sub-row']}>
                            <label htmlFor={index}>Purchased</label>
                            <input id={index} type="checkbox" onChange={() => purchasedHandler(index)}/>
                            <button onClick={() => onDeleteHandler(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>}
        </Wrapper>
    );
};

export default ShoppingList;