import React from 'react'
import { Segment, Button, Header, Icon, Container, Grid } from 'semantic-ui-react'
import * as style from '../../style/inline'

const CourseCurri = ({sections, handleSecToggle, takeQuiz}) => {

  console.log('c edit curri', sections);
  let sectionList = !!sections && sections.map((s, secIndex) =>
    <React.Fragment key={secIndex}>
      {/* <Segment.Group data-id={secIndex} key={secIndex}> */}
        <Segment textAlign='left' vertical data-id={secIndex} key={secIndex}>
          <Header as='h6'>
            {s.content == undefined ? <Icon  color='grey' name='circle thin' />
            : s.expanded === false ? <Icon name='plus' onClick={(e) => handleSecToggle(e, secIndex)} style={{color: '#2c3e50'}}/>
            : <Icon name='minus' onClick={(e) => handleSecToggle(e, secIndex)}/>}

            <Header.Content>
              Section {secIndex + 1}
              <Header.Subheader>
                {s.title}
              </Header.Subheader>
            </Header.Content>
          </Header>
      </Segment>

      {!!s.content && s.expanded && s.content.map((l, lecIndex) =>
        <Segment textAlign='left' key={lecIndex}>
          <Icon name='circle' /> {lecIndex + 1}. {l['lectureTitle']}

          {l.quiz ? <Icon disabled style={{marginLeft: '1rem', color: '#2c3e50'}} link name='ordered list' onClick={(e) => takeQuiz(e, s, secIndex, l, lecIndex)}/> : null}
        </Segment>)}

      {/* </Segment.Group> */}
    </React.Fragment>
  )

  return (
    <Grid style={{padding: '5rem 0rem'}}>
      <Grid.Column>
        <Container text>
        <Header as="h3" dividing color='teal'>커리큘럼 </Header>
          {sectionList}
        </Container>
      </Grid.Column>
    </Grid>
  )
}
export default CourseCurri;
