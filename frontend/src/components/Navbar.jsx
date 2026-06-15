import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between transition-all duration-300 ${
      scrolled ? 'bg-[#060810]/80 backdrop-blur-md border-b border-white/10' : ''
    }`}>
      {/* Logo */}
      <div className="text-white font-black text-xl tracking-tight">
        Doc<span className="text-[#6C63FF]">Forge</span> AI
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-[#8892B0] hover:text-white text-sm transition">Features</a>
        <a href="#" className="text-[#8892B0] hover:text-white text-sm transition">Templates</a>
        <a href="#" className="text-[#8892B0] hover:text-white text-sm transition">Pricing</a>
      </div>

      {/* CTA */}
      <button className="px-5 py-2 rounded-lg bg-[#6C63FF] text-white text-sm font-semibold hover:opacity-90 transition">
        Get Started
      </button>
    </nav>
  )
}

export default Navbar