"""
3. Longest Substring Without Repeating Characters
Medium

Given a string s, find the length of the longest substring without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use sliding window technique with a hash map to track character positions. When we encounter a duplicate character, jump the left pointer to skip the duplicate rather than moving it one by one.

### APPROACH (Sliding Window with Hash Map):
1. **Expand window**: Move right pointer and add characters to hash map
2. **When duplicate found**: Move left pointer to position after the previous occurrence of the duplicate character
3. **Track maximum**: Update max_length at each step
4. **Key optimization**: Jump left pointer directly instead of incremental movement

### WHY THIS WORKS:
- Sliding window maintains a valid substring without duplicates
- Hash map provides O(1) lookup for character positions
- Jumping left pointer ensures we skip all intermediate duplicates efficiently
- We only need to track the latest position of each character

### TIME COMPLEXITY: O(n) - each character visited at most twice
### SPACE COMPLEXITY: O(min(n, m)) where m is charset size

### TWO APPROACHES:

#### Approach 1: Hash Map with Position Jump (Optimal)
```python
if s[right] in char_map and char_map[s[right]] >= left:
    left = char_map[s[right]] + 1  # Jump past duplicate
```

#### Approach 2: Set with Incremental Shrinking
```python
while s[right] in char_set:
    char_set.remove(s[left])
    left += 1  # Move left incrementally
```

### EXAMPLE WALKTHROUGH (Hash Map Approach):
```
Input: s = "abcabcbb"

Step 1: right=0, s[0]='a'
char_map = {'a': 0}, left=0, max_length=1

Step 2: right=1, s[1]='b'
char_map = {'a': 0, 'b': 1}, left=0, max_length=2

Step 3: right=2, s[2]='c'
char_map = {'a': 0, 'b': 1, 'c': 2}, left=0, max_length=3

Step 4: right=3, s[3]='a' (duplicate!)
'a' in char_map and char_map['a']=0 >= left=0
left = 0 + 1 = 1
char_map = {'a': 3, 'b': 1, 'c': 2}, max_length=3
Current window: "bca"

Step 5: right=4, s[4]='b' (duplicate!)
'b' in char_map and char_map['b']=1 >= left=1
left = 1 + 1 = 2
char_map = {'a': 3, 'b': 4, 'c': 2}, max_length=3
Current window: "cab"

... continues similarly

Max length found: 3 (substring "abc")
```

### KEY INSIGHTS:
- Hash map approach is optimal because it jumps directly past duplicates
- Must check `char_map[s[right]] >= left` to ensure duplicate is in current window
- Set approach is simpler but potentially slower (O(2n) vs O(n))
- The window [left, right] always contains unique characters

</details>

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        """
        Approach: Sliding Window with Hash Map
        Time Complexity: O(n)
        Space Complexity: O(min(n, m)) where m is size of charset
        """
        char_map = {}
        max_length = 0
        left = 0

        for right in range(len(s)):
            # If character is seen and is within current window
            if s[right] in char_map and char_map[s[right]] >= left:
                # Move left pointer to skip the duplicate
                left = char_map[s[right]] + 1

            # Update character's latest position
            char_map[s[right]] = right

            # Update max length
            max_length = max(max_length, right - left + 1)

        return max_length

    def lengthOfLongestSubstringSet(self, s: str) -> int:
        """
        Approach: Sliding Window with Set
        Time Complexity: O(2n) = O(n)
        Space Complexity: O(min(n, m))
        """
        char_set = set()
        max_length = 0
        left = 0

        for right in range(len(s)):
            # Remove characters from left until no duplicate
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1

            char_set.add(s[right])
            max_length = max(max_length, right - left + 1)

        return max_length


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    s1 = "abcabcbb"
    print(f"Input: '{s1}'")
    print(f"Output: {solution.lengthOfLongestSubstring(s1)}")  # 3

    # Test case 2
    s2 = "bbbbb"
    print(f"Input: '{s2}'")
    print(f"Output: {solution.lengthOfLongestSubstring(s2)}")  # 1

    # Test case 3
    s3 = "pwwkew"
    print(f"Input: '{s3}'")
    print(f"Output: {solution.lengthOfLongestSubstring(s3)}")  # 3
