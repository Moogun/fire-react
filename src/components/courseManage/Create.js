import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {db} from '../../firebase';
import * as routes from '../../constants/routes';
import {Link, withRouter} from 'react-router-dom';
import { Button, Image, Modal, Form, Checkbox, Icon, Input, Grid, Header, Message, Segment } from 'semantic-ui-react'

const CreatePage = ({history}, {authUser}) => {
  let create;
  if (authUser) {
    create = <CreateForm history={history}
      tid={authUser.uid}
      tName={authUser.displayName}
      photo={authUser.profileImage}
      tEmail={authUser.email}
    />
  } else {
    create = <p>You are not signed in </p>
  }
  return (
    <div>
      {create}
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
    const {history, tid, tName, photo, tEmail,} = this.props;
    // console.log('create', uid, name, profileImage, email);
    let tProfileImg = photo ? photo : ''
    db.doCreateCourse(title, tid, tName, tProfileImg, tEmail)
      .then((res) => {
        console.log('res', res);
        let cid = res.path.pieces_[1]
        db.doUpdateTeaching(title, tid, cid, tName, tProfileImg, tEmail)
          .then((res) => {
            this.setState(() => ({ ...INITIAL_STATE }));
            this.handleClose()

            history.replace({
              pathname: '/course_manage/' + cid + '/edit',
              // search: '?query=' + title + name,
              state : {
                courseKey: cid,
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
        <Grid
          textAlign='center'
          style={{ height: '100%', margin: '10em'}}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center' content='Create New Course' subheader='' attached='top' />
            <Segment attached>
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
                  <Icon name='checkmark' /> Save and Go
                </Button>
            </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      )
  }
}

export default withRouter(CreatePage);
