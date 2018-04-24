import React from 'react'
import { Segment, Grid, Header, Image } from 'semantic-ui-react'
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
    <Grid.Row style={{margin: '3em 0em'}}>
      <Grid.Column >
          <Segment basic clearing style={style.COURSE_PAGE_BODY_SECTION}>
              <Header as="h1" dividing>Course Gallery</Header>
               <Gallery images={imgList} enableImageSelection={false} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
  )
}
export default CourseGallery;
