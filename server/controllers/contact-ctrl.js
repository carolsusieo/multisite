
const Contact = require('../models/contact-model')

getContacts = async (req, res) => {
    await Contact.find({}, (err, contacts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!contacts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Contact not found` })
        }
        return res.status(200).json({ success: true, data: contacts})
    }).catch(err => console.log(err))
}

createContact = (req, res) => {
    const body = req.body
    console.log("create contact ", body);
    if (!body) {
      console.log("failure no body");

        return res.status(400).json({

            success: false,
            error: 'You must provide Contact Information',
        })
    }
    const contact = new Contact(body)

    if (!contact) {
        console.log("failure ",err);
        return res.status(400).json({ success: false, error: err })
    }

    contact
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: contact._id,
                message: 'Contact created!',
            })
        })
        .catch(error => {
          console.log("failure ", error);
            return res.status(400).json({
                error,
                message: 'Contact not created!',
            })
        })
}

updateContact = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a contact to update',
        })
    }

    Contact.findOne({ _id: req.params.id }, (err, contact) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Contact not found!',
            })
        }
        contact.FirstName = body.FirstName
        contact.LastName = body.LastName
        contact.email = body.email
        contact.message = body.message
        contact
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: contact._id,
                    message: 'Contact updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Contact not updated!',
                })
            })
    })
}

deleteContact = async (req, res) => {
    await Covie.findOneAndDelete({ _id: req.params.id }, (err, contact) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!contact) {
            return res
                .status(404)
                .json({ success: false, error: `Contact not found` })
        }

        return res.status(200).json({ success: true, data: contact })
    }).catch(err => console.log(err))
}

getContactById = async (req, res) => {
    await Contact.findOne({ _id: req.params.id }, (err, contact) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!contact) {
            return res
                .status(404)
                .json({ success: false, error: `Contact not found` })
        }
        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}



module.exports = {
    getContacts,getContactById,updateContact,deleteContact,createContact
}
