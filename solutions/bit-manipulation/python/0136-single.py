"""
# Difficulty: Easy

# 136. Single Number

Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[4,1,2,1,2]</dd>
<dt>Output:</dt>
<dd>4 (single number)</dd>
<dt>Explanation:</dt>
<dd>The single number 4 appears once in [2,2,1,4,1] (all others appear twice)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Bit Manipulation, XOR Properties
**Data Structures**: Array
**Patterns**: Mathematical Property Exploitation
**Time Complexity**: O(n) - Single pass through array
**Space Complexity**: O(1) - Only accumulator variable


### INTUITION:
The XOR operation has special properties that make this problem elegant:
- XOR of two identical numbers equals 0: `a ^ a = 0`
- XOR with 0 returns the number itself: `a ^ 0 = a`
- XOR is commutative and associative

When we XOR all numbers together, pairs cancel out to 0, leaving only the single number.


### APPROACH:
1. **Initialize accumulator**: Start with result = 0
2. **XOR all elements**: Iterate through array, XORing each number with result
3. **Pairs cancel**: Duplicate numbers cancel to 0 due to XOR properties
4. **Return result**: Final value is the single number


### WHY THIS WORKS:
- XOR is both commutative and associative (order doesn't matter)
- Every paired number cancels: `(a ^ a) = 0`
- The single number XORed with 0 returns itself: `single ^ 0 = single`
- Final result: `0 ^ single = single`


### EXAMPLE WALKTHROUGH:
```
Input: nums = [4,1,2,1,2]

Step 1: result = 0
Step 2: result = 0 ^ 4 = 4 (binary: 0100)
Step 3: result = 4 ^ 1 = 5 (binary: 0101)
Step 4: result = 5 ^ 2 = 7 (binary: 0111)
Step 5: result = 7 ^ 1 = 6 (binary: 0110)
Step 6: result = 6 ^ 2 = 4 (binary: 0100)

Pairs cancelled: (1^1)=0, (2^2)=0
Remaining: 4

Output: 4 (single number)
```


### TIME COMPLEXITY:
O(n) - Single pass through array


### SPACE COMPLEXITY:
O(1) - Only uses one variable for accumulation


### EDGE CASES:
- Single element array: [x] → returns x
- Negative numbers: XOR works with signed integers
- Large arrays: Linear time scales well
- Minimum input: At least one element guaranteed

</details>
"""


def solve(nums: list[int]) -> int:
    """
    Main solution for Problem 136: Single Number

    Args:
        nums: Array of integers where every element appears twice except one

    Returns:
        The single number that appears only once

    Time Complexity: O(n) - Single pass through array
    Space Complexity: O(1) - Only accumulator variable
    """
    result = 0
    for num in nums:
        result ^= num
    return result


def test_solution() -> None:
    """Test cases for Problem 136: Single Number"""
    print("Testing 136. Single Number")

    # Test case 1: Basic case with pairs
    result1 = solve([2, 2, 1])
    expected1 = 1
    assert result1 == expected1, f"Test 1 failed: expected {expected1}, got {result1}"

    # Test case 2: Multiple pairs
    result2 = solve([4, 1, 2, 1, 2])
    expected2 = 4
    assert result2 == expected2, f"Test 2 failed: expected {expected2}, got {result2}"

    # Test case 3: Single element
    result3 = solve([1])
    expected3 = 1
    assert result3 == expected3, f"Test 3 failed: expected {expected3}, got {result3}"

    # Test case 4: Negative numbers
    result4 = solve([-1, -1, -2])
    expected4 = -2
    assert result4 == expected4, f"Test 4 failed: expected {expected4}, got {result4}"

    # Test case 5: Mixed positive and negative
    result5 = solve([1, -1, 1])
    expected5 = -1
    assert result5 == expected5, f"Test 5 failed: expected {expected5}, got {result5}"

    # Test case 6: Larger numbers
    result6 = solve([1000, 999, 1000])
    expected6 = 999
    assert result6 == expected6, f"Test 6 failed: expected {expected6}, got {result6}"

    print("All test cases passed for 136. Single Number!")


def demonstrate_solution() -> None:
    """Example usage and demonstration"""
    print("\n=== Problem 136. Single Number ===")
    print("Category: Bit Manipulation")
    print("Difficulty: Easy")
    print()

    # Example demonstration
    test_solution()


if __name__ == "__main__":
    demonstrate_solution()


"""
Additional Notes:
- XOR bit manipulation is the optimal approach for this problem
- Alternative approaches (hash set, sorting) use O(n) space or O(n log n) time
- This solution satisfies both linear time and constant space requirements
- XOR properties make this solution elegant and efficient
"""
