"""
# Difficulty: Medium

# 46. Permutations

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
Given an array of distinct integers, return all possible permutations. A permutation
is an arrangement of all elements in different orders. This is a classic backtracking
problem where we explore all possible orderings systematically.

### APPROACH:
1. **Backtracking with tracking**:
   - At each position, try every unused number
   - Mark numbers as used to avoid duplicates in same permutation
   - When all positions filled, add permutation to results
2. **Implementation strategy**:
   - Use a set to track used indices
   - Recurse for each unused number
   - Backtrack by unmarking the number as used
3. **Alternative approach**: Swap elements in-place

### WHY THIS WORKS:
- Each level of recursion chooses one number for current position
- Tracking prevents using same number twice in one permutation
- Backtracking explores all possible orderings systematically
- The recursion tree has n! leaves (all permutations)

### EXAMPLE WALKTHROUGH:
```
Input: [1,2,3]

Build permutations by choosing one number at a time:
Choose 1: [1] -> Choose 2: [1,2] -> Choose 3: [1,2,3] ✓
                       -> Choose 3: [1,3] -> Choose 2: [1,3,2] ✓
Choose 2: [2] -> Choose 1: [2,1] -> Choose 3: [2,1,3] ✓
               -> Choose 3: [2,3] -> Choose 1: [2,3,1] ✓
Choose 3: [3] -> Choose 1: [3,1] -> Choose 2: [3,1,2] ✓
               -> Choose 2: [3,2] -> Choose 1: [3,2,1] ✓

Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### TIME COMPLEXITY:
O(n! * n) where n is array length
- n! permutations to generate
- O(n) to copy each permutation

### SPACE COMPLEXITY:
O(n) - recursion depth and tracking set

### EDGE CASES:
- Empty array (return [[]])
- Single element (return [[element]])
- All distinct integers (no duplicates in input)

</details>
"""

class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        """
        Generate all permutations of distinct integers.

        Args:
            nums: Array of distinct integers

        Returns:
            List of all possible permutations

        Time Complexity: O(n! * n)
        Space Complexity: O(n)
        """
        result = []

        def backtrack(current: List[int], used: set) -> None:
            """
            Backtracking helper to build permutations.

            Args:
                current: Current permutation being built
                used: Set of indices already used in current permutation
            """
            # Base case: permutation is complete
            if len(current) == len(nums):
                result.append(current[:])
                return

            # Try each number that hasn't been used yet
            for i in range(len(nums)):
                if i in used:
                    continue  # Skip if already used

                # Choose: add number to permutation
                current.append(nums[i])
                used.add(i)

                # Explore: recurse to fill next position
                backtrack(current, used)

                # Unchoose: backtrack
                current.pop()
                used.remove(i)

        # Start backtracking with empty permutation
        backtrack([], set())

        return result

    def solve(self, nums: List[int]) -> List[List[int]]:
        """
        Main solution for Problem 46.

        Args:
            nums: Array of distinct integers

        Returns:
            List of all possible permutations

        Time Complexity: O(n! * n)
        Space Complexity: O(n)
        """
        return self.permute(nums)

def test_solution():
    """Test cases for Problem 46."""
    solution = Solution()

    def arrays_equal(a, b):
        """Compare 2D arrays (order doesn't matter)."""
        if len(a) != len(b):
            return False
        sorted_a = sorted([sorted(arr) for arr in a])
        sorted_b = sorted([sorted(arr) for arr in b])
        return sorted_a == sorted_b

    # Test case 1: Three elements
    result = solution.solve([1, 2, 3])
    expected = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
    assert len(result) == len(expected), f"Expected {len(expected)} permutations, got {len(result)}"
    print("Test 1 passed: Three elements")

    # Test case 2: Two elements
    result = solution.solve([0, 1])
    expected = [[0, 1], [1, 0]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 2 passed: Two elements")

    # Test case 3: Single element
    result = solution.solve([1])
    expected = [[1]]
    assert arrays_equal(result, expected), f"Expected {expected}, got {result}"
    print("Test 3 passed: Single element")

    # Test case 4: Verify count for 4 elements (should be 4! = 24)
    result = solution.solve([1, 2, 3, 4])
    assert len(result) == 24, f"Expected 24 permutations, got {len(result)}"
    print("Test 4 passed: Four elements count")

    # Test case 5: Verify all permutations are unique
    result = solution.solve([1, 2, 3])
    result_set = set(tuple(p) for p in result)
    assert len(result_set) == len(result), "Duplicate permutations found"
    print("Test 5 passed: All permutations unique")

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"\nSolution for 46. Permutations")
    solution = Solution()

    example1 = [1, 2, 3]
    print(f"Input: {example1}")
    print(f"Output: {solution.solve(example1)}")
    print()

    example2 = [0, 1]
    print(f"Input: {example2}")
    print(f"Output: {solution.solve(example2)}")
