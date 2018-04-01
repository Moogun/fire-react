import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider } from 'semantic-ui-react'
import {db} from '../../firebase';

const CEditMetaBorder = {borderRadius: '0px'}

class CEditFeatures extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Segment style={CEditMetaBorder}>
        <Header as='h2'>Features</Header>
        <Divider />
        {/* <Form onSubmit={submit}>
          form field
         <Button>Save</Button>
        </Form> */}
      </Segment>
    );
  }
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

export default CEditFeatures
