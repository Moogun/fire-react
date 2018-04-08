import React from 'react'
import { Segment, Grid, Header, Image } from 'semantic-ui-react'
import src from '../../assets/profile-lg.png'
const CourseGallery = ({mobile, images}) => {
  console.log('images', images )

  let imgList = images ?
    <Image.Group size='medium'>
      {Object.keys(images).map(key =>
        <Image key={key} >
          <Image src={images[key]} />
        </Image>
      )}
      </Image.Group>
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
