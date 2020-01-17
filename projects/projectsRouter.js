const express = require('express');

const router = express.Router();

const projectHub = require('../data/helpers/projectModel');
//ok
router.post('/', (req, res) => {
    if(req.body.name === '' || req.body.description === ''){
        return res.status(400).json({message: 'please include name and description'})
    }
    projectHub.insert(req.body)
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(err => {
        res.status(500).json({message: 'error adding project'})
    })
})
//ok
router.get('/', (req, res) => {
    projectHub.get()
    .then(projs => {
        res.status(200).json(projs)
    })
    .catch(err => {
        res.status(500).json({message: 'error loading projects'})
    })
})
//ok
router.get('/:id', (req, res) => {
    projectHub.getProjectActions(req.params.id)
    .then(proj => {
        if(proj.length === 0){
            return res.status(404).json({message: 'could not find project'})
        }
        res.status(200).json(proj)
    })
    .catch(err => {
        res.status(500).json({message: 'error loading project'})
    })
})
//ok
router.put('/:id', (req, res) => {
    if(req.body.name === '' || req.body.description === ''){
        return res.status(400).json({message: 'please include a name and description'})
    }
    projectHub.update(req.params.id, req.body)
    .then(proj => {
        if(proj === null){
            res.status(404).json({message: 'could not find project'})
        }else{
            res.status(200).json(proj)
        }
    })
    .catch(err => {
        res.sendStatus(500).json({message: 'error updating project'})
    })
})
//ok
router.delete('/:id', (req, res) => {
    projectHub.remove(req.params.id)
    .then(proj => {
        if(proj === 0){
            res.status(404).json({message: 'could not find project'})
        }else{
            res.status(200).json({message: 'project deleted'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error deleting project'})
    })
})

module.exports = router;