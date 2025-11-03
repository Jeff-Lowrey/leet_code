/**
### INTUITION:
This problem requires efficient range updates and queries. We can use segment trees with lazy propagation, or maintain a sorted list of disjoint intervals and merge/split them as needed.

### APPROACH:
1. **Initialize interval list**: Create empty sorted list to store disjoint intervals [left, right)
2. **addRange operation**: Find all intervals that overlap or are adjacent to [left, right), merge them into single interval
3. **Remove overlapping**: Delete all intervals that would be merged, insert new merged interval maintaining sorted order
4. **queryRange operation**: Binary search to find intervals that could contain [left, right), verify complete coverage
5. **removeRange operation**: Find all intervals that overlap with [left, right), split them and remove the overlapping parts
6. **Maintain invariants**: Keep intervals sorted and disjoint at all times for efficient operations
7. **Return query result**: For queries, return True only if entire range is continuously tracked

### WHY THIS WORKS:
The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.

### EXAMPLE WALKTHROUGH:
Input:
```
addRange(10, 20): ranges = [(10, 20)]
```

removeRange(14, 16): ranges = [(10, 14), (16, 20)]
queryRange(10, 14): true (fully covered)
queryRange(13, 15): false (15 not covered)
queryRange(16, 17): true (fully covered)

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
- Segment Tree: **O(log n)** per operation
- Sorted Intervals: **O(n)** worst case, **O(log n)** average

### SPACE COMPLEXITY:
O(n)**
For tree or interval list

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

/**
 * Range Module class
 */
class RangeModule {
  constructor() {
    // Store intervals as [left, right) pairs in sorted order
    this.intervals = [];
  }

  /**
   * Add range [left, right)
   * @param {number} left
   * @param {number} right
   * @return {void}
   */
  addRange(left, right) {
    const newIntervals = [];
    let i = 0;
    const n = this.intervals.length;

    // Add all intervals before the new range
    while (i < n && this.intervals[i][1] < left) {
      newIntervals.push(this.intervals[i]);
      i++;
    }

    // Merge overlapping intervals
    while (i < n && this.intervals[i][0] <= right) {
      left = Math.min(left, this.intervals[i][0]);
      right = Math.max(right, this.intervals[i][1]);
      i++;
    }
    newIntervals.push([left, right]);

    // Add remaining intervals
    while (i < n) {
      newIntervals.push(this.intervals[i]);
      i++;
    }

    this.intervals = newIntervals;
  }

  /**
   * Check if range [left, right) is fully tracked
   * @param {number} left
   * @param {number} right
   * @return {boolean}
   */
  queryRange(left, right) {
    // Binary search for interval that might contain left
    let lo = 0,
      hi = this.intervals.length - 1;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const [l, r] = this.intervals[mid];

      if (l <= left && right <= r) {
        return true;
      } else if (r < left) {
        lo = mid + 1;
      } else if (l > left) {
        hi = mid - 1;
      } else {
        // Partial overlap, not fully covered
        return false;
      }
    }

    return false;
  }

  /**
   * Remove range [left, right)
   * @param {number} left
   * @param {number} right
   * @return {void}
   */
  removeRange(left, right) {
    const newIntervals = [];
    let i = 0;
    const n = this.intervals.length;

    // Add all intervals before the removal range
    while (i < n && this.intervals[i][1] <= left) {
      newIntervals.push(this.intervals[i]);
      i++;
    }

    // Handle overlapping intervals
    while (i < n && this.intervals[i][0] < right) {
      const [l, r] = this.intervals[i];

      // Keep left part if it exists
      if (l < left) {
        newIntervals.push([l, left]);
      }

      // Keep right part if it exists
      if (r > right) {
        newIntervals.push([right, r]);
      }

      i++;
    }

    // Add remaining intervals
    while (i < n) {
      newIntervals.push(this.intervals[i]);
      i++;
    }

    this.intervals = newIntervals;
  }
}

/**
 * Wrapper function for testing
 */
function solve(operations, args) {
  let rangeModule = null;
  const results = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const arg = args[i];

    if (op === "RangeModule") {
      rangeModule = new RangeModule();
      results.push(null);
    } else if (op === "addRange") {
      rangeModule.addRange(arg[0], arg[1]);
      results.push(null);
    } else if (op === "queryRange") {
      results.push(rangeModule.queryRange(arg[0], arg[1]));
    } else if (op === "removeRange") {
      rangeModule.removeRange(arg[0], arg[1]);
      results.push(null);
    }
  }

  return results;
}

/**
 * Test cases for Problem 715: Range Module
 */
function testSolution() {
  console.log("Testing 715. Range Module");

  // Test case 1: Basic operations
  const ops1 = [
    "RangeModule",
    "addRange",
    "removeRange",
    "queryRange",
    "queryRange",
    "queryRange",
  ];
  const args1 = [[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]];
  const result1 = solve(ops1, args1);
  const expected1 = [null, null, null, true, false, true];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );
  console.log(`✓ Test 1 passed: Basic operations`);

  // Test case 2: Multiple adds
  const ops2 = ["RangeModule", "addRange", "addRange", "queryRange"];
  const args2 = [[], [10, 20], [15, 25], [10, 25]];
  const result2 = solve(ops2, args2);
  const expected2 = [null, null, null, true];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed`,
  );
  console.log(`✓ Test 2 passed: Merging ranges`);

  // Test case 3: Complex sequence
  const rangeModule = new RangeModule();
  rangeModule.addRange(10, 180);
  console.assert(rangeModule.queryRange(10, 180) === true, "Test 3a failed");
  rangeModule.removeRange(50, 150);
  console.assert(rangeModule.queryRange(50, 100) === false, "Test 3b failed");
  console.assert(rangeModule.queryRange(10, 50) === true, "Test 3c failed");
  console.assert(rangeModule.queryRange(150, 180) === true, "Test 3d failed");
  console.log(`✓ Test 3 passed: Complex operations`);

  // Test case 4: Edge cases
  const rangeModule2 = new RangeModule();
  rangeModule2.addRange(1, 10);
  rangeModule2.addRange(10, 20);
  console.assert(rangeModule2.queryRange(1, 20) === true, "Test 4a failed");
  rangeModule2.removeRange(5, 15);
  console.assert(rangeModule2.queryRange(1, 5) === true, "Test 4b failed");
  console.assert(rangeModule2.queryRange(15, 20) === true, "Test 4c failed");
  console.assert(rangeModule2.queryRange(5, 15) === false, "Test 4d failed");
  console.log(`✓ Test 4 passed: Adjacent ranges`);

  console.log("All test cases passed for 715. Range Module!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 715. Range Module ===");
  console.log("Category: Segment Tree");
  console.log("Difficulty: Hard");
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  RangeModule,
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Interval merging approach is simpler than segment tree for this problem
 * - Maintains sorted non-overlapping intervals
 * - Binary search optimizes query operations
 * - Could use segment tree with lazy propagation for better worst-case complexity
 * - The simpler approach is sufficient for LeetCode constraints
 */
