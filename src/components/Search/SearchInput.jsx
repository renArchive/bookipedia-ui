import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchBooks, setSearchTerm } from "../../redux/bookSlice";


export default function Search () {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

    function handleSearch (e) {
        setSearch(e.target.value);
        dispatch(setSearchTerm(e.target.value));
    }

    return (
        <>
            <input
                type="text"
                name="search"
                placeholder="Search"
                value={search}
                onChange={(e) => handleSearch(e)}
            />
        </>
    )
}