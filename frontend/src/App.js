import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [users,setUsers]= useState ([])

  useEffect(() => {
    axios.get("http://localhost:4050/users").then(response => {
      console.log(response.data);
      setUsers(response.data);
    }).catch(error => {
      console.log(error);
    })
  },[])

  const handleSubmit = (e) => {
   e.preventDefault()
   console.log("inside handle submit")
   axios.post(`http://localhost:4050/users`,{
     name: name,
     Email : email
  }).then((response) => {
    console.log(response.data.data.name);
    setUsers([...users,response.data.data])
  }).catch(error => {
    console.log(`error from server ${error}`)
  })

  /* clear field after submit */
  setName('');
  setEmail('');
  }



  

  return (
    <div>
      <form action="/" method="post" >
        <label>Name</label>
        <input type= 'text' value={name} onChange={e => setName(e.target.value)} />
        <br/>
        <label>Email</label>
        <input type='text'  value={email} onChange={e => setEmail(e.target.value)}/>
        <button type="Submit" onClick={(e) => handleSubmit(e)}>Submit</button>

        <div >
          {users.map(user=>
            <div key={user._id}>
            <p>{user.name}</p>
          </div>)}
        </div>

      </form>

    </div>
  );
}

export default App;
