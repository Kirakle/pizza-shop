import { Routes, Route } from 'react-router';

import { Header, Home } from './components/index'

function App() {

    return (
        <div className="wrapper">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default App;
