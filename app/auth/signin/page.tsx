import React from 'react'
import Link from 'next/link'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className="card h-full bg-base bg-base-300">
        <div className="card-body flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form action="submit">
              <fieldset className="fieldset">
                  
                  <label htmlFor='email' className="label">Email</label>
                  <input type="email" id='email' name='email' className="input" placeholder="Email" />
                  
                  <label htmlFor="password" className="label">Password</label>
                  <input id='password' name='password' type="password" className="input" placeholder="Password" />
                  
                  <div><Link href="#" className="link link-hover">Forgot password?</Link></div>
                  <div>No Account? Sign up <Link href="/auth/signup" className="link link-hover">here!</Link></div>
                  <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </form>
                  
              </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage