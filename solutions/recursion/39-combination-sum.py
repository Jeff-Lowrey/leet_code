"""
# Difficulty: Medium

# 39. Combination Sum

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
Given an array of distinct integers and a target, find all unique combinations where
the numbers sum to target. Each number may be used unlimited times. This is a classic
backtracking problem where we explore all possible combinations with reusability.

### APPROACH:
1. **Backtracking with reusability**:
   - For each candidate, decide to include it (possibly multiple times) or skip it
   - Track current sum and combination
   - Base case: sum equals target (add to results) or exceeds it (backtrack)
2. **Avoid duplicates**:
   - Use a start index to only consider candidates at or after current position
   - This ensures combinations like [2,3] and [3,2] are treated as the same
3. **Optimization**: Sort candidates and prune when sum exceeds target

### WHY THIS WORKS:
- Backtracking explores all possible ways to combine candidates
- Allowing reuse of candidates by keeping same start index when recursing
- Start index prevents duplicate combinations in different orders
- Pruning reduces unnecessary exploration when sum exceeds target

### EXAMPLE WALKTHROUGH:
```
Input: candidates = [2,3,6,7], target = 7

Start with 2: [2] -> [2,2] -> [2,2,2] -> [2,2,2,2] -> sum > 7, backtrack
                           -> [2,2,3] -> sum = 7 (valid!)
Start with 3: [3] -> [3,3] -> [3,3,3] -> sum > 7, backtrack
                           -> [3,7] -> sum > 7, backtrack
Start with 7: [7] -> sum = 7 (valid!)

Output: [[2,2,3], [7]]
```

### TIME COMPLEXITY:
O(N^(T/M)) where N is number of candidates, T is target, M is min candidate
- In worst case, we explore a tree of height T/M with N branches at each level

### SPACE COMPLEXITY:
O(T/M) - recursion depth and combination storage

### EDGE CASES:
- Empty candidates array
- Target is 0 (return [[]])
- No valid combinations (return [])
- All candidates larger than target

</details>
"""

class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Find all unique combinations that sum to target.

        Args:
            candidates: Array of distinct positive integers
            target: Target sum

        Returns:
            List of all unique combinations that sum to target

        Time Complexity: O(N^(T/M))
        Space Complexity: O(T/M)
        """
        result = []

        # Sort candidates for optimization (helps with pruning)
        candidates.sort()

        def backtrack(start: int, current_sum: int, combination: List[int]) -> None:
            """
            Backtracking helper to build combinations.

            Args:
                start: Starting index in candidates array
                current_sum: Current sum of combination
                combination: Current combination being built
            """
            # Base case: found valid combination
            if current_sum == target:
                result.append(combination[:])
                return

            # Pruning: if current sum exceeds target, stop
            if current_sum > target:
                return

            # Try each candidate starting from 'start' index
            for i in range(start, len(candidates)):
                candidate = candidates[i]

                # Pruning: if adding this candidate exceeds target, stop
                # (works because array is sorted)
                if current_sum + candidate > target:
                    break

                # Choose: add candidate to combination
                combination.append(candidate)

                # Explore: recurse with same index (allows reusing same number)
                backtrack(i, current_sum + candidate, combination)

                # Unchoose: backtrack
                combination.pop()

        # Start backtracking from index 0
        backtrack(0, 0, [])

        return result

    def solve(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Main solution for Problem 39.

        Args:
            candidates: Array of distinct positive integers
            target: Target sum

        Returns:
            List of all unique combinations that sum to target

        Time Complexity: O(N^(T/M))
        Space Complexity: O(T/M)
        """
        return self.combinationSum(candidates, target)

def test_solution():
    """Test cases for Problem 39."""
    solution = Solution()

    def arrays_equal(a, b):
        """Compare 2D arrays (order doesn't matter)."""
        if len(a) != len(b):
            return False
        sorted_a = sorted([sorted(arr) for arr in a])
        sorted_b = sorted([sorted(arr) for arr in b])
        return sorted_a == sorted_b

    # Test case 1: Basic case
    result = solution.solve([2, 3, 6, 7], 7)
    expected = [[2, 2, 3], [7]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 1 passed: Basic case")

    # Test case 2: Multiple uses of same number
    result = solution.solve([2, 3, 5], 8)
    expected = [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 2 passed: Multiple uses of same number")

    # Test case 3: Single number, impossible target
    result = solution.solve([2], 1)
    expected = []
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 3 passed: Impossible target")

    # Test case 4: Target equals candidate
    result = solution.solve([1], 1)
    expected = [[1]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 4 passed: Target equals candidate")

    # Test case 5: No valid combinations
    result = solution.solve([5, 6, 7], 3)
    expected = []
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 5 passed: No valid combinations")

    # Test case 6: Can reuse multiple times
    result = solution.solve([2], 4)
    expected = [[2, 2]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 6 passed: Can reuse multiple times")

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"\nSolution for 39. Combination Sum")
    solution = Solution()

    example1 = ([2, 3, 6, 7], 7)
    print(f"Input: candidates = {example1[0]}, target = {example1[1]}")
    print(f"Output: {solution.solve(*example1)}")
    print()

    example2 = ([2, 3, 5], 8)
    print(f"Input: candidates = {example2[0]}, target = {example2[1]}")
    print(f"Output: {solution.solve(*example2)}")
