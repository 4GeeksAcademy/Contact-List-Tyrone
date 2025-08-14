import React from 'react';

const ContactCard = ({ contact, onEdit, onDelete }) => {
    return (
        <div className="contact-card">
            <div className="contact-avatar">
                <img 
                    src="https://placehold.co/600x400/orange/white" 
                    alt={contact.name}
                />
            </div>
            
            <div className="contact-info">
                <h3>{contact.name}</h3>
                <div className="contact-details">
                    <p>📧 {contact.email}</p>
                    <p>📞 {contact.phone}</p>
                    <p>🏠 {contact.address}</p>
                </div>
            </div>
            
            <div className="contact-actions">
                <button onClick={onEdit} className="edit-btn" title="Edit Contact">
                    ✏️
                </button>
                <button onClick={onDelete} className="delete-btn" title="Delete Contact">
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default ContactCard;
