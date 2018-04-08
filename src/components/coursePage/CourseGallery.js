import React from 'react'
import { Segment, Grid, Header, Image } from 'semantic-ui-react'
import src from '../../assets/profile-lg.png'
const CourseGallery = ({mobile, images}) => {
  // console.log('images', images )

  let imgList = images ?
    <Grid stackable doubling columns={3} style={{marginTop: '0em'}}>
      {Object.keys(images).map(key =>
        <Grid.Column key={key} >
          <Image src={images[key]} fluid
        />
        <div style={{position: 'absolute', bottom: 0, width: '100%', height: 'auto'}}>TEST</div>
        </Grid.Column>
      )}
      </Grid>
    : <p> no image yet</p>

  return (
    <Grid.Row style={{margin: '3em 0em'}}>
      <Grid.Column >
          <Segment basic>
              <Header as="h1" dividing>Course Gallery</Header>
              {imgList}
          </Segment>
        </Grid.Column>
      </Grid.Row>
  )
}
export default CourseGallery;
