import React from 'react'
import { Segment, Grid, Header, Image } from 'semantic-ui-react'
import src from '../../assets/profile-lg.png'
import Gallery from 'react-grid-gallery';

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

  // let imgList = images ?
  //   <Grid stackable doubling columns={3} style={{marginTop: '0em'}}>
  //     {Object.keys(images).map(key =>
  //       <Grid.Column key={key} >
  //         <Image src={images[key]} fluid
  //       />
  //       <div style={{position: 'absolute', bottom: 0, width: '100%', height: 'auto'}}>TEST</div>
  //       </Grid.Column>
  //     )}
  //     </Grid>
  //   : <p> no image yet</p>

  return (
    <Grid.Row style={{margin: '3em 0em'}}>
      <Grid.Column >
          <Segment basic clearing>
              <Header as="h1" dividing>Course Gallery</Header>
               <Gallery images={imgList} enableImageSelection={false} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
  )
}
export default CourseGallery;
