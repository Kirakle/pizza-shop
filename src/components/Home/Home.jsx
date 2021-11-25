import React from 'react'
import { Categories, Sort, PizzaItem } from '../index'

function Home({ pizzas }) {
    console.log(pizzas)
    let categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    let sortType = ['популярности', 'цене', 'алфавиту'];
    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories categories={categories} />
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
