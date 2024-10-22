import { Router } from "express";
import { bios } from "../data/bios.js";


const biosRouter = Router();

biosRouter.get("/", (req, res) => {
    res.json(bios);
    
});

// added next as 3rd param to catch errors in middleware
// get  by id method
biosRouter.get("/:id", (req, res, next) => {
    console.log(req.params);

    const bio = bios.find(bio => bio.id == req.params.id);
    if(bio) {
        res.json(bio)
    } else {
        next(error(404, "No Rescue coming!!"));

    }
    
});

// ==== Post method 

biosRouter.post("/", (req, res) => {
    console.log(req.body);
    
    if (req.body.heroId && req.body.title && req.body.content){
        if(bios.find((b) => b.heroId == req.body.heroId)){
            res.json({ error: "Hero already Identified"});
        }
        
        const bio = {
            id: bios[bios.length -1].id + 1,
            heroId: req.body.heroId,
            title: req.body.title,
            content: req.body.content,
        };
        
        bios.push(bio);
        res.json(bios[bios.length-1]);
    }
    

});

// Patch method

biosRouter.patch('/:id', (req, res, next) => {
    console.log(req.params);

    const bio = bios.find((b, i) => {
        if(b.id == req.params.id) {
            for (const key in req.body) {
                bios[i][key] = req.body[key];
            }
            return true;
        }
    });
    
    if (bio) res.json(bio);
    else next();
    
});

// Delete method  by id
biosRouter.delete('/:id', (req, res) => {
    console.log(req.params);
    const bio = bios.find((b, i) =>{
        if (b.id == req.params.id) {
            bios.splice(i,1);
            return true;
        }
    });
    
    if (bio) res.json(bio);
    else next();
});





export default biosRouter;