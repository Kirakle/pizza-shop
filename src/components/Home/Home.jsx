import React from 'react'
import { useSelector } from 'react-redux';

import { Categories, Sort, PizzaItem } from '../index';

function Home() {
    const pizzas = useSelector(state => state.allPizzas.items);
    const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    const sortType = ['популярности', 'цене', 'алфавиту'];
    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories onClickCategory={(id) => console.log(id)} categories={categories} />
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
