import React from 'react';
import Nav from "./nav";
import '../App.css';
class HomeContent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <div className="App">
                   
                    <div className="App-header">Welcome to cherry world.</div>

                </div>
            </React.Fragment>

        );
    }
}

export default HomeContent;

