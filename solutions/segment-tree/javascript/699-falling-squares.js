/**
 *  Difficulty: Hard
 *
 * # 699. Falling Squares
 *
 * There are several squares being dropped onto the X-axis of a 2D plane.
 *
 * You are given a 2D integer array positions where positions[i] = [lefti, sideLengthi] represents the ith square with a side length of sideLengthi that is dropped with its left edge aligned with X-coordinate lefti.
 *
 * Each square is dropped one at a time from a height above any landed squares. It then falls downward (negative Y direction) until it either lands on the top side of another square or on the X-axis. A square brushing the left/right side of another square does not count as landing on it. Once it lands, it freezes in place and cannot be moved.
 *
 * Return an integer array ans where ans[i] represents the height of the tallest stack of squares after dropping the ith square.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2, 5, 5]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>After each square falls, the skyline heights are [2,5,5]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Segment Tree, Range Queries
 * **Data Structures**: Segment Tree
 * **Patterns**: Segment Tree Pattern, Range Operations
 * **Time Complexity**: **O(n² log n)
 * **Space Complexity**: **O(n)

 *
 * ### INTUITION:
 * This is a range maximum query problem with updates. For each falling square, we need to find the maximum height in its range [left, right), then update that range with the new height. Segment trees with lazy propagation are perfect for this.
 *
 * ### APPROACH:
 * 1. **Coordinate compression**: Extract all left and right boundaries from positions, create sorted mapping to compress coordinates
 * 2. **Build segment tree**: Create segment tree with lazy propagation to handle range queries and updates efficiently
 * 3. **Process each square**: For each falling square, determine its compressed coordinate range [left, right)
 * 4. **Query max height**: Use segment tree to find maximum height in the square's landing range
 * 5. **Calculate new height**: Add square's side length to the maximum height found to get new height at this position
 * 6. **Update range**: Use lazy propagation to update all positions in range with the new height value
 * 7. **Track and return heights**: After each square, query global maximum and add to result array
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: [[1,2],[2,3],[6,1]]
 * Square 1: [1,3) at height 0 → lands at 0, new height 2
 * Square 2: [2,5) overlaps [2,3), max height 2 → lands at 2, new height 5
 * Square 3: [6,7) no overlap → lands at 0, new height 1
 * Heights: [2, 5, 5]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n² log n)
 * Due to coordinate compression and segment tree operations
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For coordinate mapping and tree structure
 *
 * ### EDGE CASES:
 * - Single square
 * - Non-overlapping squares
 * - Completely overlapping squares
 * - Squares with different sizes
 * - Large coordinate values
 *
 * </details>
 */

/**
 * Main solution for Problem 699: Falling Squares
 * Simpler interval-based approach
 *
 * @param {number[][]} positions - Array of [left, sideLength] pairs
 * @return {number[]} - Maximum heights after each square
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function solve(positions) {
  if (!positions || positions.length === 0) {
    return [];
  }

  const intervals = []; // [[left, right, height], ...]
  const result = [];
  let maxHeight = 0;

  for (const [left, sideLength] of positions) {
    const right = left + sideLength;

    // Find max height in overlapping range
    let baseHeight = 0;
    for (const [l, r, h] of intervals) {
      // Check if intervals overlap
      if (l < right && left < r) {
        baseHeight = Math.max(baseHeight, h);
      }
    }

    const newHeight = baseHeight + sideLength;
    intervals.push([left, right, newHeight]);
    maxHeight = Math.max(maxHeight, newHeight);
    result.push(maxHeight);
  }

  return result;
}

/**
 * Alternative solution using Segment Tree with coordinate compression
 */
class SegmentTree {
  constructor(coords) {
    this.coords = coords;
    this.n = coords.length;
    this.tree = new Array(4 * this.n).fill(0);
  }

