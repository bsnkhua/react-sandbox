import { useEffect, useRef, useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './task-manager.module.css'
import Modal from "./modal";

const TaskManager = () => {

    const [invalidNewName, setInvalidNewName] = useState(false);

    const [invalidNewPriority, setInvalidNewPriority] = useState(false);

    // ------------------------------------------------

    const [currentIndex, setCurrentIndex] = useState();

    // ------------------------------------------------

    const [newTaskName, setNewTaskName] = useState('');

    const newTaskNameHandler = (event) => {
        setInvalidNewName(false);
        setNewTaskName(event.target.value);
    }

    // ------------------------------------------------

    const [newTaskPriority, setNewTaskPriority] = useState(1);

    const newTaskPriorityHandler = (event) => {
        setInvalidNewPriority(false);
        setNewTaskPriority(event.target.value);
    }

    // ------------------------------------------------

    const [showModal, setShowModal] = useState(false);

    // ------------------------------------------------

    const [existTask, setExistTask] = useState(false);

    // ------------------------------------------------

    const inputNameRef = useRef(null);

    const inputPriorityRef = useRef(null);

    // ------------------------------------------------

    const [invalidName, setInvalidName] = useState(false);

    const [invalidPriority, setInvalidPriority] = useState(false);

    // ------------------------------------------------

    const [tasksList, setTasksList] = useState([]);

    // ------------------------------------------------

    const [taskName, setTaskName] = useState('');

    const taskNameHandler = (event) => {
        setInvalidName(false);
        setTaskName(event.target.value);
    }

    // ------------------------------------------------

    const [taskPriority, setTaskPriority] = useState(1);

    const taskPriorityHandler = (event) => {
        setInvalidPriority(false);
        setTaskPriority(event.target.value);
    }

    // ------------------------------------------------

    const addTaskHandler = () => {
        let hasError = false;

        if (taskName.trim() === '') {
            setInvalidName(true);
            hasError = true;
            inputNameRef.current.focus();
        }

        if (taskPriority < 1 || taskPriority > 5) {
            setInvalidPriority(true);
            hasError = true;
            inputPriorityRef.current.focus();
        }

        if (hasError) return;

        const updatedTasksList = [...tasksList];

        const newTask = {
            name: taskName,
            priority: taskPriority
        }

        const hasExistArray = ([...tasksList].filter((item) => item.name.includes(newTask.name)));

        if (hasExistArray.length > 0) {
            setExistTask(true);
            inputNameRef.current.focus();
            return;
        }

        setTasksList([...updatedTasksList, newTask]);

        setTaskName('');

        setTaskPriority(1);

        inputNameRef.current.focus();
    }

    // ------------------------------------------------

    const deleteHandler = (index) => {
        setTasksList(tasksList.filter((item, i) => i != index));
    }

    // ------------------------------------------------

    const onCloseHandler = () => {
        setShowModal(false);
        setExistTask(false);
    }

    // ------------------------------------------------

    const editHandler = (index) => {
        setShowModal(true);
        setNewTaskName(tasksList[index].name);
        setNewTaskPriority(tasksList[index].priority);
        setCurrentIndex(index);
    }

    // ------------------------------------------------

    const saveHandler = () => {
        let hasError = false;

        if (newTaskName.trim() === '') {
            setInvalidNewName(true);
            hasError = true;
        }

        if (newTaskPriority < 1 || newTaskPriority > 5) {
            setInvalidNewPriority(true);
            hasError = true;
        }

        if (hasError) return;

        const upList = [...tasksList];

        const upTask = {
            name: newTaskName,
            priority: newTaskPriority
        };

        const hasExistArray = ([...tasksList].filter((item) => item.name.includes(upTask.name)));

        if (hasExistArray.length > 0) {
            setExistTask(true);
            inputNameRef.current.focus();
            return;
        }

        upList[currentIndex] = upTask;

        setTasksList(upList);

        setShowModal(false);
    }

    return (
        <Wrapper>
            {existTask &&
                <Modal className={'z-index'} onCloseHandler={onCloseHandler} text={'This task already exists'}/>
            }
            {showModal &&
                <Modal onCloseHandler={onCloseHandler} text={'Edit task'}>
                    <div className={styles.subrow}>
                        <label htmlFor="newName">New name:</label>
                        <input value={newTaskName} id="newName" type="text" onChange={newTaskNameHandler} className={invalidNewName ? `${styles.error}` : ''}/>
                    </div>
                    <div className={styles.subrow}>
                        <label htmlFor="newPriority">New priority:</label>
                        <input value={newTaskPriority} id="newPriority" type="number" min={1} max={5} onChange={newTaskPriorityHandler} className={invalidNewPriority ? `${styles.error}` : ''}/>
                    </div>
                    <div className={styles.buttonholder}>
                        <button onClick={saveHandler}>Save</button>
                    </div>
                </Modal>
            }
            <h2>Task Manager</h2>
            <div className='holder'>
                <div className='box'>
                    <h3>Add task:</h3>
                    <div className={styles.row}>
                        <label htmlFor="taskName">Task name:</label>
                        <input ref={inputNameRef} value={taskName} onChange={taskNameHandler} id="taskName" type="text" className={invalidName ? `${styles.error}` : ''}/>
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="taskPriority">Task priority:</label>
                        <input ref={inputPriorityRef} value={taskPriority} onChange={taskPriorityHandler} id="taskPriority" type="number" min={1} max={5} className={invalidPriority ? `${styles.error}` : ''}/>
                    </div>
                    <button onClick={addTaskHandler}>Add task</button>
                </div>
                <div className='box'>
                    {tasksList.length > 0 &&
                        <div className={styles['title-table']}>
                            <strong>Task name</strong>
                            <strong>Task priority</strong>
                        </div>
                    }
                    <ul className={styles.list}>
                        {tasksList.map((item, index) => (
                            <li key={index}>
                                <div>
                                    {item.name}
                                </div>
                                <div className={styles.subbox}>
                                    {item.priority}
                                    <button onClick={() => editHandler(index)}>Edit</button>
                                    <button onClick={() => deleteHandler(index)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Wrapper>
    );
};

export default TaskManager;