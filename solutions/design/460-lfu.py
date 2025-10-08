"""
# 460. LFU Cache
**Hard**

Design and implement a Least Frequently Used (LFU) cache.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
LFU cache evicts the least frequently used item when capacity is reached.
If multiple items have the same frequency, evict the least recently used (LRU) among them.

The challenge is achieving O(1) for both get() and put() operations.

### APPROACH:
1. **Data Structures**:
   - cache: dict mapping key -> (value, frequency)
   - freq_to_keys: dict mapping frequency -> OrderedDict of keys
   - key_to_freq: dict mapping key -> frequency
   - min_freq: track minimum frequency for eviction

2. **get(key)**:
   - Return -1 if key not found
   - Increment frequency of key
   - Update data structures
   - Return value

3. **put(key, value)**:
   - If key exists: update value and increment frequency
   - If cache full: evict LFU item (first item in min_freq list)
   - Add new item with frequency 1
   - Update min_freq

### WHY THIS WORKS:
- Hash map provides O(1) lookup
- OrderedDict maintains LRU order within each frequency
- Tracking min_freq allows O(1) eviction
- All operations are O(1)

### TIME COMPLEXITY:
- get: O(1)
- put: O(1)

### SPACE COMPLEXITY: O(capacity) for storing items

### EXAMPLE WALKTHROUGH:
```
LFUCache(2)
put(1, 1): cache={1:(1,1)}, freq_to_keys={1:[1]}, min_freq=1
put(2, 2): cache={1:(1,1), 2:(2,1)}, freq_to_keys={1:[1,2]}, min_freq=1
get(1): freq increases to 2, cache={1:(1,2), 2:(2,1)}, freq_to_keys={1:[2], 2:[1]}, min_freq=1, return 1
put(3, 3): evict key 2 (LFU), add 3
```

### EDGE CASES:
- Cache capacity 0
- Single capacity
- Multiple items with same frequency
- Update existing key

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses hash maps and OrderedDict for O(1) LFU operations.

### Algorithm Steps:
1. Use cache dict for key-value-frequency storage
2. Use freq_to_keys to track keys at each frequency (OrderedDict for LRU)
3. Track min_freq for efficient eviction
4. Update all structures on get/put operations

</details>
"""

from collections import OrderedDict, defaultdict
from typing import Optional


class LFUCache:
    """
    Least Frequently Used (LFU) Cache with O(1) operations.

    Evicts least frequently used item. Ties broken by LRU.
    """

    def __init__(self, capacity: int):
        """
        Initialize LFU cache with given capacity.

        Args:
            capacity: Maximum number of items in cache

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.capacity = capacity
        self.min_freq = 0
        # Map key -> (value, frequency)
        self.cache = {}
        # Map frequency -> OrderedDict of {key: value}
        self.freq_to_keys = defaultdict(OrderedDict)
        # Map key -> frequency
        self.key_to_freq = {}

    def _update_freq(self, key: int) -> None:
        """
        Helper method to increment frequency of a key.

        Args:
            key: Key to update

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        value, freq = self.cache[key]

        # Remove key from current frequency list
        del self.freq_to_keys[freq][key]

        # If current frequency list is empty and it's min_freq, increment min_freq
        if not self.freq_to_keys[freq] and freq == self.min_freq:
            self.min_freq += 1

        # Increment frequency
        new_freq = freq + 1
        self.cache[key] = (value, new_freq)
        self.key_to_freq[key] = new_freq
        self.freq_to_keys[new_freq][key] = value

    def get(self, key: int) -> int:
        """
        Get value for key if it exists in cache.

        Updates frequency of the key.

        Args:
            key: Key to get

        Returns:
            int: Value if key exists, -1 otherwise

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if key not in self.cache:
            return -1

        # Update frequency
        self._update_freq(key)

        # Return value
        return self.cache[key][0]

    def put(self, key: int, value: int) -> None:
        """
        Put key-value pair into cache.

        If cache is full, evict LFU item (LRU if tie).

        Args:
            key: Key to put
            value: Value to put

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if self.capacity <= 0:
            return

        # Case 1: Key already exists - update value and frequency
        if key in self.cache:
            self.cache[key] = (value, self.cache[key][1])
            self._update_freq(key)
            return

        # Case 2: Cache is full - evict LFU item
        if len(self.cache) >= self.capacity:
            # Get least frequently used key (first in OrderedDict = oldest/LRU)
            evict_key, _ = self.freq_to_keys[self.min_freq].popitem(last=False)
            del self.cache[evict_key]
            del self.key_to_freq[evict_key]

        # Case 3: Add new key
        self.cache[key] = (value, 1)
        self.key_to_freq[key] = 1
        self.freq_to_keys[1][key] = value
        self.min_freq = 1


