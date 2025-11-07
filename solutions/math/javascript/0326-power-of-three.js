/**
### INTUITION:
The key insight is that a number is a power of three if it can be expressed as 3^k for some integer k ≥ 0. We can check this by repeatedly dividing by 3 until we reach 1, or use the mathematical property that the largest power of 3 within 32-bit integer range (3^19 = 1162261467) is divisible by any smaller power of 3.

### APPROACH:
The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

Method 1 - Recursion/Iteration**:
1. If n ≤ 0, return false
2. If n = 1, return true (3^0 = 1)
3. If n is not divisible by 3, return false
4. Recursively check n/3

Method 2 - Mathematical**:
Use the fact that 1162261467 (3^19, largest power of 3 in 32-bit int) is only divisible by powers of 3.

### WHY THIS WORKS:
Powers of 3 can only be divided by 3 without remainder. By repeatedly dividing and checking divisibility, we verify if the number is composed only of factors of 3.

### EXAMPLE WALKTHROUGH:
Input:
```
n = 27
```

Steps:
Step 1: n = 27, divisible by 3 → n = 9
Step 2: n = 9, divisible by 3 → n = 3
Step 3: n = 3, divisible by 3 → n = 1
Step 4: n = 1 → return true

Output:
```
true
```

### TIME COMPLEXITY:
O(n)** - Analysis of time complexity - [Add explanation of why this complexity]

### SPACE COMPLEXITY:
O(1)** - Analysis of space complexity - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  /**
   * Check if n is a power of three using recursion.
   *
   * Time Complexity: O(log₃ n)
   * Space Complexity: O(log₃ n)
   */
  isPowerOfThree(n) {
    // Base cases
    if (n <= 0) {
      return false;
    }
    if (n === 1) {
      return true;
    }

    // If n is not divisible by 3, it cannot be a power of 3
    if (n % 3 !== 0) {
      return false;
    }

    // Recursively check n/3
    return this.isPowerOfThree(Math.floor(n / 3));
  }

  /**
   * Check iteratively.
   *
   * Time Complexity: O(log₃ n)
   * Space Complexity: O(1)
   */
  isPowerOfThreeIterative(n) {
    if (n <= 0) {
      return false;
    }

    while (n > 1) {
      if (n % 3 !== 0) {
        return false;
      }
      n = Math.floor(n / 3);
    }

    return true;
  }

  /**
   * Check using mathematics.
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isPowerOfThreeMath(n) {
    return n > 0 && 1162261467 % n === 0;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isPowerOfThree(1) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isPowerOfThree(27) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isPowerOfThree(0) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.isPowerOfThree(-1) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.isPowerOfThree(9) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.isPowerOfThree(45) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
