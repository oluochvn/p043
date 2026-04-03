import { useState } from "react"

function App() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: name,
          password: password
        })
      })

      const data = await res.text()

      if (!res.ok) {
        setError(data)
      } else {
        alert(data)
      }
    } catch (err) {
      setError("Server error")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-[900px] h-[520px] rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#111] shadow-2xl overflow-hidden border border-[#1f1f1f]">
        
        <img
          src="/vnn.png"
          className="absolute left-0 bottom-0 w-[55%] object-contain opacity-90"
        />

        <div className="absolute right-0 top-0 h-full w-[45%] flex items-center justify-center">
          <form onSubmit={handleLogin} className="w-[75%]">
            <h1 className="text-white text-xl mb-6 font-medium">
              Welcome Back VN
            </h1>

            {error && (
              <div className="mb-4 text-red-400 text-sm">{error}</div>
            )}

            <input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Name"
              className="w-full mb-4 px-3 py-2 bg-[#1a1a1a] text-gray-300 rounded outline-none focus:ring-1 focus:ring-teal-400"
            />

            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full mb-4 px-3 py-2 bg-[#1a1a1a] text-gray-300 rounded outline-none focus:ring-1 focus:ring-teal-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-teal-400 text-black rounded font-medium hover:bg-teal-300 transition disabled:opacity-50"
            >
              {loading ? "Entering..." : "Enter"}
            </button>

            <div className="flex items-center mt-4 gap-2">
              <span className="text-gray-500 text-sm">New identity?</span>
              <a href="/signup" className="text-teal-400 text-sm hover:underline">
                Sign Up
              </a>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default App