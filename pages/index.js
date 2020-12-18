import Link from 'next/link'
import Header from "../components/Header"
function Index(){
    return(
        <div>
            <Header></Header>
            <Link href="/about">
                <a>About Page</a>
            </Link>
            <p>Hello Next.js</p>
        </div>
    )
}
export default Index;