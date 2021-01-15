import { useEffect,useState } from "react";
import { v4 as UUID } from "uuid";
import './App.css';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import NoteModal from "./components/NoteModal";

function App() {
  const [notes,setNotes] = useState(null);
  const [modal,setModal] = useState(null);

  useEffect(()=>{
    setNotes(JSON.parse(window.localStorage.getItem("note")))
  },[])

  const newNote = () => {
    const id = UUID();
    modalHandle({id:id,_title:"New note",_body:""})
  }

  const modalHandle = (cmd) =>{
    if(cmd==null){
      document.getElementsByTagName("body")[0].classList.remove("open")
      setModal(null)
    } else {
      document.getElementsByTagName("body")[0].classList.add("open")
      setModal(cmd)
    }
  }

  const del = (id) => {
    let data = JSON.parse(window.localStorage.getItem("note"))
    delete data[id];
    setNotes(data)
    window.localStorage.setItem("note",JSON.stringify(data))
  }

  return (
    <>
      <Header/>
      <div className="wrap">
        <div className="button add" onClick={newNote}>Шинийг үүсгэх</div>
          {
            notes?Object.keys(notes).map((el,ind)=>{
              return <NoteCard title={notes[el].title} id={el} body={notes[el].body} key={ind} handler={modalHandle} del={del}/>
            }):""
          }
      </div>
      {modal?<NoteModal {...modal} close={modalHandle} setNotes={setNotes}/>:""}
    </>
  );
}

export default App;
