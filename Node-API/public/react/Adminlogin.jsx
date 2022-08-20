import { useState } from 'react';
// import "../css/login.css";
import axios from "axios";


function Adminlogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleApi = () => {
    console.log({email, password})
    axios.post('http://54.202.17.76/node_api', {
      email : email,
      password: password
    })
    .then(result => {
      console.log(result.data)
      alert('success')
    })
    .catch(error =>{
      alert('service error')
      console.log(error)

    })
  }
  return (
    <div className="Adminlogin">
      Email : <input value={email} onChange={handleEmail} type="text" /> <br />
      Password : <input value={password} onChange={handlePassword} type="text" /> <br />
     {/* <Login/> */}
     <button onClick ={handleApi}> Login</button>
       
       
    </div>
  );
}

export default Adminlogin;
