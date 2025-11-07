"""
### INTUITION:
Use divide-and-conquer to compute power efficiently. Instead of multiplying x by itself n times,
we can compute x^(n/2) once and square it. This reduces time complexity from O(n) to O(log n).

### APPROACH:
1. **Base case**: x^0 = 1
2. **Negative power**: x^(-n) = 1 / x^n
3. **Even power**: x^n = (x^(n/2))^2
4. **Odd power**: x^n = x * (x^(n/2))^2
5. **Recursion**: Compute half power and reuse it

### WHY THIS WORKS:
- This ensures that dividing exponent by 2 each time gives O(log n) complexity
- This ensures that squaring result avoids redundant multiplications
- This ensures that handles negative exponents by taking reciprocal

### EXAMPLE WALKTHROUGH:
Input:
```
x = 2, n = 10
```

pow(2, 10) = pow(2, 5)^2
pow(2, 5) = 2 * pow(2, 2)^2
pow(2, 2) = pow(2, 1)^2
pow(2, 1) = 2 * pow(2, 0)^2
pow(2, 0) = 1
Working back: 2*1 = 2, 2^2 = 4, 2*16 = 32, 32^2 = 1024

Output:
```
1024
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(log n)** - halving exponent each recursion

### SPACE COMPLEXITY:
**O(log n)** - recursion stack depth

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""


class Solution:
    def myPow(self, x: float, n: int) -> float:
        """
        Calculate x^n using fast exponentiation (recursion).

        Time Complexity: O(log n)
        Space Complexity: O(log n)
        """

        def helper(base: float, exp: int) -> float:
            # Base case
            if exp == 0:
                return 1.0

            # Compute half power
            half = helper(base, exp // 2)

            # Even exponent: x^n = (x^(n/2))^2
            if exp % 2 == 0:
                return half * half
            # Odd exponent: x^n = x * (x^(n/2))^2
            else:
                return base * half * half

        # Handle negative exponent
        if n < 0:
            return 1.0 / helper(x, -n)
        return helper(x, n)

    def myPowIterative(self, x: float, n: int) -> float:
        """
        Calculate x^n iteratively using binary exponentiation.

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        if n < 0:
            x = 1 / x
            n = -n

        result = 1.0
        current_product = x

        while n > 0:
            # If n is odd, multiply result by current product
            if n % 2 == 1:
                result *= current_product

            # Square the current product and halve n
            current_product *= current_product
            n //= 2

        return result


def test_solution() -> None:
    """Test cases for 50. Pow(x, n)."""
    solution = Solution()

    # Test case 1
    assert abs(solution.myPow(2.0, 10) - 1024.0) < 1e-5
    assert abs(solution.myPow(2.1, 3) - 9.261) < 1e-5
    assert abs(solution.myPow(2.0, -2) - 0.25) < 1e-5

    # Test edge cases
    assert solution.myPow(1.0, 1000000) == 1.0
    assert solution.myPow(2.0, 0) == 1.0

    # Test iterative
    assert abs(solution.myPowIterative(2.0, 10) - 1024.0) < 1e-5

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 50. Pow(x, n) ===")
    print(f"2^10 = {solution.myPow(2.0, 10)}")
    print(f"2^-2 = {solution.myPow(2.0, -2)}")
    print(f"2.1^3 = {solution.myPow(2.1, 3)}")
