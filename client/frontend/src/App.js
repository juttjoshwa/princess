import { useState } from "react";

function App() {
  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [users,setUsers]= useState ([])

  const handleSubmit = e => {
   e.preventdefault()
   console.log(name , email)
  }
  fetch('http://localhost:5000/users').then(r => r.json()).then(users => setUsers(users))

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type= 'text' value={name} onChange={e => setName(e.target.value)} />
        <br/>
        <label>Email</label>
        <input type='text'  value={email} onChange={e => setEmail(e.target.value)}/>
        <button type="Submit">Submit</button>

        <div >
          {users.map(u=><div key={u._id}><p>{u.name}</p></div>)}
        </div>

      </form>

    </div>
  );
}

export default App;
