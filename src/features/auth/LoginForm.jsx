
import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { Slide, toast } from "react-toastify";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import styled from "styled-components";
import { useData } from "../../context/useDate";
import { useNavigate } from "react-router-dom";


const IconShow = styled(HiEye)`
    position: absolute;
    top: 170px;
    right: 61px;
    cursor: pointer;
    font-size: 17px; 
    color:#097B94 ; 
`
const IconNotShow = styled(HiEyeSlash)`
  position: absolute;
  top: 170px;
  right: 61px;
  cursor: pointer;
  font-size: 17px; 
  color:#097B94;
`

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { setToken } = useData();
  const naviagate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      password
    };


    login(email, password);
  }

  async function login(email, password) {
    setLoading(true);
    const res = await fetch('https://we-care-server-seven.vercel.app/api/v1/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      setLoading(false);
      console.error("Login failed");
      toast.error('User is Not exist!', {
        transition: Slide,
        autoClose: 2000,
        delay: 1000,
        pauseOnHover: false

      });

      return;
    }

    const data = await res.json();
    setLoading(false)
    toast.success('User Login Successfully!', {
      transition: Slide,
      autoClose: 2000,
      delay: 1000,
      pauseOnHover: false

    });
    setToken(data?.token);

    naviagate('/dashboard')

  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address" orientation="vertical">
        <Input
          kind="form"
          type="email"
          id="email"
          disabled={loading}
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" orientation="vertical">
        <Input
          kind="form"
          type={show ? 'text' : 'password'}
          id="password"
          disabled={loading}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      {show ? <IconShow onClick={() => setShow(false)} /> : <IconNotShow onClick={() => setShow(true)} />}
      <FormRowVertical orientation="vertical">
        <Button size="large" disabled={loading} variation='basic'>
          {loading ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
