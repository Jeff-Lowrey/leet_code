"""
### INTUITION:
The key insight is that lFU cache evicts the least frequently used item when capacity is reached.
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

### EXAMPLE WALKTHROUGH:
Input:
```
LFUCache(2)
```

put(1, 1): cache={1:(1,1)}, freq_to_keys={1:[1]}, min_freq=1
put(2, 2): cache={1:(1,1), 2:(2,1)}, freq_to_keys={1:[1,2]}, min_freq=1
get(1): freq increases to 2, cache={1:(1,2), 2:(2,1)}, freq_to_keys={1:[2], 2:[1]}, min_freq=1, return 1
put(3, 3): evict key 2 (LFU), add 3

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(1)** - All operations (get, put) use hash maps and frequency buckets for constant-time access

### SPACE COMPLEXITY:
**O(capacity)** for storing items

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""
