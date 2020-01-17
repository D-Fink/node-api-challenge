const express = require('express');

const router = express.Router();

const actionsHub = require('../data/helpers/actionModel.js');

router.post('/', (req, res) => {
    if(req.body.description === '' || req.body.notes === ''){
        return res.status(400).json({message: 'please include a description and notes'})
    }
    actionsHub.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({message: 'error adding action'})
    })
})

router.get('/', (req, res) => {
    actionsHub.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({message: 'error loading actions'})
    })
})

router.put('/:id', (req, res) => {
    if(req.body.description === '' || req.body.notes === ''){
        return res.status(400).json({message: 'please include description and notes'})
    }
    actionsHub.update(req.params.id, req.body)
    .then(action => {
        if(action === null){
            return res.status(404).json({message: 'action was not found'})
        }else{
            res.status(200).json(action)
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error updating action'})
    })
})

router.delete('/:id', (req, res) => {
    actionsHub.remove(req.params.id)
    .then(action => {
        if(action < 0){
            return res.status(404).json({message: 'could not find action'})
        }else{
            res.status(200).json({message: 'action was deleted'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error deleting action'})
    })
})

module.exports = router;