import { Link } from 'react-router-dom'

function Dashboard() {
  const docs = [
    { id: 1, title: 'Climate Change PPT', type: 'ppt', date: '07 Jun 2026', status: 'done' },
    { id: 2, title: 'Marketing Strategy', type: 'word', date: '06 Jun 2026', status: 'done' },
    { id: 3, title: 'Business Plan PPT', type: 'ppt', date: '05 Jun 2026', status: 'done' },
  ]

  return (
    <div className="min-h-screen bg-[#060810] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#060810]/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="text-white font-black text-xl">
          Doc<span className="text-[#6C63FF]">Forge</span> AI
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-[#6C63FF] flex items-center justify-center text-sm font-bold">S</div>
          <span className="text-[#8892B0] text-sm">Subhankar</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-black mb-1">Welcome back, Subhankar! 👋</h1>
          <p className="text-[#8892B0]">Generate a new document or download your previous ones.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Docs', value: '3', icon: '📄' },
            { label: 'PPTs Made', value: '2', icon: '📊' },
            { label: 'Words Made', value: '1', icon: '📝' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black text-[#00D4AA]">{s.value}</div>
              <div className="text-[#8892B0] text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Generate button */}
        <Link to="/generate" className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#8A84FF] text-white font-bold text-lg mb-10 hover:opacity-90 transition">
          ⚡ Generate New Document
        </Link>

        {/* Previous docs */}
        <div>
          <h2 className="text-xl font-black mb-4">Your Documents</h2>
          <div className="space-y-3">
            {docs.map((doc) => (
              <div key={doc.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-[#6C63FF]/40 transition">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{doc.type === 'ppt' ? '📊' : '📝'}</div>
                  <div>
                    <div className="text-white font-semibold">{doc.title}</div>
                    <div className="text-[#8892B0] text-sm">{doc.date} · {doc.type === 'ppt' ? 'PowerPoint · ₹5' : 'Word Doc · ₹7'}</div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#6C63FF]/20 border border-[#6C63FF]/30 text-[#6C63FF] text-sm font-semibold hover:bg-[#6C63FF]/30 transition">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard