import express from "express";



const app = express()
const PORT = process.env.PORT || 3600;

let heroes = [
    {id:1, name: "Batman", skill: "recon"},
    {id:2, name: "Superman", skill: "flight"},
    {id:3, name: "Flash", skill: "speed"},
];

// === Get 
app.get("/", (req, res) => {
    // res.send("<h1>The API has Begun!!</h1>") ===here for testing
    res.json(heroes);
})

// === Get by id

app.get("/:id", (req, res, next) => {
    const hero = heroes.find(hero => hero.id == req.params.id);
    if (hero) {
        res.json(hero)
        
    } else {
        next(error(404, "No Rescue Coming"));
    }
});



app.listen(PORT, () => console.log(`Server is on and popping at port:${PORT}`));