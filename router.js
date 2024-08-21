const express = require('express')
const router = express.Router()
const Contact = require('./modules/contact')

router.get('/api/persons', (_req, res, next) => {
    Contact.find({}).then(contacts => {
      res.json(contacts)
    }).catch(e => next(e))
  })
  
  router.get('/api/persons/:id', (req, res, next) => {
    const id = String(req.params.id)
    Contact.findById(id).then((contact) => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    }).catch(e => next(e))
  })
  
  router.delete('/api/persons/:id', (req, res, next) => {
    const id = String(req.params.id)
    Contact.findByIdAndDelete(id)
           .then(() => res.status(204).end())
           .catch(e => next(e))
  })
  
  router.put('/api/persons/:id', (req, res, next) => {
    const id = String(req.params.id)
    const newContact = req.body
    Contact.findByIdAndUpdate(id, newContact, { new: true,  runValidators: true, context: 'query' })
           .then(result => res.json(result))
           .catch(e => next(e))
  })
  
  router.post('/api/persons', (req, res, next) => {
    const content = req.body
    Contact.find({ name: content.name }).then(result => {
      let unique = true
      if (result.length > 0) {
        unique = false
      }
      if (content.name === '' || content.number === '') {
        res.status(400).json({ error: 'Missing name or number' })
      } else if (!unique) {
        res.status(400).json({ error: 'Name must be unique' })
      } else { 
        const contact = new Contact({
          name:content.name,
          number:content.number
        })
        contact.save()
               .then(() =>res.status(201).json(contact))
               .catch(e => {
          console.log('caught here')
          next(e)
        })
      }
    })//.catch(e => next(e))
  })
  
  router.get('/api/info', (_req, res, next) => {
    Contact.find({}).then(contacts => {
      res.end('The phonebook has info for ' + contacts.length + ' people'+ '\n\n' + new Date())
    }).catch(e => next(e))
  })
  
  router.delete('api/persons', async (req, res) => {
    await Contact.deleteMany({})
    res.status(204)
  })
  
module.exports = router