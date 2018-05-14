import React from 'react'
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';
import { Segment, Grid, Header, Image, Button, Container, Divider} from 'semantic-ui-react'

const TeacherIntro = () => {
  return (
    <div>
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
          <br/>
          <br/>
          <Divider />

          <Button fluid primary as={Link} to={routes.CREATE}>Create New Course</Button>
        </Container>
      </Segment>
    </div>
  );
}

export default TeacherIntro
