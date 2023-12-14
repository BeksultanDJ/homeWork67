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

const App = () => {
    return (
        <Provider store={store}>
            <KeyboardSimulator />
        </Provider>
    );
};

export default App;
