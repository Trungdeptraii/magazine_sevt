import React, { useEffect } from 'react'
import { FetchAPI } from '../../utils/api'
import { hostJS, hostServerAPI, portJS, portServerAPI } from '../../assets/js/avaribale'

const About = () => {
  const createAPI = async()=>{
    let {type, data} = await FetchAPI({method: "POST", host: hostJS, port: portJS, path: "", data: {"testapi": []}})
    console.log(type, data);
  }
  useEffect(()=>{
    createAPI()
  }, [])
  return (
    <div>About</div>
  )
}

export default About