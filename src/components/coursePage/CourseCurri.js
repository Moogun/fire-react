import React from 'react'
import { Segment, Button, Header, Icon, Container, Grid } from 'semantic-ui-react'
import * as style from '../../style/inline'

const CourseCurri = ({sections, handleSecToggle}) => {

  console.log('c edit curri', sections);
  let sectionList = !!sections && sections.map((s, secIndex) =>
    <React.Fragment>
      <Segment.Group data-id={secIndex} key={secIndex}>
        <Segment>
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
        {/* <Icon name='plus'/> Section {secIndex + 1} {s.title}  */}
      </Segment>
{/* icon={s.content == undefined ? 'plus' : s.expanded ? 'minus' : 'plus'} */}
      {!!s.content && s.expanded && s.content.map((c, lecIndex) =>
        <Segment key={lecIndex}> <Icon color='teal' name='circle' /> {lecIndex + 1}. {c} </Segment>)}

      </Segment.Group>
    </React.Fragment>
  )

  return (
    <Grid.Row style={{margin: '3em 0em'}}>
      <Grid.Column>
        <Segment basic>
        <Header as="h1" dividing>Curriculum </Header>
          {sectionList}
        </Segment>
      </Grid.Column>
    </Grid.Row>
  )
}
export default CourseCurri;
