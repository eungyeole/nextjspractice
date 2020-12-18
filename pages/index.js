import Link from 'next/link'
import Header from "../components/Header"
import axios from "axios"
import { Component, useEffect } from 'react'
import Router from 'next/router'
class Index extends Component {
    state = {
        id : '',
        pw : '',
    }
    handleId = (e) => {
        this.setState({
            id: e.target.value
        })
    }
    handlePw = (e) => {
        this.setState({
            pw: e.target.value
        })
    }
    async Post() {
        const url="http://10.156.147.146:8080"
        const location = await axios.post(
            url + "/dsmauth/login",
            {
                id: this.state.id, 
                password: this.state.pw, 
                redirect_url: "localhost:3000", 
                client_id: "1234"
            }
        )
        console.log(location.data.location);
        const token = await axios.post(
            url + "/dsmauth/token",
            {
                client_id: "1234",
                client_secret: "1234",
                code : location.data.location
            }
        )

        window.localStorage.setItem("access_token", token.data["access-token"]);
        window.localStorage.setItem("refresh_token", token.data["refresh-token"]);
        Router.push("/main");
    }
    submit = (e) => {
        e.preventDefault();
        this.Post();
    }
    render() {
        const loginBox={
            margin: "0 auto" ,
            width: "300px",
            height: "80px",
            justifyContent: "space-between",
            display: 'flex', 
            flexDirection: 'column'
        }
        return(
            <form onSubmit={this.submit} style={loginBox}>
                <input value={this.state.id} onChange={this.handleId} type="text"></input>
                <input value={this.state.pw} onChange={this.handlePw} type="password"></input>
                <button>로그인</button>
            </form>
        )
    }
}
/*function Index(){
    let a="";
    let b="";
    let result;
    const loginBox={
        margin: "0 auto" ,
        width: "300px",
        height: "80px",
        justifyContent: "space-between",
        display: 'flex', 
        flexDirection: 'column'
    }
    async function post(){
        result = await axios.post(
            "http://10.156.147.146:8080/dsmauth/login",
            {
                id: id, 
                password: pw, 
                redirect_url: "localhost:3000", 
                client: "1234"
            }
        )
    }
    function submit(e){
        e.preventDefault();
        post();
    }
    return(
        <form onSubmit={submit} style={loginBox}>
            <input value={a} onChange={(e)=>a=e.target.value} type="text"></input>
            <input value={b} onChange={(e)=>b=e.target.value} type="password"></input>
            <button>로그인</button>
        </form>
    )
}*/
export default Index;