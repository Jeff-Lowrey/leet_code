/**
### INTUITION:
The key insight is that use binary search on the range [0, x]. For mid, check if mid * mid <= x. If yes, mid could be answer; try larger. If no, try smaller. Converge to floor(sqrt(x)).

### APPROACH:
1. **Handle edge cases**: If x == 0 or x == 1, return x
2. **Initialize binary search**: Set left = 1, right = x // 2
3. **Binary search loop**: While left <= right, calculate mid
4. **Check if perfect square**: If mid * mid == x, return mid
5. **Search right half**: If mid * mid < x, set left = mid + 1, store mid
6. **Search left half**: If mid * mid > x, set right = mid - 1
7. **Return result**: Return stored result (largest integer whose square <= x)

### WHY THIS WORKS:
- This ensures that binary search on range [0, x] for answer
- This ensures that if mid * mid == x, found exact square root
- This ensures that if mid * mid < x, answer might be mid or higher (left = mid + 1)
- This ensures that if mid * mid > x, answer is lower (right = mid - 1)
- This ensures that o(log x) time binary search, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
x = 8
```

Step 1: Binary search
left=0, right=8
mid=4: 4*4=16 > 8, right=3
mid=1: 1*1=1 < 8, left=2
mid=2: 2*2=4 < 8, left=3
mid=3: 3*3=9 > 8, right=2
left > right, return 2

Output:
```
2 (floor of sqrt(8))
```

### TIME COMPLEXITY:
O(n)**

- Single pass through the input

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
  mySqrt(x: number): number {
    if (x < 2) return x;

    let left = 1;
    let right = Math.floor(x / 2);

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const square = mid * mid;

      if (square === x) {
        return mid;
      } else if (square < x) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return right;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.mySqrt(4) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.mySqrt(8) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.mySqrt(1) === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
