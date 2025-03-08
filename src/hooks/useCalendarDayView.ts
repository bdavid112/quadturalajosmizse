import { useLocalization } from '../context/LocalizationContext'
import { generateDayLabels } from '../utils/calendarUtils'

export const useCalendarDayView = (
  calendarDays: (number | null)[],
  dateIndice: number[]
) => {
  /* Array of day localized labels */

  const { lang } = useLocalization()
  const dayLabels = generateDayLabels(lang)

  /* Indice to keep track of focused and active date */

  const focusedDateIndex = dateIndice[0]
  const activeDateIndex = dateIndice[1]

  return {
    dayLabels,
    calendarDays,
    focusedDateIndex,
    activeDateIndex,
  }
}
