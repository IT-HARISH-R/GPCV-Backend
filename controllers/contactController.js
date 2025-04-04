import Contact from '../models/contactModel.js';

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Public or Protected based on use case
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contact messages', error: error.message });
    }
};

// @desc    Create new contact message
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create contact message', error: error.message });
    }
};

// @desc    Get a contact message by ID
// @route   GET /api/contacts/:id
// @access  Public or Protected based on use case
export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact message not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contact message', error: error.message });
    }
};

// @desc    Delete a contact message by ID
// @route   DELETE /api/contacts/:id
// @access  Protected
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact message not found' });
        }
        res.status(200).json({ message: 'Contact message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete contact message', error: error.message });
    }
};
