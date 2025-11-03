/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that use monotonic increasing stack to track indices. When current height < stack top, pop and calculate area with popped as smallest height. Width is current index minus new stack top. Track max area.
 *
 * ### APPROACH:
 * 1. **Initialize stack**: Create empty stack to store indices
 * 2. **Initialize max area**: Set max_area = 0
 * 3. **Iterate with sentinel**: Process each bar plus a sentinel (height 0) at end
 * 4. **Maintain increasing stack**: While stack not empty and current height < height at stack top
 * 5. **Calculate area**: Pop index, height = heights[popped], width = (i - stack[-1] - 1) if stack else i
 * 6. **Update maximum**: max_area = max(max_area, height * width)
 * 7. **Push current**: Append current index to stack
 * 8. **Return result**: Return max_area
 *
 * ### WHY THIS WORKS:
 * - Monotonic increasing stack maintains indices where heights are ascending
 * - When shorter bar found, pop taller bars and calculate their max rectangles
 * - Width = current_index - stack_top - 1 (distance between boundaries)
 * - Stack indices represent left boundaries, current index is right boundary
 * - O(n) time: each bar pushed/popped once, O(n) space for stack
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * heights = [2,1,5,6,2,3]
 * ```
 *
 * Step 1: Use monotonic stack
 * i=0: stack=[(0,2)]
 * i=1: pop (0,2), area=2*1=2, push (1,1)
 * i=2: push (2,5)
 * i=3: push (3,6)
 * i=4: pop (3,6), area=6*1=6
 * pop (2,5), area=5*2=10
 * push (2,2)
 * i=5: push (5,3)
 *
 * Output:
 * ```
 * 10 (maximum area)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 */

class Solution {
  /**
   * Find largest rectangle area in histogram using monotonic stack.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  largestRectangleArea(heights: number[]): number {
    const stack: number[] = []; // Store indices of bars
    let maxArea = 0;

    for (let i = 0; i < heights.length; i++) {
      const h = heights[i];

      // Maintain increasing stack
      while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
        const height = heights[stack.pop()!];
        // Width is distance to current bar minus distance to previous bar
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
      }

      stack.push(i);
    }

    // Process remaining bars in stack
    while (stack.length > 0) {
      const height = heights[stack.pop()!];
      const width = stack.length === 0 ? heights.length : heights.length - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }

    return maxArea;
  }

  /**
   * Alternative divide and conquer approach.
   *
   * Time Complexity: O(n log n) average, O(n^2) worst
   * Space Complexity: O(log n) for recursion
   */
  largestRectangleAreaDivideConquer(heights: number[]): number {
    if (heights.length === 0) {
      return 0;
    }

    const helper = (left: number, right: number): number => {
      if (left > right) {
        return 0;
      }

      // Find minimum height in range
      let minIndex = left;
      for (let i = left; i <= right; i++) {
        if (heights[i] < heights[minIndex]) {
          minIndex = i;
        }
      }

      // Calculate area with minimum as height
      const currentArea = heights[minIndex] * (right - left + 1);

      // Recursively check left and right of minimum
      const leftArea = helper(left, minIndex - 1);
      const rightArea = helper(minIndex + 1, right);

      return Math.max(currentArea, leftArea, rightArea);
    };

    return helper(0, heights.length - 1);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Classic example
  console.log(`Test 1: ${solution.largestRectangleArea([2, 1, 5, 6, 2, 3]) === 10 ? "PASS" : "FAIL"}`);

  // Test case 2: Single bar
  console.log(`Test 2: ${solution.largestRectangleArea([2]) === 2 ? "PASS" : "FAIL"}`);

  // Test case 3: Increasing heights
  console.log(`Test 3: ${solution.largestRectangleArea([1, 2, 3, 4, 5]) === 9 ? "PASS" : "FAIL"}`);

  // Test case 4: Decreasing heights
  console.log(`Test 4: ${solution.largestRectangleArea([5, 4, 3, 2, 1]) === 9 ? "PASS" : "FAIL"}`);

  // Test case 5: All same height
  console.log(`Test 5: ${solution.largestRectangleArea([4, 4, 4, 4]) === 16 ? "PASS" : "FAIL"}`);

  // Test case 6: Empty array
  console.log(`Test 6: ${solution.largestRectangleArea([]) === 0 ? "PASS" : "FAIL"}`);

  // Test case 7: Two bars
  console.log(`Test 7: ${solution.largestRectangleArea([2, 4]) === 4 ? "PASS" : "FAIL"}`);

  // Test case 8: Divide and conquer approach
  console.log(`Test 8: ${solution.largestRectangleAreaDivideConquer([2, 1, 5, 6, 2, 3]) === 10 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
