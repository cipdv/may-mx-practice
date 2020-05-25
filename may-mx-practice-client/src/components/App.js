import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Landing = () => <h2>Landing</h2>
const Dashboard = () => <h2>Dashboard</h2>;

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={Dashboard} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;