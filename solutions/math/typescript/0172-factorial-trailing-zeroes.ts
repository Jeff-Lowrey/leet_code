/**
 * # Difficulty: Medium
 *
 * # 0172. Factorial Trailing Zeroes
 *
 *
 * Given an integer n, return the number of trailing zeroes in n!.
 *
 * Note that n! = n × (n - 1) × (n - 2) × ... × 3 × 2 × 1.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 5</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>5! = 120 has 1 trailing zero (from one factor of 5)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Standard Algorithm
 * **Data Structures**: Basic Types
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(log n) - Binary search or tree height
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
The key insight is that trailing zeroes come from factors of 10 = 2 × 5. In n!, there are always more factors of 2 than 5, so we only need to count factors of 5.

### APPROACH:
1. **Count multiples of 5**: n/5 gives multiples of 5
2. **Count multiples of 25**: n/25 gives extra factor of 5
3. **Count multiples of 125**: n/125 gives another extra factor
4. **Continue**: Until 5^k > n

### WHY THIS WORKS:
- This ensures that every 5 numbers contributes at least one 5: 5, 10, 15, 20, 25...
- This ensures that every 25 numbers contributes an extra 5: 25, 50, 75, 100, 125...
- This ensures that every 125 numbers contributes another extra 5: 125, 250...
- This ensures that total = n/5 + n/25 + n/125 + ...

### EXAMPLE WALKTHROUGH:
Input:
```
n = 30:
```

30/5 = 6 (multiples of 5: 5,10,15,20,25,30)
30/25 = 1 (multiples of 25: 25)
30/125 = 0
Total: 6 + 1 = 7 trailing zeroes
30! = 265252859812191058636308480000000
(7 trailing zeroes)

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * O(log n)
 * - Binary search or tree height
 * Number of divisions by 5 until we reach 0
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only using counters
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  trailingZeroes(n: number): number {
    let count = 0;

    while (n >= 5) {
      n = Math.floor(n / 5);
      count += n;
    }

    return count;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.trailingZeroes(3) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.trailingZeroes(5) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.trailingZeroes(0) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
