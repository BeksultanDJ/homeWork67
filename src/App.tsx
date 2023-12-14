import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.css';

const SET_PIN = 'SET_PIN';
const CLEAR_PIN = 'CLEAR_PIN';

const setPin = (digit: string) => {
    return { type: SET_PIN, payload: digit };
};

const clearPin = () => {
    return { type: CLEAR_PIN };
};

const pinReducer = (state = '', action: any) => {
    switch (action.type) {
        case SET_PIN:
            return state.length < 4 ? state + action.payload : state;
        case CLEAR_PIN:
            return '';
        default:
            return state;
    }
};

const store = createStore(pinReducer); // Создание хранилища Redux

interface AccessMessageProps {
    message: string;
    color: string;
}

const AccessMessage: React.FC<AccessMessageProps> = ({ message, color }) => {
    return (
        <div style={{ color }}>
            <p>{message}</p>
        </div>
    );
};

interface KeyboardProps {
    onButtonClick: (digit: string) => void;
    onClear: () => void;
    onEnter: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onButtonClick, onClear, onEnter }) => {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    return (
        <div className="keyboard">
            {digits.map((digit) => (
                <button className="btns" key={digit} onClick={() => onButtonClick(digit.toString())}>
                    {digit}
                </button>
            ))}
            <button className="btns" onClick={onClear}>{"<"}</button>
            <button className="btns" onClick={onEnter}>E</button>
        </div>
    );
};

const KeyboardSimulator = () => {
    const dispatch = useDispatch();
    const pin = useSelector((state: string) => state);



    const handleButtonClick = (digit: string) => {
        dispatch(setPin(digit));
    };



    const handleClear = () => {
        dispatch(clearPin());
    };

    return (
        <div>
            {accessGranted ? (
                <AccessMessage message="Access Granted" color="green" />
            ) : pin.length === 4 ? (
                <AccessMessage message="Access Denied" color="red" />
            ) : null}
            <div>
                <div>Password: {pin.replace(/./g, '*')}</div>
                <Keyboard
                    onButtonClick={handleButtonClick}
                    onClear={handleClear}
                />
            </div>

        </div>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <KeyboardSimulator />
        </Provider>
    );
};

export default App;
