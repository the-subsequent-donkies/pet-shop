'use strict'

import React, { Component } from 'react'
import { Segment, Header, Image } from 'semantic-ui-react'

const userHome = (props) => {
  return (
    <div>
      <Segment.Group
        raised
        style={{ width: '100%' }}
      >
        <Segment padded>
          <Header as='h1'>
            Welcome, User!
          </Header>
        </Segment>
      </Segment.Group>
    </div>
  )
}
