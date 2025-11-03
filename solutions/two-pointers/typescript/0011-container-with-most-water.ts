/**
 * # Difficulty: Medium
 *
 * # 0011. Container With Most Water
 *
 *
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 *
 * Find two lines that together with the x-axis form a container, such that the container contains the most water.
 *
 * Return the maximum amount of water a container can store.
 *
 * Notice that you may not slant the container.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>height = [1, 8, 6, 2, 5, 4, 8, 3, 7]</dd>
 * <dt>Output:</dt>
 * <dd>49</dd>
 * <dt>Explanation:</dt>
 * <dd>Maximum water container area is 49 with heights [1,8,6,2,5,4,8,3,7]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Two Pointers, Binary Search
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
The key insight is that use two pointers from both ends. Calculate area = min(height[left], height[right]) * width. Move pointer with smaller height inward (moving taller pointer can't increase area). Track maximum.

### APPROACH:
 * 1. **Initialize pointers**: Set left = 0, right = len(height) - 1
 * 2. **Initialize max area**: Set max_area = 0
 * 3. **Loop while left < right**: Continue until pointers meet
 * 4. **Calculate area**: area = min(height[left], height[right]) * (right - left)
 * 5. **Update maximum**: max_area = max(max_area, area)
 * 6. **Move pointer**: If height[left] < height[right], increment left; else decrement right
 * 7. **Return result**: Return max_area as maximum water container
 *
 * ### WHY THIS WORKS:
- This ensures that two pointers: left at start, right at end
- This ensures that area = min(height[left], height[right]) * (right - left)
- This ensures that move pointer with shorter height: taller height won't improve area until we find taller opposite
- This ensures that track maximum area seen
- This ensures that o(n) time: single pass, O(1) space

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
 * ```
 *
 * Step 1: Initialize
 * left = 0 (height=1), right = 8 (height=7)
 * max_area = 0
 * Step 2: First iteration
 * width = 8 - 0 = 8
 * min_height = min(1, 7) = 1
 * area = 8 × 1 = 8
 * max_area = 8
 * Move left pointer (smaller height)
 * left = 1
 * Step 3: left=1 (height=8), right=8 (height=7)
 * width = 8 - 1 = 7
 * min_height = min(8, 7) = 7
 * area = 7 × 7 = 49
 * max_area = 49
 * Move right pointer (smaller height)
 * right = 7
 * Step 4: left=1 (height=8), right=7 (height=3)
 * width = 7 - 1 = 6
 * min_height = min(8, 3) = 3
 * area = 6 × 3 = 18
 * max_area = 49 (no change)
 * Move right pointer
 * right = 6
 * Step 5: Continue until left >= right...
 *
 * Output:
 * ```
 * 49
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  maxArea(height: number[]): number {
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;

    while (left < right) {
      const width = right - left;
      const minHeight = Math.min(height[left], height[right]);
      const area = width * minHeight;

      maxWater = Math.max(maxWater, area);

      if (height[left] < height[right]) {
        left++;
      } else {
        right--;
      }
    }

    return maxWater;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]) === 49 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.maxArea([1, 1]) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.maxArea([4, 3, 2, 1, 4]) === 16 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
