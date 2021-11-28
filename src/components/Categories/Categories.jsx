import React from 'react';

const Categories = React.memo(({ categories, onClickCategory, category }) => {
    return (
        <div className="categories">
            <ul>
                <li className={(category === null) ? 'active' : undefined} onClick={() => { onClickCategory(null) }} > Все</li>
                {categories && categories.map((item, index) => <li className={(index === category) ? 'active' : undefined} onClick={() => { onClickCategory(index) }} key={`${item}_${index}`}>{item}</li>)}
            </ul >
        </div>
    )
}
);
export default Categories;
