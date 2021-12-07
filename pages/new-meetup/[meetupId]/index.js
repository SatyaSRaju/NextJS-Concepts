import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../../components/meetups/MeetupDetail";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title> {props.meetupData.title} </title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  console.log("Executing getStaticPaths");
  const client = await MongoClient.connect(
    "mongodb+srv:/<userName>:<password>@cluster0.nsfcz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  console.log("getStaticPaths ->", meetups);
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),

    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  console.log("Executing getStaticProps");
  const meetupId = context.params.meetupId;
  console.log("Selected MeetupId", meetupId);
  const client = await MongoClient.connect(
   "mongodb+srv:/<userName>:<password>@cluster0.nsfcz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log("The Selected Meetup Data -> ", selectedMeetup);
  client.close();

  return {
    //Fetch Data for a single Meetup
    //Retrieve Pramas

    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;
