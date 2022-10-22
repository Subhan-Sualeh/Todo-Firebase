import {db} from "./Databasekey"
import { addDoc, collection , doc, getDocs , setDoc , updateDoc , deleteDoc  } from "firebase/firestore"; 
import React, { useEffect } from "react"
import { useState } from "react"
import {MdModeEdit} from "react-icons/md"
import {TiTick} from "react-icons/ti"
import { FaTrash } from "react-icons/fa"
import { AiOutlinePlus } from "react-icons/ai" 
import "./todo.css"


const Todo=() => {
    let[todoItem , setTodoItem]= useState([])
    let[inputValue , setInputValue ] = useState("")
    let[indexNumber , setIndexNumber] = useState("")
    let[changeInput , setChangeInput] = useState("")
    let [refresh, setRefresh] = useState(false);
    
     // //  collection

     useEffect(()=>{
        async function callData(){
             const callData = await getDocs(dbCollection)
             const arr = []

             callData.forEach((doc) =>{
                // valueCame = valueCame.todoValue 
                arr.push({
                    id : doc.id ,
                    value : doc.data().todoValue
                })
                setTodoItem([...arr])
                // console.log(arr , "arr") 

                // console.log(doc.data() , "doc")

             })
        }
       callData()

     })

    // console.log(indexNumber, "indexNum")
    console.log("todo Item" , todoItem)
    
    const dbCollection = collection(db , "dbCollection")
    const todoAdd = async () =>{
        

      
        //todoItem.push(inputValue)
        //setTodoItem([...todoItem])
       

         // New Firebase 
        const obj={
            todoValue : inputValue
        }
        const addTodo =  await addDoc(dbCollection , obj)
      console.log(addTodo)
      setRefresh(!refresh)
      setInputValue("")
        
    }
    const delTodo=async (i)=> {
        
        const iDs = todoItem[i].id
        console.log(iDs)
        const refDb= doc(db , "dbCollection" , iDs)
        await deleteDoc(refDb)


        todoItem.splice(i ,1)
        setTodoItem([...todoItem])

    }
    const editInput=(i)=>{
        setChangeInput(todoItem[i].value)
    }

    const updateTodo =async (i)=>{
        const getId = todoItem[i].id
        console.log(getId)
        const refDb= doc(db , "dbCollection" , getId)
        await updateDoc(refDb , { 
            todoValue : changeInput
        })
        todoItem.splice(i , 1 ,{value : changeInput , getId})
        setTodoItem([...todoItem])
        setIndexNumber("")
        setChangeInput("")

    }
 



    return(
        <main>
            <div className="mainHead">
                <h1 >Todo App with Firebase</h1>
            </div>
            <section className="wholeClass">
        <div className="inputMain mainDiv">
            <input type="text" placeholder="What to do !" value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
            />
            <div ><AiOutlinePlus className="btns" onClick={todoAdd} id="addTodo"></AiOutlinePlus></div> 
        </div>
        <section>
            {todoItem.map((todo , i) =>{
                return(
                    <div className="todolines">
                    <React.Fragment key={i}>
                        {indexNumber === i ?(
                        <div>
                        <input
                onChange={(e) => setChangeInput(e.target.value)}
                className="editInput "
                value={changeInput}
                autoFocus />
                <TiTick className="btns" color="black" onClick={() => updateTodo(i)}>
                </TiTick>
                </div>
                ) : (
                    <div >
                        {todo.value}
                <MdModeEdit
                className="btns space"
                  onClick={() => {
                      setIndexNumber(i);
                      editInput(i);
                    }}
                  size={25}
                ></MdModeEdit>
                    <FaTrash
              className="icon btns"
              onClick={() => delTodo(i)}
              size={25}
            ></FaTrash>

                    </div>
                )}
                    </React.Fragment>
                    </div>
                );
            } )}
            </section>
        </section>
        

    </main>
        )
}


export default Todo ;