"""
# 204. Count Primes
**Medium**

Given a problem that demonstrates key concepts in Math.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of math concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply math methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages math principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses math techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using math method
3. Return the computed result

</details>
"""

class Solution:
    def countPrimes(self, n: int) -> int:
        """
        Count the number of prime numbers less than n using Sieve of Eratosthenes.

        Args:
            n: Non-negative integer

        Returns:
            Number of primes less than n

        Time Complexity: O(n log log n)
        Space Complexity: O(n)
        """
        if n <= 2:
            return 0

        # Initialize all numbers as potentially prime
        is_prime = [True] * n
        is_prime[0] = is_prime[1] = False  # 0 and 1 are not prime

        # Sieve of Eratosthenes
        # Only need to check up to sqrt(n)
        i = 2
        while i * i < n:
            if is_prime[i]:
                # Mark all multiples of i as not prime
                # Start from i*i because smaller multiples already marked
                for j in range(i * i, n, i):
                    is_prime[j] = False
            i += 1

        # Count remaining primes
        return sum(is_prime)

    def solve(self, *args):
        """
        Main solution for 204. Count Primes.

        Args:
            *args: Problem-specific arguments

        Returns:
            Count of prime numbers

        Time Complexity: O(n log log n)
        Space Complexity: O(n)
        """
        return self.countPrimes(*args)


def test_solution():
    """
    Test cases for 204. Count Primes.
    """
    solution = Solution()

    # Test case 1: n = 10 (primes: 2, 3, 5, 7)
    result = solution.countPrimes(10)
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: n = 0
    result = solution.countPrimes(0)
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: n = 1
    result = solution.countPrimes(1)
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: n = 2
    result = solution.countPrimes(2)
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: n = 3 (prime: 2)
    result = solution.countPrimes(3)
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: n = 20 (primes: 2, 3, 5, 7, 11, 13, 17, 19)
    result = solution.countPrimes(20)
    expected = 8
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: Larger number
    result = solution.countPrimes(100)
    expected = 25
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 8: Even larger number
    result = solution.countPrimes(1000)
    expected = 168
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 204. Count Primes")
    for n in [10, 20, 100]:
        print(f"Number of primes less than {n}: {solution.countPrimes(n)}")
