"""
# Difficulty: Medium

# 204. Count Primes

Given an integer n, return the number of prime numbers that are strictly less than n.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use Sieve of Eratosthenes: mark all multiples of each prime as composite. Count remaining unmarked numbers.

### APPROACH:
1. **Create boolean array**: is_prime[i] = True initially
2. **Mark non-primes**: For each prime p, mark p², p²+p, p²+2p... as composite
3. **Count primes**: Count True values in array

### WHY THIS WORKS:
- Every composite number has a prime factor ≤ √n
- By marking multiples of each prime, we identify all composites
- Remaining numbers must be prime

### EXAMPLE WALKTHROUGH:
```
n = 10:
Array: [2, 3, 4, 5, 6, 7, 8, 9]

Mark multiples of 2: [2, 3, X, 5, X, 7, X, X]
Mark multiples of 3: [2, 3, X, 5, X, 7, X, X]
Mark multiples of 5: (5² = 25 > 10, skip)

Primes: [2, 3, 5, 7] → Count = 4
```

### TIME COMPLEXITY:
O(n log log n)
Sieve of Eratosthenes complexity

### SPACE COMPLEXITY:
O(n)
Boolean array of size n

### EDGE CASES:
- n ≤ 2: Return 0
- n = 3: Return 1 (only 2)
- Large n: Memory usage

</details>
"""

class Solution:
    def countPrimes(self, n: int) -> int:
        """
        Count primes less than n using Sieve of Eratosthenes.

        Args:
            n: Upper bound (exclusive)

        Returns:
            Count of prime numbers < n

        Time Complexity: O(n log log n)
        Space Complexity: O(n)
        """
        if n <= 2:
            return 0

        # Initialize: assume all numbers are prime
        is_prime = [True] * n
        is_prime[0] = is_prime[1] = False

        # Sieve of Eratosthenes
        p = 2
        while p * p < n:
            if is_prime[p]:
                # Mark multiples of p as composite
                for i in range(p * p, n, p):
                    is_prime[i] = False
            p += 1

        # Count primes
        return sum(is_prime)

    def countPrimesOptimized(self, n: int) -> int:
        """
        Optimized version: skip even numbers.

        Time Complexity: O(n log log n)
        Space Complexity: O(n)
        """
        if n <= 2:
            return 0

        is_prime = [True] * n
        is_prime[0] = is_prime[1] = False

        # Mark even numbers (except 2) as composite
        for i in range(4, n, 2):
            is_prime[i] = False

        # Check odd numbers only
        p = 3
        while p * p < n:
            if is_prime[p]:
                for i in range(p * p, n, p * 2):  # Skip even multiples
                    is_prime[i] = False
            p += 2  # Skip even numbers

        return sum(is_prime)

def test_solution() -> None:
    """Test cases for Problem 204."""
    solution = Solution()

    assert solution.countPrimes(10) == 4  # 2,3,5,7
    assert solution.countPrimes(0) == 0
    assert solution.countPrimes(1) == 0
    assert solution.countPrimes(2) == 0
    assert solution.countPrimes(3) == 1  # 2
    assert solution.countPrimes(100) == 25
    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    solution = Solution()
    print("\n=== 204. Count Primes ===")
    for n in [10, 20, 50, 100]:
        result = solution.countPrimes(n)
        print(f"countPrimes({n}) -> {result}")
