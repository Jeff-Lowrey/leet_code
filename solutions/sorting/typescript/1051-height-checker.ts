/**
### INTUITION:
We need to compare the current order with the expected sorted order and count mismatches. The key insight is that the expected order is simply the current array sorted.

### APPROACH:
1. **Create expected array**: Sort the current heights array
2. **Compare arrays**: Count positions where current != expected
3. **Return count**: Number of students in wrong positions

### WHY THIS WORKS:
- This ensures that the expected order is the sorted version of current heights
- This ensures that any position where current[i] != sorted[i] needs adjustment
- This ensures that simple comparison gives us the mismatch count

### EXAMPLE WALKTHROUGH:
Input:
```
heights = [1,1,4,2,1,3]
```

Expected (sorted): [1,1,1,2,3,4]
Compare:
Current:  [1,1,4,2,1,3]
Expected: [1,1,1,2,3,4]
Match:     ✓ ✓ ✗ ✓ ✗ ✗
Mismatches at indices: 2, 4, 5
Count: 3

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n log n)**
- Sorting or divide-and-conquer
Due to sorting the array

### SPACE COMPLEXITY:
O(n)**
For the sorted expected array

### EDGE CASES:
- **Already sorted**: Return 0 (no mismatches)
- **Reverse sorted**: Return n (all positions wrong)
- **Single element**: Return 0 (trivially sorted)
- **All same heights**: Return 0 (any order is sorted)
- **Few elements out of place**: Count specific mismatches

*/

class Solution {
  heightChecker(heights: number[]): number {
    const expected = [...heights].sort((a, b) => a - b);
    let mismatches = 0;

    for (let i = 0; i < heights.length; i++) {
      if (heights[i] !== expected[i]) {
        mismatches++;
      }
    }

    return mismatches;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.heightChecker([1, 1, 4, 2, 1, 3]);
  console.log(`Test 1: ${result1 === 3 ? "PASS" : "FAIL"}`);

  const result2 = solution.heightChecker([5, 1, 2, 3, 4]);
  console.log(`Test 2: ${result2 === 5 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
