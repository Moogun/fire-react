import React from 'react'
import { Segment, Grid, Header, Item, Image } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

const CourseTeacherSection = ({mobile}) => {

  return (
    <Grid.Row style={{margin: '3em 0em'}}>
      <Grid.Column >
        <Segment basic>

          <Header as="h1" dividing>About the instructor</Header>
          <Item.Group>
            <Item>
              <Image src={profile} size='tiny' />

              <Item.Content>
                <Item.Header as='a'>Header</Item.Header>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>
                  <Image src='/assets/images/wireframe/short-paragraph.png' />
                </Item.Description>
                <Item.Extra>Additional Details</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
                  {/*
          {/* </Grid.Column> */}
          {/* <Grid.Column width={4} textAlign='center'> */}
             {/* <Item.Group style={{color: '#fff'}}>
                <Item>
                    <Item.Content >
                      <Item.Header as='h3' content={tName} style={{color: '#fff'}}/>
                      <Item.Meta style={{color: '#fff'}}>profile</Item.Meta>
                      <Item.Extra ><Rating icon='star' defaultRating={5} maxRating={4} />
                      <p onClick={this.handleClick} style={{color: '#fff'}}> '000 reviews' </p></Item.Extra>
                    </Item.Content>
                  </Item>
            </Item.Group> */}

{/*
                                           <Header as="h3" content={tName} subheader='profile' />
                                          <Rating icon='star' defaultRating={5} maxRating={4} />
                                          <p onClick={this.handleClick}> '000 reviews' </p> */}
          {/* </Grid.Column> */}
          </Segment>

        </Grid.Column>
      </Grid.Row>
  )
}
export default CourseTeacherSection;
