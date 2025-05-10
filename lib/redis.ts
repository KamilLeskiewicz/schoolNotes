// Define interface for our storage operations
export interface StorageInterface {
  hset: (key: string, field: Record<string, string>) => Promise<any>
  hgetall: (key: string) => Promise<Record<string, any> | null>
  hget: (key: string, field: string) => Promise<any>
  hdel: (key: string, ...fields: string[]) => Promise<number>
}

// Create a class that implements the interface using in-memory storage
class InMemoryStorage implements StorageInterface {
  private storage: Map<string, Map<string, any>> = new Map()

  async hset(key: string, field: Record<string, string>): Promise<any> {
    if (!this.storage.has(key)) {
      this.storage.set(key, new Map())
    }

    const keyMap = this.storage.get(key)!
    Object.entries(field).forEach(([fieldName, value]) => {
      keyMap.set(fieldName, value)
    })

    return true
  }

  async hgetall(key: string): Promise<Record<string, any> | null> {
    const keyMap = this.storage.get(key)
    if (!keyMap) return null

    const result: Record<string, any> = {}
    keyMap.forEach((value, field) => {
      result[field] = value
    })

    return result
  }

  async hget(key: string, field: string): Promise<any> {
    const keyMap = this.storage.get(key)
    if (!keyMap) return null
    return keyMap.get(field) || null
  }

  async hdel(key: string, ...fields: string[]): Promise<number> {
    const keyMap = this.storage.get(key)
    if (!keyMap) return 0

    let count = 0
    fields.forEach((field) => {
      if (keyMap.has(field)) {
        keyMap.delete(field)
        count++
      }
    })

    return count
  }
}

// Create a singleton instance of the storage
const inMemoryStorage = new InMemoryStorage()

// Export the storage instance
export const storage = inMemoryStorage

// Export a function to check if we're using in-memory storage
export function isUsingInMemoryStorage(): boolean {
  return true
}
