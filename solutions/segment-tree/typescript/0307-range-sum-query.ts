/**
 * # 0307. Range Sum Query
 *
 * Difficulty: Medium
 *
 *
 * Given an integer array `nums`, handle multiple queries of the following types:
 *
 *
 *
 * Implement the NumArray class:
 * - NumArray(int[] nums) Initializes the object with the integer array nums.
 * - void update(int index, int val) Updates the value of nums[index] to be val.
 * - int sumRange(int left, int right) Returns the sum of the elements between indices left and right.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["NumArray", "sumRange", "update", "sumRange"]</dd>
 * <dt>Output:</dt>
 * <dd>[null, 9, null, 8]</dd>
 * <dt>Explanation:</dt>
 * <dd>After update(1,10), the sum of range [0,2] is computed as 16 using the segment tree</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(log n) for both update and query - Binary search or tree height
 * **Space Complexity**: O(n) - Additional set storage
 *
 * ### INTUITION:
 * For mutable arrays, prefix sums become inefficient (O(n) updates). Segment trees provide a balanced solution with O(log n) for both updates and range queries by representing the array as a binary tree where each node stores the sum of its range.
 *
 * ### APPROACH:
 * 1. **Tree Structure**: Complete binary tree where leaves are array elements
 * 2. **Internal Nodes**: Store sum of their children's ranges
 * 3. **Update**: Propagate changes up from leaf to root
 * 4. **Query**: Traverse tree to collect relevant range sums
 *
 * ### WHY THIS WORKS:
The tree height is log n, so we visit at most log n nodes for any operation. Each internal node represents a range, allowing us to quickly skip over irrelevant sections during queries.

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,3,5]
 * ```
 *
 * Steps:
 * Step 1: Initial array → [1,3,5]
 * Step 2: sumRange(0,2) → sum of indices 0-2 → 1+3+5 = 9
 * Step 3: update(1, 2) → nums[1] = 2 → array becomes [1,2,5]
 * Step 4: sumRange(0,2) → sum of indices 0-2 → 1+2+5 = 8
 *
 * Output:
 * ```
 * 8
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(log n) for both update and query
 * - Binary search or tree height
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional set storage
 *
 * ### EDGE CASES:
- **Single element array**: Sum queries return that element
- **Update single element**: Propagate changes up segment tree
- **Query entire range**: Return root node value
- **Frequent updates**: Segment tree handles efficiently in O(log n)
- **Range [i, i]**: Query single element

</details>

</details>

</details>

</details>

</details>

</details>

</details>

</details>
 */

class NumArray {
  private tree: number[];
  private n: number;

  /**
   * Initialize the segment tree.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  constructor(nums: number[]) {
    this.n = nums.length;
    this.tree = new Array(this.n * 2).fill(0);

    // Build tree: copy leaves
    for (let i = 0; i < this.n; i++) {
      this.tree[this.n + i] = nums[i];
    }

    // Build tree: calculate parents
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
    }
  }

  /**
   * Update element at index to val.
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   */
  update(index: number, val: number): void {
    // Set value at position index + n
    index += this.n;
    this.tree[index] = val;

    // Move upward and update parents
    while (index > 1) {
      index = Math.floor(index / 2);
      this.tree[index] = this.tree[2 * index] + this.tree[2 * index + 1];
    }
  }

  /**
   * Return sum of range [left, right].
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   */
  sumRange(left: number, right: number): number {
    // Get sum on interval [left, right]
    left += this.n;
    right += this.n;
    let sum = 0;

    while (left <= right) {
      if (left % 2 === 1) {
        sum += this.tree[left];
        left++;
      }
      if (right % 2 === 0) {
        sum += this.tree[right];
        right--;
      }
      left = Math.floor(left / 2);
      right = Math.floor(right / 2);
    }

    return sum;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = NumArray;
}

function runTests(): void {
  const numArray = new NumArray([1, 3, 5]);

  console.log(`Test 1: ${numArray.sumRange(0, 2) === 9 ? "PASS" : "FAIL"}`); // sum([1, 3, 5]) = 9
  numArray.update(1, 2);
  console.log(`Test 2: ${numArray.sumRange(0, 2) === 8 ? "PASS" : "FAIL"}`); // sum([1, 2, 5]) = 8

  const numArray2 = new NumArray([7, 2, 7, 2, 0]);
  console.log(`Test 3: ${numArray2.sumRange(0, 2) === 16 ? "PASS" : "FAIL"}`);
  numArray2.update(4, 6);
  console.log(`Test 4: ${numArray2.sumRange(0, 4) === 24 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default NumArray;
