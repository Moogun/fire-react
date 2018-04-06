import React from 'react'
import { Segment, Button, Header, Divider, Form, Input } from 'semantic-ui-react'

const Danger = () => {
  return (
    <Segment basic>
      <Header as='h2'>Danger</Header>
      <Divider />

      <p>Delete Your Account</p>
      <p>We are working on this feature. Please contact us for this feature. Sorry for the inconvenience</p>
      {/* <p>We're sorry to see you go. If you are currently the owner or an active instructor of a course, please delete your course first before deleting your account. Click here for directions.</p> */}

    </Segment>
  );
}

export default Danger
