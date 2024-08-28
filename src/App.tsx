import React from 'react';
import Main from '@pages/Main/Main'
import './App.css'
import GlobalStore from "@src/store";


const App = () => {
    return (
        <GlobalStore>
        <div className="app">
                <Main />
        </div>
        </GlobalStore>
    );
};

export default App;