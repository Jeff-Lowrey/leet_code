/**
### INTUITION:
A peak must exist because edges are considered smaller. Use binary search: if nums[mid] < nums[mid+1], a peak exists to the right (upward slope); otherwise a peak exists to the left or at mid (downward slope). Always converges to a peak.

### APPROACH:
1. **Initialize binary search**: Set left = 0, right = len(nums) - 1
2. **Loop until convergence**: While left < right, calculate mid = (left + right) // 2
3. **Compare with neighbor**: Check if nums[mid] > nums[mid + 1]
4. **Peak in left half**: If nums[mid] > nums[mid + 1], peak is in left half including mid, set right = mid
5. **Peak in right half**: Otherwise, peak is in right half, set left = mid + 1
6. **Converge to peak**: Continue until left == right
7. **Return peak index**: Return left (or right, they're equal) as the peak element index

### WHY THIS WORKS:
- Binary search: if nums[mid] < nums[mid+1], peak must be on right
- If nums[mid] > nums[mid+1], peak on left (mid could be peak)
- Works because adjacent elements are unequal (guaranteed peak exists)
- Doesn't need to check all elements, just finds any peak
- O(log n) time, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,2,3,1]
```

Step 1: Initialize binary search
left = 0, right = 3
Step 2: Binary search for peak
mid = 1: nums[1]=2 < nums[2]=3

Steps:
Step 1: Peak is on right, left = 2
Step 2: mid = 2: nums[2]=3 > nums[3]=1
Step 3: Peak could be at mid or left, right = 2
Step 4: left = right = 2
Step 5: Check result
Step 6: nums[2] = 3 is greater than neighbors (2 and 1)

Output:
```
2 (index of peak element)
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  findPeakElement(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] < nums[mid + 1]) {
        left = mid + 1;
      } else {
        right = mid;
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

  console.log(`Test 1: ${solution.findPeakElement([1, 2, 3, 1]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${[1, 5].includes(solution.findPeakElement([1, 2, 1, 3, 5, 6, 4])) ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.findPeakElement([1]) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
