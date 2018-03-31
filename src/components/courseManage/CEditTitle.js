import React, {Component} from 'react'
import profile from '../../assets/profile-lg.png'
import { Container,Image, Item, } from 'semantic-ui-react'

class CEditTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const {title, teacherName, isPublished} = this.props
    let published = isPublished ? 'published' : 'draft'
    return (
      <Container>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src={profile} />

            <Item.Content>
              <Item.Header as='a'>{title}</Item.Header>
              <Item.Meta> {teacherName} </Item.Meta>
              <Item.Extra>{published}</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Container>
    );
  }
}

export default CEditTitle
