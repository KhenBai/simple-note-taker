export default function NoteCard({title,id,body,handler,del}){
    return <div className="notecard">
        <div className="title">{title}</div>
        <div className="edit button" onClick={()=>handler({_title:title,id:id,_body:body})}>Засварлах</div>
        <div className="delete button" onClick={()=>del(id)}>Устгах</div>
    </div>
}