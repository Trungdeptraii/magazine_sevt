import React from 'react'

import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Product from '../pages/Products/Products'
import ProductDetail from '../pages/Products/ProductDetail'
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout'
import AuthLayout from '../layouts/AuthLayout/AuthLayout'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import GuestMiddleware from '../middlewares/GuestMiddleware'
import PointMove from '../pages/Point/PointMove'
import Relocation from '../pages/Relocation/Relocation'
import GroupPoint from '../pages/GroupPoint/GroupPoint'
import TaskMove from '../pages/TaskMove/TaskMove'
import IO from '../pages/IO/IO'
import Monitor from '../pages/Monitor/Monitor'
import Log from '../pages/Log/Log'
import Config from '../pages/Config/Config'
import Setting from '../pages/Setting/Setting'

export const publicRoutes = (
  <>
    <Route element={<DefaultLayout />}>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/point' element={<PointMove />}/>
        <Route path='/relocation' element={<Relocation />}/>
        <Route path='/group_point' element={<GroupPoint />}/>
        <Route path='/task_move' element={<TaskMove />}/>
        <Route path='/io' element={<IO />}/>
        <Route path='/monitor' element={<Monitor />}/>
        <Route path='/config' element={<Config />}/>
        <Route path='/setting' element={<Setting />}/>
        <Route path='/log' element={<Log />}/>
        <Route path='/product'>
            <Route index element={<Product />}/>
            <Route path=':id' element={<ProductDetail />}/>
        </Route>
    </Route>
    <Route path='/'  element={<AuthLayout />}>
      <Route element={<GuestMiddleware />}>
        <Route path='login' element={<Login />}/>
      </Route>
    </Route>
  </>
)