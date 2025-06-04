"use client"

import Link from "next/link"
import axios from 'axios'
import { useState } from "react"
import Cookies from 'js-cookie'

export default function Note() {
  const [titleInput, setTitleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [message, setMessage] = useState(['', false])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!titleInput || !descriptionInput) {
      setMessage(["Preencha todos os campos!", false])
      return
    }

    try {
      const res = await axios.post(
        'https://notebrains.onrender.com/api/v1/me/orgs/new/notes',
        {
          title: titleInput,
          notes: descriptionInput
        },
        {
          headers: {
            'x-api-key': 'kingjs_4534',
            'Authorization': `Bearer ${Cookies.get("token")}`,
            'ngrok-skip-browser-warning': 'true'
          }
        }
      )

      setMessage([res?.data?.message, true])
      setTitleInput('')
      setDescriptionInput('')
    } catch (err) {
      console.error("Erro ao criar nota:", err?.response?.data || err.message)
      setMessage([err?.response?.data?.data, false])
    }
  }

  return (
    <div className="stanContainer1 stanContainer2 stanFull2 centerContainer AnimaAppear1">
      <header>
        <h2>Create a note here</h2>
        <Link href={'/new'}>back</Link>
      </header>
        <form className="stanForm1" onSubmit={handleSubmit}>
          <input
            className="hoverMega"
            placeholder="Title"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <textarea
            className="hoverMega"
            placeholder="Description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <button className="hoverOpac" type="submit">Create</button>
        </form>
      <div className="msgContainer">
        {message[0] ? (
          <span style={{ color: message[1] ? 'green' : 'red' }}>
            {message[0]}
          </span>
        ) : (
          <span>Preencha os dados para criar uma nota!</span>
        )}
      </div>
    </div>
  )
}
