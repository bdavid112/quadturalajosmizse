/* Available languages */

import { createContext, ReactNode, useContext, useState } from 'react'

const languages = {
  en: 'English',
  hu: 'Magyar',
}

/* Define context type */

interface LocalizationContextType {
  lang: keyof typeof languages
  setLang: (lang: keyof typeof languages) => void
}

/* Create the context with a default value */

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
)

/* Provider component */

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<keyof typeof languages>('hu')

  return (
    <LocalizationContext.Provider value={{ lang, setLang }}>
      {children}
    </LocalizationContext.Provider>
  )
}

/* Custom hook to use the context */

export const useLocalization = () => {
  const context = useContext(LocalizationContext)
  if (!context) {
    throw new Error(
      'useLocalization must be used within a LocalizationProvider'
    )
  }
  return context
}
