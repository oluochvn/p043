import { useState } from "react"

function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })

      const data = await res.text()

      if (!res.ok) {
        setError(data)
      } else {
        setSuccess(data)
        setUsername("")
        setEmail("")
        setPassword("")
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
          <form onSubmit={handleSignup} className="w-[75%]">
            <h1 className="text-white text-xl mb-6 font-medium">
              Create Account
            </h1>

            {error && (
              <div className="mb-3 text-red-400 text-sm">{error}</div>
            )}

            {success && (
              <div className="mb-3 text-green-400 text-sm">{success}</div>
            )}

            <input
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full mb-3 px-3 py-2 bg-[#1a1a1a] text-gray-300 rounded outline-none focus:ring-1 focus:ring-teal-400"
            />

            <input
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full mb-3 px-3 py-2 bg-[#1a1a1a] text-gray-300 rounded outline-none focus:ring-1 focus:ring-teal-400"
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
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <div className="flex items-center mt-4 gap-2">
              <span className="text-gray-500 text-sm">Already have one?</span>
              <a href="/" className="text-teal-400 text-sm hover:underline">
                Login
              </a>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Signup