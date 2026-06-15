import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    const geometry = new THREE.BufferGeometry()
    const count = 3000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({ color: 0x6C63FF, size: 0.015 })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    camera.position.z = 3
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', onMouseMove)
    const animate = () => {
      requestAnimationFrame(animate)
      particles.rotation.y += 0.001
      particles.rotation.x += 0.0005
      camera.position.x += (mouseX - camera.position.x) * 0.05
      camera.position.y += (-mouseY - camera.position.y) * 0.05
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // GSAP scroll animations
    gsap.utils.toArray('.fade-up').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      )
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <div className="relative bg-[#060810] min-h-full">
      <Navbar />
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="fade-up mb-6 px-4 py-2 rounded-full border border-[#6C63FF]/30 bg-[#6C63FF]/10 text-[#6C63FF] text-sm font-medium">
          ⚡ India's first AI doc generator at ₹5
        </div>
        <h1 className="fade-up text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
          Create Any Doc<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#00D4AA]">
            with AI in Seconds
          </span>
        </h1>
        <p className="fade-up text-[#8892B0] text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Upload your college or office template — AI fills it with your topic. Download in 30 seconds.
        </p>
        <div className="fade-up flex gap-4 flex-wrap justify-center mb-12">
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8A84FF] text-white font-bold text-lg hover:opacity-90 transition">
            Generate Now
          </button>
          <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-bold text-lg hover:border-[#6C63FF] transition">
            See Templates
          </button>
        </div>
        <div className="fade-up flex gap-4 flex-wrap justify-center">
          <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm">
            📊 PowerPoint — <span className="text-[#00D4AA] font-bold">₹5</span>
          </div>
          <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm">
            📝 Word Doc — <span className="text-[#00D4AA] font-bold">₹7</span>
          </div>
          <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm">
            ⚡ Ready in <span className="text-[#00D4AA] font-bold">30 sec</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="fade-up text-center text-[#6C63FF] text-sm font-bold tracking-widest mb-3">FEATURES</p>
          <h2 className="fade-up text-center text-white text-4xl font-black mb-16 tracking-tight">
            Everything you need to ship docs fast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🤖', title: 'Claude AI Content', desc: 'AI writes professional content based on your topic in under 30 seconds.' },
              { icon: '📁', title: 'Your Own Template', desc: 'Upload your college or office format — we fill it exactly as you want.' },
              { icon: '💳', title: 'Pay Per Doc', desc: 'No subscription. ₹5 for PPT, ₹7 for Word. Pay only when you generate.' },
              { icon: '👁️', title: 'Free Preview', desc: 'See watermarked preview before paying. Know what you get first.' },
              { icon: '⚡', title: 'Instant Download', desc: 'Clean .pptx or .docx file ready immediately after payment.' },
              { icon: '📱', title: 'All Devices', desc: 'Works on mobile, tablet, laptop — any device, any OS.' },
            ].map((f, i) => (
              <div key={i} className="fade-up bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#6C63FF]/50 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-[#8892B0] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="relative z-10 py-24 px-4 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <p className="fade-up text-center text-[#00D4AA] text-sm font-bold tracking-widest mb-3">HOW IT WORKS</p>
          <h2 className="fade-up text-center text-white text-4xl font-black mb-16 tracking-tight">
            From topic to document in 4 steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '✏️', title: 'Enter Topic', desc: 'Type your topic and any special instructions.' },
              { step: '02', icon: '📁', title: 'Pick Template', desc: 'Choose from our templates or upload your own.' },
              { step: '03', icon: '💳', title: 'Pay ₹5 or ₹7', desc: 'Quick UPI payment — PhonePe, GPay, Paytm all work.' },
              { step: '04', icon: '⬇️', title: 'Download', desc: 'Clean file ready instantly. No watermark.' },
            ].map((s, i) => (
              <div key={i} className="fade-up relative text-center p-6">
                <div className="text-6xl font-black text-white/5 mb-2">{s.step}</div>
                <div className="text-4xl mb-4 -mt-6">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-[#8892B0] text-sm leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-12 right-0 text-white/20 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="fade-up text-center text-[#6C63FF] text-sm font-bold tracking-widest mb-3">PRICING</p>
          <h2 className="fade-up text-center text-white text-4xl font-black mb-16 tracking-tight">
            Simple. Cheap. No surprises.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="fade-up bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-[#6C63FF]/50 transition-all duration-300">
              <div className="text-4xl mb-4">📊</div>
              <div className="text-white font-black text-xl mb-2">PowerPoint</div>
              <div className="text-6xl font-black text-[#00D4AA] my-4">₹5</div>
              <div className="text-[#8892B0] text-sm mb-6">per presentation</div>
              <ul className="text-left space-y-3 mb-8">
                {['AI generated content', 'Your uploaded template', 'Up to 15 slides', 'Download as .pptx', 'Saved to dashboard'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#8892B0] text-sm">
                    <span className="text-[#00D4AA] font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-[#6C63FF] text-[#6C63FF] font-bold hover:bg-[#6C63FF] hover:text-white transition">
                Generate PPT
              </button>
            </div>
            <div className="fade-up bg-[#6C63FF]/10 border border-[#6C63FF]/40 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6C63FF] text-white text-xs font-bold px-4 py-1 rounded-full">POPULAR</div>
              <div className="text-4xl mb-4">📝</div>
              <div className="text-white font-black text-xl mb-2">Word Document</div>
              <div className="text-6xl font-black text-[#00D4AA] my-4">₹7</div>
              <div className="text-[#8892B0] text-sm mb-6">per document</div>
              <ul className="text-left space-y-3 mb-8">
                {['AI generated content', 'Your uploaded template', 'Up to 10 pages', 'Download as .docx', 'Saved to dashboard'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#8892B0] text-sm">
                    <span className="text-[#00D4AA] font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-[#6C63FF] text-white font-bold hover:opacity-90 transition">
                Generate Word
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 py-12 px-4 border-t border-white/10 text-center">
        <div className="text-white font-black text-2xl mb-2">
          Doc<span className="text-[#6C63FF]">Forge</span> AI
        </div>
        <p className="text-[#8892B0] text-sm mb-4">AI-powered document generation — Made in India 🇮🇳</p>
        <p className="text-[#8892B0] text-xs">₹5 per PPT · ₹7 per Word · Powered by Claude AI</p>
      </div>

    </div>
  )
}

export default App