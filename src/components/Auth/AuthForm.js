import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  const submitHnadler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // add validation
    
    //
    if(isLogin){

    }else{
      setIsLoading(true);
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-MVZV20Q_pw4JIthVCDIfEkUOUYiGXoA",{
        method:'POST',
        body: JSON.stringify({
          email:enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers:{
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
        setIsLoading(false)
        if(res.ok){
          //....
        }else{
          return res.json().then((data)=>{
            // show error module
            let errorMessage = 'Authentication failed!';

            // if(data && data.error && data.error.message){
            //   errorMessage = data.error.message;
            // };
            alert(errorMessage);
            //console.log(data);
          });
        }
      });
    };
    event.target.reset();
    //console.log(enteredEmail,enteredPassward)
  };
  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHnadler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p style={{color:'white'}}>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
