const { MongoClient, ServerApiVersion } = require('mongodb')

const uri =
  'mongodb+srv://MySelf:000209@my-project.tt3bn1n.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

export default client