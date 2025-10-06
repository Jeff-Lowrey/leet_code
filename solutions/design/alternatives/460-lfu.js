/**
 * 460. Lfu
 * Medium
 *
 * LFU (Least Frequently Used) Cache Implementation - Uses a combination of frequency counting and timestamp ordering - Maintains capacity constraint - O(1) operations for get and put
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Lfu is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

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