import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import DetailedAnalysis from './components/DetailedAnalysis';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/detailed-analysis" element={<DetailedAnalysis />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
