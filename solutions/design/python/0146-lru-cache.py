"""
# Difficulty: Medium

# 0146. LRU Cache

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if it exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>LRUCache(2)</dd>
<dt>Output:</dt>
<dd>put(1, 1) -> [1:1]</dd>
<dt>Explanation:</dt>
<dd>Cache is initialized with capacity 2, and after put(1, 1), the cache contains key 1 with value 1 as the most recently used item</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Backtracking
**Data Structures**: Hash Map, Array, Linked List
**Patterns**: Iterative Solution
**Time Complexity**: O(1)
**Space Complexity**: O(capacity)

### INTUITION:
LRU Cache needs O(1) access and O(1) eviction. We can combine:
- HashMap for O(1) key lookup
- Doubly Linked List for O(1) insertion/deletion at any position

### APPROACH:
1. **HashMap + Doubly Linked List**: Hash map stores key->node mapping
2. **Recent Access Tracking**: Move accessed nodes to head of list
3. **Eviction Policy**: Remove from tail when capacity exceeded
4. **O(1) Operations**: All operations use direct node manipulation

### WHY THIS WORKS:
- HashMap provides O(1) key lookup
- Doubly linked list allows O(1) insertion/deletion anywhere
- Head represents most recently used, tail represents least recently used
- Moving nodes to head maintains LRU order efficiently

### EXAMPLE WALKTHROUGH:
Input:
```
LRUCache(2)
```

Steps:
Step 1: put(1, 1) -> [1:1]
Step 2: put(2, 2) -> [2:2, 1:1]
Step 3: get(1)    -> [1:1, 2:2] (1 moves to front)
Step 4: put(3, 3) -> [3:3, 1:1] (2 evicted)
Step 5: get(2)    -> -1 (not found)

### TIME COMPLEXITY:
O(1)
All operations (get, put) are constant time

### SPACE COMPLEXITY:
O(capacity)
We store at most 'capacity' key-value pairs

### EDGE CASES:
- Capacity of 1
- Get non-existent key
- Put same key multiple times
- Cache at full capacity

</details>
"""
