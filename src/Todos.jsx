import { useEffect, useState } from "react"


const Todos = () => {
  const [todo, setTodo] = useState([])
  const [editingFlage, setEditing] = useState(-1)

  function addTodo() {
    console.log("-----Addtodo---")
    let tempTodo = document.getElementById("todoInput").value

    if (tempTodo === "") {
      alert("todo cant be blank")
    }
    else
    
    {
      fetch("/addTodo?title=" + tempTodo)
        .then((res) => res.json())
        .then((data) => {
          if (data.status==="Success") {

            setTodo(data.todolist)
            document.getElementById("todoInput").value = ""


          }
          else {

            alert(data.massage)
          }

        }

        )

    }





    // console.log("tempTodo: "+tempTodo)

    // if (todo.length>0)
    // {
    //   addToArray(todo[todo.length-1].id+1,tempTodo,false)
    // }
    // else
    // { 
    //   addToArray(0,tempTodo,false)
    // }
    //console.log("testing",tempTodo)



  }





  function addToArray(id, text, completed) {
    let tempTodoObject = {
      id: id,
      text: text,
      completed: completed
    }
    todo.push(tempTodoObject)
    console.log("After push")
    console.log(todo)
    setTodo([...todo])



  }



  function deleteTodo(id) {
    console.log("--------deletetodo-----")
    console.log("id: " + id)
    console.log(todo)
     todo.map((element)=>{
      if(element.id === id){
        fetch("/deleteTodo?id="+id)
        .then((res)=>res.json())
        .then((data)=>{
          if(data.status === "Success"){
            setTodo(data.todolist)
          }
          else{
            alert(data.massage)
          }
        })

      }
       return element 
      

    })
  }
    //    {
    //   if (element.id == id){
    //     fetch("//deleteTodo?id="+id)
    //     .then((res)=>res.json())
    //     .then((data)=>
    //     {
    //       if(data.status==="Success"){
    //         setTodo(data.todolist)

    //       }
    //       else{
    //         alert(data.massage)

    //       }

    //     })

    //   }
    //   return element

    // }
    
    // console.log(tempTodo)
    // setTodo([...tempTodo])
  

  function checkListener(id) 
  {
    todo.map((element)=>{
      if(element.id===id)
      {
        fetch("/complitTodo?id=" +element.id + "&status="+!element.status)
        .then((res)=>res.json())
        .then((data)=>
        {
          console.log("success befor if",data.status);
          //if(data.status==='Success')
          //{
            console.log("success after if",data.status);

            setTodo([...data.todolist])
            console.log("data todolist",data.todolist);
          //}
         // else
          // {
          //   alert(data.massage)
          //   console.log("fromt-end alert else");
          // }
        })
      }
      return element
    })
  }

  function editTodo(id) {
    console.log("-----------editTodo-----")
    console.log("id: " + id)
    setEditing(id)

    console.log(todo)
    setTodo([...todo])

  }

  function updateTodo() {
    console.log("-------Update todo-----")
    console.log("editingFlage: " + editingFlage)
    let tempTodo = todo.map(element => {
      if (element.id === editingFlage) {
        element.text = document.getElementById("editTodo").value

      }
      return element
    })
    setEditing(-1)
    setTodo([...tempTodo])
  }



  useEffect(() => {
    fetch("/getAllTodos")
      .then((res) => res.json())
      .then((data) => setTodo(data.todolist))
  }, [todo])


  return <div>
    <h1>To-Do Application</h1>
    <input type="text" placeholder="Enter todo here" id="todoInput"></input>
    <button onClick={() => addTodo()}>Add Todo</button>
    {
      todo.map(element => {
        return <div>
          {
            element.completed ?
              // completed todo
              <div>
                <input type="checkbox" onChange={() => checkListener(element.id)} true />
                <s>{element.title + " "}</s>
                {/* <button onClick={()=>deleteTodo(element.id)}>Delete</button> */}
              </div> :
              //* incompleted todo 
              (element.id === editingFlage ?
                <div>
                  {/* editing frontend */}

                  <input type="checkbox" onChange={() => checkListener(element.id)}true ></input>
                  <input type="text" defaultValue={element.text} placeholder="Update Todo here" id="editTodo" />

                  <button onClick={() => deleteTodo(element.id)} >Delete</button>
                  <button onClick={() => updateTodo()}>Save Todo</button>

                </div>
                :
                //default frontend
                <div>


                  <input type="checkbox" onChange={() => checkListener(element.id)} ></input>

                  {element.title + " "}
                  <button onClick={() => deleteTodo(element.id)} >Delete</button>
                  <button onClick={() => editTodo(element.id)}>Edite</button>

                </div>
              )
          }
        </div>
      })
    }
  </div>
}


export default Todos;