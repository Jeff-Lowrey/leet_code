"""
# 374. Guess Number Higher Or Lower
# Difficulty: Easy
We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:
- -1: Your guess is higher than the number I picked (i.e. num > pick).
- 1: Your guess is lower than the number I picked (i.e. num < pick).
- 0: Your guess is correct (i.e. num == pick).

Return the number that I picked.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic binary search problem where we need to find a target number using feedback from a guess API. The key insight is to use the API response to narrow down the search space by half in each iteration.

### APPROACH:
1. **Binary search**: Use binary search on the range [1, n]
2. **API feedback**: Use guess() API response to adjust search bounds
3. **Boundary adjustment**: Move left/right pointers based on feedback
4. **Termination**: Continue until API returns 0 (correct guess)

### WHY THIS WORKS:
- Binary search optimally reduces search space by half each iteration
- API feedback provides perfect direction information
- Guaranteed to find the answer in O(log n) time
- Similar to searching in a sorted array but using API instead of direct comparison

### TIME COMPLEXITY: O(log n)
Binary search through range [1, n]

### SPACE COMPLEXITY: O(1)
Only using constant extra space

### EXAMPLE WALKTHROUGH:
```
Input: n = 10, pick = 6
Step 1: guess(5) returns 1 (pick > 5), so left = 6
Step 2: guess(8) returns -1 (pick < 8), so right = 7
Step 3: guess(6) returns 0 (correct!)
Output: 6

Input: n = 1, pick = 1
Step 1: guess(1) returns 0 (correct!)
Output: 1

Input: n = 2, pick = 1
Step 1: guess(1) returns 0 (correct!)
Output: 1
```

### KEY INSIGHTS:
- Standard binary search template applies directly
- API response guides the search direction
- No need for array or list - just search the number space
- Handle integer overflow in mid calculation

### EDGE CASES:
- Single number (n = 1): return 1
- Pick at boundaries (pick = 1 or pick = n)
- Large n values: use overflow-safe mid calculation

</details>
"""

# The guess API is already defined for you.
# @param num, your guess
# @return -1 if num is higher than the picked number
#          1 if num is lower than the picked number
#          0 if num is equal to the picked number
def guess(num: int) -> int:
    """Mock implementation for testing. In real problem, this is provided."""
    # This will be replaced by the actual API in the real problem
    pick = getattr(guess, 'pick', 6)  # Default pick for testing
    if num > pick:
        return -1
    elif num < pick:
        return 1
    else:
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

def test_solution():
    """
    Test cases for 374. Guess Number Higher Or Lower.
    """
    solution = Solution()

    # Test case 1: Pick in middle
    guess.pick = 6
    result1 = solution.guessNumber(10)
    expected1 = 6
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Pick at beginning
    guess.pick = 1
    result2 = solution.guessNumber(1)
    expected2 = 1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Pick at end
    guess.pick = 2
    result3 = solution.guessNumber(2)
    expected3 = 2
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Larger range
    guess.pick = 50
    result4 = solution.guessNumber(100)
    expected4 = 50
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Pick near beginning
    guess.pick = 3
    result5 = solution.guessNumber(10)
    expected5 = 3
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Pick near end
    guess.pick = 8
    result6 = solution.guessNumber(10)
    expected6 = 8
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test recursive solution
    guess.pick = 7
    result7 = solution.guessNumberRecursive(10)
    expected7 = 7
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test linear solution
    guess.pick = 4
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
        guess.pick = pick
        result = solution.guessNumber(n)
        print(f"Range [1, {n}], picked number: {result}")

    # Show API call simulation
    print(f"\nAPI simulation for n=10, pick=6:")
    guess.pick = 6
    left, right = 1, 10
    call_count = 0

    while left <= right:
        mid = left + (right - left) // 2
        result = guess(mid)
        call_count += 1

        print(f"Call {call_count}: guess({mid}) = {result}")

        if result == 0:
            print(f"Found! Answer is {mid}")
            break
        elif result == -1:
            right = mid - 1
        else:
            left = mid + 1
