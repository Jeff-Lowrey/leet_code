I'll help you implement an LFU (Least Frequently Used) Cache in JavaScript. Here's a complete implementation with comments and proper structure:

```javascript
/**
 * LFU (Least Frequently Used) Cache Implementation
 * - Uses a combination of frequency counting and timestamp ordering
 * - Maintains capacity constraint
 * - O(1) operations for get and put
 */

class LFUCache {
    /**
     * Initialize the LFU Cache with a maximum capacity
     * @param {number} capacity - Maximum number of key-value pairs that can be stored
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.keyToVal = new Map();         // Store key-value pairs
        this.keyToFreq = new Map();        // Track frequency of each key
        this.freqToKeys = new Map();       // Group keys by frequency
        this.minFreq = 0;                  // Track minimum frequency
    }

    /**
     * Get the value associated with the key if it exists
     * @param {number} key - Key to look up
     * @return {number} - Value associated with key, or -1 if not found
     */
    get(key) {
        if (!this.keyToVal.has(key)) {
            return -1;
        }

        // Increment frequency for this key
        this.updateFrequency(key);
        return this.keyToVal.get(key);
    }

    /**
     * Insert or update a key-value pair in the cache
     * @param {number} key - Key to insert/update
     * @param {number} value - Value to associate with the key
     */
    put(key, value) {
        if (this.capacity <= 0) return;

        // If key exists, update its value and frequency
        if (this.keyToVal.has(key)) {
            this.keyToVal.set(key, value);
            this.updateFrequency(key);
            return;
        }

        // If at capacity, remove least frequently used item
        if (this.keyToVal.size >= this.capacity) {
            this.removeLFU();
        }

        // Add new key-value pair
        this.keyToVal.set(key, value);
        this.keyToFreq.set(key, 1);
        if (!this.freqToKeys.has(1)) {
            this.freqToKeys.set(1, new Set());
        }
        this.freqToKeys.get(1).add(key);
        this.minFreq = 1;
    }

    /**
     * Update the frequency count for a key
     * @param {number} key - Key whose frequency should be incremented
     */
    updateFrequency(key) {
        const freq = this.keyToFreq.get(key);
        this.keyToFreq.set(key, freq + 1);

        // Remove key from current frequency set
        this.freqToKeys.get(freq).delete(key);
        if (this.freqToKeys.get(freq).size === 0 && this.minFreq === freq) {
            this.minFreq++;
        }

        // Add key to new frequency set
        if (!this.freqToKeys.has(freq + 1)) {
            this.freqToKeys.set(freq + 1, new Set());
        }
        this.freqToKeys.get(freq + 1).add(key);
    }

    /**
     * Remove the least frequently used item from the cache
     */
    removeLFU() {
        const keysWithMinFreq = this.freqToKeys.get(this.minFreq);
        const keyToRemove = keysWithMinFreq.values().next().value;

        keysWithMinFreq.delete(keyToRemove);
        this.keyToVal.delete(keyToRemove);
        this.keyToFreq.delete(keyToRemove);
    }
}

// Example usage:
/*
const cache = new LFUCache(2);
cache.put(1, 1);   // cache=[1,_], cnt(1)=1
cache.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
cache.get(1);      // return 1, cache=[1,2], cnt(2)=1, cnt(1)=2
cache.put(3, 3);   // cache=[3,1], cnt(3)=1, cnt(1)=2
cache.get(2);      // return -1 (not found)
cache.get(3);      // return 3, cache=[3,1], cnt(3)=2, cnt(1)=2
cache.put(4, 4);   // cache=[4,3], cnt(4)=1, cnt(3)=2
cache.get(1);      // return -1 (not found)
cache.get(3);      // return 3, cache=[3,4], cnt(3)=3, cnt(4)=1
cache.get(4);      // return 4, cache=[3,4], cnt(3)=3, cnt(4)=2
*/

module.exports = LFUCache;
```

This implementation provides an LFU Cache with the following features:

1. O(1) time complexity for both get and put operations
2. Maintains a capacity constraint
3. Properly tracks frequency of access for each key
4. Removes least frequently used items when capacity is reached
5. Uses multiple Maps and Sets for efficient operations
6. Includes detailed comments explaining the implementation
7. Follows JavaScript best practices and conventions

The cache uses three main data structures:
- `keyToVal`: Maps keys to their values
- `keyToFreq`: Tracks frequency count for each key
- `freqToKeys`: Groups keys by their frequency of access

The implementation handles all edge cases including:
- Cache capacity of 0
- Accessing non-existent keys
- Updating existing keys
- Removing least frequently used items when at capacity
- Properly maintaining minimum frequency counter

The code is structured as a complete, modular solution that can be imported and used in other projects. The example usage is included as a comment for reference.