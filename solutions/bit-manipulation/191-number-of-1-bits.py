"""
# Difficulty: Easy

Write a function that takes the binary representation of a positive integer and returns
the number of set bits it has (also known as the Hamming weight).

Example:
Input: n = 11
Output: 3
Explanation: The input binary string 1011 has three set bits.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 11</dd>
<dt>Output:</dt>
<dd>3</dd>
<dt>Explanation:</dt>
<dd>Number 11 (binary 1011) has 3 set bits</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(k) where k is number of 1-bits
**Space Complexity**: O(1)

### INTUITION:
Use bit manipulation to count 1s. The key insight is `n & (n-1)` removes the rightmost
set bit, allowing us to count iterations until n becomes 0.

### APPROACH:
1. **Brian Kernighan's Algorithm**: n & (n-1) flips rightmost 1-bit to 0
2. **Count iterations**: Each operation removes one 1-bit
3. **Terminate**: When n becomes 0, all 1-bits have been counted

### WHY THIS WORKS:
n-1 flips all bits after the rightmost 1 (including the 1 itself).
AND-ing with n keeps only the bits that were 1 in both, effectively removing that rightmost 1.

### EXAMPLE WALKTHROUGH:
```
n = 11 (binary: 1011)
Count = 0

Iteration 1: n = 1011, n-1 = 1010
n & (n-1) = 1010, count = 1

Iteration 2: n = 1010, n-1 = 1001
n & (n-1) = 1000, count = 2

Iteration 3: n = 1000, n-1 = 0111
n & (n-1) = 0000, count = 3

Result: 3
```

### TIME COMPLEXITY:
O(k) where k is number of 1-bits

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- **n = 0**: Return 0 (no 1 bits)
- **n = 1**: Return 1 (single 1 bit)
- **All bits are 1**: Return 32 for 32-bit integer
- **Single bit set**: Return 1
- **Power of 2**: Exactly one 1 bit

</details>
"""


class Solution:
    def hammingWeight(self, n: int) -> int:
        """
        Approach: Brian Kernighan's algorithm
        Time Complexity: O(k) where k is number of 1-bits
        Space Complexity: O(1)
        """
        count = 0
        while n:
            n &= n - 1  # Remove rightmost 1-bit
            count += 1
        return count

    def hammingWeightLoop(self, n: int) -> int:
        """
        Approach: Check each bit position
        Time Complexity: O(32) = O(1)
        Space Complexity: O(1)
        """
        count = 0
        for i in range(32):
            if (n >> i) & 1:
                count += 1
        return count

    def hammingWeightBuiltin(self, n: int) -> int:
        """
        Approach: Use Python's bin() and count()
        Time Complexity: O(k) where k is number of bits
        Space Complexity: O(k) for string conversion
        """
        return bin(n).count("1")


def test_solution() -> None:
    """Test cases for Problem 191."""
    solution = Solution()

    # Test case 1: Example from problem
    assert solution.hammingWeight(11) == 3  # 1011
    assert solution.hammingWeightLoop(11) == 3
    assert solution.hammingWeightBuiltin(11) == 3
    print("Test case 1 passed: n = 11")

    # Test case 2: Single bit set
    assert solution.hammingWeight(1) == 1  # 1
    print("Test case 2 passed: n = 1")

    # Test case 3: All bits set (32-bit)
    assert solution.hammingWeight(0xFFFFFFFF) == 32
    print("Test case 3 passed: All bits set")

    # Test case 4: Power of 2 (single bit)
    assert solution.hammingWeight(128) == 1  # 10000000
    print("Test case 4 passed: Power of 2")

    # Test case 5: Zero
    assert solution.hammingWeight(0) == 0
    print("Test case 5 passed: n = 0")

    # Test case 6: Large number
    assert solution.hammingWeight(2147483647) == 31  # 01111111111111111111111111111111
    print("Test case 6 passed: Large number")

    # Test case 7: Alternating bits
    assert solution.hammingWeight(0xAAAAAAAA) == 16  # 10101010...
    print("Test case 7 passed: Alternating bits")

    # Test case 8: Two consecutive bits
    assert solution.hammingWeight(3) == 2  # 11
    print("Test case 8 passed: n = 3")

    # Test case 9: Verify all methods agree
    test_values = [0, 1, 11, 128, 255, 1024, 0xFFFF]
    for val in test_values:
        assert solution.hammingWeight(val) == solution.hammingWeightLoop(val) == solution.hammingWeightBuiltin(val)
    print("Test case 9 passed: All methods consistent")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
