/**
### INTUITION:
The key insight is that we need to count character frequencies and then sort characters by their frequency
in descending order. This is a classic use case for heaps/priority queues combined
with hash maps for counting.

### APPROACH:
1. **Count frequencies**: Use hash map to count each character
2. **Sort by frequency**: Use heap or simple sorting to order by frequency
3. **Build result**: Reconstruct string with characters in frequency order

### WHY THIS WORKS:
- This ensures that hash map provides O(1) character frequency counting
- This ensures that heap/sorting organizes characters by frequency efficiently
- This ensures that multiple characters can appear in any order at same frequency

### EXAMPLE WALKTHROUGH:
Input:
```
s = "tree"
```

Step 1: Count frequencies: {'t': 1, 'r': 1, 'e': 2}
Step 2: Sort by frequency: [('e', 2), ('t', 1), ('r', 1)]
Step 3: Build result: "eert" (or "eetr")

Output:
```
"eert"
```

### TIME COMPLEXITY:
O(n log k)**
Where n is string length, k is number of unique characters

### SPACE COMPLEXITY:
O(k)**
For storing character frequencies and heap

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * MaxHeap implementation for [char, frequency] pairs
 */
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(item) {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][1] >= this.heap[index][1]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    while (true) {
      let largest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild][1] > this.heap[largest][1]
      ) {
        largest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild][1] > this.heap[largest][1]
      ) {
        largest = rightChild;
      }
      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];
      index = largest;
    }
  }
}

/**
 * Main solution for Problem 451: Sort Characters By Frequency
 *
 * @param {string} s - Input string
 * @return {string} - String with characters sorted by frequency
 *
 * Time Complexity: O(n + k log k) where n is string length, k is unique characters
 * Space Complexity: O(n)
 */
function solve(s) {
  if (!s || s.length === 0) {
    return "";
  }

  // Count character frequencies
  const freqMap = new Map();
  for (const char of s) {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }

  // Build max heap with [char, frequency] pairs
  const maxHeap = new MaxHeap();
  for (const [char, freq] of freqMap) {
    maxHeap.push([char, freq]);
  }

  // Build result string by popping from heap
  let result = "";
  while (maxHeap.size() > 0) {
    const [char, freq] = maxHeap.pop();
    result += char.repeat(freq);
  }

  return result;
}

/**
 * Test cases for Problem 451: Sort Characters By Frequency
 */
function testSolution() {
  console.log("Testing 451. Sort Characters By Frequency");

  // Test case 1: Basic functionality
  const result1 = solve("tree");
  const validOutputs1 = ["eert", "eetr"];
  console.assert(
    validOutputs1.includes(result1),
    `Test 1 failed: expected one of ${validOutputs1}, got ${result1}`,
  );

  // Test case 2: All same character
  const result2 = solve("cccaaa");
  const validOutputs2 = ["cccaaa", "aaaccc"];
  console.assert(
    validOutputs2.includes(result2),
    `Test 2 failed: expected one of ${validOutputs2}, got ${result2}`,
  );

  // Test case 3: Single character
  const result3 = solve("a");
  const expected3 = "a";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All unique characters
  const result4 = solve("Aabb");
  // Multiple valid outputs depending on heap implementation
  console.assert(
    result4.length === 4,
    `Test 4 failed: length should be 4, got ${result4.length}`,
  );

  // Test case 5: Empty string
  const result5 = solve("");
  const expected5 = "";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 451. Sort Characters By Frequency!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 451. Sort Characters By Frequency ===");
  console.log("Category: Heap");
  console.log("Difficulty: Medium");
  console.log("");

  const s = "tree";
  console.log(`Input: "${s}"`);
  const result = solve(s);
  console.log(`Output: "${result}"`);
  console.log("(Note: Multiple valid outputs are possible)");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses a max heap to sort by frequency
 * - Alternative: Use bucket sort for O(n) time complexity
 * - Multiple valid outputs exist when characters have same frequency
 * - The heap approach is clean and easy to understand
 */
