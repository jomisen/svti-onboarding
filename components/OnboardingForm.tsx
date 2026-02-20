'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import imageCompression from 'browser-image-compression'
import { useLanguage } from '@/contexts/LanguageContext'
import { useOnboarding } from '@/contexts/OnboardingContext'

interface FormErrors {
  name?: string
  email?: string
  computerChoice?: string
  photo?: string
}

export default function OnboardingForm() {
  const { t } = useLanguage()
  const { personalization } = useOnboarding()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    computerChoice: '',
    otherComputer: ''
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompressing, setIsCompressing] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSuccess, setIsSuccess] = useState(false)

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t('Namn är obligatoriskt', 'Name is required')
        if (value.trim().length < 2) return t('Namn måste vara minst 2 tecken', 'Name must be at least 2 characters')
        return undefined
      case 'email':
        if (!value.trim()) return t('E-post är obligatoriskt', 'Email is required')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('Ange en giltig e-postadress', 'Please enter a valid email address')
        return undefined
      case 'computerChoice':
        if (!value) return t('Vänligen välj en dator', 'Please choose a computer')
        return undefined
      default:
        return undefined
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setErrors(prev => ({ ...prev, photo: undefined }))

    if (!file.type.startsWith('image/')) {
      const error = t('Endast bildfiler är tillåtna (JPG, PNG, HEIC)', 'Only image files are allowed (JPG, PNG, HEIC)')
      setErrors(prev => ({ ...prev, photo: error }))
      toast.error(error)
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      const error = t('Bilden är för stor. Max 10MB.', 'Image is too large. Max 10MB.')
      setErrors(prev => ({ ...prev, photo: error }))
      toast.error(error)
      return
    }

    try {
      setIsCompressing(true)

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        fileType: 'image/jpeg'
      }

      const compressedFile = await imageCompression(file, options)
      const originalSize = (file.size / 1024 / 1024).toFixed(2)
      const compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2)

      toast.success(t(`Bild komprimerad: ${originalSize}MB → ${compressedSize}MB`, `Image compressed: ${originalSize}MB → ${compressedSize}MB`))

      setPhotoFile(compressedFile)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(compressedFile)

    } catch (error) {
      console.error('Error compressing image:', error)
      const errorMsg = t('Kunde inte komprimera bilden. Försök med en annan bild.', 'Could not compress the image. Try another image.')
      setErrors(prev => ({ ...prev, photo: errorMsg }))
      toast.error(errorMsg)
    } finally {
      setIsCompressing(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    const nameError = validateField('name', formData.name)
    if (nameError) newErrors.name = nameError

    const emailError = validateField('email', formData.email)
    if (emailError) newErrors.email = emailError

    const computerError = validateField('computerChoice', formData.computerChoice)
    if (computerError) newErrors.computerChoice = computerError

    if (formData.computerChoice === 'other' && !formData.otherComputer.trim()) {
      newErrors.computerChoice = t('Vänligen specificera vilken dator du vill ha', 'Please specify which computer you want')
    }

    if (!photoFile) {
      newErrors.photo = t('Vänligen ladda upp ett passerkortsfoto', 'Please upload an access card photo')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error(t('Vänligen åtgärda felen i formuläret', 'Please fix the errors in the form'))
      return
    }

    setIsSubmitting(true)

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('email', formData.email)
      data.append('computerChoice', formData.computerChoice === 'other' ? formData.otherComputer : formData.computerChoice)
      data.append('photo', photoFile!)

      // Add pageId if this is a personalized page
      if (personalization) {
        data.append('pageId', personalization.id)
      }

      const response = await fetch('/api/submit-onboarding', {
        method: 'POST',
        body: data
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.field) {
          setErrors({ [result.field]: result.error })
        }
        throw new Error(result.error || t('Något gick fel vid skickandet.', 'Something went wrong while sending.'))
      }

      setIsSuccess(true)
      toast.success(t('Tack! Din information har skickats.', 'Thank you! Your information has been sent.'))
      window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : t('Något gick fel. Försök igen eller kontakta IT-avdelningen.', 'Something went wrong. Try again or contact the IT department.')
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-12 text-center">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t(`Tack, ${formData.name.split(' ')[0]}! 🎉`, `Thank you, ${formData.name.split(' ')[0]}! 🎉`)}
            </h2>

            <p className="text-base sm:text-lg text-gray-700 mb-5 sm:mb-6 leading-relaxed">
              {t('Din information har skickats och vi förbereder nu din första dag.', 'Your information has been sent and we are now preparing your first day.')}
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 mb-5 sm:mb-6 text-left">
              <h3 className="font-semibold text-base sm:text-lg mb-3 text-blue-900">
                {t('📅 Vad händer nu?', '📅 What happens next?')}
              </h3>
              <ul className="space-y-2.5 sm:space-y-3 text-blue-800">
                <li className="flex items-start text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">1️⃣</span>
                  <span>{t('Du får ett bekräftelsmail inom 24 timmar', 'You will receive a confirmation email within 24 hours')}</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">2️⃣</span>
                  <span>{t('Din dator beställs och förbereds', 'Your computer is ordered and prepared')}</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">3️⃣</span>
                  <span>{t('Ditt passerkort produceras med din bild', 'Your access card is produced with your photo')}</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">4️⃣</span>
                  <span>{t('Din fadder kontaktar dig 2 dagar innan start', 'Your buddy will contact you 2 days before you start')}</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">5️⃣</span>
                  <span>{t('Du får ett välkomstmail med praktisk info', 'You will receive a welcome email with practical information')}</span>
                </li>
              </ul>
            </div>

            <div className="text-xs sm:text-sm text-gray-600 mb-5 sm:mb-6">
              <p>{t('Frågor? Kontakta din HR-ansvarig eller IT-avdelningen.', 'Questions? Contact your HR representative or the IT department.')}</p>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false)
                setFormData({ name: '', email: '', computerChoice: '', otherComputer: '' })
                setPhotoFile(null)
                setPhotoPreview(null)
                setErrors({})
              }}
              className="text-svt-purple hover:text-svt-pink font-semibold text-sm sm:text-base min-h-[44px] inline-flex items-center justify-center px-4 py-2"
            >
              {t('← Tillbaka till formuläret', '← Back to form')}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="onboarding-form">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 text-svt-dark">
          {t('Skicka in din information', 'Submit your information')}
        </h2>
        <p className="text-center text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          {t('Fyll i formuläret nedan så vi kan förbereda din första dag.', 'Fill in the form below so we can prepare your first day.')}
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 mb-6 sm:mb-8" role="note">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-2 sm:ml-3">
              <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                <strong>{t('Integritet:', 'Privacy:')}</strong> {t('Din information skickas direkt via email till IT och lagras inte på vår server.', 'Your information is sent directly via email to IT and is not stored on our server.')}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              {t('Namn', 'Name')} <span className="text-red-500" aria-label={t('obligatoriskt fält', 'required field')}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={(e) => {
                const error = validateField('name', e.target.value)
                if (error) setErrors(prev => ({ ...prev, name: error }))
              }}
              required
              aria-required="true"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className="w-full px-3 sm:px-4 py-3 sm:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent"
              placeholder={t('För- och efternamn', 'First and last name')}
            />
            {errors.name && (
              <p id="name-error" className="text-red-600 text-xs sm:text-sm mt-1.5" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              {t('E-post', 'Email')} <span className="text-red-500" aria-label={t('obligatoriskt fält', 'required field')}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={(e) => {
                const error = validateField('email', e.target.value)
                if (error) setErrors(prev => ({ ...prev, email: error }))
              }}
              required
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full px-3 sm:px-4 py-3 sm:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent"
              placeholder={t('din.email@example.com', 'your.email@example.com')}
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 text-xs sm:text-sm mt-1.5" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <fieldset>
              <legend className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                {t('Datorval', 'Computer choice')} <span className="text-red-500" aria-label={t('obligatoriskt fält', 'required field')}>*</span>
              </legend>
              <div className="space-y-2.5 sm:space-y-3" role="group" aria-describedby={errors.computerChoice ? 'computer-error' : undefined}>
                <label className={`flex items-center p-3 sm:p-4 border ${errors.computerChoice ? 'border-red-300' : 'border-gray-300'} rounded-lg hover:bg-gray-50 cursor-pointer min-h-[56px]`}>
                  <input
                    type="radio"
                    name="computerChoice"
                    value="MacBook Pro 14&quot; (M4)"
                    checked={formData.computerChoice === 'MacBook Pro 14" (M4)'}
                    onChange={handleInputChange}
                    className="w-5 h-5 sm:w-4 sm:h-4 text-svt-purple focus:ring-svt-purple flex-shrink-0"
                    aria-invalid={errors.computerChoice ? 'true' : 'false'}
                  />
                  <span className="ml-3 text-sm sm:text-base">MacBook Pro 14" (M4)</span>
                </label>
                <label className={`flex items-center p-3 sm:p-4 border ${errors.computerChoice ? 'border-red-300' : 'border-gray-300'} rounded-lg hover:bg-gray-50 cursor-pointer min-h-[56px]`}>
                  <input
                    type="radio"
                    name="computerChoice"
                    value="MacBook Pro 16&quot; (M4)"
                    checked={formData.computerChoice === 'MacBook Pro 16" (M4)'}
                    onChange={handleInputChange}
                    className="w-5 h-5 sm:w-4 sm:h-4 text-svt-purple focus:ring-svt-purple flex-shrink-0"
                    aria-invalid={errors.computerChoice ? 'true' : 'false'}
                  />
                  <span className="ml-3 text-sm sm:text-base">MacBook Pro 16" (M4)</span>
                </label>
                <label className={`flex items-center p-3 sm:p-4 border ${errors.computerChoice ? 'border-red-300' : 'border-gray-300'} rounded-lg hover:bg-gray-50 cursor-pointer min-h-[56px]`}>
                  <input
                    type="radio"
                    name="computerChoice"
                    value="other"
                    checked={formData.computerChoice === 'other'}
                    onChange={handleInputChange}
                    className="w-5 h-5 sm:w-4 sm:h-4 text-svt-purple focus:ring-svt-purple flex-shrink-0"
                    aria-invalid={errors.computerChoice ? 'true' : 'false'}
                  />
                  <span className="ml-3 text-sm sm:text-base">{t('Annat (specificera nedan)', 'Other (specify below)')}</span>
                </label>
                {formData.computerChoice === 'other' && (
                  <input
                    type="text"
                    name="otherComputer"
                    value={formData.otherComputer}
                    onChange={handleInputChange}
                    placeholder={t('Beskriv vilken dator du vill ha', 'Describe which computer you want')}
                    aria-label={t('Specificera vilken annan dator du vill ha', 'Specify which other computer you want')}
                    className="w-full px-3 sm:px-4 py-3 sm:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent mt-2"
                  />
                )}
              </div>
              {errors.computerChoice && (
                <p id="computer-error" className="text-red-600 text-xs sm:text-sm mt-2" role="alert">
                  {errors.computerChoice}
                </p>
              )}
            </fieldset>
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              {t('Passerkortsfoto', 'Access card photo')} <span className="text-red-500" aria-label={t('obligatoriskt fält', 'required field')}>*</span>
            </label>
            <p id="photo-requirements" className="text-xs sm:text-sm text-gray-500 mb-3 leading-relaxed">
              {t('Ladda upp ett foto på dig själv. Tillåtna format: JPG, PNG, HEIC. Max storlek: 10MB.', 'Upload a photo of yourself. Allowed formats: JPG, PNG, HEIC. Max size: 10MB.')}
              {isCompressing && t(' Komprimerar bild...', ' Compressing image...')}
            </p>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={isCompressing}
              aria-required="true"
              aria-invalid={errors.photo ? 'true' : 'false'}
              aria-describedby={`photo-requirements ${errors.photo ? 'photo-error' : ''}`}
              className="w-full px-3 sm:px-4 py-3 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-svt-purple focus:border-transparent disabled:opacity-50"
            />
            {errors.photo && (
              <p id="photo-error" className="text-red-600 text-xs sm:text-sm mt-1.5" role="alert">
                {errors.photo}
              </p>
            )}
            {photoPreview && (
              <div className="mt-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">{t('Förhandsgranskning:', 'Preview:')}</p>
                <img
                  src={photoPreview}
                  alt={t('Förhandsgranskning av passerkortsfoto', 'Preview of access card photo')}
                  className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-lg border-2 border-gray-300"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isCompressing}
            className="w-full bg-gradient-to-r from-svt-purple to-svt-pink text-white font-bold py-4 sm:py-3 px-6 text-base sm:text-lg rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? t('Skickar...', 'Sending...') : isCompressing ? t('Komprimerar bild...', 'Compressing image...') : t('Skicka information', 'Submit information')}
          </button>
        </form>
      </div>
    </section>
  )
}
