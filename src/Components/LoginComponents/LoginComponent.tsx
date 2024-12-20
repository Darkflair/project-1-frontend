import React, { FormEvent, useState } from 'react'

type UserInputProps = 
{username: string, setUsername: React.Dispatch<React.SetStateAction<string>>, password: string, setPassword: React.Dispatch<React.SetStateAction<string>>, handleSubmit: any, handleRegister: any, loading: boolean};

function LoginComponent({username, setUsername, password, setPassword, handleSubmit, handleRegister, loading}: UserInputProps) {
  
  return (
      <form onSubmit={handleSubmit}>

        <label>
          Username:
          <input type='text' value={username} onChange={(e: any) => setUsername(e.target.value)}></input>
        </label>
        <br/>   
        <label>
          Password:
          <input type='password' value={password} onChange={(e: any) => setPassword(e.target.value)}></input>
        </label>
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <button className="login-button" onClick={handleRegister} disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>
      </form>    
  )
}

export default LoginComponent