import { useState } from "react"

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("https://contactbck.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password.trim()
        })
      })

      const data = await res.text()

      if (!res.ok) {
        setError(data || "Something went wrong")
      } else {
        setSuccess(data || "Account created successfully")
        setForm({ username: "", email: "", password: "" })
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Server error")
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-[900px] h-[520px] rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#111] shadow-2xl overflow-hidden border border-[#1f1f1f]">

        <img
          src="/vnn.png"
          alt="illustration"
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
              name="username"
              type="text"
              required
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              disabled={loading}
              className="w-full mb-3 px-3 py-2 bg-[#1a1a1a] text-gray-300 rounded outline-none focus:ring-1 focus:ring-teal-400"
            />

            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              disabled={loading}
              className="w-full mb-3 px-3 py-2 bg-[#1a1a1a] text-gray-300 rounded outline-none focus:ring-1 focus:ring-teal-400"
            />

            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              disabled={loading}
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
              <a href="/login" className="text-teal-400 text-sm hover:underline">
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