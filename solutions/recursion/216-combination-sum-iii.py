"""
# Difficulty: Medium

# 216. Combination Sum III

This problem demonstrates key concepts in Recursion.

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
Find all valid combinations of k numbers that sum to n, using only numbers 1-9,
where each number can be used at most once. This is a backtracking problem with
multiple constraints: combination size and target sum.

### APPROACH:
1. **Backtracking with constraints**:
   - Start from number 1 and try each number up to 9
   - For each number, decide to include it or skip it
   - Track current sum and count of numbers used
   - Base cases: reached k numbers (check if sum equals n), or exceeded constraints
2. **Pruning optimizations**:
   - Stop if current sum exceeds target
   - Stop if remaining numbers can't possibly reach target
   - Early exit when constraints violated
3. **Edge cases**: k > 9, n too large, n too small

### WHY THIS WORKS:
- Backtracking systematically explores all valid combinations
- Pruning reduces unnecessary exploration
- Starting number parameter prevents duplicate combinations
- Multiple constraints (count and sum) guide the search

### EXAMPLE WALKTHROUGH:
```
Input: k = 3, n = 7
Try combinations of 3 numbers from 1-9 that sum to 7:
[1,2,3] -> sum = 6 (not valid)
[1,2,4] -> sum = 7 (valid!)
[1,3,3] -> can't reuse 3
[2,2,3] -> can't reuse 2
Other combinations either don't sum to 7 or don't have exactly 3 numbers
Output: [[1,2,4]]
```

### TIME COMPLEXITY:
O(C(9,k)) - choosing k numbers from 9 options

### SPACE COMPLEXITY:
O(k) - recursion depth and combination size

### EDGE CASES:
- k > 9 (impossible - return empty array)
- n > 45 (sum of 1-9, impossible - return empty array)
- k = 1 (return [n] if 1 <= n <= 9)
- Minimum sum for k numbers: 1+2+...+k = k(k+1)/2

</details>
"""

class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        """
        Find all valid combinations of k numbers that sum to n.

        Args:
            k: Number of integers in combination
            n: Target sum

        Returns:
            List of all valid combinations

        Time Complexity: O(C(9,k))
        Space Complexity: O(k)
        """
        result = []

        # Edge cases
        if k > 9 or n > 45 or n < 1:
            return result

        # Minimum sum for k numbers: 1+2+...+k = k(k+1)/2
        min_sum = k * (k + 1) // 2
        if n < min_sum:
            return result

        # Maximum sum for k numbers: (10-k)+...+9 = k*(19-k)/2
        max_sum = k * (19 - k) // 2
        if n > max_sum:
            return result

        def backtrack(start: int, current_sum: int, combination: List[int]) -> None:
            """
            Backtracking helper to build combinations.

            Args:
                start: Starting number to consider
                current_sum: Current sum of numbers in combination
                combination: Current combination being built
            """
            # Base case: found valid combination
            if len(combination) == k:
                if current_sum == n:
                    result.append(combination[:])
                return

            # Pruning: if current sum already exceeds target, stop
            if current_sum > n:
                return

            # Try each number from start to 9
            for num in range(start, 10):
                # Pruning: if adding minimum remaining numbers exceeds target, stop
                remaining_count = k - len(combination) - 1
                if remaining_count > 0:
                    # Minimum sum if we add this number and fill rest with consecutive numbers
                    min_remaining_sum = sum(range(num + 1, num + 1 + remaining_count))
                    if current_sum + num + min_remaining_sum > n:
                        break

                # Choose: add number to combination
                combination.append(num)

                # Explore: recurse with next number
                backtrack(num + 1, current_sum + num, combination)

                # Unchoose: backtrack
                combination.pop()

        # Start backtracking from number 1
        backtrack(1, 0, [])

        return result

    def solve(self, k: int, n: int) -> List[List[int]]:
        """
        Main solution for Problem 216.

        Args:
            k: Number of integers in combination
            n: Target sum

        Returns:
            List of all valid combinations

        Time Complexity: O(C(9,k))
        Space Complexity: O(k)
        """
        return self.combinationSum3(k, n)

def test_solution():
    """Test cases for Problem 216."""
    solution = Solution()

    def arrays_equal(a, b):
        """Compare 2D arrays (order doesn't matter)."""
        if len(a) != len(b):
            return False
        sorted_a = sorted([tuple(arr) for arr in a])
        sorted_b = sorted([tuple(arr) for arr in b])
        return sorted_a == sorted_b

    # Test case 1: k = 3, n = 7
    result = solution.solve(3, 7)
    expected = [[1, 2, 4]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 1 passed: k=3, n=7")

    # Test case 2: k = 3, n = 9
    result = solution.solve(3, 9)
    expected = [[1, 2, 6], [1, 3, 5], [2, 3, 4]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 2 passed: k=3, n=9")

    # Test case 3: k = 4, n = 1 (impossible)
    result = solution.solve(4, 1)
    expected = []
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 3 passed: Impossible case")

    # Test case 4: k = 9, n = 45 (all numbers)
    result = solution.solve(9, 45)
    expected = [[1, 2, 3, 4, 5, 6, 7, 8, 9]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 4 passed: All numbers")

    # Test case 5: k = 2, n = 18
    result = solution.solve(2, 18)
    expected = []  # Max sum with 2 numbers is 8+9=17
    assert len(result) == 0, f"Expected no solutions for k=2, n=18, got {result}"
    print("Test 5 passed: k=2, n=18")

    # Test case 6: k = 3, n = 15
    result = solution.solve(3, 15)
    expected = [[1, 5, 9], [1, 6, 8], [2, 4, 9], [2, 5, 8], [2, 6, 7], [3, 4, 8], [3, 5, 7], [4, 5, 6]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 6 passed: k=3, n=15")

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"\nSolution for 216. Combination Sum III")
    solution = Solution()

    example1 = (3, 7)
    print(f"Input: k = {example1[0]}, n = {example1[1]}")
    print(f"Output: {solution.solve(*example1)}")
    print()

    example2 = (3, 9)
    print(f"Input: k = {example2[0]}, n = {example2[1]}")
    print(f"Output: {solution.solve(*example2)}")
