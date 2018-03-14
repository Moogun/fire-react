import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {db} from '../../firebase';
import * as routes from '../../constants/routes';
import {Link, withRouter} from 'react-router-dom';
import { Button, Image, Modal, Form, Checkbox, Icon, Input } from 'semantic-ui-react'

const CreatePage = ({history}, {authUser}) => {
  let create;
  if (authUser) {
    create = <CreateForm history={history} uid={authUser.uid} name={authUser.displayName}/>
  } else {
    create = <p>You are not signed in </p>
  }
  return (
    <div>
      {create}
      {/* <CreateForm history={history} uid={authUser.uid} name={authUser.displayName}/> */}
    </div>
  )
}

CreatePage.contextTypes ={
 authUser: PropTypes.object,
}

const INITIAL_STATE = {
  title: '',
  error: null,
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      modalOpen: false,
    };
  }

  onSubmit = (event) => {
    const {title} = this.state;
    const {history, uid, name} = this.props;

    db.doCreateCourse(title, uid)
      .then((res) => {
        console.log('res', res);
        let courseKey = res.path.pieces_[1]
        db.doUpdateCourseTeaching(courseKey, uid, title)
          .then((res) => {
            this.setState(() => ({ ...INITIAL_STATE }));
            this.handleClose()

            history.replace({
              pathname: '/course/' + courseKey + '/edit',
              // search: '?query=' + title + name,
              state : {
                courseKey: courseKey,
                title: title,
              }
            })
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

      })
      .catch((error)=> {
        this.setState(byPropKey('error', error));
      })

    event.preventDefault();

  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const {modalOpen, title, error} = this.state;
    const isInvalid = title === '';

    return (
      <Modal size="mini"
        trigger={<p onClick={this.handleOpen}>Create new course</p>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
         >
          <Modal.Header>Create new course</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.onSubmit}>

              <Form.Field>
                <Input
                  icon='pencil'
                  iconPosition='left'
                  value={title}
                  onChange={event => this.setState(byPropKey('title', event.target.value))}
                  type="text"
                  placeholder="Title"
                />
                </Form.Field>
                <Button color='blue' fluid>
                  <Icon name='checkmark' /> Create new course
                </Button>
            </Form>
          </Modal.Content>

        </Modal>
    );
  }
}

export default withRouter(CreatePage);
