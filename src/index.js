const express = require('express')

const app = express()

app.get('/projects', function(request, response){
    const {title, owner, page} = request.query
    console.log(title, owner, page)
    return response.json([
        'Projeto 1',
        'Projeto 2'
    ])
})

app.post('/projects', function(request, response){
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.put('/projects/:id/:name', (req, res)=>{
    const {id, name} = req.params
    console.log(id, name)
    return res.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.delete('/projects/:id', (req, res) => {
    return res.json([
        'Projeto 2',
        'Projeto 3'
    ]) 
})

app.listen(3000, () => {
    console.log('Server started on port 3000!')
})  