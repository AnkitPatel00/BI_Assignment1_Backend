const mongoose = require('mongoose')

const meetupSchema =new mongoose.Schema(
  {
    title: { type: String, require: true },
    hostedBy: { type: String },
    thumbnailUrl:{type: String},
    eventType: { type: String, enum: ["Online", "Offline"] },
    eventStartDate: { type: String },
    eventEndDate: { type: String },
       location: { type: String },
       price: { type: Number },
       speaker: [{ speakerImg: { type: String }, name: { type: String }, position: { type: String } }],
       details: { type: String },
       dresscode: { type: String },
       ageRestriction: { type: String },
      eventTags:[{type:String}]
    
  },{timestamps:true}
)

const Meetup = mongoose.model('meetUpApp', meetupSchema)

module.exports = Meetup