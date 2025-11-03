"""
### INTUITION:
The key insight is recognizing the digital root pattern. When you repeatedly add digits
until you get a single digit, the result follows a mathematical pattern related to the
number modulo 9. This is because in base 10, a number has the same remainder when divided
by 9 as the sum of its digits (this is the basis of the divisibility rule for 9).

### APPROACH:
1. Naive approach: Loop and sum digits using integer operations (modulo and division) until single digit
2. Optimized approach: Use digital root formula with modulo arithmetic
   - If num == 0, return 0
   - If num % 9 == 0, return 9
   - Otherwise, return num % 9
   - This can be simplified to: 1 + (num - 1) % 9 using only integer operations

### WHY THIS WORKS:
The digital root of a positive integer is obtained by iteratively summing digits until
a single digit is reached. This result is congruent to the number modulo 9, with the
exception that if the result is 0 (and the number is not 0), we return 9 instead.

The formula 1 + (num - 1) % 9 handles all cases:
- This ensures that for num = 0: 1 + (-1) % 9 = 1 + (-1) = 0 (but we handle this separately)
- This ensures that for multiples of 9: 1 + (9k - 1) % 9 = 1 + 8 = 9
- This ensures that for other numbers: returns the remainder when divided by 9

### EXAMPLE WALKTHROUGH:
**Input:** num = 38

**Step 1:** Naive approach - Loop and sum digits using integer operations
- 38: Extract digits using modulo (38 % 10 = 8, 38 // 10 = 3)
- Sum: 3 + 8 = 11
- 11: Extract digits (11 % 10 = 1, 11 // 10 = 1)
- Sum: 1 + 1 = 2 (single digit)

**Step 2:** Optimized approach - Use digital root formula with modulo arithmetic
- Formula: 1 + (38-1) % 9 = 1 + 37 % 9 = 1 + 1 = 2 ✓

Additional example with num = 99 (multiple of 9):
- Naive: 99 -> 9+9=18 -> 1+8=9
- Formula: 1 + (99-1) % 9 = 1 + 98 % 9 = 1 + 8 = 9 ✓

Output:
```
2
```

### TIME COMPLEXITY:
**O(1)** - Constant time using mathematical formula

### SPACE COMPLEXITY:
**O(1)** - Only using a few variables - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""

def addDigits(num: int) -> int:
    """
    Calculate the digital root of a number using the mathematical formula.

    Args:
        num: Non-negative integer

    Returns:
        Single digit result after repeatedly adding digits
    """
    # Handle zero case
    if num == 0:
        return 0

    # Digital root formula
    return 1 + (num - 1) % 9


def addDigitsNaive(num: int) -> int:
    """
    Alternative solution using iteration (not O(1) time).

    Args:
        num: Non-negative integer

    Returns:
        Single digit result after repeatedly adding digits
    """
    while num >= 10:
        digit_sum = 0
        while num > 0:
            digit_sum += num % 10
            num //= 10
        num = digit_sum

    return num


if __name__ == "__main__":
    # Test cases
    test_cases = [
        (38, 2),
        (0, 0),
        (9, 9),
        (10, 1),
        (99, 9),
        (100, 1),
        (1234, 1),
        (199, 1)
    ]

    print("Testing addDigits (O(1) solution):")
    for num, expected in test_cases:
        result = addDigits(num)
        status = "✓" if result == expected else "✗"
        print(f"{status} addDigits({num}) = {result}, expected = {expected}")

    print("\nTesting addDigitsNaive (iterative solution):")
    for num, expected in test_cases:
        result = addDigitsNaive(num)
        status = "✓" if result == expected else "✗"
        print(f"{status} addDigitsNaive({num}) = {result}, expected = {expected}")
