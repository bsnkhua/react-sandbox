import { useRef, useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './movie-ratings.module.css'
import Modal from "./modal";

const MovieRatings = () => {
    const [currentIndex, setCurrentIndex] = useState();

    const [currentFilm, setCurrentFilm] = useState([]);

    const inpuRef = useRef(null);

    const [filmsList, setFilmsList] = useState([]);

    const [allFilmsList, setAllFilmsList] = useState([]);

    const [newName, setNewName] = useState('');

    const [name, setName] = useState('');

    const [newRating, setNewRating] = useState(1);

    const [rating, setRating] = useState(1);

    const onChangeNameHandler = (event) => {
        setName(event.target.value);
    }

    const onChangeRatingHandler = (event) => {
        setRating(event.target.value);
    }

    const onChangeNewNameHandler = (event) => {
        setNewName(event.target.value);
    }

    const onChangeNewRatingHandler = (event) => {
        setNewRating(event.target.value);
    }

    const addFilmHandler = () => {
        if (name.trim() !== '' && rating >= 1 && rating <= 10) {
            const updatedFilmsList = {
                name: name,
                rating: Number(rating)
            };

            setFilmsList([...filmsList, updatedFilmsList]);

            setAllFilmsList([...filmsList, updatedFilmsList]);

            setName('');

            setRating(1);

            inpuRef.current.focus();
        }
    }

    const deleteHandler = (index) => {
        setFilmsList(filmsList.filter((item, i) => i != index));
    }

    const filterUpHadler = () => {
        setFilmsList([...filmsList].sort((a, b) => a.rating - b.rating));
    }

    const filterDownHadler = () => {
        setFilmsList([...filmsList].sort((a, b) => b.rating - a.rating));
    }

    const [searchText, setSearchText] = useState('');

    const onCnahgeSearch = (event) => {
        setSearchText(event.target.value);
    }

    const searchHandler = () => {
        const filtered = allFilmsList.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

        setFilmsList(filtered);
    }

    const [showModal, setShowModal] = useState(false);

    const editHandler = (index) => {
        setCurrentIndex(index);

        const updatedCurrentFilm = filmsList[index];

        setShowModal(true);

        setCurrentFilm(updatedCurrentFilm);

        setNewName(updatedCurrentFilm.name);

        setNewRating(updatedCurrentFilm.rating);
        
    }

    const onCloseHandler = () => {
        setShowModal(false);
    }

    const saveHandler = () => {
        setShowModal(false);

        const updatedFilmsList = [...filmsList];

        const updatedObject = {
            name: newName,
            rating: newRating
        }

        updatedFilmsList[currentIndex] = updatedObject;

        setFilmsList(updatedFilmsList);
    }



    return (
        <Wrapper>
            {showModal && 
            <Modal text={'Edit film'} onCloseHandler={onCloseHandler}>
                <div className={styles['modal-inner-holder']}>
                    <div className={styles['sub-row']}>
                        <label htmlFor="newname">Film name</label>
                        <input value={newName} id="newname" type="text" onChange={onChangeNewNameHandler}/>
                    </div>
                    <div className={styles['sub-row']}>
                        <label htmlFor="newrating">Film rating</label>
                        <input value={newRating} id="newrating" type="number" min={1} max={10} onChange={onChangeNewRatingHandler} />
                    </div>
                    <button onClick={saveHandler}>Save</button>
                </div>
            </Modal>}
            <h2>Movie ratings</h2>
            <div className='holder'>
                <div className='box'>
                    <div className={styles['add-row']}>
                        <label htmlFor="name">Film name</label>
                        <input ref={inpuRef} value={name} id="name" type="text" onChange={onChangeNameHandler} />
                    </div>
                    <div className={styles['add-row']}>
                        <label htmlFor="rating">Rating name</label>
                        <input value={rating} id="rating" type="number" min={1} max={10} onChange={onChangeRatingHandler} />
                    </div>
                    <button onClick={addFilmHandler}>Add Film</button>
                </div>
                <div className='box'>
                    <ul className={styles.list}>
                        {filmsList.map((item, index) => (
                            <li key={index}>
                                <strong>{item.name}</strong>
                                <div>
                                    <span>{item.rating}</span>
                                    <button onClick={() => deleteHandler(index)}>Delete</button>
                                    <button onClick={() => editHandler(index)}>Edit</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {filmsList.length != 0 &&
                        <div className={styles.search}>
                            <input value={searchText} type="search" onChange={onCnahgeSearch}/>
                            <button onClick={searchHandler}>Search</button>
                        </div>
                    }
                    {filmsList.length != 0 && <div className={styles['filter-holder']}>
                        <div>
                            <button onClick={filterUpHadler}>Filter by rating UP</button>
                        </div>
                        <div>
                            <button onClick={filterDownHadler}>Filter by rating DOWN</button>
                        </div>
                    </div>}
                </div>
            </div>
        </Wrapper>
    );
};

export default MovieRatings;