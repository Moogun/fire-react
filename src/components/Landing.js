import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Grid, Header, Button, Icon, Image, Divider } from 'semantic-ui-react'
import './color.css'
import './App.css'

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
          <LandingBody />
    );
  }
}


export default Landing;

const HomepageHeading = ({ mobile }) => (
  <div className="Heading" style={{minHeight: '700px'}}>
    <Container text>
      <Header
        as='h1'
        content='Imagine-a-Company'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
          backgroundColor: 'red'
        }}
      />

      <Header
        as='h2'
        content='Do whatever you want when you want to.'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />

      <Button primary size='huge' style={{marginBottom: mobile ? '1.5em' : '3em'}}>
        Get Started
        <Icon name='right arrow' />
      </Button>

    </Container>
  </div>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

const LandingBody = () => {
  return (
      <div className='landing'>

        {/* <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>We Help Teachers and Students</Header>
              <p style={{ fontSize: '1.33em' }}>
                To be added
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>To be added </Header>
              <p style={{ fontSize: '1.33em' }}>
                To be added
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image
                bordered
                rounded
                size='large'
                // src='/assets/images/wireframe/white-image.png'
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge'>Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>"What a Company"</Header>
              <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>"I shouldn't have gone with their competitor."</Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='/assets/images/avatar/large/nan.jpg' />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment> */}
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>We Help Teachers and Students</Header>
          <p style={{ fontSize: '1.33em' }}>
            Teachers can register their courses and quizzes to engage more with their students. Only Enrolled students can access to teachers' material and ask questions.
          </p>
          {/* <Button as='a' size='large' disabled>Read More</Button> */}
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <p href='#'>Welcome</p>
          </Divider>
          <Header as='h3' style={{ fontSize: '2em' }}>We are still developing and testing to best suit teachers' needs. </Header>
          <p style={{ fontSize: '1.33em' }}>
             We will do our best to preserve your data safely, but there could be a time when we may not able to restore your data of yours. So Please have a copy of the data of yours on your computer.
          </p>
          {/* <Button as='a' size='large'>I'm Still Quite Interested</Button> */}
        </Container>
      </Segment>
      </div>
  );
}
