import { ref } from 'vue'

/**
 * Returns boolean ref, whose value is true if the passed media query
 * matches else returns false
 * @param mediaQuery string
 */
export default function useMediaQuery(mediaQuery: string) {
  const matcher = window.matchMedia(mediaQuery)
  const matchMedia = ref<boolean>(matcher.matches)

  matcher.onchange = (e) => {
    matchMedia.value = e.matches
  }

  return matchMedia
}
