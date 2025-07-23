import { useEffect, useState } from "react";
import Wrapper from "../../UI/wrapper";
import ImageForm from "./image-form";
import ImageGrid from "./image-grid";

const ImageGalleryApp = () => {

    const [galleryList, setGalleryList] = useState([]);

    const [filteredList, setFilteredList] = useState(galleryList);

    const addHandler = (newImage) => {
        const newList = [...galleryList, newImage];
        setGalleryList(newList);
        setFilteredList(newList);
    }

    const deleteHandler = (index) => {
        setGalleryList(galleryList.filter((item, i) => i != index));
    }

    const [filterText, setFilterText] = useState('');

    const filterHandler = (event) => {
        setFilterText(event.target.value);
    }

    useEffect(() => {
        const storedGalleryList = localStorage.getItem('storedGalleryList');

        if (storedGalleryList) {
            setGalleryList(JSON.parse(storedGalleryList));
            setFilteredList(JSON.parse(storedGalleryList));
        }
    }, []);

    useEffect(() => {
        if (galleryList.length > 0) {
            localStorage.setItem('storedGalleryList', JSON.stringify(galleryList));
        }
    }, [galleryList]);


    useEffect(() => {
        setFilteredList(
            galleryList.filter(item =>
                item.name.toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [filterText, galleryList]);

    return (
        <Wrapper>
            <h2>Image Gallery App</h2>
            <div className="holder">
                <div className="box">
                    <ImageForm addHandler={addHandler} items={galleryList}/>
                </div>
                <div className="box">
                    <ImageGrid items={filteredList} deleteHandler={deleteHandler} filterHandler={filterHandler} filterText={filterText}/>
                </div>
            </div>
        </Wrapper>
    );
};

export default ImageGalleryApp;