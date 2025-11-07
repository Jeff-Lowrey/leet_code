/**
### INTUITION:
The key insight is that this extends the classic LIS problem by not just finding the length, but also counting how many subsequences achieve that length. We can use dynamic programming or segment trees. For each position, we track both the longest length ending there and the count of such sequences.

### APPROACH:
1. **Initialize DP arrays**: Create two arrays - lengths[i] for LIS length ending at i, counts[i] for number of such subsequences
2. **Set base values**: Initialize all lengths to 1 and all counts to 1 (each element is a subsequence of length 1)
3. **Nested loop iteration**: For each position i, check all previous positions j where nums[j] < nums[i]
4. **Update when longer found**: If lengths[j] + 1 > lengths[i], found longer sequence, update lengths[i] and reset counts[i] to counts[j]
5. **Add when equal length**: If lengths[j] + 1 == lengths[i], found another sequence of same length, add counts[j] to counts[i]
6. **Find maximum length**: After processing all positions, find the maximum value in lengths array
7. **Sum matching counts**: Return sum of counts[i] for all positions i where lengths[i] equals maximum length

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,3,5,4,7]
```

For each position:
i=0: nums[0]=1, length=1, count=1

Steps:
Step 1: i=1: nums[1]=3, length=2 (1→3), count=1
Step 2: i=2: nums[2]=5, length=3 (1→3→5), count=1
Step 3: i=3: nums[3]=4, length=3 (1→3→4), count=1
Step 4: i=4: nums[4]=7, length=4, count=2 (from both i=2 and i=3)

Output:
```
2
```

### TIME COMPLEXITY:
- DP: **O(n²)**
- Segment Tree: **O(n log n)**

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage
For DP arrays or tree structure

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Main solution for Problem 673: Number Of Longest Increasing Subsequence
 *
 * @param {number[]} nums - Input array
 * @return {number} - Count of longest increasing subsequences
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function solve(nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  const n = nums.length;
  const lengths = new Array(n).fill(1); // LIS length ending at i
  const counts = new Array(n).fill(1); // Count of LIS ending at i

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (lengths[j] + 1 > lengths[i]) {
          // Found longer subsequence
          lengths[i] = lengths[j] + 1;
          counts[i] = counts[j];
        } else if (lengths[j] + 1 === lengths[i]) {
          // Found another subsequence of same length
          counts[i] += counts[j];
        }
      }
    }
  }

  // Find maximum length
  const maxLength = Math.max(...lengths);

  // Count subsequences with maximum length
  let result = 0;
  for (let i = 0; i < n; i++) {
    if (lengths[i] === maxLength) {
      result += counts[i];
    }
  }

  return result;
}

/**
 * Alternative solution using Segment Tree with coordinate compression
 * More complex but demonstrates segment tree application
 */
class SegmentTreeNode {
  constructor() {
    this.length = 0;
    this.count = 0;
  }
}

function solveWithSegmentTree(nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  const n = nums.length;

  // Coordinate compression
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const rank = new Map();
  sorted.forEach((num, idx) => rank.set(num, idx));

  const tree = new Array(4 * sorted.length);
  for (let i = 0; i < tree.length; i++) {
    tree[i] = new SegmentTreeNode();
  }

  function query(node, start, end, left, right) {
    if (right < start || left > end) {
      return new SegmentTreeNode();
    }

    if (left <= start && end <= right) {
      return tree[node];
    }

    const mid = Math.floor((start + end) / 2);
    const leftResult = query(2 * node, start, mid, left, right);
    const rightResult = query(2 * node + 1, mid + 1, end, left, right);

    const result = new SegmentTreeNode();
    if (leftResult.length > rightResult.length) {
      result.length = leftResult.length;
      result.count = leftResult.count;
    } else if (leftResult.length < rightResult.length) {
      result.length = rightResult.length;
      result.count = rightResult.count;
    } else {
      result.length = leftResult.length;
      result.count = leftResult.count + rightResult.count;
    }

    return result;
  }

  function update(node, start, end, idx, length, count) {
    if (start === end) {
      if (length > tree[node].length) {
        tree[node].length = length;
        tree[node].count = count;
      } else if (length === tree[node].length) {
        tree[node].count += count;
      }
      return;
    }

    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) {
      update(2 * node, start, mid, idx, length, count);
    } else {
      update(2 * node + 1, mid + 1, end, idx, length, count);
    }

    const left = tree[2 * node];
    const right = tree[2 * node + 1];

    if (left.length > right.length) {
      tree[node].length = left.length;
      tree[node].count = left.count;
    } else if (left.length < right.length) {
      tree[node].length = right.length;
      tree[node].count = right.count;
    } else {
      tree[node].length = left.length;
      tree[node].count = left.count + right.count;
    }
  }

  for (const num of nums) {
    const r = rank.get(num);
    const result =
      r > 0 ? query(1, 0, sorted.length - 1, 0, r - 1) : new SegmentTreeNode();

    const newLength = result.length + 1;
    const newCount = Math.max(1, result.count);

    update(1, 0, sorted.length - 1, r, newLength, newCount);
  }

  return tree[1].count;
}

/**
 * Test cases for Problem 673: Number Of Longest Increasing Subsequence
 */
function testSolution() {
  console.log("Testing 673. Number Of Longest Increasing Subsequence");

  // Test case 1: Basic example
  const result1 = solve([1, 3, 5, 4, 7]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`✓ Test 1 passed: [1,3,5,4,7] -> ${result1} LIS`);

  // Test case 2: Another example
  const result2 = solve([2, 2, 2, 2, 2]);
  const expected2 = 5;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`✓ Test 2 passed: [2,2,2,2,2] -> ${result2} LIS`);

  // Test case 3: Single element
  const result3 = solve([1]);
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`✓ Test 3 passed: [1] -> ${result3} LIS`);

  // Test case 4: Strictly increasing
  const result4 = solve([1, 2, 3, 4, 5]);
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`✓ Test 4 passed: [1,2,3,4,5] -> ${result4} LIS`);

  // Test case 5: Complex case
  const result5 = solve([1, 2, 4, 3, 5, 4, 7, 2]);
  const expected5 = 3; // [1,2,4,5,7], [1,2,3,5,7], [1,2,3,4,7]
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`✓ Test 5 passed: [1,2,4,3,5,4,7,2] -> ${result5} LIS`);

  // Test segment tree solution
  console.log("\nTesting Segment Tree solution:");
  const result6 = solveWithSegmentTree([1, 3, 5, 4, 7]);
  console.assert(result6 === 2, "Segment tree solution test failed");
  console.log(`✓ Segment Tree solution test passed: ${result6} LIS`);

  console.log(
    "All test cases passed for 673. Number Of Longest Increasing Subsequence!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 673. Number Of Longest Increasing Subsequence ===",
  );
  console.log("Category: Segment Tree");
  console.log("Difficulty: Medium");
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
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - DP solution is simpler and sufficient for this problem
 * - Segment tree solution demonstrates advanced techniques
 * - Both track length and count simultaneously
 * - The DP solution is O(n^2) but very practical
 * - Segment tree with coordinate compression can achieve O(n log n)
 */
