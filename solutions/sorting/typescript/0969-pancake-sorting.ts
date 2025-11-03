/**
 * # Difficulty: Medium
 *
 * # 0969. Pancake Sorting
 *
 *
 * Given an array of integers arr, sort the array by performing a series of pancake flips.
 *
 * In one pancake flip we do the following steps:
 * - Choose an integer k where 1 <= k <= arr.length.
 * - Reverse the sub-array arr[0...k-1] (0-indexed).
 *
 * For example, if arr = [3,2,1,4] and we performed a pancake flip choosing k = 3, we reverse the
 * sub-array [3,2,1], so arr = [1,2,3,4] after the pancake flip at k = 3.
 *
 * Return an array of the k-values corresponding to a sequence of pancake flips that sort arr.
 * Any valid answer that sorts the array within 10 * arr.length flips will be accepted.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3, 2, 4, 1]</dd>
 * <dt>Output:</dt>
 * <dd>[3,4,2,3,2]</dd>
 * <dt>Explanation:</dt>
 * <dd>Pancake sort of [3,2,4,1] uses flips [4,2,3,2]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n²) - Nested iteration through input
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
The key insight is that like sorting pancakes by size - we can repeatedly bring the largest unsorted element to the
top with one flip, then flip it to its final position. This guarantees sorting.

### APPROACH:
1. **Find maximum** in unsorted portion of array
2. **Flip to top**: If max is not already at top, flip to bring it to position 0
3. **Flip to position**: Flip to move max to its final sorted position
4. **Repeat**: Continue with remaining unsorted portion
5. **Track flips**: Record k-values for each flip

### WHY THIS WORKS:
 * - Each element can be moved to its final position in at most 2 flips
 * - First flip brings it to the top
 * - Second flip moves it to its correct position
 * - Working from largest to smallest guarantees no interference
 * - Maximum 2n flips (well within 10n limit)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * arr = [3,2,4,1]
 * ```
 *
 * Goal: Sort to [1,2,3,4]
 * Step 1: Find max=4 at index 2
 *
 * Steps:
 * Step 1: Flip at k=3: [3,2,4] → [4,2,3]
 * Step 2: Result: [4,2,3,1]
 * Step 3: Flip at k=4 to move 4 to end
 * Step 4: Flip at k=4: [4,2,3,1] → [1,3,2,4]
 * Step 5: Result: [1,3,2,4]
 * Step 6: Find max=3 at index 1 in [1,3,2]
 * Step 7: Flip at k=2: [1,3] → [3,1]
 * Step 8: Result: [3,1,2,4]
 * Step 9: Flip at k=3 to move 3 to position
 * Step 10: Flip at k=3: [3,1,2] → [2,1,3]
 * Step 11: Result: [2,1,3,4]
 * Step 12: Find max=2 at index 0 in [2,1]
 * Step 13: Already at top, flip at k=2
 * Step 14: Flip at k=2: [2,1] → [1,2]
 * Step 15: Result: [1,2,3,4]
 *
 * Output:
 * ```
 * [3,4,2,3,2] (flip positions)
 * ```

 * ### TIME COMPLEXITY:
 * O(n²)
 * - Nested iteration through input
 * - n iterations (one per element)
 * - Each iteration finds max: O(n)
 * - Total: O(n²)
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For storing the flip sequence
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  pancakeSort(arr: number[]): number[] {
    const result: number[] = [];
    const n = arr.length;

    for (let targetSize = n; targetSize > 1; targetSize--) {
      const maxIdx = arr.indexOf(targetSize);

      if (maxIdx === targetSize - 1) {
        continue;
      }

      if (maxIdx !== 0) {
        this.flip(arr, maxIdx + 1);
        result.push(maxIdx + 1);
      }

      this.flip(arr, targetSize);
      result.push(targetSize);
    }

    return result;
  }

  private flip(arr: number[], k: number): void {
    let left = 0;
    let right = k - 1;
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const arr1 = [3, 2, 4, 1];
  const flips1 = solution.pancakeSort([...arr1]);
  const testArr1 = [...arr1];
  for (const k of flips1) {
    testArr1.splice(0, k, ...testArr1.slice(0, k).reverse());
  }
  console.log(`Test 1: ${JSON.stringify(testArr1) === JSON.stringify([1, 2, 3, 4]) ? "PASS" : "FAIL"}`);

  const arr2 = [1, 2, 3];
  const flips2 = solution.pancakeSort([...arr2]);
  const testArr2 = [...arr2];
  for (const k of flips2) {
    testArr2.splice(0, k, ...testArr2.slice(0, k).reverse());
  }
  console.log(`Test 2: ${JSON.stringify(testArr2) === JSON.stringify([1, 2, 3]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
