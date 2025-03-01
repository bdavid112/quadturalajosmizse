import hu from '../locales/hu.json'
import en from '../locales/en.json'

// Store available translations
const translations: Record<string, any> = {
  hu,
  en,
}

/**
 * Retrieves a translation based on a given key and language.
 * Supports deep object access using dot notation (e.g., "home.hero.title").
 *
 * @param key - The translation key (dot-separated for nested structures).
 * @param lang - The language code (default: "hu").
 * @returns The translated string, or the key itself if not found.
 *
 * @example
 * // Assuming locales/en.json contains { "home": { "hero": { "title": "Explore Our Tours" } } }
 * t("home.hero.title", "en") // Returns: "Explore Our Tours"
 *
 * @example
 * // If the key doesn't exist in the language file, it returns the key itself
 * t("home.missing.text", "en") // Returns: "home.missing.text"
 */
export const t = (key: string, lang: string = 'hu') => {
  return (
    key
      .split('.')
      .reduce((obj, keyPart) => obj?.[keyPart], translations[lang]) || key
  )
}
