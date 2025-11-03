/**
### INTUITION:
The key insight is that use two heaps to divide numbers into two halves: max-heap for smaller half, min-heap for larger half. The median is always at the top of one or both heaps.

### APPROACH:
1. **Two heaps**: max-heap (left half), min-heap (right half)
2. **Balance heaps**: Keep sizes equal or left heap has 1 more
3. **Add number**:
   - Add to left heap, then move largest to right heap
   - If right > left, move smallest from right to left
4. **Find median**:
   - If sizes equal: average of both tops
   - Else: top of left heap

### WHY THIS WORKS:
- Max-heap stores smaller half (can get largest quickly)
- Min-heap stores larger half (can get smallest quickly)
- Tops of heaps are always the middle elements
- Balancing ensures O(1) median access

### EXAMPLE WALKTHROUGH:
Input:
```
addNum(1):
```

left=[1], right=[]
median = 1
addNum(2):
left=[1], right=[2]
median = (1+2)/2 = 1.5
addNum(3):
left=[2,1], right=[3]
median = 2 (top of left heap)
addNum(4):
left=[2,1], right=[3,4]
median = (2+3)/2 = 2.5

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
- addNum(): **O(log n)** - heap operations
- findMedian(): **O(1)** - just access heap tops

### SPACE COMPLEXITY:
O(n)**
Store all n numbers across two heaps

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

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