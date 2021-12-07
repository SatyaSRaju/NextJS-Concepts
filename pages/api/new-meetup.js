import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body);
      const client = await MongoClient.connect(
        "mongodb+srv://svc_us_sraju:Nityajnanam333@cluster0.nsfcz.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const result = await meetupCollection.insertOne(data);
      console.log(result);
      client.close();
      res.status(201).json({ message: "Meetup Inserted" });
    } catch (e) {
      console.log(e);
      console.log(res.status());
    }
  }
}

export default handler;
