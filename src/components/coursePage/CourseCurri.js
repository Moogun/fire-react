import React from 'react'
import { Segment, Button, Header, Icon, Container, Grid } from 'semantic-ui-react'
import * as style from '../../style/inline'

const CourseCurri = ({sections, handleSecToggle}) => {

  console.log('c edit curri', sections);
  let sectionList = !!sections && sections.map((s, secIndex) =>
    <React.Fragment key={secIndex}>
      <Segment.Group data-id={secIndex} key={secIndex}>
        <Segment textAlign='left'>
          <Header as='h6'>
            {s.content == undefined ? <Icon  color='grey' name='circle thin' />
            : s.expanded === false ? <Icon  color='teal' name='plus' onClick={(e) => handleSecToggle(e, secIndex)}/>
            : <Icon  color='teal' name='minus' onClick={(e) => handleSecToggle(e, secIndex)}/>}

            <Header.Content>
              Section {secIndex + 1}
              <Header.Subheader>
                {s.title}
              </Header.Subheader>
            </Header.Content>
          </Header>
      </Segment>

      {!!s.content && s.expanded && s.content.map((c, lecIndex) =>
        <Segment textAlign='left' key={lecIndex}>
          <Icon color='teal' name='circle' /> {lecIndex + 1}. {c['lectureTitle']}

          {c.quizTitle ? <Icon style={{marginLeft: '1rem'}} link name='file text outline' /> : null}
        </Segment>)}

      </Segment.Group>
    </React.Fragment>
  )

  return (
    <Grid.Row style={{margin: '3em 0em'}}>
      <Grid.Column>
        <Segment basic style={style.COURSE_PAGE_BODY_SECTION}>
        <Header as="h1" dividing>Curriculum </Header>
          {sectionList}
        </Segment>
      </Grid.Column>
    </Grid.Row>
  )
}
export default CourseCurri;


const repeatstr = (ch, n) => {
  var result = "";

  while (n-- > 0)
    result += ch;

  return result;
}
