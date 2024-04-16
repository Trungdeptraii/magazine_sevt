import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import {Main, Layout} from './layout'
import Sidebar from './Sidebar'

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Layout>
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </Layout>
      {/* <Footer /> */}
    </>
  )
}

export default DefaultLayout