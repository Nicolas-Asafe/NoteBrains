import Link from "next/link"

export default function page(){
    return(
        <div className="stanContainer2 centerContainer stanFull2 AnimaAppear1">
            <header>
                <h2>Crie um org</h2>
                <Link href={'/dashboard'}>voltar</Link>
            </header>
            <div className="centerItemsColls">
                <div>
                   <Link href={'/new/note'}>Criar uma nova nota</Link>
                </div>
            </div>
        </div>
    )
} 