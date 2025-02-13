import React,{useState, useEffect} from 'react'
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
function LoginScreen() {
   
    const[email, setemail]=useState('');
    const[password,setpassword]=useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seePassword, setseePassword]=useState(false);
   
async function login(){
if(email==='hamrohotel223@gmail.com' && password==='HamroHotel@000'){
    localStorage.setItem('currentUser',JSON.stringify({name:'Admin', isAdmin:true}));
    window.location.href="/admin";
    return;
}




const user={
        email,
        password,
        
    }
    try {
        setLoading(true)
        const response = await axios.post('/api/users/login', user); // Await the response
        // console.log('User logined:', response.data); // Log success message
        setLoading(false);

localStorage.setItem('currentUser', JSON.stringify(response.data))
window.location.href='/home'


      } catch (error) {
        // console.error('Error during login:', error.response?.data || error.message);
        // alert(error.response?.data?.message || 'An error occurred during login.');
        setLoading(false);
        setError(true);
    }
    setemail(''); 
setpassword('');
  }

  return (
    <div className='log-in'>
        {loading && <Loader />}
        
<div className="box">
    <div className="field">
        {error && (<Error message='Invalid username or password' />)}
        <div>
            <h2>Login</h2>
            <input type="text" className='form-control' placeholder='email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <div className="password-field">
            <div className="password-wrapper">
            <input type={seePassword ? 'text':"password"} className='form-control' placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
           <span 
           className="toggle-password"
           onClick={()=>setseePassword(!seePassword)}>
           {seePassword? '👁️' : '🙈'}
           </span>
            </div>
            </div>
           
      <button className='btn btn-primary' onClick={login}>Login</button>
        </div>
    </div>
</div>

    </div>
  )
}

export default LoginScreen