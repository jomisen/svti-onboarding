'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ManagerPortal() {
  const [formData, setFormData] = useState({
    employeeName: '',
    managerName: '',
    buddyName: '',
    teamName: '',
    startDate: '',
    meetingInfo: '',
    slackWebhook: '',
    language: 'sv' as 'sv' | 'en'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields (slackWebhook is optional for testing)
    if (!formData.employeeName || !formData.managerName || !formData.buddyName ||
        !formData.teamName || !formData.startDate || !formData.meetingInfo) {
      toast.error('Alla obligatoriska fält måste fyllas i')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/manager/create-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Något gick fel')
      }

      setGeneratedUrl(result.url)
      toast.success('Onboarding-sida skapad!')

      // Reset form
      setFormData({
        employeeName: '',
        managerName: '',
        buddyName: '',
        teamName: '',
        startDate: '',
        meetingInfo: '',
        slackWebhook: '',
        language: 'sv'
      })

    } catch (error) {
      console.error('Error creating page:', error)
      toast.error(error instanceof Error ? error.message : 'Något gick fel. Försök igen.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const copyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl)
      toast.success('URL kopierad!')
    }
  }

  if (generatedUrl) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎉 Onboarding-sida skapad!
          </h2>

          <p className="text-gray-600 mb-6">
            Kopiera länken nedan och skicka den till den nya medarbetaren:
          </p>

          <div className="bg-gray-50 border-2 border-svt-purple rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Personlig onboarding-länk:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={generatedUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-svt-purple text-white rounded hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                📋 Kopiera
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
            <h3 className="font-semibold text-sm mb-2 text-blue-900">
              📌 Viktigt att komma ihåg:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Länken är giltig i 30 dagar</li>
              <li>• När medarbetaren skickar formuläret får du en Slack-notis</li>
              <li>• Spara länken om du behöver skicka den igen</li>
            </ul>
          </div>

          <button
            onClick={() => setGeneratedUrl(null)}
            className="text-svt-purple hover:text-svt-pink font-semibold"
          >
            ← Skapa en ny onboarding-sida
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Skapa personlig onboarding-sida
      </h2>
      <p className="text-gray-600 mb-6">
        Fyll i informationen nedan för att skapa en personlig välkomstsida för den nya medarbetaren.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Employee Name */}
        <div>
          <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-2">
            Medarbetarens namn <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent"
            placeholder="Anna Andersson"
          />
        </div>

        {/* Manager Name */}
        <div>
          <label htmlFor="managerName" className="block text-sm font-medium text-gray-700 mb-2">
            Ditt namn (chef) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="managerName"
            name="managerName"
            value={formData.managerName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent"
            placeholder="Emelie Jomer"
          />
        </div>

        {/* Buddy Name */}
        <div>
          <label htmlFor="buddyName" className="block text-sm font-medium text-gray-700 mb-2">
            Fadder <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="buddyName"
            name="buddyName"
            value={formData.buddyName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent"
            placeholder="Erik Svensson"
          />
        </div>

        {/* Team Name */}
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
            Team <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent"
            placeholder="Webb-teamet"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Startdatum <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent"
          />
        </div>

        {/* Meeting Info */}
        <div>
          <label htmlFor="meetingInfo" className="block text-sm font-medium text-gray-700 mb-2">
            Tid och plats för första dagen <span className="text-red-500">*</span>
          </label>
          <textarea
            id="meetingInfo"
            name="meetingInfo"
            value={formData.meetingInfo}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent"
            placeholder="09:00, Gröna rummet, våning 3"
          />
        </div>

        {/* Slack Webhook */}
        <div>
          <label htmlFor="slackWebhook" className="block text-sm font-medium text-gray-700 mb-2">
            Slack Webhook URL <span className="text-gray-500">(valfritt)</span>
          </label>
          <input
            type="url"
            id="slackWebhook"
            name="slackWebhook"
            value={formData.slackWebhook}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent font-mono text-sm"
            placeholder="https://hooks.slack.com/services/T00/B00/xxx"
          />
          <p className="text-xs text-gray-500 mt-1">
            Om du lämnar detta tomt kan du fortfarande testa - men du får ingen notis när formuläret skickas
          </p>
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
            Språk <span className="text-red-500">*</span>
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent"
          >
            <option value="sv">Svenska</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-svt-purple to-svt-pink text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
        >
          {isSubmitting ? 'Skapar sida...' : 'Skapa onboarding-sida'}
        </button>
      </form>

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-sm text-yellow-800">
          <strong>🔒 GDPR & Privacy:</strong> Informationen sparas tillfälligt i 30 dagar och raderas sedan automatiskt. Ingen permanent lagring sker.
        </p>
      </div>
    </div>
  )
}
