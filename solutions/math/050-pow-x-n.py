"""
50. Pow(x, n)
# Difficulty: Medium
Implement pow(x, n), which calculates x raised to the power `n` (`i`.e., x^n).

Example:
Input: `x = 2`.00000, `n` = 10
Output: 1024.00000

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Naive approach of multiplying x by itself `n` times is O(n). We can do better
using **binary exponentiation** - repeatedly squaring and halving the exponent.

### KEY INSIGHT:
- x^8 = (x^4)^2 = ((x^2)^2)^2
- x^9 = x * x^8 = x * (x^4)^2
- Split exponent in half, square the base

### APPROACH (Recursive):
1. **Base case**: `n` = 0 → return 1
2. **Even n**: return pow(x^2, `n/2`)
3. **Odd n**: return `x * pow`(x^2, (`n-1`)/2)
4. **Negative n**: return `1/pow`(x, -n)

### APPROACH (Iterative):
1. Handle negative exponents: x = `1/x`, `n` = -n
2. Use bit manipulation: if `n` is odd, multiply `result` by `current` x
3. Square x and halve `n` in each iteration

### EXAMPLE WALKTHROUGH:
```
pow(2, 10):
`10 = 1010` in binary
`Result = 1`

Bit 1 (position 1): `result` *= 2^`2 = 4`
Bit 0 (position 2): skip
Bit 1 (position 3): `result` *= 2^`8 = 256`
Bit 0 (position 4): skip

Final: `4 * 256` = 1024
```

### TIME COMPLEXITY: O(log n)
### SPACE COMPLEXITY: O(log n) recursive, O(1) iterative

</details>
"""

class Solution:
    def myPow(self, x: float, n: int) -> float:
        """
        Approach: Binary Exponentiation (Fast Power)
        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        if n == 0:
            return 1.0

        # Handle negative exponent
        if n < 0:
            x = 1 / x
            n = -n

        result = 1
        current_product = x

        while n > 0:
            # If n is odd, multiply result by current_product
            if n % 2 == 1:
                result *= current_product

            # Square current_product and halve n
            current_product *= current_product
            n //= 2

        return result

    def myPowRecursive(self, x: float, n: int) -> float:
        """
        Approach: Recursive Binary Exponentiation
        Time Complexity: O(log n)
        Space Complexity: O(log n) for recursion stack
        """
        if n == 0:
            return 1.0

        if n < 0:
            return 1 / self.myPowRecursive(x, -n)

        if n % 2 == 0:
            half = self.myPowRecursive(x, n // 2)
            return half * half
        else:
            return x * self.myPowRecursive(x, n - 1)

"""
69. Sqrt(x)
# Difficulty: Easy
Given a non-negative integer x, return the square root of x rounded down to the
nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

Example:
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to
the nearest integer, 2 is returned.
"""

class SolutionSqrt:
    def mySqrt(self, x: int) -> int:
        """
        Approach: Binary Search
        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        if x < 2:
            return x

        left, right = 2, x // 2

        while left <= right:
            mid = left + (right - left) // 2
            square = mid * mid

            if square == x:
                return mid
            elif square < x:
                left = mid + 1
            else:
                right = mid - 1

        return right

    def mySqrtNewton(self, x: int) -> int:
        """
        Approach: Newton's Method
        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        if x < 2:
            return x

        # Initial guess
        x0 = x
        x1 = (x0 + x // x0) // 2

        while x1 < x0:
            x0 = x1
            x1 = (x0 + x // x0) // 2

        return x0

"""
29. Divide Two Integers
# Difficulty: Medium
Given two integers dividend and divisor, divide two integers without using
multiplication, division, and mod operator.

Return the quotient after dividing dividend by divisor.

Example:
Input: dividend = 10, divisor = 3
Output: 3
"""

class SolutionDivide:
    def divide(self, dividend: int, divisor: int) -> int:
        """
        Approach: Bit manipulation with exponential search
        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        MAX_INT = 2**31 - 1
        MIN_INT = -(2**31)

        # Handle overflow case
        if dividend == MIN_INT and divisor == -1:
            return MAX_INT

        # Determine sign of result
        negative = (dividend < 0) != (divisor < 0)

        # Work with absolute values
        dividend, divisor = abs(dividend), abs(divisor)

        result = 0

        while dividend >= divisor:
            # Find the largest multiple
            temp, multiple = divisor, 1

            while dividend >= (temp << 1):
                temp <<= 1
                multiple <<= 1

            dividend -= temp
            result += multiple

        if negative:
            result = -result

        return max(MIN_INT, min(MAX_INT, result))

# Test cases
if __name__ == "__main__":
    # Test Pow
    solution_pow = Solution()

    print("Pow(x, n):")
    test_cases_pow = [(2.0, 10), (2.1, 3), (2.0, -2)]
    for x, n in test_cases_pow:
        result = solution_pow.myPow(x, n)
        print(f"pow({x}, {n}) = {result}")

    print("\n" + "=" * 50 + "\n")

    # Test Sqrt
    solution_sqrt = SolutionSqrt()

    print("Sqrt(x):")
    test_cases_sqrt = [4, 8, 9, 16, 2147395600]
    for x in test_cases_sqrt:
        result = solution_sqrt.mySqrt(x)
        print(f"sqrt({x}) = {result}")

    print("\n" + "=" * 50 + "\n")

    # Test Divide
    solution_divide = SolutionDivide()

    print("Divide Two Integers:")
    test_cases_divide = [(10, 3), (7, -3), (-2147483648, -1)]
    for dividend, divisor in test_cases_divide:
        result = solution_divide.divide(dividend, divisor)
        print(f"{dividend} / {divisor} = {result}")
