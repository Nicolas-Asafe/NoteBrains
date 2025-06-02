import Link from "next/link"

export default function page(){
    return(
        <div className="stanContainer2 centerContainer AnimaAppear1">
            <header>
                <h2>Select a org for create</h2>
                <Link href={'/dashboard'}>back</Link>
            </header>
            <div className="centerItemsColls">
                <div>
                   <Link href={'/new/note'}>New org note</Link>
                </div>
            </div>
        </div>
    )
}