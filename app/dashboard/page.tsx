"use client"

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "moment/locale/fr"

moment.locale("fr")
const localizer = momentLocalizer(moment)

// Traductions personnalisées pour react-big-calendar
const messages = {
  allDay: "Journée",
  previous: "Précédent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Événement",
  noEventsInRange: "Aucun événement dans cette plage.",
}

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [note, setNote] = useState("")
  const [mood, setMood] = useState("neutral")

  const handleSelectDate = (date) => {
    setSelectedDate(date)
    // TODO: Fetch note and mood for the selected date from Firebase
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Save note and mood to Firebase
    console.log("Saving note:", note, "and mood:", mood, "for date:", selectedDate)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
          onSelectSlot={({ start }) => handleSelectDate(start)}
          selectable
          messages={messages}
          formats={{
            monthHeaderFormat: "MMMM YYYY",
            weekdayFormat: "dddd",
            dayHeaderFormat: "dddd D MMMM",
          }}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Ajouter une note pour le {moment(selectedDate).format("LL")}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              id="note"
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-gray-700">
              Humeur
            </label>
            <select
              id="mood"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="happy">😊 Heureux</option>
              <option value="neutral">😐 Neutre</option>
              <option value="sad">😢 Triste</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  )
}

