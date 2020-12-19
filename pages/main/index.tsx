import axios, { AxiosPromise, AxiosResponse } from "axios";
import { EffectCallback, useEffect, useState } from "react";
interface data{
    email : string,
    gcn : string,
    name : string
}
interface response {
    data : data
}
const post = async () : Promise<data>=>{
    const data : response =await axios.get("http://10.156.147.146:8090/v1/info/basic",{
        headers: {
            "access-token" : "Bearer " + window.localStorage.getItem("access_token")
        }
    });
    return(data.data);
}

function Index(){
    const [data,setData] = useState<data>();
    useEffect(()=>{
        post()
        .then((res: data)=>{
            setData(res);
        })
    },[])
    return(
        <>
            <p>{data.email}</p>
            <p>{data.gcn}</p>
            <p>{data.name}</p>
        </>

    )
}
export default Index;