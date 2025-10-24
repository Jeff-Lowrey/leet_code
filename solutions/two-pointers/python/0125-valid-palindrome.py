"""
# 0125. Valid Palindrome

# Difficulty: Easy

A phrase is a palindrome if, after converting all uppercase letters into lowercase
letters and removing all `non-alphanumeric` characters, it reads the same forward
and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "A man, a plan, a canal: Panama"</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>String 'A man, a plan, a canal: Panama' is a valid palindrome</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
**Data Structures**: Hash Set, String, Tree
**Patterns**: Two Pointers Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use two pointers from both ends of the string, skipping non-alphanumeric characters and comparing characters case-insensitively. This avoids creating a cleaned string, saving space.

### APPROACH:
1. **Initialize two pointers**: Set left pointer at start (0) and right pointer at end (len(s) - 1)
2. **Skip non-alphanumeric from left**: Move left pointer forward while current character is not alphanumeric
3. **Skip non-alphanumeric from right**: Move right pointer backward while current character is not alphanumeric
4. **Compare characters**: Convert both characters to lowercase and compare them
5. **Return false if mismatch**: If characters don't match, string is not a palindrome - return False
6. **Move pointers inward**: If characters match, increment left and decrement right pointers
7. **Return true when pointers meet**: If loop completes without finding mismatch, string is a palindrome - return True

### WHY THIS WORKS:
- Two pointers naturally check palindrome property (symmetric comparison)
- Skipping non-alphanumeric characters handles the cleaning requirement
- Case-insensitive comparison handles uppercase/lowercase requirement
- O(1) space since we don't create a new string

### EXAMPLE WALKTHROUGH:
Input:
```
"A man, a plan, a canal: Panama"
```

Step 1: left=0 (A), right=30 (a)

Steps:
Step 1: A.lower() == a.lower() → True, continue
Step 2: left=1 ( ), right=29 (m)
Step 3: Skip space: left=2 (m), right=29 (m)
Step 4: m.lower() == m.lower() → True, continue
Step 5: left=3 (a), right=28 (a)
Step 6: a.lower() == a.lower() → True, continue
Step 7: ... continue until pointers meet ...
Step 8: All comparisons match → return True

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- **Empty string**: Return True (empty is palindrome)
- **Single character**: Return True (single char is palindrome)
- **Only non-alphanumeric**: Return True after filtering
- **Mixed case**: Convert to lowercase for comparison
- **No letters/digits**: Return True (vacuously true)

</details>
"""


class Solution:
    def isPalindrome(self, s: str) -> bool:
        """
        Approach: Two pointers
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        left, right = 0, len(s) - 1

        while left < right:
            # Skip non-alphanumeric characters
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1

            # Compare characters (case-insensitive)
            if s[left].lower() != s[right].lower():
                return False

            left += 1
            right -= 1

        return True

    def isPalindromeSimple(self, s: str) -> bool:
        """
        Approach: Clean string first
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Remove non-alphanumeric and convert to lowercase
        cleaned = "".join(char.lower() for char in s if char.isalnum())

        # Check if palindrome
        return cleaned == cleaned[::-1]


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    s1 = "A man, a plan, a canal: Panama"
    print(f"Input: '{s1}'")
    print(f"Output: {solution.isPalindrome(s1)}")  # True

    # Test case 2
    s2 = "race a car"
    print(f"Input: '{s2}'")
    print(f"Output: {solution.isPalindrome(s2)}")  # False

    # Test case 3
    s3 = " "
    print(f"Input: '{s3}'")
    print(f"Output: {solution.isPalindrome(s3)}")  # True
