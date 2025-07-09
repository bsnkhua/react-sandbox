import { useState } from "react";
import Wrapper from "../../UI/wrapper";
import HabitForm from "./habit-form";
import HabitList from "./habit-list";

const HabitApp = () => {

    const [habitList, setHabitList] = useState([]);

    const addHabitHandler = (newHabit) => {
        setHabitList((prevList) => [...prevList, newHabit]);
    }

    const deleteHandler = (index) => {
        setHabitList(habitList.filter((item, i) => i != index));
    }

    const increaseHandler = (index) => { 
        const upList = [...habitList];

        upList[index].done = (upList[index].done + 1);

        setHabitList(upList);
    }

    return (
        <Wrapper>
            <h2>Habit App tracker</h2>
            <div className="holder">
                <div className="box">
                    <HabitForm onAddHabit={addHabitHandler} items={habitList}/>
                </div>
                <div className="box">
                    <HabitList items={habitList} onDeleteHabit={deleteHandler} onIncrease={increaseHandler}/>
                </div>
            </div>
        </Wrapper>
    );
};

export default HabitApp;