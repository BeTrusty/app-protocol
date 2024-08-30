/**
 * @function timeSince
 * @param {number} creationTimestamp - Timestamp de creación
 * @returns {string} - Tiempo transcurrido desde la creación
 */
export function timeSince (creationTimestamp: number): string {
  const now = Date.now() // Timestamp actual en milisegundos
  const elapsedTime = now - creationTimestamp // Diferencia en milisegundos

  const seconds = Math.floor(elapsedTime / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return days === 1 ? `${days} day ago` : `${days} days ago`
  } else if (hours > 0) {
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`
  } else if (minutes > 0) {
    return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`
  } else {
    return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`
  }
}
