import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from "axios"

function App() {
  const [num,setNum]=useState(0)
  const [actionNum,setActionNum]=useState(0)
  const [actionData,setActionData]=useState([])
  const [data,setData]=useState([])
  const [button,setButton]=useState(false)
  const [actionButton,setActionButton]=useState(false)
  const [input,setInput]=useState("Abcd")
  const [name,setName]=useState("Default Rule")
  const [toggle,setToggle]=useState(true)
  const [action,setAction]=useState({
    "action":"START NEW APP"
  })
  const [rule,setRule]=useState({
    "name":name,
  })
  const [rename,setRename]=useState("rename")

  
  const addRule=(e)=>{
    e.preventDefault()
      axios.post("http://localhost:8080/ruleArray",rule).then(()=>{
      setRule({
        "name":name,
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


  const addAction=()=>{
    // el.preventDefault()
      axios.post("http://localhost:8080/actionArray",action).then(()=>{
      setAction({
        "action":"START NEW APP",
      })
      console.log("action")
    })
    .then(res=>{
      getActionData()
    })
  }

  useEffect(()=>{
    getActionData()
  },[])

  const getActionData=()=>{
    axios.get("http://localhost:8080/actionArray").then((res)=>{
      setActionData(res.data)
      setActionNum(res.data.length)
      console.log("action")
      if(res.data.length>=5){
        setActionButton(true)
      }
      else{
        setActionButton(false)
      }
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }


  const handleSubmit=(e)=>{
    const response = axios.patch(`http://localhost:8080/ruleArray/${data.length}`, { name: e.target.value }).then(()=>{
      console.log(response.name)
      // getData()
      // setName(input)
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  return (
    <div className="App">
      <div id="header">
      <div id="header_items">
        <img src="https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/arcgis-dashboards.png" width="20%" height="60%"></img>
        <div>
        <p>Demo Custom App</p>
        <p>APP NAME</p>
        </div>
        <img src="https://pngroyale.com/wp-content/uploads/2022/03/Right-Arrow-Download-Transparent-PNG-Image.png"></img>
        <div>
        <p>Assessment</p>
        <p>STAGE</p>
        </div>
        <img src="https://pngroyale.com/wp-content/uploads/2022/03/Right-Arrow-Download-Transparent-PNG-Image.png"></img>
        <div>
        <p>Create PO</p>
        <p>BUTTON</p>
        </div>
        <img src="https://pngroyale.com/wp-content/uploads/2022/03/Right-Arrow-Download-Transparent-PNG-Image.png"></img>
        <p>Button Rules</p>
      </div>
      <div id="dataSide">
        <p>App saved on 27 July 2017 4:32pm</p>
        <button id="saveEdit" onClick={handleSubmit}>Done</button>
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
              src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png" width="17px" height="15px"></img>
          </div>
          )}
         <button id="newRulebutton" disabled={button} onClick={addRule}>Add New Rule</button>
        </div>
      </div>

      {/* right part of the dashboard */}
      <div id="rightDashboard">
        {/* add new condition */}
        <p>{name}</p>
        <br/>
        <p>Button Name</p>
        <input type="text"
        onClick={handleSubmit} 
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
          <button id="conditionButton">Add New Condition</button>


      {/* add another action */}
      
      <p>Perform the following action</p>
      {actionData.map((index)=>
      <div id="actionPart" style={{display:"flex"}} key={index.id}>  
        <p>{index.action}</p>
        <img id="deleteIcon"
             onClick={()=>{
              axios.delete(`http://localhost:8080/actionArray/${index.id}`).then(res=>{
              getActionData();
              })
          }}
              src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png" width="17px" height="15px"></img>
      </div>
      )}
      <button id="actionbutton" disabled={actionButton} onClick={addAction}>Add New Action</button>

      </div>

    </div>
    </div>
  )
}

export default App
