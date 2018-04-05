import React, {Component} from 'react'
import { Segment, Container, Button, Header, Icon, Menu, Divider, Image, Form, Input } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import {db} from '../../firebase';
// const Photo = ({photo}) => {
//   return (
//       <Segment basic>
//         <Header as='h2'>Photo</Header>
//         <Divider />
//
//         <Form onSubmit>
//           <Image src={photo} circular centered size='small'/>
//           <br/>
//           <Form.Field>
//             <Input type='file' placeholder='upload new file'/>
//           </Form.Field>
//           <Button type='submit'>Save</Button>
//         </Form>
//       </Segment>
//   );
// }

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleChange = (e, {value}) => {
    console.log('value', e.target.files[0]);
    let profileImg = e.target.files[0]
    // db.doProfileImgUpload(profileImg)
    //   .then(res => console.log('res', res))

  }

  render() {
    const { photo } = this.props
    return (
      <Segment basic>
        <Header as='h2'>Photo</Header>
        <Divider />

        <Form>
          <Image src={photo} circular centered size='small'/>
          <br/>
          <Form.Field>
            <Input type='file' placeholder='upload new file' onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>Save</Button>
        </Form>
      </Segment>
    );
  }
}

export default Photo
