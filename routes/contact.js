

// require express
const express = require('express');

// express router
const router = express.Router();

// require model contact
const Contact = require('../models/Contact')

// require controllers


//////////////// Route

// 

/**
 * @desc : testing route
 * @path : http://localhost:7000/api/contacts/test
 * @method : GET 
 * @data : no data
 * @access : public/private
 */
router.get('/test', (req, res) => {
    res.send('hello world')
})

/**
 * @desc : add contact
 * @path : http://localhost:7000/api/contacts/
 * @method : POST
 * @data : req.body
 * @access : public/private
 */

router.post('/', async (req, res) => {

    try {
        const { name, email, phone } = req.body

        // handling errors : name and email required 
        if (!name || !email){
            res.status(400).send({msg : 'Name & email are required !!!'})
            return
        }

        // handling errors : email is unique
        const contact = await Contact.findOne({ eamil})
        if (contact) {
            res.status(400).send({ msg : 'Contact already exist !!'})
            return
        }
            const newContact = new Contact({
                name,
                email,
                phone
            })
        await newContact.save()
        res.status(200).send({ msg : 'Conntact added successfuly ...', contact: newContact })
        } catch (error) {
            res.status(400).send({ msg : 'Can not add Contact !!!', error })
        }
})

/**
 * @desc : get all contact
 * @path : http://localhost:7000/api/contacts/
 * @method : GET
 * @data : no data
 * @access : public/private
 */
router.get('/', async (req, res) => {
    try {
        const listContacts = await Contact.find()
        res.status(200).send({msg : 'This is the list of all contacts ...', listContacts})
    } catch (error) {
        res.status(400).send({msg: 'Can not get all contacts !!!', error})
    }
})

/**
 * @desc : get contact
 * @path : http://localhost:7000/api/contacts/
 * @method : GET
 * @data : req.params.id
 * @access : public/private
 */
router.get('/:id', async (req, res) => {
    try {
        const contactToGet = await Contact.findOne({_id : req.params.id })
        res.status(200).send({ msg : 'I get the contact ..', contactToGet})
    } catch (error) {
        res.status(400).send({ msg : 'Can not get contact with this id !!', error })

    }
})

/**
 * @desc : delete contact
 * @path : http://localhost:7000/api/contacts/
 * @method : DELETE
 * @data : req.params._id
 * @access : public/private
 */
router.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await Contact.findOneAndDelete({ _id })
        res.status(200).send({ msg : 'Contact deleted ...'})
    } catch (error) {
        res.status(400).send({ msg : 'Can not delete contact with this id !!!', error})
    }
})

/**
 * @desc : edit contact
 * @path : http://localhost:7000/api/contacts/
 * @method : PUT
 * @data : req.params._id & req.body
 * @access : public/private
 */
router.put('/:_id', async (req, res) => {
    try {

        const { _id } = req.params
        
        const result = await Contact.updateOne({ _id }, {$set: {...req.body}})
        if (!result.nModified) {
            res.status(400).send({ msg : 'Contact already updated !!!'})
        }
        res.status(200).send({msg : 'Contact updated ...'})

    } catch (error) {
        res.status(400).send({ msg : 'Can not update contact with this id !!!', error})

    }
})


module.exports =  router