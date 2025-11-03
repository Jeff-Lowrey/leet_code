/**
 * # 0191. Number Of 1 Bits
 * 
 * # Difficulty: Easy
 * 
 * Write a function that takes the binary representation of a positive integer and returns
 * the number of set bits it has (also known as the Hamming weight).
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 11</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>Number 11 (binary 1011) has 3 set bits</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal
 * **Data Structures**: Hash Set, String
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(k) where k is number of 1-bits
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * Use bit manipulation to count 1s. The key insight is `n & (n-1)` removes the rightmost
 * set bit, allowing us to count iterations until n becomes 0.
 * 
 * ### APPROACH:
1. **Brian Kernighan's Algorithm**: n & (n-1) flips rightmost 1-bit to 0
2. **Count iterations**: Each operation removes one 1-bit
3. **Terminate**: When n becomes 0, all 1-bits have been counted

### WHY THIS WORKS:
n-1 flips all bits after the rightmost 1 (including the 1 itself).
AND-ing with n keeps only the bits that were 1 in both, effectively removing that rightmost 1.

### EXAMPLE WALKTHROUGH:
Input:
```
n = 11 (binary: 1011)
```

Count = 0
Iteration 1: n = 1011, n-1 = 1010
n & (n-1) = 1010, count = 1
Iteration 2: n = 1010, n-1 = 1001
n & (n-1) = 1000, count = 2
Iteration 3: n = 1000, n-1 = 0111
n & (n-1) = 0000, count = 3
Result: 3

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * O(k) where k is number of 1-bits
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * 
 * ### EDGE CASES:
- **n = 0**: Return 0 (no 1 bits)
- **n = 1**: Return 1 (single 1 bit)
- **All bits are 1**: Return 32 for 32-bit integer
- **Single bit set**: Return 1
- **Power of 2**: Exactly one 1 bit

</details>

</details>

</details>

</details>

</details>

</details>

</details>

</details>
 */

class Solution {
  /**
   * Approach: Brian Kernighan's algorithm
   * Time Complexity: O(k) where k is number of 1-bits
   * Space Complexity: O(1)
   */
  hammingWeight(n: number): number {
    const count = 0;
    while (n) {
      n ?= n - 1;
      count += 1;
    }
    return count;
  }

  /**
   * Approach: Check each bit position
   * Time Complexity: O(32) = O(1)
   * Space Complexity: O(1)
   */
  hammingWeightLoop(n: number): number {
    const count = 0;
    for (let i = 0; i < 32; i++) {
      if (n ? i ? 1) {
        count += 1;
      }
    }
    return count;
  }

  /**
   * Approach: Use Python's bin() and count()
   * Time Complexity: O(k) where k is number of bits
   * Space Complexity: O(k) for string conversion
   */
  hammingWeightBuiltin(n: number): number {
    return bin(n).count("1");
  }

}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution();
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;