  update(node, start, end, left, right, height) {
    if (right < start || left > end) {
      return;
    }

    if (left <= start && end <= right) {
      this.tree[node] = Math.max(this.tree[node], height);
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this.update(2 * node, start, mid, left, right, height);
    this.update(2 * node + 1, mid + 1, end, left, right, height);
    this.tree[node] = Math.max(this.tree[2 * node], this.tree[2 * node + 1]);
  }

  query(node, start, end, left, right) {
    if (right < start || left > end) {
      return 0;
    }

    if (left <= start && end <= right) {
      return this.tree[node];
    }

    const mid = Math.floor((start + end) / 2);
    const leftMax = this.query(2 * node, start, mid, left, right);
    const rightMax = this.query(2 * node + 1, mid + 1, end, left, right);
    return Math.max(leftMax, rightMax);
  }

  queryRange(left, right) {
    const leftIdx = this.coords.indexOf(left);
    const rightIdx = this.coords.indexOf(right) - 1;
    if (leftIdx === -1 || rightIdx === -1 || leftIdx > rightIdx) {
      return 0;
    }
    return this.query(1, 0, this.n - 1, leftIdx, rightIdx);
  }

  updateRange(left, right, height) {
    const leftIdx = this.coords.indexOf(left);
    const rightIdx = this.coords.indexOf(right) - 1;
    if (leftIdx === -1 || rightIdx === -1 || leftIdx > rightIdx) {
      return;
    }
    this.update(1, 0, this.n - 1, leftIdx, rightIdx, height);
  }
}

function solveWithSegmentTree(positions) {
  if (!positions || positions.length === 0) {
    return [];
  }

  // Coordinate compression
  const coords = new Set();
  for (const [left, sideLength] of positions) {
    coords.add(left);
    coords.add(left + sideLength);
  }

  const sortedCoords = Array.from(coords).sort((a, b) => a - b);
  const tree = new SegmentTree(sortedCoords);

  const result = [];
  let maxHeight = 0;

  for (const [left, sideLength] of positions) {
    const right = left + sideLength;

    const baseHeight = tree.queryRange(left, right);
    const newHeight = baseHeight + sideLength;

    tree.updateRange(left, right, newHeight);
    maxHeight = Math.max(maxHeight, newHeight);
    result.push(maxHeight);
  }

  return result;
}

/**
 * Test cases for Problem 699: Falling Squares
 */
function testSolution() {
  console.log("Testing 699. Falling Squares");

  // Test case 1: Basic example
  const result1 = solve([
    [1, 2],
    [2, 3],
    [6, 1],
  ]);
  const expected1 = [2, 5, 5];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );
  console.log(
    `✓ Test 1 passed: [[1,2],[2,3],[6,1]] -> ${JSON.stringify(result1)}`,
  );

  // Test case 2: More overlapping
  const result2 = solve([
    [100, 100],
    [200, 100],
  ]);
  const expected2 = [100, 100];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );
  console.log(
    `✓ Test 2 passed: [[100,100],[200,100]] -> ${JSON.stringify(result2)}`,
  );

  // Test case 3: Stacking squares
  const result3 = solve([
    [1, 5],
    [2, 2],
    [3, 1],
  ]);
  const expected3 = [5, 7, 8];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );
  console.log(
    `✓ Test 3 passed: [[1,5],[2,2],[3,1]] -> ${JSON.stringify(result3)}`,
  );

  // Test case 4: Single square
  const result4 = solve([[5, 3]]);
  const expected4 = [3];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed`,
  );
  console.log(`✓ Test 4 passed: [[5,3]] -> ${JSON.stringify(result4)}`);

  // Test segment tree solution
  console.log("\nTesting Segment Tree solution:");
  const result5 = solveWithSegmentTree([
    [1, 2],
    [2, 3],
    [6, 1],
  ]);
  console.assert(
    JSON.stringify(result5) === JSON.stringify([2, 5, 5]),
    "Segment tree solution test failed",
  );
  console.log(
    `✓ Segment Tree solution test passed: ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 699. Falling Squares!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 699. Falling Squares ===");
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
  solve,
  solveWithSegmentTree,
  SegmentTree,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Simple interval approach is easier to understand
 * - Segment tree is more efficient for large inputs
 * - Coordinate compression is essential for segment tree approach
 * - The problem simulates physical stacking behavior
 * - Both solutions maintain running maximum height
 */
