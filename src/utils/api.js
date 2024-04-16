const env = import.meta.env

export const  fetcher = (...args) => fetch(...args).then(res => res.json())

export const FetchAPI = async function({method='GET', path = '', data = {}, port = '', host = '', id= ''}){
  // let timeAPI = Date.now();
  // if(path != 'status'){
  //   if(timeAPI - timenow < 2000){
  //     let timewait = Math.floor(((timeAPI-timenow)/1000))
  //     activeScreen("Noti", `Thử lại sau ${Math.floor(2 - timewait)} giây`)
  //     console.log(`Thử lại sau ${Math.floor(3 - timewait)} giây`);
  //     return true
  //   }
  //   timenow = timeAPI
  // }
  let url
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data);
  const requestOptions = {
    method: method,
    headers: myHeaders,
    body: method != "GET" ? raw : null,
    redirect: "follow",
    cache: 'no-store'

  };
  try {
    if(!port){port = env.VITE_PORT_SERVER}
    if(!host){host = env.VITE_SERVER_API}
    url = `http://${host}:${port}/${path}`
    if(id){url = `${url}/${id}`}
    const res = await fetch(url , requestOptions);
    if(res.ok){
      const data = await res.json();
      if(method !== 'GET'){
        console.log('POST respone', JSON.stringify(data))
      }
      return {
        type: "succees",
        data
      };
    }else{
      return {
        type: 'fail',
        data: false
      }
    }
  } catch (error) {
    console.log('err Fetch',error);
    return {
        type: "error",
        data: {}
    }
  }
}