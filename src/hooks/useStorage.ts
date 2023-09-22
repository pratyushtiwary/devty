const storageHandler = {
  load(key: string, autoParse = true) {
    try {
      let content = localStorage.getItem(key)
      if (content === 'undefined') {
        return undefined
      }
      if (autoParse) {
        if (content !== null) {
          content = JSON.parse(content)
        }
      }
      return content
    } catch (_) {
      this.clear()
      return undefined
    }
  },
  save(key: string, value: any, autoStringify = true) {
    if (typeof value !== 'string') {
      if (autoStringify) {
        value = JSON.stringify(value)
      } else {
        throw Error(
          'Only string type is supported when using this function with `autoStringify` = false'
        )
      }
    }
    localStorage.setItem(key, value)
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}

const useStorage = (clear = false) => {
  if (clear) {
    storageHandler.clear()
  }
  return storageHandler
}

export default useStorage
