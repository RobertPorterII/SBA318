import express from "express";



const app = express()
const PORT = process.env.PORT || 3600;


app.get("/", (req, res) => {
    res.send("<h1>The API has Begun!!</h1>")
})



app.listen(PORT, () => console.log(`Server is on and popping at port:${PORT}`));