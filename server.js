import express from "express";
import { Router } from "express";
import { heroes } from "./data/heroes.js";
import { error } from "./utils/error.js";
import biosRouter from "./routes/bios.js";




const app = express()
const PORT = process.env.PORT || 3600;

// setting up template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/bios', biosRouter);


// moved hero to its own folder after testing
// let heroes = [
//     {id:1, name: "Batman", skill: "recon", ability:"intelligence" },
//     {id:2, name: "Superman", skill: "flight", ability:"strength"},
//     {id:3, name: "Flash", skill: "kindness", ability:"speed"},
// ];

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

// ==== Post method 

app.post("/", (req, res) => {
    console.log(req.body);
    
    if (req.body.alias && req.body.skill && req.body.ability){
        if(heroes.find((h) => h.alias == req.body.alias)){
            res.json({ error: "Hero already on rescue mission"});
        }
        
        const hero = {
            id: heroes[heroes.length -1].id + 1,
            alias: req.body.alias,
            skill: req.body.skill,
            ability: req.body.ability,
        };
        
        heroes.push(hero);
        res.json(heroes[heroes.length-1]);
    }
    

});

// Patch method

app.patch('/:id', (req, res, next) => {
    console.log(req.params);

    const hero = heroes.find((h, i) => {
        if(h.id == req.params.id) {
            for (const key in req.body) {
                heroes[i][key] = req.body[key];
            }
            return true;
        }
    });
    
    if (hero) res.json(hero);
    else next();
    
});


// Delete method  by id
app.delete('/:id', (req, res) => {
    console.log(req.params);
    const hero = heroes.find((h, i) =>{
        if (h.id == req.params.id) {
            heroes.splice(i,1);
            return true;
        }
    });
    
    if (hero) res.json(hero);
    else next();
});





app.listen(PORT, () => console.log(`Server is on and popping at port:${PORT}`));