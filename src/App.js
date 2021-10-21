import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users,setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handlerAddUser = (e) =>{
    e.preventDefault()
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name:name,email:email}
    fetch('http://localhost:5000/users',{
      method : 'post',
      headers : {
        'content-type' : 'application/json'
      },
      body:JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const addedUser = data;
      const newUsers = [...users,addedUser];
      console.log(newUser);
      setUsers(newUsers);
    })
    console.log(name,email);
  }

  return (
    <div className="App">
     <form onSubmit={handlerAddUser}>
      <input type="text" ref={nameRef} placeholder="Your Name" />
      <input type="email" ref={emailRef} name="email" placeholder="Your Email" id="" />
      <input type="submit" value="Submit" />
     </form>
     <ul>
      {
        users.map(user => <li key={user.id}>{user.name}</li> )
      }
     </ul>
    </div>
  );
}

export default App;
