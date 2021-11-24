import React, { useState } from 'react';


function Categories({ categories }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <div className="categories">
            <ul>
                <li className={(selectedCategory === null) ? 'active' : undefined} onClick={() => setSelectedCategory(null)} > Все</li>
                {categories && categories.map((item, index) => <li className={(index === selectedCategory) ? 'active' : undefined} onClick={() => setSelectedCategory(index)} key={`${item}_${index}`}>{item}</li>)}
            </ul >
        </div>
    )
}

export default Categories
