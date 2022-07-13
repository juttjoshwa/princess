/* hooks */
import { useEffect, useState } from "react";

/* library */
import axios from "axios";

/* styles */
import "./style.css";

function App() {
  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [users,setUsers]= useState ([])

  /* fetch all the data from the database */
  useEffect(() => {
    axios.get("http://localhost:4050/users").then(response => {
      console.log(response.data);
      setUsers(response.data);
    }).catch(error => {
      console.log(error);
    })
  },[])

  /* Add User to the database */
  const handleSubmit = (e) => {
   e.preventDefault()
   console.log("inside handle submit")
   axios.post(`http://localhost:4050/users`,{
     name: name || "Empty",
     Email : email || "Empty"
  }).then((response) => {
    console.log(response.data.data.name);
   
    /* automatic update from the browser after adding to DB*/
    setUsers([...users,response.data.data])
  }).catch(error => {
    console.log(`error from server ${error}`)
  })

  /* clear field after submit */
  setName('');
  setEmail('');
  }



  

  return (
    <div className="Container">
      <form action="/" method="post" >
        <label>Name</label>
        <input type= 'text' value={name} onChange={e => setName(e.target.value)} required />
        <br/>
        <label>Email</label>
        <input type='email'  value={email} onChange={e => setEmail(e.target.value)} required/>
        <button className="submit-btn" type="Submit" onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
      <div  className="card-container">
          {users.map(user=>
            <div key={user._id} className="card">
            <p>{user.name}</p>
          </div>)}
        </div>

    </div>
  );
}

export default App;
