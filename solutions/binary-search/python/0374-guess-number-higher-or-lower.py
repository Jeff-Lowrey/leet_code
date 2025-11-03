"""
### INTUITION:
This is a classic binary search problem where we need to find a target number using feedback from a guess API. The key insight is to use the API response to narrow down the search space by half in each iteration.

### APPROACH:
1. **Binary search**: Use binary search on the range [1, n]
2. **API feedback**: Use guess() API response to adjust search bounds
3. **Boundary adjustment**: Move left/right pointers based on feedback
4. **Termination**: Continue until API returns 0 (correct guess)

### WHY THIS WORKS:
- This ensures that binary search optimally reduces search space by half each iteration
- This ensures that aPI feedback provides perfect direction information
- This ensures that guaranteed to find the answer in O(log n) time
- This ensures that similar to searching in a sorted array but using API instead of direct comparison

### EXAMPLE WALKTHROUGH:
Input:
```
n = 10, pick = 6
n = 1, pick = 1
n = 2, pick = 1
```

Step 1: guess(5) returns 1 (pick > 5), so left = 6
Step 2: guess(8) returns -1 (pick < 8), so right = 7
Step 3: guess(6) returns 0 (correct!)
Step 1: guess(1) returns 0 (correct!)
Step 1: guess(1) returns 0 (correct!)

Output:
```
6
1
1
```

### TIME COMPLEXITY:
**O(log n)**
Binary search through range [1, n]

### SPACE COMPLEXITY:
**O(1)**
Only using constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""


def guess(num: int) -> int:
    """Pre-defined API (stub for testing)."""
    # This is provided by the platform
    return 0


class Solution:
    def guessNumber(self, n: int) -> int:
        """
        Find the picked number using binary search with guess API.

        Args:
            n: Upper bound of the number range [1, n]

        Returns:
            The picked number

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        left, right = 1, n

        while left <= right:
            mid = left + (right - left) // 2  # Avoid overflow
            result = guess(mid)

            if result == 0:
                return mid  # Found the correct number
            elif result == -1:
                right = mid - 1  # Guess too high, search lower half
            else:  # result == 1
                left = mid + 1  # Guess too low, search upper half

        # This should never be reached given problem constraints
        return -1

    def guessNumberRecursive(self, n: int) -> int:
        """
        Recursive solution for guess number game.

        Args:
            n: Upper bound of range

        Returns:
            The picked number

        Time Complexity: O(log n)
        Space Complexity: O(log n) due to recursion stack
        """

        def binary_search(left: int, right: int) -> int:
            if left > right:
                return -1  # Should not happen

            mid = left + (right - left) // 2
            result = guess(mid)

            if result == 0:
                return mid
            elif result == -1:
                return binary_search(left, mid - 1)
            else:
                return binary_search(mid + 1, right)

        return binary_search(1, n)

    def guessNumberLinear(self, n: int) -> int:
        """
        Linear search solution (inefficient but simple).

        Args:
            n: Upper bound

        Returns:
            The picked number

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        for i in range(1, n + 1):
            if guess(i) == 0:
                return i
        return -1


def test_solution() -> None:
    """
    Test cases for 374. Guess Number Higher Or Lower.
    """
    solution = Solution()

    # Test case 1: Pick in middle
    guess.pick = 6  # type: ignore
    result1 = solution.guessNumber(10)
    expected1 = 6
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Pick at beginning
    guess.pick = 1  # type: ignore
    result2 = solution.guessNumber(1)
    expected2 = 1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Pick at end
    guess.pick = 2  # type: ignore
    result3 = solution.guessNumber(2)
    expected3 = 2
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Larger range
    guess.pick = 50  # type: ignore
    result4 = solution.guessNumber(100)
    expected4 = 50
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Pick near beginning
    guess.pick = 3  # type: ignore
    result5 = solution.guessNumber(10)
    expected5 = 3
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Pick near end
    guess.pick = 8  # type: ignore
    result6 = solution.guessNumber(10)
    expected6 = 8
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test recursive solution
    guess.pick = 7  # type: ignore
    result7 = solution.guessNumberRecursive(10)
    expected7 = 7
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test linear solution
    guess.pick = 4  # type: ignore
    result8 = solution.guessNumberLinear(10)
    expected8 = 4
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()

    print(f"=== 374. Guess Number Higher Or Lower ===")

    # Demonstrate different scenarios
    test_cases = [(10, 6), (100, 25), (50, 1), (1, 1)]

    for n, pick in test_cases:
        guess.pick = pick  # type: ignore
        result = solution.guessNumber(n)
        print(f"Range [1, n], picked number: result")

    # Show API call simulation
    print(f"\nAPI simulation for n=10, pick=6:")
    guess.pick = 6  # type: ignore
    left, right = 1, 10
    call_count = 0

    while left <= right:
        mid = left + (right - left) // 2
        result = guess(mid)
        call_count += 1

        print(f"Call {call_count}: guess({mid}) = result")

        if result == 0:
            print(f"Found! Answer is {mid}")
            break
        elif result == -1:
            right = mid - 1
        else:
            left = mid + 1
