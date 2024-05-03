import { Types } from "mongoose";
import { asyncCatch } from "../helpers/asyncCatch.js";
import { Contacts } from "../models/userModel.js";



export const getAllContacts = asyncCatch (async (req, res) => {
        const list = await Contacts.find();
        res.status(200).json(list); 
});

export const getOneContact = asyncCatch(async (req, res, next) => {
        const getOne = await req.user;
        res.json(getOne).status(200);
    });


export const deleteContact = asyncCatch (async (req, res) => {
        const deleteContact = await Contacts.findByIdAndDelete(req.params.id);
        res.json(deleteContact).status(200);
});


export const createContact = asyncCatch (async (req, res) => {
    const newUser = await Contacts.create(req.body);
    if(!newUser) {
        return res.status(400).json({ message: 'Contact not created' });
    }
    res.status(201).json(newUser);

});


export const updateContact = asyncCatch(async (req, res, next) => {
    const update = await Contacts.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(update).status(200);
});


export const updateStatus = asyncCatch(async (req, res, next) => {
    const { id } = req.params;  
    const update = await Contacts.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(update);
}); 