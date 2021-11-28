import React from 'react';
import { Routes, Route } from 'react-router';

import { Header, Home, Cart } from './components/index'


function App() {
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
