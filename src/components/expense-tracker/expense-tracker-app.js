import { useEffect, useState } from "react";
import Wrapper from "../../UI/wrapper";
import ExpenseTrackerForm from "./expense-tracker-form";
import ExpenseList from "./expense-tracker-list";
import Modal from "../modal";
import styles from './expense-tracker-app.module.css'

const ExpenseTrackerApp = () => {

    const [filterDate, setFilterDate] = useState('');
    
    const [filterTotal, setFilterTotal] = useState(0);

    const [filteredList, setFilteredList] = useState([]);

    const [filter, setFilter] = useState('');

    const [curentIndex, setCurentIndex] = useState(null);

    const [newName, setNewName] = useState('');

    const newNameChangeHandler = (event) => {
        setNewName(event.target.value);
    }

    const [newAmount, setNewAmount] = useState(1);

    const newAmountChangeHandler = (event) => {
        setNewAmount(Number(event.target.value));
    }

    const getTodayString = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    const [newDate, setNewDate] = useState(getTodayString);

    const newDateHandler = (event) => {
        setNewDate(event.target.value);
    }

    const [showEditModal, setShowEditModal] = useState(false);

    const [total, setTotal] = useState(0);

    const [ref, setRef] = useState(null);

    const [textError, setTextError] = useState('');

    const [hasError, setHasError] = useState(false);

    const [expenseList, setExpenseList] = useState([]);

    const onAddExpense = (newExpense) => {
        const upList = [...expenseList, newExpense];
        setExpenseList(upList);
        setFilteredList([]);
        setFilterDate('');
        setFilter('');
    }

    const onDelete = (index) => {
        const upList = expenseList.filter((item, i) => i !== index);
        setExpenseList(upList);
        setFilteredList([]);
    }

    const hasErrorHandler = (textError) => {
        if (textError) {
            setTextError(textError);
            setHasError(true);
        }
    }

    const onCloseErrorHandler = () => {
        setHasError(false);
        ref.current.focus();
    }

    const onCloseEditHandler = () => {
        setShowEditModal(false);
    }

    const onEditHandler = (index) => {
        setCurentIndex(index);
        setShowEditModal(true);
        setNewName(expenseList[index].name);
        setNewAmount(expenseList[index].amount);
        setNewDate(expenseList[index].date);
    }

    const saveHandler = () => {
        if (newName.trim() === '') {
            return;
        }

        if (newAmount < 1) {
            return;
        }

        if (new Date(newDate) > new Date()) {
            return;
        }

        const newExpanse = {
            name: newName,
            amount: newAmount,
            date: newDate
        }

        const upList = expenseList.map((item, index) => 
            index === curentIndex ? newExpanse : item
        );

        setExpenseList(upList);
        setShowEditModal(false);
    }

    const filterHandler = (event) => {
        const value = event.target.value;
        setFilter(value);
        applyFilters(value, filterDate);
    }

    const filterDateHandler = (event) => {
        const value = event.target.value;
        setFilterDate(value);
        applyFilters(filter, value);
    }

    const applyFilters = (text, date) => {
        let filtered = expenseList;

        if (text.trim() !== '') {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
        }

        if (date !== '') {
            filtered = filtered.filter(item => item.date === date);
        }

        setFilteredList(filtered);

        const filterTotal = filtered.reduce((sum, item) => sum + Number(item.amount), 0);
        setFilterTotal(filterTotal);
    };

    const isFilterActive = filter.trim() !== '' || filterDate !== '';


    useEffect(() => {
        const storedExpenseList = localStorage.getItem('storedExpenseList');
        const totalAmount = localStorage.getItem('totalAmount');

        if (storedExpenseList) {
            setExpenseList(JSON.parse(storedExpenseList));
        }

        if (totalAmount) {
            setTotal(Number(totalAmount));
        }
    }, []);

    useEffect(() => {
        if (expenseList.length > 0) {
            localStorage.setItem('storedExpenseList', JSON.stringify(expenseList));
            const total = expenseList.reduce((sum, item) => sum + item.amount, 0);
            setTotal(total);
            localStorage.setItem('totalAmount', total);
        } else {
            localStorage.removeItem('storedExpenseList');
            localStorage.removeItem('totalAmount');
            setTotal(0);
        }

    }, [expenseList]);
    
    return (
        <Wrapper>
            {hasError && <Modal text={textError} onCloseHandler={onCloseErrorHandler}/>}
            {showEditModal &&
                <Modal text={'Edit expense'} onCloseHandler={onCloseEditHandler}>
                    <div className={styles['edit-box']}>
                        <div className={newName.trim() === '' ? 'form-row error' : 'form-row'}>
                            <label htmlFor="newName">Edit name:</label>
                            <input value={newName} id="newName" type="text" onChange={newNameChangeHandler}/>
                        </div>
                        <div className={newAmount < 1 ? 'form-row error' : 'form-row'}>
                            <label htmlFor="newAmount">Edit amount:</label>
                            <input value={newAmount} id="newAmount" type="number" onChange={newAmountChangeHandler}/>
                        </div>
                        <div className={new Date(newDate) > new Date() ? 'form-row error' : 'form-row'}>
                            <label htmlFor="newDate">Edit date:</label>
                            <input value={newDate} id="newDate" type="date" onChange={newDateHandler}/>
                        </div>
                        <div className="form-row">
                            <button onClick={saveHandler}>Save</button>
                        </div>
                    </div>
                </Modal>
            }
            <h2>Expense Tracker App</h2>
            <div className="holder">
                <div className="box">
                    <h3>Expense tracker form</h3>
                    <ExpenseTrackerForm onAddExpense={onAddExpense} setTextError={hasErrorHandler} setRef={setRef}/>
                </div>
                <div className="box">
                    <h3>Expense tracker list</h3>
                    <div className={styles.filter}>
                        <div className="form-row">
                            <label htmlFor="filter">Filter by name:</label>
                            <input value={filter} id="filter" type="text" onChange={filterHandler}/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="filterDate">Filter by date:</label>
                            <input value={filterDate} id="filterDate" type="date" onChange={filterDateHandler}/>
                        </div>
                    </div>
                    <ExpenseList items={isFilterActive ? filteredList : expenseList} onDelete={onDelete} total={isFilterActive ? filterTotal : total} onEditHandler={onEditHandler}/>
                </div>
            </div>
        </Wrapper>
    );
};

export default ExpenseTrackerApp;