import { useEffect, useRef, useState } from 'react';
import './App.css'
import axios from "axios";

async function fetchTasks() {
  const result = await axios.get("http://localhost:3000/tasks");
  return result.data
}

function App() {
  const [tasks, setTasks] = useState([])
  const taskNameRef = useRef(null)
  useEffect(() => {
    fetchTasks()
      .then((result) => {
        console.log({ result });

        setTasks(result)

      }).catch((err) => {
        console.log({ err });
      });
  }, [])

  const addTask = async (title) => {
    const result = await axios.post("http://localhost:3000/tasks", {
      title: title,
      complete: false
    });
    return result
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const value = taskNameRef.current?.value
    if (!value) return



  }
  return (
    <>
      <div className='container'>
        <h1>Tasks</h1>
        <div className='row'>
          {
            tasks.map((it, idx) => {
              return <div className='col-6' key={idx}>{it.title} <span>{it.complete ? "Completed" : "Uncomplete"}</span></div>
            })
          }
        </div>
        <div className="row">
          <form onSubmit={onSubmit}>
            <div className="col-12 ">
              <input type="text" name="taskName" ref={taskNameRef} /><button className="btn-primary btn">Send</button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
