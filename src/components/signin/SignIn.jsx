import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './signin.scss';

const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Déclenche l'action de connexion avec les informations fournies
    dispatch(login({ email, password }));
  };

  return (
    <div className="signInContainer">
      <main className="signInSection">
        <section className="signInContent">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputWrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                required
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                required
              />
            </div>
            {error && <p className="error">{error}</p>} 
            <button className="signInButton" type="submit">Sign In</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignIn;

