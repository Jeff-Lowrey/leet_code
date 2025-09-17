# 001 - Two Sum

## Problem Description

Given an array of integers `nums` and an integer `target`, you need to find two numbers in the array that add up to the target. Return the indices of these two numbers.

**Example:**
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
```

## Solution Explanation

### Approach: Hash Map for Complement Lookup

The key insight is that for each number, we need to find its complement (target - number) in the array. Instead of searching for the complement with a nested loop (O(n²)), we can use a hash map to store numbers we've seen and check for complements in O(1) time.

### Algorithm Steps

1. **Initialize an empty hash map** to store values and their indices
2. **Iterate through the array** once
3. For each number:
   - Calculate the complement: `complement = target - current_number`
   - Check if the complement exists in our hash map
   - If yes: We found our pair! Return the indices
   - If no: Store the current number and its index in the hash map
4. Continue until we find a pair

### Visual Example

```
Target = 9
Array: [2, 7, 11, 15]

Step 1: num = 2
- Complement = 9 - 2 = 7
- Hash map is empty, 7 not found
- Add to hash map: {2: 0}

Step 2: num = 7
- Complement = 9 - 7 = 2
- 2 exists in hash map at index 0!
- Return [0, 1]
```

### Why This Works

The hash map serves as a "memory" of all numbers we've seen so far. When we encounter a number whose complement we've already seen, we know we've found a valid pair.

## Complexity Analysis

- **Time Complexity: O(n)**
  - We traverse the array only once
  - Hash map operations (insert and lookup) are O(1) on average

- **Space Complexity: O(n)**
  - In the worst case, we might store almost all elements in the hash map
  - This happens when the solution is the last two elements

## Alternative Approaches

### 1. Brute Force (O(n²))
Check every pair of numbers:
```python
for i in range(n):
    for j in range(i + 1, n):
        if nums[i] + nums[j] == target:
            return [i, j]
```
**Drawback:** Too slow for large arrays

### 2. Sorting + Two Pointers (O(n log n))
Sort the array and use two pointers from both ends:
```python
# Sort array (keeping track of original indices)
# Use two pointers to find the sum
```
**Drawback:** Sorting changes indices, requiring extra bookkeeping

## Key Takeaways

1. **Hash maps are powerful** for reducing nested loops to single passes
2. **Think about complements** - what do I need to find for each element?
3. **Trade space for time** - O(n) space is often worth O(n) time improvement
4. **One-pass solutions** are often possible with clever data structure usage

## Common Variations

- **Two Sum II**: Input array is sorted (use two pointers)
- **Three Sum**: Find three numbers that sum to target (sort + two pointers)
- **Two Sum - Data Structure Design**: Design a class that supports add and find operations
- **K-Sum**: Generalized version for k numbers

## Interview Tips

1. **Clarify constraints**: Can the same element be used twice? Is there exactly one solution?
2. **Start with brute force**: Show you can think of a simple solution
3. **Optimize step by step**: Explain how hash map reduces complexity
4. **Handle edge cases**: Empty array, no solution found
5. **Code cleanly**: Use descriptive variable names like `complement` instead of `diff`
