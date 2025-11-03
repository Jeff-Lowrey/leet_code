/**
 * # Difficulty: Hard
 *
 * # 0135. Candy
 *
 *
 * There are n children standing in a line. Each child is assigned a rating value given
 * in the integer array ratings.
 *
 * You are giving candies to these children subjected to the following requirements:
 * - Each child must have at least one candy.
 * - Children with a higher rating get more candies than their neighbors.
 *
 * Return the minimum number of candies you need to have to distribute the candies to
 * the children.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Input: ratings = [1,0,2]</dd>
 * <dt>Output:</dt>
 * <dd>See walkthrough</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum candies to distribute is 5 following the rules</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Tree, Trie
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n) - Additional set storage
 *
 * ### INTUITION:
 * This is a classic greedy problem requiring two passes. The key insight is that we
 * need to satisfy both left and right neighbor constraints independently, then take
 * the maximum to satisfy both.
 *
 * ### APPROACH:
1. **Initialize**: Give each child 1 candy initially
2. **Left to right pass**: If ratings[i] > ratings[i-1], ensure candies[i] > candies[i-1]
3. **Right to left pass**: If ratings[i] > ratings[i+1], ensure candies[i] > candies[i+1]
4. **Sum total**: Return sum of all candies

### WHY THIS WORKS:
 * - **Greedy choice**: We assign minimum necessary candies to satisfy local constraints
 * - **Two passes ensure both directions**:
 *   - Left pass ensures right neighbor constraint
 *   - Right pass ensures left neighbor constraint
 *   - Taking max ensures both constraints satisfied
 * - **Optimality**: Each assignment is minimal, so total is minimal
 *
 * ### EXAMPLE WALKTHROUGH:
Input:
```
ratings = [1,0,2]
```

Initial: candies = [1,1,1]
Left to right pass:
i=1: ratings[1]=0 < ratings[0]=1, no change
candies = [1,1,1]
i=2: ratings[2]=2 > ratings[1]=0, candies[2] = candies[1] + 1 = 2
candies = [1,1,2]
Right to left pass:
i=1: ratings[1]=0 < ratings[2]=2, no change
candies = [1,1,2]
i=0: ratings[0]=1 > ratings[1]=0, candies[0] = max(1, 1+1) = 2
candies = [2,1,2]
Total: 2 + 1 + 2 = 5

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Two passes through the array
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional set storage
 * Array to store candy counts (can be optimized to O(1) with complex logic)
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  candy(ratings: number[]): number {
    const n = ratings.length;
    const candies = new Array(n).fill(1);

    // Left to right pass
    for (let i = 1; i < n; i++) {
      if (ratings[i] > ratings[i - 1]) {
        candies[i] = candies[i - 1] + 1;
      }
    }

    // Right to left pass
    for (let i = n - 2; i >= 0; i--) {
      if (ratings[i] > ratings[i + 1]) {
        candies[i] = Math.max(candies[i], candies[i + 1] + 1);
      }
    }

    return candies.reduce((sum, candy) => sum + candy, 0);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.candy([1, 0, 2]) === 5 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.candy([1, 2, 2]) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.candy([1, 3, 2, 2, 1]) === 7 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
