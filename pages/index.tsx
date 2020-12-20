import axios, { AxiosPromise, AxiosResponse } from "axios";
import { EffectCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import queryString from "query-string"
import GlobalStyle from "../components/GlobalStyle";
interface data{
    email : string,
    gcn : string,
    name : string
}
interface response {
    data : data
}
const post = async (code : string | string[]) : Promise<data>=>{
    const token:AxiosResponse = await axios.post(
        "http://10.156.147.146:8080/dsmauth/token",
        {
            client_id: "123456",
            client_secret: "1234",
            code : code
        }
    )
    console.log(token);
    window.localStorage.setItem("access_token", token.data["access-token"]);
    window.localStorage.setItem("refresh_token", token.data["refresh-token"]);
    const data : response =await axios.get("http://10.156.147.146:8090/v1/info/basic",{
        headers: {
            "access-token" : "Bearer " + token.data["access-token"]
        }
    });
    return(data.data);
}

function Index(props){
    const [data,setData] = useState<data>(undefined);
    const router = useRouter();
    const code = queryString.parse(router.asPath.substring(1)).code;
    useEffect(()=>{
        post(code)
        .then((res: data)=>{
            setData(res);
        })
    },[])
    return(
        <>
            <GlobalStyle></GlobalStyle>
            {
                data ?
                    <>
                        <p>{data.email}</p>
                        <p>{data.gcn}</p>
                        <p>{data.name}</p>
                    </>
                :null
            }
        </>

    )
}
export default Index;