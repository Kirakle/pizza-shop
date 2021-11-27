import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';

import { Header, Home, Cart } from './components/index'
import { setPizzas } from './redux/store';

function App() {
    const dispatch = useDispatch();

    const getData = async () => {
        let result = await axios.get('http://localhost:3001/pizzas');
        dispatch(setPizzas(result.data));
    }

    React.useEffect(() => {
        getData();
    }, [])

    return (
        <div className="wrapper">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    )
}

export default App;
