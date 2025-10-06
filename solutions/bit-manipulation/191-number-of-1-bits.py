"""
191. Number of 1 Bits
Easy

Write a function that takes the binary representation of a positive integer and
returns the number of `set` bits it has (also known as the Hamming weight).

Example:
Input: `n` = 11
Output: 3
Explanation: The binary representation of 11 is 1011 which has 3 `set` bits.
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Count the number of set bits (1s) in a binary number. The key insight is using Brian Kernighan's algorithm: n & (n-1) removes the rightmost set bit in O(1) time.

### APPROACH (Brian Kernighan's Algorithm):
1. **While n is not zero**, perform n = n & (n-1) and increment counter
2. **n & (n-1)** flips the rightmost set bit to 0
3. **Continue until n becomes 0** (no more set bits)

### WHY THIS WORKS:
- n & (n-1) removes exactly one set bit (the rightmost one) each iteration
- We only iterate as many times as there are set bits
- Much more efficient than checking every bit position

### TIME COMPLEXITY: O(number of set bits) - best case O(1), worst case O(32)
### SPACE COMPLEXITY: O(1)

### THREE APPROACHES:

#### Approach 1: Brian Kernighan's (Optimal)
```python
while n:
    n &= n - 1  # Remove rightmost set bit
    count += 1
```

#### Approach 2: Bit Shifting
```python
while n:
    count += n & 1  # Check last bit
    n >>= 1         # Shift right
```

#### Approach 3: Built-in Function
```python
return bin(n).count('1')
```

### EXAMPLE WALKTHROUGH (Brian Kernighan's):
```
Input: n = 11 (binary: 1011)

Iteration 1:
n = 11 (1011)
n-1 = 10 (1010)
n & (n-1) = 1011 & 1010 = 1010 (removed rightmost 1)
count = 1

Iteration 2:
n = 10 (1010)
n-1 = 9 (1001)
n & (n-1) = 1010 & 1001 = 1000 (removed rightmost 1)
count = 2

Iteration 3:
n = 8 (1000)
n-1 = 7 (0111)
n & (n-1) = 1000 & 0111 = 0000 (removed last 1)
count = 3

n = 0, exit loop
Result: 3
```

### KEY INSIGHT:
Brian Kernighan's algorithm is optimal because it only iterates once per set bit, making it faster for sparse binary numbers (numbers with few 1s).

</details>

class Solution:
    def hammingWeight(self, n: int) -> int:
        """
        Approach: Brian Kernighan's Algorithm
        Time Complexity: O(number of set bits)
        Space Complexity: O(1)
        """
        count = 0
        while n:
            n &= n - 1  # Clear the rightmost set bit
            count += 1
        return count

    def hammingWeightShift(self, n: int) -> int:
        """
        Approach: Bit shifting
        Time Complexity: O(32)
        Space Complexity: O(1)
        """
        count = 0
        while n:
            count += n & 1
            n >>= 1
        return count

    def hammingWeightBuiltin(self, n: int) -> int:
        """
        Approach: Using built-in function
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return bin(n).count('1')


"""
136. Single Number
Easy

Given a non-empty array of integers nums, every element appears twice except for
one. Find that single one.

You must implement a solution with a linear runtime complexity and use only
constant extra space.

Example:
Input: nums = [2,2,1]
Output: 1
"""

class SolutionSingle:
    def singleNumber(self, nums: list[int]) -> int:
        """
        Approach: XOR
        Time Complexity: O(n)
        Space Complexity: O(1)

        XOR properties:
        - a ^ a = 0
        - a ^ 0 = a
        - XOR is commutative and associative
        """
        result = 0
        for num in nums:
            result ^= num
        return result


"""
137. Single Number II
Medium

Given an integer array nums where every element appears three times except for
one, which appears exactly once. Find the single element and return it.

You must implement a solution with a linear runtime complexity and use only
constant extra space.

Example:
Input: nums = [2,2,3,2]
Output: 3
"""

class SolutionSingleII:
    def singleNumber(self, nums: list[int]) -> int:
        """
        Approach: Bit manipulation with state machine
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        ones = 0
        twos = 0

        for num in nums:
            # Update twos with bits that appeared twice
            twos |= ones & num
            # XOR with ones to track bits that appeared once
            ones ^= num
            # Clear bits that appeared three times
            threes = ones & twos
            ones &= ~threes
            twos &= ~threes

        return ones

    def singleNumberGeneral(self, nums: list[int]) -> int:
        """
        General approach: Count bits at each position
        Time Complexity: O(32n) = O(n)
        Space Complexity: O(1)
        """
        result = 0

        for i in range(32):
            bit_sum = 0
            for num in nums:
                bit_sum += (num >> i) & 1

            # If bit count is not divisible by 3, it belongs to single number
            if bit_sum % 3:
                # Handle negative numbers
                if i == 31:
                    result -= (1 << 31)
                else:
                    result |= (1 << i)

        return result


"""
338. Counting Bits
Easy

Given an integer n, return an array ans of length n + 1 such that for each i
(0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Example:
Input: n = 5
Output: [0,1,1,2,1,2]
"""

class SolutionCountBits:
    def countBits(self, n: int) -> list[int]:
        """
        Approach: Dynamic Programming with last set bit
        Time Complexity: O(n)
        Space Complexity: O(1) excluding output
        """
        result = [0] * (n + 1)

        for i in range(1, n + 1):
            # i & (i - 1) removes the last set bit
            # So count[i] = count[i & (i-1)] + 1
            result[i] = result[i & (i - 1)] + 1

        return result

    def countBitsDP(self, n: int) -> list[int]:
        """
        Approach: DP with right shift
        Time Complexity: O(n)
        Space Complexity: O(1) excluding output
        """
        result = [0] * (n + 1)

        for i in range(1, n + 1):
            # i >> 1 is i // 2
            # i & 1 tells if last bit is 1
            result[i] = result[i >> 1] + (i & 1)

        return result


# Test cases
if __name__ == "__main__":
    # Test Hamming Weight
    solution_hamming = Solution()

    print("Number of 1 Bits:")
    test_cases_hamming = [11, 128, 2147483645]
    for n in test_cases_hamming:
        result = solution_hamming.hammingWeight(n)
        print(f"hammingWeight({n}) = {result}, binary: {bin(n)}")

    print("\n" + "="*50 + "\n")

    # Test Single Number
    solution_single = SolutionSingle()

    print("Single Number:")
    test_cases_single = [[2, 2, 1], [4, 1, 2, 1, 2], [1]]
    for nums in test_cases_single:
        result = solution_single.singleNumber(nums)
        print(f"Input: {nums} -> Output: {result}")

    print("\n" + "="*50 + "\n")

    # Test Single Number II
    solution_single2 = SolutionSingleII()

    print("Single Number II:")
    test_cases_single2 = [[2, 2, 3, 2], [0, 1, 0, 1, 0, 1, 99]]
    for nums in test_cases_single2:
        result = solution_single2.singleNumber(nums)
        print(f"Input: {nums} -> Output: {result}")

    print("\n" + "="*50 + "\n")

    # Test Counting Bits
    solution_count = SolutionCountBits()

    print("Counting Bits:")
    test_cases_count = [2, 5, 10]
    for n in test_cases_count:
        result = solution_count.countBits(n)
        print(f"countBits({n}) = {result}")
