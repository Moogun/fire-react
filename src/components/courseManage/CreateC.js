import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link, Route, Switch, Redirect} from 'react-router-dom'
import withAuthorization from '../../HOC/withAuthorization';
import * as routes from '../../constants/routes';
import {db, } from '../../firebase';
import { Button, Image, Modal, Form, Checkbox, Icon, Input, Grid, Header, Message, Segment } from 'semantic-ui-react'

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      uid: '',
      email: '',
      username: '',
      displayName: '',
      photoUrl: '',
      title: '',
      error: null,
    };
  }

  onSubmit = (event) => {

    const {title,} = this.state;
    const {history, uid} = this.props;
    const {email, username, displayName, photoUrl} = this.props.user;

    console.log('create', title, uid, email, username, displayName, photoUrl, history);

    db.doCreateCourse(title, uid, email, username, displayName, photoUrl)
      .then((res) => {
    //     console.log('res', res);
        let cid = res.path.pieces_[1]
        db.doUpdateTeaching(title, uid, email, username, displayName, photoUrl, cid)
          .then((res) => {
            this.setState(() => ({ title: '' }));

            history.replace({
              pathname: '/course_manage/' + cid + '/edit',
              search: '?query=' + title + username,
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

  componentDidMount(){
    console.log('create', 'did mount');
  }

  render() {
    const {match} = this.props
    // console.log('create c props',this.props, this.props.user);
    const {authUser} = this.context
    const {title, error} = this.state;
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
              <Button color='blue' fluid disabled={isInvalid}>
                <Icon name='checkmark' /> Save and Go
              </Button>
          </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

Create.contextTypes ={
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Create);
