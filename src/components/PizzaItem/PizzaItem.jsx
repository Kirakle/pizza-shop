import classNames from 'classnames';
import React from 'react'
import { Button } from '../index';

function PizzaItem({ id, imageUrl, name, types, sizes, price, onClickAddPizza, countInCart }) {

    const size = [26, 30, 40];
    const [selectedSize, setSelectedSize] = React.useState(sizes[0]);
    const type = ['тонкое', 'традиционное'];
    const [selectedType, setSelectedType] = React.useState(types[0]);

    switch (selectedSize) {
        case 30:
            price = Math.ceil(price * 1.2);
            break;
        case 40:
            price = Math.ceil(price * 1.5);
            break;
    }

    const addPizza = () => {
        const pizzaItem = {
            id,
            name,
            imageUrl,
            price,
            type: type[selectedType],
            size: selectedSize,
            count: 1,
        }
        onClickAddPizza(pizzaItem);
    }

    return (

        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {type.map((item, index) => <li key={`${item}_${index}`} className={classNames({ active: (index === selectedType) }, { disabled: (!types.includes(index)) })} onClick={() => { if (types.includes(index)) setSelectedType(index) }}  >{item}</li>)}
                </ul>
                <ul>
                    {size.map((item, index) => <li key={`${item}_${index}`} className={classNames({ active: (item === selectedSize) }, { disabled: (!sizes.includes(item)) })} onClick={() => { if (sizes.includes(item)) setSelectedSize(item) }} >{`${item} см`}</li>)}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                {/* <div className="pizza-block__price"> {(selectedSize == 26 && price) || (selectedSize == 30 && Math.ceil(price * 1.2)) || (selectedSize == 40 && Math.ceil(price * 1.5))} ₽</div> */}
                <div className="pizza-block__price"> {price} ₽</div>
                <div onClick={addPizza}>
                    <Button className={classNames('button--add', 'button--outline')}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span >Добавить</span>
                        {(countInCart === undefined || countInCart === 0) ? null : <i>{countInCart}</i>}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PizzaItem
