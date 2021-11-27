import React from 'react';

const Categories = React.memo(({ categories, onClickCategory }) => {
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    return (
        <div className="categories">
            <ul>
                <li className={(selectedCategory === null) ? 'active' : undefined} onClick={() => { setSelectedCategory(null); onClickCategory(null) }} > Все</li>
                {categories && categories.map((item, index) => <li className={(index === selectedCategory) ? 'active' : undefined} onClick={() => { setSelectedCategory(index); onClickCategory(index) }} key={`${item}_${index}`}>{item}</li>)}
            </ul >
        </div>
    )
}
);
export default Categories;
