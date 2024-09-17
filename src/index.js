const express = require('express')
const {v4: uuidv4} = require('uuid')

const app = express()
app.use(express.json())

//Irá simular nosso BD
const projects = []

//Criação do middleware
function logRouters(request, response, next){
    const {method, url} = request
    const route = `[${method.toUpperCase()}] ${url}`
    console.log(route)
    return next()
}

//app.use(logRouters)

app.get('/projects', function(request, response){
    return response.json(projects)
})

app.post('/projects', logRouters ,function(request, response){
    const {name , owner} = request.body
    const project = {
        id: uuidv4(),
        name,
        owner
    }
    //coloco no array o objeto projeto que acabou de ser criado
    projects.push(project)
    return response.status(201).json(project)
})

app.put('/projects/:id', (req, res)=>{
    const {id} = req.params
    const {name, owner} = req.body

    const projectIndex = projects.findIndex(p => p.id === id)

    if(projectIndex < 0){
        return res.status(404).json({ erro: 'Project not found' })
    }
    //bad request (ficou faltando na request a pesoa passar o nome e o proprietario)
    if(!name || !owner){
        return res.status(400).json({ error: 'Name and owner are required'})
    }

    const project = {
        id,
        name,
        owner
    }
    projects[projectIndex] = project

    console.log(id, name)

    return res.json(project)
})

app.delete('/projects/:id', (req, res) => {
    const {id} = req.params
    const projectIndex = projects.findIndex(p => p.id === id)

    if(projectIndex < 0){
        return res.status(404).json({ error: 'Project not found'})
    }

    projects.slice(projectIndex, 1)

    return res.status(204).send()
})

app.listen(3000, () => {
    console.log('Server started on port 3000!')
})  