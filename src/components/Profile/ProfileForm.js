import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation 

    // send request 

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-MVZV20Q_pw4JIthVCDIfEkUOUYiGXoA',{
      method: 'POST',
      body:JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: true,
      }),
      headers:{
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if(res.ok){
        return res.json();
      }else{
        // show error module
        let resError = 'Authentication fieled!';

        throw new Error(resError); 
      }
    }).then((data)=>{
      console.log(data);
      history.replace('/');
    }).catch((error)=>{
      alert(error.message);
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
