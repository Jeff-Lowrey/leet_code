# 003 - Longest Substring Without Repeating Characters

## Problem Description

Given a string `s`, find the length of the longest substring without repeating characters. A substring is a contiguous sequence of characters within the string.

**Example:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with length of 3.

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with length of 1.
```

## Solution Explanation

### Approach: Sliding Window with Hash Map

The key insight is to use a sliding window that expands when we encounter new characters and contracts when we find duplicates. A hash map tracks the most recent position of each character.

### Algorithm Steps

1. **Initialize variables:**
   - Hash map to store character positions
   - Left pointer for window start
   - Max length variable

2. **Expand window with right pointer:**
   - For each character, check if it's in current window
   - If duplicate found, move left pointer past the duplicate
   - Update character position in hash map
   - Calculate and update max length

3. **Return maximum length found**

### Visual Example

```
String: "abcabcbb"

Step 1: "a" -> length 1
        ^
Step 2: "ab" -> length 2
        ^^
Step 3: "abc" -> length 3
        ^^^
Step 4: "a" found again at index 3
        Move left pointer past first 'a'
        "bca" -> length 3
         ^^^
Step 5: "b" found again at index 4
        Move left pointer past first 'b'
        "cab" -> length 3
          ^^^
Continue...

Maximum length: 3
```

### Why This Works

The sliding window maintains the invariant that all characters within it are unique. When we find a duplicate, we shrink the window from the left until the duplicate is removed, ensuring we always have a valid substring.

## Complexity Analysis

- **Time Complexity: O(n)**
  - Each character is visited at most twice (once by right pointer, once by left)
  - Hash map operations are O(1)

- **Space Complexity: O(min(m, n))**
  - Where m is the size of the character set
  - In worst case, all characters are unique

## Alternative Approaches

### 1. Sliding Window with Set
Instead of tracking positions, use a set and remove characters from left:
```python
while s[right] in char_set:
    char_set.remove(s[left])
    left += 1
```
**Trade-off:** Simpler but may need more iterations

### 2. Brute Force
Check all possible substrings:
```python
for i in range(n):
    for j in range(i+1, n+1):
        if len(set(s[i:j])) == j-i:
            max_len = max(max_len, j-i)
```
**Time:** O(n³) - Too slow for large inputs

## Key Insights

1. **Sliding window** is perfect for substring/subarray problems
2. **Hash map** provides O(1) lookup for character positions
3. **Two pointers** avoid redundant checks
4. **Optimize by jumping** - when duplicate found, jump directly past it

## Common Variations

- **K Distinct Characters**: Find longest with at most K distinct characters
- **All Unique Substrings**: Count total number of unique substrings
- **Minimum Window**: Find smallest window containing all characters
- **Repeating Character Replacement**: With K replacements allowed

## Interview Tips

1. **Start simple**: Mention brute force, then optimize
2. **Draw the window**: Visualize the sliding window movement
3. **Handle edge cases**: Empty string, single character, all same characters
4. **Optimize jumps**: Explain why we can jump past duplicates
5. **Consider character set**: ASCII (128) vs Unicode affects space complexity

## Code Optimization Tips

```python
# Optimization 1: Jump directly to position after duplicate
if s[right] in char_map and char_map[s[right]] >= left:
    left = char_map[s[right]] + 1

# Optimization 2: Early termination
if right - left + 1 == len(set(s)):
    return right - left + 1  # Found maximum possible
```
