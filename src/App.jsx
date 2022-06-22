import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from "axios"

function App() {
  const [num,setNum]=useState(0)
  const [data,setData]=useState([])
  const [button,setButton]=useState(false)
  const [name,setName]=useState("Default Rule")
  const [rule,setRule]=useState({
    "name":name,
  })
  const [rename,setRename]=useState("rename")


  const addRule=(e)=>{
    e.preventDefault()
      axios.post("http://localhost:8080/ruleArray",rule).then(()=>{
      setRule({
        "name":name
      })
    }).then(res=>{
      getData()
    })
  }

  useEffect(()=>{
    getData()
  },[])

    const getData=()=>{
      axios.get("http://localhost:8080/ruleArray").then((res)=>{
      setData(res.data)
      setNum(res.data.length)
      if(res.data.length>=5){
        setButton(true)
      }
      else{
        setButton(false)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  // const handleChange=(e)=>{
  //   axios.patch(`http://localhost:8080/ruleArray/${5}`).then(()=>{
  //     setName(e.target.value)
  //     getData()
  //     // console.log(e.target.value)
  //     console.log(data)
  //   })
  // }



  return (
    <div className="App">
      <div id="header">
      <div id="header_items">
        <img src="https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/arcgis-dashboards.png" width="4%" height="60%"></img>
        <div>
        <p>Demo Custom App</p>
        <p>APP NAME</p>
        </div>
        <h3>></h3>
        <div>
        <p>Assessment</p>
        <p>STAGE</p>
        </div>
        <h3>></h3>
        <div>
        <p>Create PO</p>
        <p>BUTTON</p>
        </div>
        <h3>></h3>
        <p>Button Rules</p>
      </div>
      <div id="dataSide">
        <p>App saved on 27 July 2017 4:32pm</p>
        <button>Done</button>
      </div>
    </div>

    <div id="dashboard">

      {/* left part of the dashboard */}
      <div id="leftDashboard">
        <p>Back to Stages</p>
        <p>RULES : {num}</p>
        <p>{rename}</p>
        <div id="rules_list">
          {data.map((e)=> 
             <div key={e.id}>
             <p>{e.name}</p> 
             <img
             onClick={()=>{
              axios.delete(`http://localhost:8080/ruleArray/${e.id}`).then(res=>{
              getData();
              })
          }}
              src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png" width="6%" height="6%"></img>
          </div>
          )}
         <button id="newRule" disabled={button} onClick={addRule}>Add New Rule</button>
        </div>
      </div>

      {/* right part of the dashboard */}
      <div id="rightDashboard">
        {/* add new condition */}
        <p>{name}</p>
        <br/>
        <p>Button Name</p>
        <input type="text"
        // onClick={handleChange} 
        />
        <br/>
        <select>
          <option>If All</option> 
        </select><p>of the following conditions are met</p>
        <br/>
        <select>
          <option>Text</option>
        </select>
        <select>
          <option>Contains</option>
        </select>
        <input type="search" placeholder='type to search and add'></input>
        <br/>
          <button>Add New Condition</button>


      {/* add another action */}
      
      <h3>Perform the following action</h3>
      
      </div>

    </div>
    </div>
  )
}

export default App
