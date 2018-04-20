import React from 'react'
import { Segment, Container, Menu } from 'semantic-ui-react'
import * as routes from '../../constants/routes';
import {Link, Route, } from 'react-router-dom'
const Footer = () => (

<Segment vertical style={{ padding: '0rem 0em', marginBottom: '0rem' }}>
  <Container>
      <Menu text>
        <Menu.Item name='About' as={Link} to={routes.FOOTER_ABOUT}/>
        <Menu.Item name='Privacy' as={Link} to={routes.FOOTER_TERMS}/>
        {/* <Menu.Item name='Terms' as={Link} to={routes.FOOTER_ABOUT}/> */}
        <Menu.Item name='FAQ' as={Link} to={routes.FOOTER_FAQ}/>
        <Menu.Item name='Help' as={Link} to={routes.FOOTER_HELP}/>
      </Menu>
    </Container>
  </Segment>
)

export default Footer
