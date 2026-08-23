import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("Test Route")
})


export default app
