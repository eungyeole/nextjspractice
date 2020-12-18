import axios from "axios";
import { useEffect, useState } from "react";

function Index(){
    const [data,setData] = useState("");
    useEffect(async ()=>{
        const data=await axios.get("http://10.156.147.146:8090/v1/info/basic",{
            headers: {
                "access-token" : "Bearer " + window.localStorage.getItem("access_token")
            }
        })
        setData(data.data);
        console.log(data);
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