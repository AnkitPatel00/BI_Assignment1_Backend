const { initializeDatabase } = require('./db/db.connect')
initializeDatabase()
const Meetup = require('./model/meetup.model')
const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')

const corsOptions = {
  origin:"*",
  credentials: true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions))

app.get("/", (req,res) => {
  res.send("Hello MeetUp Server")
})

async function createMeetup(data)
{
  try {
    const meetup = new Meetup(data)
    const meetupSave = await meetup.save()
    return meetupSave
  }
  catch(error)
  {
throw error
  }
}

// Add meetups Start -------

app.post('/meetups',async (req,res) => {
 
  try {
    const meetup =await createMeetup(req.body)
    if (meetup)
    {
      res.status(201).json({message:'meetup added successfully',meetup:meetup})
    }

  }
  catch (error)
  {
res.status(500).json({error:'cant fetch meetups'})
  }
  
})

// Add meetups End -------


// Get meetups Start -------

async function readAllMeetups()
{
  try {
    const meetups = await Meetup.find()
return meetups
  }
  catch (error)
  {
    throw error
  }
}

app.get('/meetups',async (req,res) => {
  try {
    const meetups =await readAllMeetups()
    if (meetups)
    {
      res.json(meetups)
    }
    else
    {
      res.status(404).json({error:'meetup not found'})
      }
  }
  catch
  {
    res.status(500).json({error:'cant fetch meetups'})
  }
})

// Get meetups End -------



// Get meetups by event Type Start -------

async function findByEventType(eventType)
{
  try {
    const meetups =await Meetup.find({ eventType: eventType })
    return meetups
  }
  catch(error)
  {
throw error
  }
}

app.get('/meetups/eventType/:eventTypeName',async (req, res) => {
  try {
    const meetups =await findByEventType(req.params.eventTypeName)
    if (meetups)
    {
      res.json(meetups)
    }
    else {
      res.status(404).json({error:"meetups not found"})
    }
  }
  catch
  {
    res.status(500).json({error:"cant fetch meetups"})
  }
})

// Get meetups by event Type End -------

//Get meetups by event Id Start -------

async function eventById(eventId)
{
  try {
    const event =await Meetup.findById(eventId)
    return event
  }
  catch(error) {
    throw error
  }
}

app.get('/meetups/:meetupId',async (req, res) =>
{
  try {
    const meetup = await eventById(req.params.meetupId)
    if (meetup)
    {
      res.json(meetup)
    }
    else {
      res.status(404).json({error:'meetup not found'})
    }
  }
  catch (error)
  {
res.status(500).json({error:'cant fetch meetups'})
  }
})

//Get meetups by event Id End -------

//Get meetups by event tags Start -------

async function readEventByTags(eventTag)
{
  try {
    const events =await Meetup.find({ eventTags: eventTag })
    return events
  }
  catch (error)
  {
    throw error
  }
}

app.get('/meetups/tags/:tagName',async (req, res) =>
{
  try {
    const meetups =await readEventByTags(req.params.tagName)
    if (meetups)
    {
      res.json(meetups)
    }
    else
    {
      res.status(404).json({error:'event not found'})
      }
  }
  catch (error)
  {
    res.status(500).json({error:'cant fetch events'})
  }
})

//Get meetups by event tags End -------

const PORT =3000
app.listen(PORT, () => {
  console.log(`Server is Runnig on port ${PORT}`)
})

