import React from 'react'
import { Segment, Button, Form, Confirm, Header } from 'semantic-ui-react'

const CEditMetaBorder = {borderRadius: '0px'}

class CEditCurri extends React.Component {

  arraysEqual = (a,b) => {
    return JSON.stringify(a)===  JSON.stringify(b);
  }

  render() {

    const isInvalidLecture = lectureTitle === ''

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

      handleSecToggle,

      //add section
      //formForSection
      isInvalidSection,
      handleOpenAddSectionForm,
      handleAddSectionCancel,
      handleSaveSection,
      // handleSectionTitleChange,

      onCurriSubmit

    } = this.props


    let sectionList = sections && sections.map((s, secIndex) =>
      <Segment.Group
        data-id={secIndex}
        key={secIndex}
        >
          <Segment inverted color='teal'>
            {sectionToEdit === secIndex ?
              <input value={sectionTitle} placeholder='Section' type='text' onChange={handleSectionTitleChange} />
              : `Section ${secIndex + 1} ${s.title}`}

            {sectionToEdit === secIndex ?
              <Button.Group size='mini' basic style={{marginLeft: '1rem',}}>
                <Button icon='save' onClick={(e) => handleSaveSectionTitleEdit(e, secIndex)} />
                <Button icon='cancel'
                   onClick={handleSectionTitleChangeCancel}
                   // onClick={() => this.setState ({ sectionToEdit: null})}
                 />
              </Button.Group>
            :
            <React.Fragment>
              <Button.Group size='mini' basic style={{marginLeft: '1rem'}}>
                <Button icon='pencil' onClick={() => handleInlineSectionEdit(secIndex)}/>
                <Button icon='trash' onClick={() => handleRemoveSection(secIndex)} />
                <Button icon='plus' content='Add lecture' onClick={() => handleOpenAddLectureForm(secIndex)} />
              </Button.Group>
              <Button.Group floated='right' size='mini' basic style={{marginLeft: '1rem'}}>
                <Button icon='chevron up' disabled={secIndex === 0 } onClick={(e) => handleSecMoveUp(e, secIndex)} />
                <Button icon='chevron down'
                  disabled={sections === null || sections.length === (secIndex+1) } onClick={(e) => handleSecMoveDown(e, secIndex)}
                />
                <Button
                  // disabled={s.content[0] ? false : true} icon={s.content[0] && s.expanded ? 'minus' : 'plus'}
                  disabled={(s.content == undefined ? true : s.content[0] ? false: true) }
                  icon={s.content == undefined ? 'plus' : s.content[0] ? 'minus' : 'plus'}
                  // ={s.content[0] && s.expanded ? 'minus' : 'plus'}
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

          {s.expanded && s.content.map((c, lecIndex) =>
            <Segment key={lecIndex} color='teal'>
              {this.arraysEqual(lectureToEdit, [secIndex, lecIndex]) ? <input value={lectureTitle} placeholder='' type='text'
                onChange={(e) => handleLectureTitleChange(e)}
              />
                : `Lecture ${lecIndex + 1} ${c}` }

            {this.arraysEqual(lectureToEdit, [secIndex, lecIndex]) ?
              <Button.Group size='mini' basic style={{marginLeft: '1rem',}}>
                <Button icon='save' onClick={(e) => handleSaveLectureTitleEdit(e, secIndex, lecIndex)} />
                <Button icon='cancel'
                  onClick={handleLectureTitleChangeCancel}
                  // onClick={() => this.setState ({ lectureToEdit: null})}
                />
              </Button.Group>
            :
              <React.Fragment>
                <Button.Group size='mini' basic style={{marginLeft: '1rem'}}>
                   <Button icon='pencil' onClick={() => handleInlineLectureEdit(secIndex, lecIndex)}/>
                   <Button icon='trash' onClick={() => handleRemoveLecture(secIndex, lecIndex)} />
                 </Button.Group>

                 <Button.Group floated='right' size='mini' basic style={{marginLeft: '1rem'}}>
                   <Button disabled={lecIndex=== 0} icon='chevron up' onClick={(e) => handleLecMoveUp(e, secIndex, lecIndex)} />
                   <Button disabled={(sections[secIndex].content.length === (lecIndex +1))} icon='chevron down' onClick={(e) => handleLecMoveDown(e, secIndex, lecIndex)} />
                  </Button.Group>
               </React.Fragment>
               }
            </Segment>
          )}

          { activeSection === secIndex ?
            <Segment>
              <Form onSubmit={() => handleSaveLecture(secIndex)}>
                <Form.Field>
                  <input placeholder='Lecture' type='text' value={lectureTitle} onChange={(e) => handleLectureTitleChange(e)} />
                </Form.Field>
                <Button basic onClick={handleAddLectureCancel}>Cancel</Button>
                <Button type='submit' disabled={isInvalidLecture}>Save</Button>
              </Form>
          </Segment> : null}
      </Segment.Group>
    )

    let addSection = formForSection
    ? <Segment>
          <Form onSubmit={handleSaveSection}>
            <Form.Field>
              <label>Add Section</label>
              <input placeholder='Section' type='text'
                // onChange={(e) => this.setState({['sectionTitle']: e.target.value })}
                onChange={handleSectionTitleChange}
              />
            </Form.Field>
            <Button basic onClick={handleAddSectionCancel}>Cancel</Button>
            <Button type='submit' disabled={isInvalidSection}>Submit</Button>
          </Form>
        </Segment>
    : <Button fluid onClick={handleOpenAddSectionForm} >Add Section</Button>

    return (
        <React.Fragment>
          <Header as='h1' attached='top'>Curriculum</Header>
          <Segment attached style={CEditMetaBorder}>
            {sectionList}
            {addSection}
          </Segment>
          <Button onClick={onCurriSubmit}> Save curri</Button>
        </React.Fragment>
        )
      }
}

export default CEditCurri
