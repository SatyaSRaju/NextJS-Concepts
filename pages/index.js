import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  /* Refer to getStaticProps instead of using useState and useEffects */

  // const [meetupData, setMeetupData] = useState([]);

  // useEffect(() => {
  //   //Fetch Data from Setver
  //   setMeetupData(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title> Great Places </title>
        <meta
          name="description"
          content="Browse a list of Beautiful and Great Places"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://svc_us_sraju:Nityajnanam333@cluster0.nsfcz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();

  return {
    //Fetch API
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
