const pets = require('./petList');
const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send(`
    <h1>Adopt a Pet!</h1>
    <p>Browse through the links below to find your new furry friend:</p>
    <ul>
    <li><a href="/animals/dogs">Dogs</a></li>
    <li><a href="/animals/cats">Cats</a></li>
    <li><a href="/animals/rabbits">Rabbits</a></li>
    </ul>
    `);
})

app.get('/animals/:pet_type', (req, res) => {
    const petType = req.params.pet_type;
    const petList = pets[petType];

    
    if (!petList) {
        return res.status(400).send("Pet type is not valid");
    }
    
    const petNames = petList.map((pet, index) =>  `<li><a href="/animals/${petType}/${index}">${pet.name}</a></li>` ).join("");
    
    console.log(petNames);

    res.send(`
    <h1>List of ${petType}</h1>
    <ul>
    ${petNames}
    </ul>
    `)


})

app.get('/animals/:pet_type/:pet_id', (req, res) => {
    const petType = req.params.pet_type;
    const petId = req.params.pet_id;
    const pet = pets[petType][petId];


    if (!pet) {
        return res.status(400).send("This pet doesn't exist");
    }

    res.send(`
    <h1>${pet.name}</h1>
    <img src="${pet.url}" alt="${pet.name}">
    <p>${pet.description}</p>
    <ul>
    <li>Age: ${pet.age}</li>
    <li>Breed: ${pet.breed}</li>
    </ul>
    `)

})


app.listen(port, () => { console.log(`Listening on port http://localhost:${port}`) });
