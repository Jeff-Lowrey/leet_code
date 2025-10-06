"""
172. Factorial Trailing `Zeros - Python` Implementation

Given an integer n, return the number of trailing zeroes in n!.

Note that n! = `n` * (`n` - 1) * (`n` - 2) * ... * `3 * 2` * 1.

Time Complexity: O(log n)
Space Complexity: O(1)
"""

def trailingZeroes(n: int) -> int:
    """
    Calculate the number of trailing zeros in n!.

    Trailing zeros are created by factors of 10, which come from 2*5.
    Since there are always more factors of 2 than 5 in factorials,
    we only need to count factors of 5.

    Args:
        n: The input integer

    Returns:
        Number of trailing zeros in n!
    """
    count = 0
    power_of_5 = 5

    while power_of_5 <= n:
        count += n // power_of_5
        power_of_5 *= 5

    return count


def trailingZeroes_alternative(n: int) -> int:
    """Alternative implementation using recursion."""
    if n < 5:
        return 0
    return n // 5 + trailingZeroes_alternative(n // 5)


# Test cases
if __name__ == "__main__":
    test_cases = [
        (3, 0),   # 3! = 6, no trailing zeros
        (5, 1),   # 5! = 120, one trailing zero
        (0, 0),   # 0! = 1, no trailing zeros
        (25, 6),  # 25! has 6 trailing zeros
        (100, 24) # 100! has 24 trailing zeros
    ]

    for n, expected in test_cases:
        result = trailingZeroes(n)
        print(f"n={n}: expected={expected}, got={result}, {'✓' if result == expected else '✗'}")

    print("\nTesting alternative implementation:")
    for n, expected in test_cases:
        result = trailingZeroes_alternative(n)
        print(f"n={n}: expected={expected}, got={result}, {'✓' if result == expected else '✗'}")