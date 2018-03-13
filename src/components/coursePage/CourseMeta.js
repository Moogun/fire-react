import React from 'react'
import { Segment, Container, List, Header, Grid, Image, Button } from 'semantic-ui-react'

const CourseMeta = ({mobile}) => {

  return (
    <div>
      <Segment basic inverted color='green' vertical
        // style={{ padding: '0.5em 0em' }}
        >
         <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={2}>
              </Grid.Column>
              <Grid.Column width={10}>
                  <Header
                    as='h3'
                    content='h3, 2em Create a Photo Sharing iOS app with'
                    inverted
                    style={{
                      fontSize: '2em',
                      // fontSize: mobile ? '2em' : '2em',
                      fontWeight: 'normal',
                      // marginBottom: '0.5em',
                      marginTop: '0.5em',
                      //marginTop: mobile ? '1.5em' : '3em',
                    }}
                  />
                  <p style={{fontSize: '1.33em', marginBottom: '0.5em'}}> p 1.33 em An advanced course from intermediate to expert</p>
                  {/* <p style={{ fontSize: '1.33em' }}>
                    Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
                  </p> */}
                  {/* <List as='ul'>
                   <List.Item as='li'>date </List.Item>
                   <List.Item as='li'>time </List.Item>
                   <List.Item as='li'> textbook </List.Item>
                   <List.Item as='li'> location</List.Item>
                   <List.Item as='li'> phone / email </List.Item>
                 </List> */}
               </Grid.Column>
               <Grid.Column width={4}>

               </Grid.Column>
            </Grid.Row>
          </Grid>
      </Segment>
    </div>
  )
}
export default CourseMeta;
