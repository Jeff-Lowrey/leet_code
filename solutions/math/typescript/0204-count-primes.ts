/**
### INTUITION:
The key insight is that use Sieve of Eratosthenes: mark all multiples of each prime as composite. Count remaining unmarked numbers.

### APPROACH:
1. **Create boolean array**: is_prime[i] = True initially
2. **Mark non-primes**: For each prime p, mark p², p²+p, p²+2p... as composite
3. **Count primes**: Count True values in array

### WHY THIS WORKS:
- This ensures that every composite number has a prime factor ≤ √n
- This ensures that by marking multiples of each prime, we identify all composites
- This ensures that remaining numbers must be prime

### EXAMPLE WALKTHROUGH:
Input:
```
n = 10:
```

Array: [2, 3, 4, 5, 6, 7, 8, 9]
Mark multiples of 2: [2, 3, X, 5, X, 7, X, X]
Mark multiples of 3: [2, 3, X, 5, X, 7, X, X]
Mark multiples of 5: (5² = 25 > 10, skip)

Steps:
Step 1: Primes: [2, 3, 5, 7] → Count = 4

Output:
```
Count = 4
```

### TIME COMPLEXITY:
O(n log log n)**
Sieve of Eratosthenes complexity

### SPACE COMPLEXITY:
O(n)**
Boolean array of size n

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  countPrimes(n: number): number {
    if (n <= 2) return 0;

    const isPrime = new Array(n).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i < n; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j < n; j += i) {
          isPrime[j] = false;
        }
      }
    }

    return isPrime.filter((prime) => prime).length;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.countPrimes(10) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.countPrimes(0) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.countPrimes(1) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
