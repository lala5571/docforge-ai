import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen bg-[#060810] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C63FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-white font-black text-2xl mb-1">
            Doc<span className="text-[#6C63FF]">Forge</span> AI
          </div>
          <p className="text-[#8892B0] text-sm">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              isLogin ? 'bg-[#6C63FF] text-white' : 'text-[#8892B0]'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              !isLogin ? 'bg-[#6C63FF] text-white' : 'text-[#8892B0]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Google Button */}
        <button className="w-full py-3 rounded-xl border border-white/20 text-white text-sm font-semibold mb-4 flex items-center justify-center gap-3 hover:border-white/40 transition">
          <span className="text-lg">🔵</span> Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[#8892B0] text-xs">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-[#8892B0] text-xs font-semibold mb-1 block tracking-wider">FULL NAME</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Subhankar Das"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#6C63FF] transition placeholder:text-white/20"
              />
            </div>
          )}
          <div>
            <label className="text-[#8892B0] text-xs font-semibold mb-1 block tracking-wider">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#6C63FF] transition placeholder:text-white/20"
            />
          </div>
          <div>
            <label className="text-[#8892B0] text-xs font-semibold mb-1 block tracking-wider">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#6C63FF] transition placeholder:text-white/20"
            />
          </div>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8A84FF] text-white font-bold text-sm hover:opacity-90 transition mt-2">
            {isLogin ? 'Login →' : 'Create Account →'}
          </button>
        </div>

        <p className="text-center text-[#8892B0] text-xs mt-6">
          <Link to="/" className="hover:text-white transition">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}

export default Login