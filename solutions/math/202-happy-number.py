"""
202. Happy Number - Python Implementation

Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

Return true if n is a happy number, and false if not.

Time Complexity: O(log n)
Space Complexity: O(log n)
"""

def isHappy(n: int) -> bool:
    """
    Determine if a number is happy using cycle detection with a set.

    Args:
        n: The input number to check

    Returns:
        True if n is a happy number, False otherwise
    """
    def get_sum_of_squares(num: int) -> int:
        """Calculate sum of squares of digits."""
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    seen = set()

    while n != 1 and n not in seen:
        seen.add(n)
        n = get_sum_of_squares(n)

    return n == 1


def isHappy_floyd_cycle(n: int) -> bool:
    """
    Alternative solution using Floyd's cycle detection algorithm (tortoise and hare).
    This approach uses constant space.
    """
    def get_sum_of_squares(num: int) -> int:
        """Calculate sum of squares of digits."""
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    slow = n
    fast = n

    # Move slow pointer one step and fast pointer two steps
    while True:
        slow = get_sum_of_squares(slow)
        fast = get_sum_of_squares(get_sum_of_squares(fast))

        if fast == 1:
            return True
        if slow == fast:
            return False


# Test cases
if __name__ == "__main__":
    test_cases = [
        (19, True),  # 19 is a happy number: 1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1
        (2, False),  # 2 is not a happy number (enters a cycle)
        (7, True),   # 7 is a happy number
        (10, True),  # 10 is a happy number
        (1, True),   # 1 is always happy
        (4, False)   # 4 enters the cycle 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4
    ]

    print("Testing set-based solution:")
    for n, expected in test_cases:
        result = isHappy(n)
        print(f"n={n}: expected={expected}, got={result}, {'✓' if result == expected else '✗'}")

    print("\nTesting Floyd's cycle detection solution:")
    for n, expected in test_cases:
        result = isHappy_floyd_cycle(n)
        print(f"n={n}: expected={expected}, got={result}, {'✓' if result == expected else '✗'}")