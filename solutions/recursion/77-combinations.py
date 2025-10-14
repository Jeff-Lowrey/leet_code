"""
# Difficulty: Medium

# 77. Combinations

This problem demonstrates key concepts in Recursion.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 2]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>All 2-combinations from [1,2,3,4] are [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Given two integers n and k, return all possible combinations of k numbers chosen
from the range [1, n]. This is a classic backtracking problem where we systematically
explore all possible k-sized subsets.

### APPROACH:
1. **Backtracking with size constraint**:
   - Start from number 1 and try including each number
   - Track current combination being built
   - When combination reaches size k, add to results
2. **Avoid duplicates**:
   - Use a start parameter to only consider numbers >= current
   - This ensures combinations like [1,2] and [2,1] are treated as same
3. **Pruning optimization**:
   - If remaining numbers can't fill k positions, stop early
   - This significantly reduces unnecessary recursion

### WHY THIS WORKS:
- Backtracking explores all possible ways to choose k numbers
- Start parameter ensures we only generate combinations (not permutations)
- Each recursive call adds one number and delegates rest to deeper calls
- Pruning prevents exploring branches that can't possibly succeed

### EXAMPLE WALKTHROUGH:
```
Input: n = 4, k = 2

Build combinations of size 2 from [1,2,3,4]:
Start with 1: [1] -> Add 2: [1,2] ✓
                  -> Add 3: [1,3] ✓
                  -> Add 4: [1,4] ✓
Start with 2: [2] -> Add 3: [2,3] ✓
                  -> Add 4: [2,4] ✓
Start with 3: [3] -> Add 4: [3,4] ✓
Start with 4: [4] -> Can't make size 2, stop

Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
```

### TIME COMPLEXITY:
O(C(n,k) * k) where C(n,k) is binomial coefficient
- C(n,k) combinations to generate
- O(k) to copy each combination

### SPACE COMPLEXITY:
O(k) - recursion depth and combination storage

### EDGE CASES:
- k = 0 (return [[]])
- k = n (return [[1,2,...,n]])
- k > n (return [])
- n = 1 (return [[1]] if k=1, [] otherwise)

</details>
"""

class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        """
        Generate all combinations of k numbers from 1 to n.

        Args:
            n: Upper bound of range [1, n]
            k: Size of combinations

        Returns:
            List of all combinations of k numbers from 1 to n

        Time Complexity: O(C(n,k) * k)
        Space Complexity: O(k)
        """
        result = []

        def backtrack(start: int, combination: List[int]) -> None:
            """
            Backtracking helper to build combinations.

            Args:
                start: Starting number to consider
                combination: Current combination being built
            """
            # Base case: combination is complete
            if len(combination) == k:
                result.append(combination[:])
                return

            # Pruning: if not enough numbers left to complete combination, stop
            needed = k - len(combination)
            available = n - start + 1
            if available < needed:
                return

            # Try each number from start to n
            for i in range(start, n + 1):
                # Choose: add number to combination
                combination.append(i)

                # Explore: recurse with next number
                backtrack(i + 1, combination)

                # Unchoose: backtrack
                combination.pop()

        # Start backtracking from number 1
        backtrack(1, [])

        return result

    def solve(self, n: int, k: int) -> List[List[int]]:
        """
        Main solution for Problem 77.

        Args:
            n: Upper bound of range [1, n]
            k: Size of combinations

        Returns:
            List of all combinations of k numbers from 1 to n

        Time Complexity: O(C(n,k) * k)
        Space Complexity: O(k)
        """
        return self.combine(n, k)

def test_solution():
    """Test cases for Problem 77."""
    solution = Solution()

    def arrays_equal(a, b):
        """Compare 2D arrays (order doesn't matter)."""
        if len(a) != len(b):
            return False
        sorted_a = sorted([tuple(arr) for arr in a])
        sorted_b = sorted([tuple(arr) for arr in b])
        return sorted_a == sorted_b

    # Test case 1: n = 4, k = 2
    result = solution.solve(4, 2)
    expected = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 1 passed: n=4, k=2")

    # Test case 2: n = 1, k = 1
    result = solution.solve(1, 1)
    expected = [[1]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 2 passed: n=1, k=1")

    # Test case 3: n = 5, k = 3
    result = solution.solve(5, 3)
    assert len(result) == 10, f"Expected 10 combinations, got {len(result)}"  # C(5,3) = 10
    print("Test 3 passed: n=5, k=3 count")

    # Test case 4: k = n
    result = solution.solve(3, 3)
    expected = [[1, 2, 3]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 4 passed: k equals n")

    # Test case 5: Verify all combinations are unique
    result = solution.solve(4, 2)
    result_set = set(tuple(c) for c in result)
    assert len(result_set) == len(result), "Duplicate combinations found"
    print("Test 5 passed: All combinations unique")

    # Test case 6: n = 5, k = 1
    result = solution.solve(5, 1)
    expected = [[1], [2], [3], [4], [5]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 6 passed: k=1")

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"\nSolution for 77. Combinations")
    solution = Solution()

    example1 = (4, 2)
    print(f"Input: n = {example1[0]}, k = {example1[1]}")
    print(f"Output: {solution.solve(*example1)}")
    print()

    example2 = (1, 1)
    print(f"Input: n = {example2[0]}, k = {example2[1]}")
    print(f"Output: {solution.solve(*example2)}")
