"""
# Difficulty: Medium

# 0421. Maximum XOR of Two Numbers in an Array

Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[3,10,5,25,2,8]</dd>
<dt>Output:</dt>
<dd>28 (5 XOR 25)</dd>
<dt>Explanation:</dt>
<dd>The maximum XOR of two numbers is 28, formed by 5 XOR 25 = 28</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass with O(1) hash lookups
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Build Trie of all numbers. For each number, traverse Trie greedily choosing opposite bit when possible (to maximize XOR). This finds best XOR partner for each number in O(32n).

### APPROACH:
1. **Build trie**: Insert all numbers into trie as binary representations
2. **Initialize max_xor**: Set max_xor = 0
3. **For each number**: Traverse trie trying to take opposite bit at each level
4. **Maximize XOR**: If opposite bit exists, take it; else take same bit
5. **Calculate XOR**: Build XOR value from chosen path
6. **Update maximum**: max_xor = max(max_xor, current_xor)
7. **Return result**: Return max_xor

### WHY THIS WORKS:
- Trie with bit-level representation: each node has 0/1 children
- For each number, try to take opposite bit path (maximize XOR)
- If opposite bit exists, go there (XOR will be 1); else take same bit
- Build trie with all numbers, then query each number for max XOR
- O(n * 32) time: n numbers, 32 bits each, O(n * 32) space for trie

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [3,10,5,25,2,8]
```

Step 1: Build trie of binary representations
3 = 00011
10 = 01010
...
Step 2: For each number, find max XOR
For 3: try to maximize XOR
Result: 3 XOR 25 = 00011 XOR 11001 = 11010 = 26

Output:
```
28 (5 XOR 25)
```

### TIME COMPLEXITY:
O(n)
- Single pass through input


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        """
        Find the maximum XOR value between any two numbers in the array.

        Args:
            nums: List of integers

        Returns:
            Maximum XOR value possible between any two numbers in the array

        Example:
            >>> solution = Solution()
            >>> solution.findMaximumXOR([3, 10, 5, 25, 2, 8])
            28
        """
        if not nums or len(nums) < 2:
            return 0

        # Length of maximum number in binary representation
        L = len(bin(max(nums))) - 2

        # Initialize result
        max_xor = 0

        # Process bit by bit from left to right (most significant to least)
        for i in range(L - 1, -1, -1):
            # Move max_xor to the left by 1 bit
            max_xor <<= 1

            # Current prefix candidates
            curr_xor = max_xor | 1

            # Set of all prefixes
            prefixes = {num >> i for num in nums}

            # Check if we can get curr_xor
            for p in prefixes:
                if p ^ (curr_xor >> i) in prefixes:
                    max_xor = curr_xor
                    break

        return max_xor


class OptimizedSolution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        """
        Alternative implementation using Trie data structure for better performance
        on larger datasets.

        Args:
            nums: List of integers

        Returns:
            Maximum XOR value possible between any two numbers in the array
        """
        # Edge case handling
        if not nums or len(nums) < 2:
            return 0

        # Build Trie
        trie: dict[Any, Any] = {}
        for num in nums:
            node = trie
            # Process each number bit by bit from left to right
            for i in range(31, -1, -1):
                bit = (num >> i) & 1
                if bit not in node:
                    node[bit] = {}
                node = node[bit]

        # Find maximum XOR
        max_xor = 0
        for num in nums:
            node = trie
            current_xor = 0
            # Try to go opposite direction for each bit when possible
            for i in range(31, -1, -1):
                bit = (num >> i) & 1
                # Try to go opposite direction
                opposite = 1 - bit
                if opposite in node:
                    current_xor = (current_xor << 1) | 1
                    node = node[opposite]
                else:
                    current_xor <<= 1
                    node = node[bit]
            max_xor = max(max_xor, current_xor)

        return max_xor


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.findMaximumXOR([1, 2, 3])
    expected = 3
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.findMaximumXOR([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.findMaximumXOR([1])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 421. Max")
