import { customAlphabet } from 'nanoid'

/**
 * Generates a unique 8-character alphanumeric ID
 * Using alphanumeric characters (a-z, A-Z, 0-9) = 62 chars
 * 62^8 = 218,340,105,584,896 possible combinations
 */
export function generateUniqueId(): string {
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8)
  return nanoid()
}

/**
 * Formats a date string to Swedish format (YYYY-MM-DD)
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('sv-SE')
}

/**
 * Gets first name from full name
 */
export function getFirstName(fullName: string): string {
  return fullName.split(' ')[0]
}
