/**
 * # Difficulty: Medium
 *
 * # 503. Next Greater Element II
 *
 * Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums.
 *
 * The next greater number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2, 3, -1]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>In a circular array, the next greater elements are found by wrapping around: [2,2,1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Process array circularly (use index % n twice). Use decreasing monotonic stack. For each element, pop smaller elements and set their result to current. Elements remaining have no greater element.
 *
 * ### APPROACH:
 * 1. **Initialize result**: Set result = [-1] * len(nums)
 * 2. **Initialize stack**: Create empty stack to store indices
 * 3. **Iterate twice**: For i in range(2 * len(nums))
 * 4. **Get index**: idx = i % len(nums)
 * 5. **Process greater elements**: While stack and nums[idx] > nums[stack[-1]], result[stack.pop()] = nums[idx]
 * 6. **Push to stack**: If i < len(nums), append idx to stack
 * 7. **Return result**: Return result array
 *
 * ### WHY THIS WORKS:
 * - Process array twice (2n) to handle circular: element can have next greater after wraparound
 * - Monotonic decreasing stack stores indices waiting for next greater
 * - Use i % n to wrap indices in second pass
 * - When greater element found, pop smaller elements and record their answers
 * - O(n) time: despite 2n iterations, each element pushed/popped once
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,2,1]
 * Step 1: Treat as circular, process twice
 *   Extended: [1,2,1,1,2,1]
 *
 * Step 2: Use monotonic stack from right
 *   i=5: stack=[1], result[2]=1
 *   i=4: pop 1, stack=[2], result[1]=2
 *   i=3: stack=[1,2], result[0]=2
 *   i=2: stack=[1,2], result[2]=2
 *   i=1: stack=[2], result[1]=-1
 *   i=0: stack=[1,2], result[0]=2
 *
 * Output: [2,-1,2]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  /**
   * Find the next greater element for each element in a circular array.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  nextGreaterElements(nums: number[]): number[] {
    if (!nums || nums.length === 0) {
      return [];
    }

    const n = nums.length;
    const result: number[] = new Array(n).fill(-1);
    const stack: number[] = []; // Stack to store indices

    // Iterate through the array twice to handle circular nature
    // We use modulo to simulate circular array
    for (let i = 0; i < 2 * n; i++) {
      const current = nums[i % n];

      // While stack is not empty and current element is greater than
      // the element at index at top of stack
      while (stack.length > 0 && nums[stack[stack.length - 1]] < current) {
        result[stack.pop()!] = current;
      }

      // Only push index to stack during first iteration
      if (i < n) {
        stack.push(i);
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Basic case
  console.log(`Test 1: ${JSON.stringify(solution.nextGreaterElements([1, 2, 3])) === JSON.stringify([2, 3, -1]) ? "PASS" : "FAIL"}`);

  // Test case 2: Circular case
  console.log(`Test 2: ${JSON.stringify(solution.nextGreaterElements([1, 2, 1])) === JSON.stringify([2, -1, 2]) ? "PASS" : "FAIL"}`);

  // Test case 3: All same
  console.log(`Test 3: ${JSON.stringify(solution.nextGreaterElements([5, 5, 5])) === JSON.stringify([-1, -1, -1]) ? "PASS" : "FAIL"}`);

  // Test case 4: Single element
  console.log(`Test 4: ${JSON.stringify(solution.nextGreaterElements([1])) === JSON.stringify([-1]) ? "PASS" : "FAIL"}`);

  // Test case 5: Decreasing
  console.log(`Test 5: ${JSON.stringify(solution.nextGreaterElements([5, 4, 3, 2, 1])) === JSON.stringify([-1, 5, 5, 5, 5]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
