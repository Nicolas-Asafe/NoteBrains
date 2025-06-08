import Link from "next/link"

export default function page(){
    return(
        <div className="stanContainer2 centerContainer AnimaAppear1">
            <header>
                <h2>Selecione uma Anotação para criar</h2>
                <Link href={'/dashboard'}>Voltar</Link>
            </header>
            <div className="centerItemsColls">
                <div>
                   <Link href={'/new/note'}>Nova Anotação</Link>
                </div>
            </div>
        </div>
    )
}