def test_solution():
    """
    Test cases for LFU Cache.
    """
    # Test case 1: Basic operations
    cache1 = LFUCache(2)
    cache1.put(1, 1)
    cache1.put(2, 2)
    assert cache1.get(1) == 1
    cache1.put(3, 3)  # Evicts key 2
    assert cache1.get(2) == -1
    assert cache1.get(3) == 3
    cache1.put(4, 4)  # Evicts key 1
    assert cache1.get(1) == -1
    assert cache1.get(3) == 3
    assert cache1.get(4) == 4

    # Test case 2: Frequency tracking
    cache2 = LFUCache(2)
    cache2.put(1, 1)
    cache2.put(2, 2)
    cache2.get(1)  # freq(1) = 2
    cache2.put(3, 3)  # Evicts key 2 (freq=1)
    assert cache2.get(2) == -1
    assert cache2.get(1) == 1
    assert cache2.get(3) == 3

    # Test case 3: Update existing key
    cache3 = LFUCache(2)
    cache3.put(1, 1)
    cache3.put(2, 2)
    cache3.put(1, 10)  # Update key 1
    cache3.put(3, 3)  # Evicts key 2
    assert cache3.get(1) == 10
    assert cache3.get(2) == -1
    assert cache3.get(3) == 3

    # Test case 4: Single capacity
    cache4 = LFUCache(1)
    cache4.put(1, 1)
    assert cache4.get(1) == 1
    cache4.put(2, 2)
    assert cache4.get(1) == -1
    assert cache4.get(2) == 2

    # Test case 5: Zero capacity
    cache5 = LFUCache(0)
    cache5.put(1, 1)
    assert cache5.get(1) == -1

    # Test case 6: Complex frequency scenario
    cache6 = LFUCache(3)
    cache6.put(1, 1)
    cache6.put(2, 2)
    cache6.put(3, 3)
    cache6.get(1)  # freq(1) = 2
    cache6.get(1)  # freq(1) = 3
    cache6.get(2)  # freq(2) = 2
    cache6.put(4, 4)  # Evicts key 3 (freq=1)
    assert cache6.get(3) == -1
    assert cache6.get(1) == 1
    assert cache6.get(2) == 2
    assert cache6.get(4) == 4

    # Test case 7: LRU within same frequency
    cache7 = LFUCache(2)
    cache7.put(1, 1)
    cache7.put(2, 2)
    # Both have freq=1, key 1 is older
    cache7.put(3, 3)  # Should evict key 1 (LRU among freq=1)
    assert cache7.get(1) == -1
    assert cache7.get(2) == 2
    assert cache7.get(3) == 3

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("LFU Cache demonstration:")
    cache = LFUCache(2)

    cache.put(1, 1)
    cache.put(2, 2)
    print(f"get(1) = {cache.get(1)}")  # 1
    cache.put(3, 3)  # Evicts key 2
    print(f"get(2) = {cache.get(2)}")  # -1
    print(f"get(3) = {cache.get(3)}")  # 3
    cache.put(4, 4)  # Evicts key 1
    print(f"get(1) = {cache.get(1)}")  # -1
    print(f"get(3) = {cache.get(3)}")  # 3
    print(f"get(4) = {cache.get(4)}")  # 4
