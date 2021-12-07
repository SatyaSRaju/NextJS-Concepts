import Head from "next/head";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  async function addMeetupHandler(newMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetupData),
      headers: {
        "conternt-type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Inserted Data ->", data);
  }
  return (
    <Fragment>
      <Head>
        <title> Add a New Place</title>
        <meta name="description" content="Share a Great place that you like" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
