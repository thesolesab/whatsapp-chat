import React, { useState } from 'react';

const Auth = ({ onAuth }) => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAuth(idInstance, apiTokenInstance);
    };

    return (
        <div className="auth">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="idInstance"
                >
                    idInstance
                </label>
                <input
                    type="text"
                    name='idInstance'
                    placeholder="Введи idInstance"
                    value={idInstance}
                    onChange={(e) => setIdInstance(e.target.value)}
                />
                <label
                    htmlFor="apiToken"
                >
                    apiTokenInstance
                </label>
                <input
                    type="password"
                    name='apiToken'
                    placeholder="Введи apiTokenInstance"
                    value={apiTokenInstance}
                    onChange={(e) => setApiTokenInstance(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Auth;