/**
### INTUITION:
The key insight is that either the process reaches 1 (happy) or enters a cycle (not happy). Use a set to detect cycles, or use Floyd's cycle detection.

### APPROACH:
1. **Calculate sum**: Get sum of squares of digits
2. **Track seen numbers**: Use set to detect cycle
3. **Check termination**: If 1, return True; if cycle, return False
4. **Alternative**: Floyd's cycle detection (two pointers)

### WHY THIS WORKS:
- Numbers either reach 1 or cycle
- Cycles always occur for unhappy numbers
- Set or two-pointer both detect cycles

### EXAMPLE WALKTHROUGH:
Input:
```
n = 19:
```

1² + 9² = 82
8² + 2² = 68
6² + 8² = 100
n = 2:

Steps:
Step 1: 1² + 0² + 0² = 1 → Happy!
Step 2: 2² = 4
Step 3: 4² = 16
Step 4: 1² + 6² = 37
Step 5: 3² + 7² = 58
Step 6: 5² + 8² = 89
Step 7: 8² + 9² = 145
Step 8: 1² + 4² + 5² = 42
Step 9: 4² + 2² = 20
Step 10: 2² + 0² = 4 → Cycle! Not happy

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
O(log n)**
- Binary search or tree height
Depends on number of digits and cycle detection

### SPACE COMPLEXITY:
- Set approach: **O(log n)**
- Two-pointer: **O(1)**

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  isHappy(n: number): boolean {
    const seen = new Set<number>();

    while (n !== 1 && !seen.has(n)) {
      seen.add(n);
      n = this.sumOfSquares(n);
    }

    return n === 1;
  }

  private sumOfSquares(n: number): number {
    let sum = 0;
    while (n > 0) {
      const digit = n % 10;
      sum += digit * digit;
      n = Math.floor(n / 10);
    }
    return sum;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isHappy(19) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isHappy(2) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
