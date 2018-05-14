import React from 'react'
import { Segment, Button, Form, Confirm, Header, Icon, List } from 'semantic-ui-react'
import * as style from '../../../constants/styles'
import '../../App.css';

const CEditMetaBorder = {borderRadius: '0px'}

class CEditCurri extends React.Component {

  arraysEqual = (a,b) => {
    return JSON.stringify(a)===  JSON.stringify(b);
  }

  render() {

    const {sections, formForSection, activeSection,
      sectionTitle, sectionToEdit,
      lectureTitle, lectureToEdit,

      handleSectionTitleChange,
      handleSectionTitleChangeCancel,
      handleRemoveSection,

      showRemoveConfirm ,
      removeSectionConfirm,
      handleConfirmRemove,
      handleCancelRemove,

      handleOpenAddLectureForm,
      handleAddLectureCancel,
      handleSaveLecture,
      handleRemoveLecture,

      handleLectureTitleChange,
      handleLectureTitleChangeCancel,

      handleInlineSectionEdit,
      handleSaveSectionTitleEdit,

      handleInlineLectureEdit,
      handleSaveLectureTitleEdit,

      handleSecMoveUp,
      handleSecMoveDown,
      handleLecMoveUp,
      handleLecMoveDown,

      handleLecToggle,

      handleSecToggle,

      //add section
      //formForSection
      isInvalidSection,
      handleOpenAddSectionForm,
      handleAddSectionCancel,
      handleSaveSection,
      // handleSectionTitleChange,
      onCurriSubmit,
      // course,
      curriToSave,

      handleAttachQuiz,

    } = this.props

    const isInvalidLecture = lectureTitle === ''
    const isInvalid = curriToSave === false

    console.log('c edit curri', sections, 'curri', sections);
    let sectionList = !!sections && sections.map((s, secIndex) =>
      <Segment.Group
        data-id={secIndex}
        key={secIndex}
        style={style.C_EDIT_CURRI_SECTION}
        >
          <Segment color='red' style={style.C_EDIT_CURRI_ITEM}>
            {sectionToEdit === secIndex ?
              <input value={sectionTitle} placeholder='Section' type='text' onChange={handleSectionTitleChange} />
              : `Section ${secIndex + 1} ${s.title}`}

            {sectionToEdit === secIndex
              ? <Button.Group size='mini' basic style={{marginLeft: '1rem',}}>
                  <Button icon='save' onClick={(e) => handleSaveSectionTitleEdit(e, secIndex)} />
                  <Button icon='cancel'
                     onClick={handleSectionTitleChangeCancel}
                     // onClick={() => this.setState ({ sectionToEdit: null})}
                   />
                </Button.Group>
                :
                <React.Fragment>
                  <Button.Group size='mini' style={{marginLeft: '1rem'}}>
                    <Button icon='pencil' disabled basic inverted />
                  </Button.Group>

                  <Button.Group floated='right' size='mini' basic style={{marginLeft: '1rem'}}>
                    <Button icon='plus' content='Add lecture' onClick={() => handleOpenAddLectureForm(secIndex)} />
                    <Button icon='pencil' onClick={() => handleInlineSectionEdit(secIndex)}/>
                    <Button icon='trash' onClick={() => handleRemoveSection(secIndex)} />


                    <Button icon='chevron up' disabled={secIndex === 0 } onClick={(e) => handleSecMoveUp(e, secIndex)} />
                    <Button icon='chevron down'
                      disabled={sections === null || sections.length === (secIndex+1) } onClick={(e) => handleSecMoveDown(e, secIndex)}
                    />
                    <Button
                      disabled={(s.content == undefined ? true : s.content[0] ? false: true) }
                      icon={s.content == undefined ? 'plus' : s.expanded ? 'minus' : 'plus'}
                      onClick={(e) => handleSecToggle(e, secIndex)}
                    />
                      {s.title}
                  </Button.Group>
                </React.Fragment>
              }
          </Segment>

          <Confirm
            content='This will delete all lectures too. Delete section and lecture(s) ?'
            open={removeSectionConfirm}
            onCancel={handleCancelRemove}
            onConfirm={handleConfirmRemove}
          />

{/* LECTURE */}

          {s.expanded && s.content.map((c, lecIndex) =>
            <React.Fragment key={lecIndex}>
            <Segment secondary key={lecIndex} style={style.C_EDIT_CURRI_ITEM}>
              {this.arraysEqual(lectureToEdit, [secIndex, lecIndex]) ? <input value={lectureTitle} placeholder='' type='text'
                onChange={(e) => handleLectureTitleChange(e)}
              />
                : ` - Lecture ${lecIndex + 1} ${c['lectureTitle']},` }

                  {this.arraysEqual(lectureToEdit, [secIndex, lecIndex])
                    ? <Button.Group size='mini' basic style={{marginLeft: '1rem',}}>
                        <Button icon='save' onClick={(e) => handleSaveLectureTitleEdit(e, secIndex, lecIndex)} />
                        <Button icon='cancel'
                          onClick={handleLectureTitleChangeCancel}
                          // onClick={() => this.setState ({ lectureToEdit: null})}
                        />
                      </Button.Group>
                    : <React.Fragment>
                        <Button.Group size='mini' style={{marginLeft: '1rem'}}>
                           <Button icon='pencil' inverted basic  />
                         </Button.Group>

                         <Button.Group basic floated='right' size='mini' style={{marginLeft: '1rem'}}>
                           <Button icon='copy' content={c.quiz ? c.quiz.metadata.title : 'Attach Quiz'} basic onClick={() => handleAttachQuiz(secIndex, lecIndex)} />
                           <Button icon='pencil' basic onClick={() => handleInlineLectureEdit(secIndex, lecIndex)}/>
                           <Button icon='trash' basic onClick={() => handleRemoveLecture(secIndex, lecIndex)} />
                           <Button basic disabled={lecIndex=== 0} icon='chevron up' onClick={(e) => handleLecMoveUp(e, secIndex, lecIndex)} />
                           <Button basic disabled={(sections[secIndex].content.length === (lecIndex +1))} icon='chevron down' onClick={(e) => handleLecMoveDown(e, secIndex, lecIndex)} />
                           <Button
                             disabled={(c.quiz == undefined ? true : false) }
                             icon={c.quiz == undefined ? 'plus' : c.isExpanded ? 'minus' : 'plus'}
                             onClick={(e) => handleLecToggle(e, secIndex, lecIndex)}
                           />
                          </Button.Group>
                       </React.Fragment>
                       }
{/* Quiz */}
{c.quiz && c.isExpanded ? (<Segment style={{marginBottom: '0.5rem'}}>
                     <Header as='h4'> {c.quiz.metadata.title} </Header>
                       {/* <List divided> */}
                          {c.quiz.questions && c.quiz.questions.map((question, index) =>
                            <Segment key={index}>
                                {index + 1}. {truncate(question.title)}
                                 <Button floated='right' size='mini' basic icon className='segment-floated'><Icon name='pencil' /> </Button>
                            </Segment> )}
                       {/* </List> */}
                   </Segment>) : null }
            </Segment>


          </React.Fragment>
          )}

          { activeSection === secIndex ?
            <Segment>
              <Form onSubmit={() => handleSaveLecture(secIndex)}>
                <Form.Field>
                  <input placeholder='Lecture' type='text' value={lectureTitle} onChange={(e) => handleLectureTitleChange(e)} />
                </Form.Field>
                <Button basic onClick={handleAddLectureCancel}>Cancel</Button>
                <Button type='submit' disabled={isInvalidLecture}>Add Lecture</Button>
              </Form>
          </Segment> : null}
      </Segment.Group>
    )

    let addSection = formForSection
    ? <Segment style={style.C_EDIT_CURRI_SECTION}>
          <Form onSubmit={handleSaveSection}>
            <Form.Field>
              <label>Add Section</label>
              <input placeholder='Section' type='text'
                // onChange={(e) => this.setState({['sectionTitle']: e.target.value })}
                onChange={handleSectionTitleChange}
              />
            </Form.Field>
            <Button basic onClick={handleAddSectionCancel}>Cancel</Button>
            <Button type='submit' disabled={isInvalidSection}>Add</Button>
          </Form>
        </Segment>
    : <Segment basic><Button fluid onClick={handleOpenAddSectionForm}>Add Section</Button></Segment>

    return (
        <React.Fragment>
          <Header as='h1' attached='top'>Curriculum
            {/* <Button onClick={onCurriSubmit}
              floated='right' color='red'
              >Save</Button> */}
              {isInvalid ?
                <Button basic disabled floated='right' content='Saved' />
              : <Button disabled={isInvalid} onClick={onCurriSubmit} floated='right' color='red' content='Save'/>
              }
          </Header>
          <Segment attached stacked>
            {sectionList}
            {addSection}
          </Segment>

        </React.Fragment>
        )
      }
}

export default CEditCurri

const truncate = (questionTitle) => {
  let title
  if (questionTitle.length > 100) {
    title = questionTitle.substring(0, 100) + '...'
  } else {
    title = questionTitle
  }
  return title
}

// section = [{title: '', expanded: '', content:['a', 'b'] }]
// let curriItem = CurriItemType(
//   groupInstructionForShort, titleForShort, answerForShort, explanationForShort,
//   handleAddShortAnswer, handleAddMultipleChoice, handleAddOption, handleAddEssay, handleInputChange, handleMultipleFormRadioChange, handleMultipleFormOptionLabelChange,
//   formOptions, formOptionChecked)[type]

const CurriItemType = () => ({

  section: (<Segment>Section</Segment>),
  lecture: (<Segment>Lec</Segment>),
  quizSet: (<Segment >Quiz</Segment>),
})
