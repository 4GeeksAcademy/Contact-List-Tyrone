import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "/workspaces/Contact-List-Tyrone/src/components/ScrollToTop.jsx";
import { Navbar } from "/workspaces/Contact-List-Tyrone/src/components/Navbar.jsx";
import { Footer } from "/workspaces/Contact-List-Tyrone/src/components/Footer.jsx";

// Import your new pages
import Contacts from "/workspaces/Contact-List-Tyrone/src/pages/Contacts.jsx";
import AddContact from "/workspaces/Contact-List-Tyrone/src/pages/AddContact.jsx";

import "/workspaces/Contact-List-Tyrone/src/app.jsx";

const Layout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            
            {/* Main content area with routes */}
            <main>
                <Routes>
                    <Route path="/" element={<Contacts />} />
                    <Route path="/add-contact" element={<AddContact />} />
                </Routes>
            </main>
            
            <Footer />
        </>
    );
};

export default Layout;