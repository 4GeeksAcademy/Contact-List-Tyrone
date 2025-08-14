import React, { useState, useEffect } from 'react';
import { useContacts } from '../store/ContactContext';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
    const navigate = useNavigate();
    const { 
        addContact, 
        updateContact, 
        selectedContact, 
        clearSelectedContact, 
        loading, 
        error 
    } = useContacts();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (selectedContact) {
            setFormData({
                name: selectedContact.name || '',
                email: selectedContact.email || '',
                phone: selectedContact.phone || '',
                address: selectedContact.address || ''
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: ''
            });
        }
    }, [selectedContact]);

    const validateForm = () => {
        const errors = {};
        
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        
        if (!formData.phone.trim()) {
            errors.phone = 'Phone is required';
        }
        
        if (!formData.address.trim()) {
            errors.address = 'Address is required';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            if (selectedContact) {
                await updateContact(selectedContact.id, formData);
            } else {
                await addContact(formData);
            }
            
            setFormData({ name: '', email: '', phone: '', address: '' });
            setValidationErrors({});
            clearSelectedContact();
            navigate('/');
        } catch (error) {
            console.error('Failed to save contact:', error);
        }
    };

    const handleCancel = () => {
        setFormData({ name: '', email: '', phone: '', address: '' });
        setValidationErrors({});
        clearSelectedContact();
        navigate('/');
    };

    return (
        <div className="add-contact-page">
            <div className="form-container">
                <h1>{selectedContact ? 'Edit Contact' : 'Add New Contact'}</h1>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={validationErrors.name ? 'error' : ''}
                            placeholder="Enter full name"
                        />
                        {validationErrors.name && (
                            <span className="field-error">{validationErrors.name}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={validationErrors.email ? 'error' : ''}
                            placeholder="Enter email address"
                        />
                        {validationErrors.email && (
                            <span className="field-error">{validationErrors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={validationErrors.phone ? 'error' : ''}
                            placeholder="Enter phone number"
                        />
                        {validationErrors.phone && (
                            <span className="field-error">{validationErrors.phone}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address *</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={validationErrors.address ? 'error' : ''}
                            placeholder="Enter address"
                        />
                        {validationErrors.address && (
                            <span className="field-error">{validationErrors.address}</span>
                        )}
                    </div>

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="save-btn"
                        >
                            {loading ? 'Saving...' : (selectedContact ? 'Update Contact' : 'Save Contact')}
                        </button>
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            className="cancel-btn"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContact;
