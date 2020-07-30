import React, { Component } from 'react';
import Header from './Header/Header';
import SearchTesters from './SearchTesters/SearchTesters';
import TestersTable from "./TestersTable/TestersTable";
import './App.css';

class App extends Component {

    render() {
        return (
            <>
                <Header />
                <SearchTesters />
                <TestersTable />
            </>);
    }
}

export default App;
