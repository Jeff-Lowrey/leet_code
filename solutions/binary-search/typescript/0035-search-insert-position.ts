/**
### INTUITION:
This is a classic binary search problem where we need to find the insertion point for a target value. The key insight is that binary search naturally converges to the correct insertion position when the target is not found.

### APPROACH:
1. **Binary search**: Use standard binary search to find target or insertion point
2. **Insertion logic**: When target not found, left pointer indicates insertion position
3. **Boundary handling**: Handle cases where target should be inserted at beginning or end
4. **Optimization**: Single pass O(log n) solution

### WHY THIS WORKS:
- Binary search maintains sorted order properties
- Left pointer always points to the smallest index where target should be inserted
- When target found, return that index directly
- When not found, left pointer is the correct insertion position

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,3,5,6], target = 5
nums = [1,3,5,6], target = 2
nums = [1,3,5,6], target = 7
```

Step 1: Binary search finds 5 at index 2
Step 1: left=0, right=3, mid=1, nums[1]=3 > 2, so right=0
Step 2: left=0, right=0, mid=0, nums[0]=1 < 2, so left=1
Step 3: left=1, right=0, loop ends, left=1 is insertion point
Step 1: Binary search doesn't find 7
Step 2: left pointer ends up at index 4 (end of array)

Output:
```
2
1
4
```

### TIME COMPLEXITY:
O(log n)**
- Binary search or tree height
Binary search through sorted array

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only using constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  searchInsert(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return left;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.searchInsert([1, 3, 5, 6], 5) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.searchInsert([1, 3, 5, 6], 2) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.searchInsert([1, 3, 5, 6], 7) === 4 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
