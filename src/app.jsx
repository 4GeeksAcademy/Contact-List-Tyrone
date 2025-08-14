import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout.jsx";  
import Contacts from './pages/Contacts';
import AddContact from './pages/AddContact';
import { ContactProvider } from './store/ContactContext';
// import './App.css';

function App() {
    return (
        <ContactProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Contacts />} />
                        <Route path="/add-contact" element={<AddContact />} />
                    </Routes>
                </Layout>
            </Router>
        </ContactProvider>
    );
}

export default App;