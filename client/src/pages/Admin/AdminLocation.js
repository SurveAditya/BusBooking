import React from 'react'
import './AdminLocation.css'
import axios from "axios";
import {useState} from 'react';

//name

const AdminLocation = () => {
    let l
    let str
    const [input, setInput] = useState({busname: "",});
    let update = async(running) => {
      const response = await axios.post("/api/locationRoute/setlocation", {busname:input.busname,running:running});
    }
  return (
    <div>
      <center>
      <input
                  name="busname"
                  value={input.busname}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="Bus Name"
                  type="text"
                  id="busname"
                />
      <br/>
      <br/>
      <button onClick={()=> update("start")} class="bn3637 bn38">Start</button>
      <br/>
      <br/>
	    <button onClick={()=> update("stop")} class="bn3637 bn38">Stop</button>
      </center>
    </div>
  )
}

export default AdminLocation
