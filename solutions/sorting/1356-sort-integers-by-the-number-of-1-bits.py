"""
# 1356. Sort Integers By The Number Of 1 Bits
# Difficulty: Easy
You are given an integer array arr. Sort the integers in the array in ascending order by the number
of 1's in their binary representation and in case of two or more integers have the same number of 1's
you have to sort them in ascending order.

Return the array after sorting it.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need a two-level sort: first by count of 1-bits, then by value. Python's sort is stable,
so we can sort by value first, then by bit count. Or use a tuple key for simultaneous sorting.

### APPROACH:
1. **Count 1-bits**: Use bin(n).count('1') or bit manipulation
2. **Create sort key**: Tuple (bit_count, value)
3. **Sort array**: Use sorted() with custom key function
4. **Return result**: Sorted array

### WHY THIS WORKS:
- bin(n).count('1') counts 1-bits in binary representation
- Python sorts tuples lexicographically (first element, then second)
- Stable sort maintains order when keys are equal
- Lambda function provides clean, concise key

### TIME COMPLEXITY: O(n log n)
- Counting bits: O(log max_value) per number = O(n log max_value)
- Sorting: O(n log n)
- Total: O(n log n) dominates

### SPACE COMPLEXITY: O(n)
For the sorted result array

### EXAMPLE WALKTHROUGH:
```
Input: arr = [0,1,2,3,4,5,6,7,8]

Binary representations and bit counts:
0 = 0b0     -> 0 ones
1 = 0b1     -> 1 one
2 = 0b10    -> 1 one
3 = 0b11    -> 2 ones
4 = 0b100   -> 1 one
5 = 0b101   -> 2 ones
6 = 0b110   -> 2 ones
7 = 0b111   -> 3 ones
8 = 0b1000  -> 1 one

Group by bit count (then sort by value):
0 ones: [0]
1 one:  [1, 2, 4, 8]
2 ones: [3, 5, 6]
3 ones: [7]

Output: [0,1,2,4,8,3,5,6,7]
```

### EDGE CASES:
- Array with single element
- All numbers have same bit count
- Array with zeros
- Large numbers (up to 10^4)

### OPTIMIZATIONS:
- **Brian Kernighan's algorithm**: n & (n-1) for bit counting
- **Precompute bit counts**: If sorting many times
- **Built-in bit_count()**: Python 3.10+ has int.bit_count()

</details>
"""

class Solution:
    def sortByBits(self, arr: list[int]) -> list[int]:
        """
        Sort integers by count of 1-bits, then by value.

        Args:
            arr: Array of integers to sort

        Returns:
            Array sorted by bit count, then by value

        Time Complexity: O(n log n) for sorting
        Space Complexity: O(n) for result
        """
        # Sort by (bit_count, value) tuple
        return sorted(arr, key=lambda x: (bin(x).count("1"), x))

    def sortByBitsBrianKernighan(self, arr: list[int]) -> list[int]:
        """
        Sort using Brian Kernighan's algorithm for bit counting.

        Brian Kernighan's algorithm: n & (n-1) clears the rightmost 1-bit.
        Count iterations until n becomes 0.

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """

        def count_bits(n: int) -> int:
            count = 0
            while n:
                n &= n - 1  # Clear rightmost 1-bit
                count += 1
            return count

        return sorted(arr, key=lambda x: (count_bits(x), x))

    def sortByBitsBuiltIn(self, arr: list[int]) -> list[int]:
        """
        Sort using Python 3.10+ int.bit_count() method.

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        return sorted(arr, key=lambda x: (x.bit_count(), x))

    def sortByBitsLookupTable(self, arr: list[int]) -> list[int]:
        """
        Sort using precomputed lookup table for bit counts.

        Efficient when max value is known and reasonable.

        Time Complexity: O(n log n)
        Space Complexity: O(max_value)
        """
        if not arr:
            return []

        max_val = max(arr)
        # Precompute bit counts
        bit_counts = [bin(i).count("1") for i in range(max_val + 1)]

        return sorted(arr, key=lambda x: (bit_counts[x], x))

def test_solution():
    """Test cases for Problem 1356."""
    solution = Solution()

    # Test case 1: Example from problem
    result1 = solution.sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expected1 = [0, 1, 2, 4, 8, 3, 5, 6, 7]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Another example
    result2 = solution.sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1])
    expected2 = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Same bit counts
    result3 = solution.sortByBits([10000, 10000])
    expected3 = [10000, 10000]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single element
    result4 = solution.sortByBits([42])
    expected4 = [42]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Mixed values
    result5 = solution.sortByBits([2, 3, 5, 7, 11, 13, 17, 19])
    # 2=10(1), 3=11(2), 5=101(2), 7=111(3), 11=1011(3), 13=1101(3), 17=10001(2), 19=10011(3)
    # 1 bit: [2]
    # 2 bits: [3, 5, 17]
    # 3 bits: [7, 11, 13, 19]
    expected5 = [2, 3, 5, 17, 7, 11, 13, 19]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test Brian Kernighan solution
    result6 = solution.sortByBitsBrianKernighan([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expected6 = [0, 1, 2, 4, 8, 3, 5, 6, 7]
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test built-in bit_count (Python 3.10+)
    try:
        result7 = solution.sortByBitsBuiltIn([0, 1, 2, 3, 4, 5, 6, 7, 8])
        expected7 = [0, 1, 2, 4, 8, 3, 5, 6, 7]
        assert result7 == expected7, f"Expected {expected7}, got {result7}"
    except AttributeError:
        print("Skipping bit_count test (requires Python 3.10+)")

    # Test lookup table solution
    result8 = solution.sortByBitsLookupTable([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expected8 = [0, 1, 2, 4, 8, 3, 5, 6, 7]
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 1356. Sort Integers By The Number Of 1 Bits ===")
    print(f"sortByBits([0,1,2,3,4,5,6,7,8]) -> {solution.sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8])}")
    print(
        f"sortByBits([1024,512,256,128,64,32,16,8,4,2,1]) -> {solution.sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1])}"
    )
    print(f"sortByBits([2,3,5,7,11,13,17,19]) -> {solution.sortByBits([2, 3, 5, 7, 11, 13, 17, 19])}")
