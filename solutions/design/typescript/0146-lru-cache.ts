/**
### INTUITION:
The key insight is that lRU Cache needs O(1) access and O(1) eviction. We can combine:
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

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
O(1)**
All operations (get, put) are constant time

### SPACE COMPLEXITY:
O(capacity)**
We store at most 'capacity' key-value pairs

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();
  // Add test cases here
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;