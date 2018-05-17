import React from 'react'
import { Segment, Grid, Header, Image, Container } from 'semantic-ui-react'
import src from '../../assets/profile-lg.png'
import Gallery from 'react-grid-gallery';
import * as style from '../../style/inline'

const CourseGallery = ({mobile, images}) => {
  console.log('images', images )

  let imgList = []
  if (images) {
    let keys = Object.keys(images)
    keys.map(i => {
      let img = {}
      let thumbnailWidth = Number(images[i].thumbnailWidth)
      let thumbnailHeight = Number(images[i].thumbnailHeight)
      images[i].thumbnailWidth = thumbnailWidth
      images[i].thumbnailHeight = thumbnailHeight
      img = images[i]
      imgList.push(img)
    })
    console.log('imgList', imgList);
  }

  return (
    <Grid style={{paddingTop: '5em', backgroundColor: '#fafafa'}}>
      <Grid.Column>
        <Container text>
              <Header as="h3" dividing color='teal'>갤러리</Header>
              <Gallery images={imgList} enableImageSelection={false} />
          </Container>
        </Grid.Column>
      </Grid>
  )
}
export default CourseGallery;
