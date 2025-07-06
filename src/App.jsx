import { useState, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";




function App() {
  const [todo, settodo] = useState({ text: '', id: '',isDone:false });
  const [todos, settodos] = useState([]);
  const [isActive, setisActive] = useState(false);
  const [showFinished, setshowFinished] = useState(false);
  const hasLoaded = useRef(false)
  useEffect(() => {
    if(!hasLoaded.current){
      let prevtodos=JSON.parse(localStorage.getItem("prevtodos"))  || [];
    settodos(prevtodos);
    }
    hasLoaded.current = true;
  }, [])
  
  // const savetodo =() => { 
  //   localStorage.setItem("prevtodos",JSON.stringify(todos))
  //  }
  useEffect(() => {
  localStorage.setItem("prevtodos", JSON.stringify(todos));
}, [todos]);


  const handlechange = (e) => {
    settodo({ text: e.target.value, id: uuidv4(),isDone:false })

    //  settodo(prev=>({...prev})
    // console.log(todo)

  }
  const handleadd = () => {
    
    if (todo.text !== '') {
      settodos([...todos, todo])
      settodo({ text: '', id: '' ,isDone:false});
      // console.log(todos)
    }
    else if(todo.text.trim()===''){
      alert("please enter a todo")
    }
    // savetodo();

  }

  const handledelete = (id) => {
    const temptodos = ([...todos])
    // console.log(temptodos);
    let obj = todos.findIndex(curr => curr.id === id)
    temptodos.splice(obj, 1);
    settodos([...temptodos])
    // savetodo();
  }
  const handleupdate = (id) => {
    let obj = todos.find(curr => curr.id === id)
    settodo(obj);
    // console.log(isActive)
    setisActive(true);
    handledelete(id);
    // savetodo();

  }
  const Update = () => {
  handleadd();
  setisActive(false);
  }
  const ischeck=(id)=>{
      settodos(prev =>
    prev.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    )
  );
  }
  const togglefinish=(e) => { 
    setshowFinished(!showFinished);
   }
  return (
    <>
      <Navbar></Navbar>
      <div className="h-[90vh] w-[90vw] mx-auto bg-[linear-gradient(to_bottom,_#d8ecf7,_#f9f9f9)]  m-2.5 rounded-md p-3.5 overflow-scroll overflow-x-hidden">

        <div className="todo flex justify-center gap-2.5">
          <input type="text"  onChange={handlechange} name="" value={todo.text} id="" className='bg-amber-50 mr-2 rounded-md' />
          <button onClick={isActive ? Update : handleadd} className={` px-2 py-1.5 text-sm font-medium text-white bg-[#1d1d1f] rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition`}>
            {`${isActive ? 'Update' : 'Add'}`}
          </button>

        </div>
        <div className='flex  items-center gap-2.5 ml-2.5'>

          <input type="checkbox" name="showFinished" id="" onChange={togglefinish}  checked={showFinished}/> Show Finished
        </div>
        <div className='todos  mt-2.5   w-[70vw] m-auto gap-3 flex flex-col cursor-pointer '>
          {todos.map(todo => {
            return (showFinished || !todo.isDone) && <div key={todo.id} className='w-[75vw] lg:w-[60vw] overflow-hidden  flex justify-center items-center gap-2 p-4  m-auto  backdrop-blur-md bg-white/20 rounded-xl border border-white/30 shadow-md  hover:scale-105 transition-transform duration-200 ' >
              <input type="checkbox" checked={todo.isDone} onChange={()=>{ischeck(todo.id)}}/>
              <div className={`${todo.isDone?'line-through ':''}w-[35vw] p`}>
                {todo.text}
              </div>


              <button onClick={(() => {  handleupdate(todo.id) })} className="px-4 py-1.5 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 transition">
                 <CiEdit className="w-5 h-5" />
              </button>
              <button onClick={() => { handledelete(todo.id) }} className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition">
                <MdDeleteOutline />
              </button>
            </div>
          }
          )}
        </div>
      </div>

    </>
  )
}

export default App




