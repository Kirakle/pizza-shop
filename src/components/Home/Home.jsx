import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { setCategory } from '../../redux/store';


import { Categories, Sort, PizzaItem, LoadingBlock } from '../index';
import { fetchPizzas, changeFilters } from '../../redux/store';


const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortType = ['популярности', 'цене', 'алфавиту'];

function Home() {
    const dispatch = useDispatch();

    const { category, sortBy } = useSelector(({ filterMenu }) => filterMenu);
    const isFetch = useSelector(state => state.allPizzas.isLoaded);
    const pizzas = useSelector(state => state.allPizzas.items);

    const onSelectCategory = React.useCallback((id) => dispatch(setCategory(id)), []);
    const onSelectFilters = React.useCallback((typeSort) => dispatch(changeFilters(typeSort)), []);

    React.useEffect(() => {
        dispatch(fetchPizzas({ category, sortBy }));
    }, [category, sortBy])

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories onClickCategory={onSelectCategory} categories={categories} category={category} />
                    <Sort changeFilters={onSelectFilters} sortType={sortType} sortBy={sortBy} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {!isFetch ? pizzas.map(item => <PizzaItem key={item.id} {...item} />) : Array(12).fill(0).map((item, index) => <LoadingBlock key={index} />)}
                </div>
            </div>
        </div>
    )
}

export default Home
