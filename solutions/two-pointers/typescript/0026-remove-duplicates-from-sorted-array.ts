/**
### INTUITION:
This is a classic two-pointers problem. Since the array is sorted, duplicates are adjacent. We use one pointer to iterate through the array and another to track the position where the next unique element should be placed.

### APPROACH:
1. **Two pointers**: Use `i` to iterate and `j` to track unique position
2. **Skip duplicates**: Only advance `j` when we find a new unique element
3. **In-place modification**: Copy unique elements to positions 0, 1, 2, etc.
4. **Return count**: Return the number of unique elements

### WHY THIS WORKS:
- This ensures that sorted array means duplicates are adjacent
- This ensures that two pointers allow in-place removal without extra space
- This ensures that `j` tracks the "write" position for next unique element
- This ensures that `i` scans through all elements

### EXAMPLE WALKTHROUGH:
Input:
```
[1,1,2]
```

i=0, j=0: nums[0]=1 (first element, place at j=0)
i=1, j=1: nums[1]=1 == nums[0], skip
i=2, j=1: nums[2]=2 != nums[0], place at j=1
Result: [1,2,_], return k=2

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)**
- Single pass through input
Single pass through the array

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only using constant extra space

### EDGE CASES:
- **Empty array**: Return 0 (no elements)
- **Single element**: Return 1 (already unique)
- **All elements same**: Return 1 (only one unique value)
- **No duplicates**: Return n (all unique already)
- **Consecutive duplicates**: Two-pointer removes them in-place

</details>

*/

class Solution {
  removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;

    let k = 1;

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] !== nums[i - 1]) {
        nums[k] = nums[i];
        k++;
      }
    }

    return k;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const nums1 = [1, 1, 2];
  console.log(`Test 1: ${solution.removeDuplicates(nums1) === 2 ? "PASS" : "FAIL"}`);

  const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  console.log(`Test 2: ${solution.removeDuplicates(nums2) === 5 ? "PASS" : "FAIL"}`);

  const nums3 = [1, 1, 1];
  console.log(`Test 3: ${solution.removeDuplicates(nums3) === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
