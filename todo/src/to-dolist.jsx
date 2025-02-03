import React, { Fragment, useState } from "react";
import '../src/todo.css'

export default function TODO(){
    const[create,add]=useState([]) // usestate hook basically manages the states of the components

const[initialvalue,aftervalue]=useState('')
 

const additems =()=>{    
     if(initialvalue){
     add([...create,initialvalue])
    aftervalue('')
     }
  
}
const Remove=(index)=>{
  const updated= [...create.slice(0,index),
                          ...create.slice(index+1)
  ]
  add(updated)
  }
const createlist = create.map((item, index) => (
    <div key={index}>
    <li >{item}</li>
    <button className="add" onClick={()=>Remove(index)}  ><img src="remove.png" className="addimg" alt="del"/>DEL</button>
   
    </div>
  ));

return(
<Fragment>
    <div className="heading">
       <img src="todo.png" className="image"/>
<h1>CREATE</h1><h1>YOUR</h1><h1>LIST </h1>
</div>
<div className="input">
    <input type="text" className="inputbox" id="list" value={initialvalue} onChange={(event)=>aftervalue(event.target.value)} />
</div>
<div className="buttons">
<button className="add" onClick={additems}><img src="add.png" className="addimg" alt="add"/>ADD</button>



</div>
<div className="listbox">
<ul className="list">
{createlist}
</ul>
</div>

</Fragment>

)

}
