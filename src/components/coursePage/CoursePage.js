import React, {Component} from 'react'
import CourseMeta from './CourseMeta'
import CourseCurri from './CourseCurri'
import CourseOpenQ from './CourseOpenQ'
import { Breadcrumb, Grid, Segment, Rail, Header, Sticky, Menu, Container, Visibility } from 'semantic-ui-react'

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 1px rgba(0,0,0, 0.2)',
}

class CoursePage extends Component {
  state = {
  menuFixed: false,
  }

  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })
  
  render() {
    const {menuFixed} = this.state
    return (
          <div>
            <Container text style={{ marginTop: '2em' }}>
                <Header as='h1'>Course title</Header>
                <p>This example shows how to use lazy loaded images, a sticky menu, and a simple text container</p>
              </Container>
              <Visibility
            onBottomPassed={this.stickTopMenu}
            onBottomVisible={this.unStickTopMenu}
            once={false}
          >
            <Menu
              borderless
              fixed={menuFixed && 'top'}
              style={menuFixed ? fixedMenuStyle : menuStyle}
            >
              <Container text>
                <Menu.Item header>meta</Menu.Item>
                <Menu.Item as='a'>curri</Menu.Item>
                <Menu.Item as='a'>comments</Menu.Item>
              </Container>
            </Menu>
          </Visibility>

          <Container text>
            <CourseMeta />
            <CourseCurri />
            <CourseOpenQ />
          </Container>
        </div>
    )
  }
}
export default CoursePage;
