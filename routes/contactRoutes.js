import express from 'express';
import {
    getAllContacts,
    createContact,
    getContactById,
    deleteContact
} from '../controllers/contactController.js';

const contactRoutes = express.Router();

// @route   GET /api/contacts
// @desc    Get all contact messages
// @access  Public or Protected based on use case
contactRoutes.get('/inquirie', getAllContacts);

// @route   POST /api/contacts
// @desc    Create new contact message
// @access  Public
contactRoutes.post('/inquirie', createContact);

// @route   GET /api/contacts/:id
// @desc    Get a contact message by ID
// @access  Public or Protected based on use case
contactRoutes.get('/inquirie/:id', getContactById);

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact message by ID
// @access  Protected
contactRoutes.delete('/inquirie/:id', deleteContact);

export default contactRoutes;
