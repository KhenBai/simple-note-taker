import { useEffect,useState } from "react";
export default function NoteModal({id,_title,_body,close,setNotes}){

    const [title,settitle] = useState(_title)
    const [body,setbody] = useState(_body)

    useEffect(()=>{
        document.getElementsByClassName("modalbody")[0].classList.add("open")
    },[])
    const closer = () => {
        document.getElementsByClassName("modalbody")[0].classList.remove("open")
        setTimeout(()=>close(null),500)  
    }
    const save = () => {
        let data = JSON.parse(window.localStorage.getItem("note"))
        data = {...data,[id]:{title:title,body:body}}
        setNotes(data)
        window.localStorage.setItem("note",JSON.stringify(data))
        closer();
    }

    useEffect(()=>{
        let data = JSON.parse(window.localStorage.getItem("note"))
        data = {...data,[id]:{title:title,body:body}}
        setNotes(data)
        window.localStorage.setItem("note",JSON.stringify(data))
    },[body,title,id,setNotes])

    return(
        <div className="modal">
            <div className="modalbody">
                <div className="close" onClick={closer}>+</div>
                <div className="modaltitle"><input onChange={(e)=>settitle(e.target.value)} value={title} type="text" name="Title" id=""/></div>
                <hr/>
                <div className="modalcontent">
                    <textarea name="body" value={body} onChange={(e)=>setbody(e.target.value)} id=""></textarea>
                </div>
                <div className="modalbuttoncont">
                    <div className="button edit" onClick={save}>Хадгалах</div>
                    <div className="button delete" onClick={closer}>Цуцлах</div>
                </div>
            </div>
        </div>
    )
}