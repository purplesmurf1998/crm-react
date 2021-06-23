import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Alert
} from "reactstrap";

import avatar from "../../assets/img/avatars/avatar.jpg";

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios({
      method: 'post',
      url: '/api/v1/auth/login',
      headers: {
          'Content-Type': 'application/json'
      },
      data: {
        email,
        password
      }
    }).then(function(response) {
      if (response.data.success) {
        setRedirect(true);
      } else {
        setPassword("");
        setError("Invalid credentials");
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
        
    }).catch((err) => {
      console.error(err);
      setPassword("");
      setError("Invalid credentials");
      setTimeout(() => {
        setError(null);
      }, 5000);
    });
  }
  
  return redirect ? (
    <Redirect to='/dashboard/default' />  
  ) : (
    <React.Fragment>
      <div className="text-center mt-4">
        <h2>Welcome back, Chris</h2>
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <Card>
        <CardBody>
          <div className="m-sm-4">
            <div className="text-center">
              <img
                src={avatar}
                alt="Chris Wood"
                className="img-fluid rounded-circle"
                width="132"
                height="132"
              />
            </div>
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  bsSize="lg"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  bsSize="lg"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <small>
                  <Link to="/auth/reset-password">Forgot password?</Link>
                </small>
              </FormGroup>
              <div>
                <CustomInput
                  type="checkbox"
                  id="rememberMe"
                  label="Remember me next time"
                  defaultChecked
                />
              </div>
              <div className="text-center mt-3">
                <Button color="primary" size="lg" type="submit">
                  Sign in
                </Button>
              </div>
              {error && <div className="d-flex justify-content-center mt-3"><p style={{color: 'red'}}>Invalid credentials</p></div>}
            </Form>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
};

export default SignIn;
