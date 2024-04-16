import React, { useEffect, useState } from 'react'
import DirRoute from './core/DirRoute'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalStyle } from './assets/js/globalStyle'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './assets/js/theme'
import {fetchAPI} from './../src/stores/slices/amrSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const theme = useSelector((state)=>state.theme.theme)
  const themeStyle = theme === 'light' ? lightTheme : darkTheme;
  const dispath = useDispatch()
  const state = useSelector((state)=>state.amr.amr)
  useEffect(()=>{
    let timeGetDataAMR = setTimeout(()=>{
      dispath(fetchAPI())
    }, 100)
    return ()=>{
      clearTimeout(timeGetDataAMR)
    }
  },[state])
  return (
    <ThemeProvider theme={themeStyle}>
      <GlobalStyle />
      <DirRoute />
      <ToastContainer position='top-right' autoClose={2000} pauseOnHover={false}/>
    </ThemeProvider>
  )
}

export default App