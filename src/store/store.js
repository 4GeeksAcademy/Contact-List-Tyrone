import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
    contacts: [],
    loading: false,
    error: null,
    selectedContact: null
};

export const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_CONTACTS: 'SET_CONTACTS',
    ADD_CONTACT: 'ADD_CONTACT',
    UPDATE_CONTACT: 'UPDATE_CONTACT',
    DELETE_CONTACT: 'DELETE_CONTACT',
    SET_SELECTED_CONTACT: 'SET_SELECTED_CONTACT',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

const contactReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, loading: action.payload };
        case ACTIONS.SET_CONTACTS:
            return { ...state, contacts: action.payload, loading: false, error: null };
        case ACTIONS.ADD_CONTACT:
            return { ...state, contacts: [...state.contacts, action.payload], loading: false, error: null };
        case ACTIONS.UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => 
                    contact.id === action.payload.id ? action.payload : contact
                ),
                selectedContact: null,
                loading: false,
                error: null
            };
        case ACTIONS.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
                loading: false,
                error: null
            };
        case ACTIONS.SET_SELECTED_CONTACT:
            return { ...state, selectedContact: action.payload };
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload, loading: false };
        case ACTIONS.CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
};

const ContactContext = createContext();

// Change this to your actual API endpoint
const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/tyronecopelandjr';

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const apiCall = async (endpoint, options = {}) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
            throw error;
        }
    };

    const actions = {
        loadContacts: async () => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            try {
                const response = await apiCall('/contacts');
                dispatch({ type: ACTIONS.SET_CONTACTS, payload: response.contacts || [] });
            } catch (error) {
                dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load contacts' });
            }
        },

         createSlug: async (slug) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            try {
                const newContact = await apiCall('API_BASE_URL', {
                    method: 'POST',
                    body: JSON.stringify( {slug: "tyronecopelandjr"})
                });
                dispatch({ type: ACTIONS.createSlug, payload: slug });
                return newContact;
            } catch (error) {
                dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to add contact' });
                throw error;
            }
        },

        addContact: async (contactData) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            try {
                const newContact = await apiCall('/contacts/', {
                    method: 'POST',
                    body: JSON.stringify(contactData)
                });
                dispatch({ type: ACTIONS.ADD_CONTACT, payload: newContact });
                return newContact;
            } catch (error) {
                dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to add contact' });
                throw error;
            }
        },

        updateContact: async (id, contactData) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            try {
                const updatedContact = await apiCall(`/contacts/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(contactData)
                });
                dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: updatedContact });
                return updatedContact;
            } catch (error) {
                dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to update contact' });
                throw error;
            }
        },

        deleteContact: async (id) => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            try {
                await apiCall(`/contacts/${id}`, {
                    method: 'DELETE'
                });
                dispatch({ type: ACTIONS.DELETE_CONTACT, payload: id });
            } catch (error) {
                dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to delete contact' });
                throw error;
            }
        },

        setSelectedContact: (contact) => {
            dispatch({ type: ACTIONS.SET_SELECTED_CONTACT, payload: contact });
        },

        clearSelectedContact: () => {
            dispatch({ type: ACTIONS.SET_SELECTED_CONTACT, payload: null });
        },

        clearError: () => {
            dispatch({ type: ACTIONS.CLEAR_ERROR });
        }
    };

    useEffect(() => {
        actions.loadContacts();
    }, []);

    const contextValue = {
        contacts: state.contacts,
        loading: state.loading,
        error: state.error,
        selectedContact: state.selectedContact,
        ...actions
    };

    return (
        <ContactContext.Provider value={contextValue}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContacts = () => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error('useContacts must be used within a ContactProvider');
    }
    return context;
};