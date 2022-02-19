import express from 'express'

const app = express()
const port = 5000

app.get('/', (req, res, next) => {
  res.json({msg: 'Hellos Mom'})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
