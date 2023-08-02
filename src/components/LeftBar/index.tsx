import './left-bar.css';
import React from "react";
import {PROPERTY} from "../../constants";

interface ILeftBar {
    setCurrentInfo: (data: PROPERTY) => void;
}

function LeftBar({setCurrentInfo}: ILeftBar) {
    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCurrentInfo(e.currentTarget.name as PROPERTY);
    };
    return (
        <div className='b-left-bar'>
            <button name={PROPERTY.TEMPERATURE} onClick={onClickHandler}>Температура</button>
            <button name={PROPERTY.PRECIPITATION} onClick={onClickHandler}>Осадки</button>
        </div>
    );
}

export default LeftBar;
