import React, { useState } from 'react';


function Categories({ categories }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <ul>
            <li className={(selectedCategory === null) && 'active'} onClick={() => setSelectedCategory(null)} > Все</li>
            {categories && categories.map((item, index) => <li className={(index === selectedCategory) && 'active'} onClick={() => setSelectedCategory(index)} key={`${item}_${index}`}>{item}</li>)}
        </ul >
    )
}

export default Categories
