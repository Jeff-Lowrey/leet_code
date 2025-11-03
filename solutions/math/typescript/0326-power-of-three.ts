/**
### INTUITION:
Similar to power of two, but we divide by 3 instead of 2.
If n is divisible by 3, recursively check n/3.
If n becomes 1, it's a power of three.

### APPROACH:
1. **Base cases**: n = 1 (true, 3^0), n ≤ 0 (false)
2. **Divisible by 3**: Recursively check n/3
3. **Not divisible by 3**: Return false
4. **Alternative**: Check if log₃(n) is an integer

### WHY THIS WORKS:
- This ensures that powers of 3: 1, 3, 9, 27, 81, 243, etc.
- This ensures that dividing by 3 repeatedly should eventually reach 1
- This ensures that if we cannot divide evenly, n is not a power of 3

### EXAMPLE WALKTHROUGH:
Input:
```
n = 27
```

Steps:
Step 1: isPowerOfThree(27) → 27 % 3 == 0, check isPowerOfThree(9)
Step 2: isPowerOfThree(9)  → 9 % 3 == 0, check isPowerOfThree(3)
Step 3: isPowerOfThree(3)  → 3 % 3 == 0, check isPowerOfThree(1)
Step 4: isPowerOfThree(1)  → return True
Step 5: Result: True

Output:
```
True
```

### TIME COMPLEXITY:
O(log₃ n)** for recursion

### SPACE COMPLEXITY:
O(log₃ n)** for recursion stack

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Check if n is a power of three using recursion.
   *
   * Time Complexity: O(log₃ n)
   * Space Complexity: O(log₃ n)
   */
  isPowerOfThree(n: number): boolean {
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
  isPowerOfThreeIterative(n: number): boolean {
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
  isPowerOfThreeMath(n: number): boolean {
    return n > 0 && 1162261467 % n === 0;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
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

export default Solution;
