import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';

import { Header, Home, Cart } from './components/index'

function App() {
    const [pizzas, setPizzas] = useState([]);

    let getData = async () => {
        let result = await axios.get('http://localhost:3000/db.json');
        setPizzas(result.data.pizzas);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="wrapper">
            <Header />
            <Routes>
                <Route path="/" element={<Home pizzas={pizzas} />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    )
}

export default App;
