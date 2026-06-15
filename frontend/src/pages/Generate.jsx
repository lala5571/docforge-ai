import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { generateDocument, createOrder } from '../services/api'

function Generate() {
  const [format, setFormat] = useState('ppt')
  const [topic, setTopic] = useState('')
  const [instructions, setInstructions] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [docData, setDocData] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!topic) return
    setLoading(true)
    setError('')
    setStep(2)
    try {
      const res = await generateDocument({ topic, format, instructions })
      setDocData(res.data)
      setStep(3)
    } catch (err) {
      setError('Generation failed! Try again.')
      setStep(1)
    }
    setLoading(false)
  }

  const handlePayment = async () => {
    try {
      const res = await createOrder({ document_id: docData.document_id })
      const { order_id, amount, key } = res.data

      const options = {
        key: key,
        amount: amount,
        currency: 'INR',
        name: 'DocForge AI',
        description: `${format === 'ppt' ? 'PowerPoint' : 'Word'} — ${topic}`,
        order_id: order_id,
        handler: function(response) {
          alert('Payment Successful! Downloading...')
          window.location.href = `http://localhost:8000/media/clean/${docData.document_id}.${format === 'ppt' ? 'pptx' : 'docx'}`
        },
        theme: { color: '#6C63FF' }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      setError('Payment failed! Try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#060810] text-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#060810]/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="text-white font-black text-xl">
          Doc<span className="text-[#6C63FF]">Forge</span> AI
        </Link>
        <Link to="/dashboard" className="text-[#8892B0] text-sm hover:text-white transition">
          ← Dashboard
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-black mb-2">Generate Document ⚡</h1>
              <p className="text-[#8892B0]">Enter your topic — AI does the rest.</p>
            </div>

            <div className="mb-6">
              <label className="text-[#8892B0] text-xs font-bold tracking-widest mb-2 block">SELECT FORMAT</label>
              <div className="flex bg-white/5 rounded-xl p-1 gap-1">
                <button onClick={() => setFormat('ppt')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${format === 'ppt' ? 'bg-[#6C63FF] text-white' : 'text-[#8892B0]'}`}>
                  📊 PowerPoint <span className="text-[#00D4AA]">₹5</span>
                </button>
                <button onClick={() => setFormat('word')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${format === 'word' ? 'bg-[#6C63FF] text-white' : 'text-[#8892B0]'}`}>
                  📝 Word Doc <span className="text-[#00D4AA]">₹7</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[#8892B0] text-xs font-bold tracking-widest mb-2 block">YOUR TOPIC</label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Climate Change Impact on Agriculture in India"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#6C63FF] transition placeholder:text-white/20"
              />
            </div>

            <div className="mb-8">
              <label className="text-[#8892B0] text-xs font-bold tracking-widest mb-2 block">SPECIAL INSTRUCTIONS (optional)</label>
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                placeholder="e.g. Focus on statistics, use formal tone..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#6C63FF] transition placeholder:text-white/20 resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8A84FF] text-white font-black text-lg hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ⚡ Generate — {format === 'ppt' ? '₹5' : '₹7'}
            </button>
          </>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="text-6xl mb-6 animate-bounce">🤖</div>
            <h2 className="text-2xl font-black mb-3">AI is generating...</h2>
            <p className="text-[#8892B0] mb-8">Filling your template with AI content</p>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] rounded-full animate-pulse" style={{width: '70%'}} />
            </div>
          </div>
        )}

        {step === 3 && docData && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-black mb-2">Preview Ready! 👁️</h1>
              <p className="text-[#8892B0]">Watermarked preview — Pay to download clean file.</p>
            </div>

            <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-6 select-none" onContextMenu={e => e.preventDefault()}>
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">{format === 'ppt' ? '📊' : '📝'}</div>
                <h3 className="text-white font-black text-xl mb-2">{docData.content.title}</h3>
                <p className="text-[#8892B0] text-sm">
                  {format === 'ppt' ? `${docData.content.slides.length} slides` : `${docData.content.sections.length} sections`} — AI Generated
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-white/10 font-black text-3xl rotate-[-35deg] select-none">DOCFORGE AI PREVIEW</div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-black text-lg hover:opacity-90 transition mb-3"
            >
              💳 Pay {format === 'ppt' ? '₹5' : '₹7'} & Download
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full py-3 rounded-xl border border-white/10 text-[#8892B0] text-sm hover:border-white/30 transition"
            >
              ← Generate Again
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Generate