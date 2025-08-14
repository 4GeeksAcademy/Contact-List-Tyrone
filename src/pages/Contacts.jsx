import React from 'react';
import { useContacts } from '../store/ContactContext';
import { useNavigate } from 'react-router-dom';
import ContactCard from '../components/ContactCard';

const Contacts = () => {
    const navigate = useNavigate();
    const { 
        contacts, 
        loading, 
        error, 
        deleteContact, 
        setSelectedContact 
    } = useContacts();

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            await deleteContact(id);
        }
    };

    const handleEdit = (contact) => {
        setSelectedContact(contact);
        navigate('/add-contact');
    };

    const handleAddNew = () => {
        navigate('/add-contact');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Loading contacts...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="contacts-page">
            <div className="contacts-header">
                <h1>My Contacts</h1>
                <button onClick={handleAddNew} className="add-new-btn">
                    + Add New Contact
                </button>
            </div>

            {contacts.length === 0 ? (
                <div className="empty-state">
                    <h3>No contacts found</h3>
                    <p>Start building your contact list!</p>
                    <button onClick={handleAddNew} className="add-first-btn">
                        Add Your First Contact
                    </button>
                </div>
            ) : (
                <div className="contacts-grid">
                    {contacts.map(contact => (
                        <ContactCard 
                            key={contact.id}
                            contact={contact}
                            onEdit={() => handleEdit(contact)}
                            onDelete={() => handleDelete(contact.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Contacts;