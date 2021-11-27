import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setCategory } from '../../redux/store';


import { Categories, Sort, PizzaItem } from '../index';

const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortType = ['популярности', 'цене', 'алфавиту'];

function Home() {
    const pizzas = useSelector(state => state.allPizzas.items);
    const dispatch = useDispatch();
    const onSelectCategory = React.useCallback((id) => dispatch(setCategory(id)), []);
    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories onClickCategory={onSelectCategory} categories={categories} />
                    <Sort sortType={sortType} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {pizzas.length && pizzas.map(item => <PizzaItem key={item.id} {...item} />)}
                </div>
            </div>
        </div>
    )
}

export default Home
