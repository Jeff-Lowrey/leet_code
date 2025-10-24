"""
# 779. K-th Symbol in Grammar

# Difficulty: Medium

We build a table of n rows (1-indexed). We start by writing 0 in the 1st row.
Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01,
and each occurrence of 1 with 10.

For example, for n = 3, the 1st row is 0, the 2nd row is 01, and the 3rd row is 0110.

Given two integer n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 2, k = 1</dd>
<dt>Output:</dt>
<dd>0</dd>
<dt>Explanation:</dt>
<dd>
Row 1: 0
Row 2: 01
The 1st symbol in row 2 is 0
</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Recursion, Binary Tree, Bit Manipulation
**Data Structures**: None (pure recursion)
**Patterns**: Divide and Conquer, Parent-Child Relationship
**Time Complexity**: O(n)
**Space Complexity**: O(n) for recursion stack

### INTUITION:
The rows form a binary tree pattern:
- Row 1: 0
- Row 2: 0 1 (0→01)
- Row 3: 0 1 1 0 (0→01, 1→10)
- Row 4: 0 1 1 0 1 0 0 1

Key observation: Each symbol at position k in row n is derived from position ⌈k/2⌉ in row n-1.
- If k is odd (left child): same as parent
- If k is even (right child): flip of parent

### APPROACH:
1. **Base case**: n = 1, return 0 (first row always starts with 0)
2. **Find parent**: The parent is at position ⌈k/2⌉ in row n-1
3. **Determine relationship**:
   - If k is odd: return parent value
   - If k is even: return flipped parent value (1 - parent)
4. **Recursive call**: kthGrammar(n-1, (k+1)//2)

### WHY THIS WORKS:
- The pattern follows a binary tree structure
- Left child (odd k) inherits parent's value
- Right child (even k) gets flipped value
- We recursively trace back to row 1

### EXAMPLE WALKTHROUGH:
Input:
```
n = 3, k = 3
```

Row 1: 0
Row 2: 0 1
Row 3: 0 1 1 0
^ ^ ^ ^
1 2 3 4
Find position 3 in row 3:
- Find position 2 in row 2:

Steps:
Step 1: - k=3 (odd) → parent is position ⌈3/2⌉ = 2 in row 2, same value as parent
Step 2: - k=2 (even) → parent is position ⌈2/2⌉ = 1 in row 1, flip parent
Step 3: - Find position 1 in row 1: returns 0
Step 4: - Row 2, position 2: flip(0) = 1
Step 5: - Row 3, position 3: same as parent = 1
Step 6: Result: 1

Output:
```
1
```

### TIME COMPLEXITY:
O(n) - we recurse up to n times

### SPACE COMPLEXITY:
O(n) - recursion stack depth

### EDGE CASES:
- n = 1: always returns 0
- k = 1: always returns 0 (first element of any row)
- k = last position: depends on pattern

</details>
"""


class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        """
        Find kth symbol in nth row using recursion.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Base case: first row always starts with 0
        if n == 1:
            return 0

        # Find parent symbol in previous row
        parent = self.kthGrammar(n - 1, (k + 1) // 2)

        # If k is odd (left child), return parent value
        # If k is even (right child), return flipped parent value
        if k % 2 == 1:
            return parent
        else:
            return 1 - parent

    def kthGrammarBitCount(self, n: int, k: int) -> int:
        """
        Alternative approach using bit counting.

        Time Complexity: O(log k)
        Space Complexity: O(1)

        The kth symbol equals the parity of set bits in (k-1).
        """
        return bin(k - 1).count("1") % 2

    def kthGrammarIterative(self, n: int, k: int) -> int:
        """
        Iterative approach working backwards.

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        result = 0

        # Work backwards from row n to row 1
        while n > 1:
            # If k is even, we need to flip the result
            if k % 2 == 0:
                result = 1 - result

            # Move to parent in previous row
            k = (k + 1) // 2
            n -= 1

        return result


def test_solution() -> None:
    """Test cases for 779. K-th Symbol in Grammar."""
    solution = Solution()

    # Test cases - recursive
    assert solution.kthGrammar(1, 1) == 0
    assert solution.kthGrammar(2, 1) == 0
    assert solution.kthGrammar(2, 2) == 1
    assert solution.kthGrammar(3, 1) == 0
    assert solution.kthGrammar(3, 3) == 1
    assert solution.kthGrammar(4, 5) == 1

    # Test bit count approach
    assert solution.kthGrammarBitCount(2, 2) == 1
    assert solution.kthGrammarBitCount(3, 3) == 1

    # Test iterative
    assert solution.kthGrammarIterative(4, 6) == 0
    assert solution.kthGrammarIterative(3, 4) == 0

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 779. K-th Symbol in Grammar ===")
    for n in range(1, 5):
        row_length = 2 ** (n - 1)
        print(f"Row {n}:", end=" ")
        for k in range(1, row_length + 1):
            print(solution.kthGrammar(n, k), end="")
        print()
