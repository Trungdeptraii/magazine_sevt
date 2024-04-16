import React from 'react'
import { SFooter } from './layout'
import { Button, Space } from 'antd'

const Footer = () => {
  return (
    <SFooter>
      <Button type="primary" size="large">Start</Button>
      <Button type="primary" size="large">Stop</Button>
      <Button type="primary" size="large">Cancel</Button>
    </SFooter>
  )
}

export default Footer