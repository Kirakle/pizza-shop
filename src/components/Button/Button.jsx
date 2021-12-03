import React from 'react';
import classNames from "classnames";

function Button({ className, children, onClickButton }) {
    return (
        <button onClick={onClickButton} className={classNames('button', className)} >{children}</button >
    )
}

export default Button;
