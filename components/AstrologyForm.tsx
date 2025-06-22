"use client"

import { useState } from "react"

export default function AstrologyForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-4">
      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="input" required />
      <input type="date" name="date" placeholder="Date of Birth" value={formData.date} onChange={handleChange} className="input" required />
      <input type="time" name="time" placeholder="Time of Birth" value={formData.time} onChange={handleChange} className="input" required />
      <input type="text" name="location" placeholder="Place of Birth" value={formData.location} onChange={handleChange} className="input" required />
      <button type="submit" className="btn btn-primary">Generate Astrology Insights</button>
    </form>
  )
}
