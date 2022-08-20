import express from 'express'
import { generateUploadURL } from './s3.js'

const app = express()

app.use(express.static('front'))

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.listen(5500, () => console.log("listening on port 5500"))