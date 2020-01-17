const express = require('express');

const router = express.Router();

const projectHub = require('../data/helpers/projectModel');

router.post('/', (req, res) => {
    if(req.body.name === '' || req.body.description === ''){
        res.status(400).json({message: 'please include name and description'})
    }
    projectHub.insert(req.body)
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(err => {
        res.status(500).json({message: 'error adding project'})
    })
})

router.get('/', (req, res) => {
    projectHub.get()
    .then(projs => {
        res.status(200).json(projs)
    })
    .catch(err => {
        res.status(500).json({message: 'error loading projects'})
    })
})

router.get('/:id', (req, res) => {
    projectHub.getProjectActions(req.params.id)
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(err => {
        res.status(500).json({message: 'error loading project'})
    })
})

router.put('/:id', (req, res) => {
    projectHub.update(req.params.id, req.body)
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(err => {
        res.sendStatus(500).json({message: 'error updating project'})
    })
})

router.delete('/:id', (req, res) => {
    projectHub.remove(req.params.id)
    .then(proj => {
        res.status(200).json({message: 'project deleted'})
    })
    .catch(err => {
        res.status(500).json({message: 'error deleting project'})
    })
})

module.exports = router;