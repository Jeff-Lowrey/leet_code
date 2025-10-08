"""
125. Valid Palindrome
Easy

A phrase is a palindrome if, after converting all uppercase letters into lowercase
letters and removing all `non-alphanumeric` characters, it reads the same forward
and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example:
Input: s = "A man, a plan, a canal: Panama"
Output: true
<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use two pointers from both ends of the string, skipping non-alphanumeric characters and comparing characters case-insensitively. This avoids creating a cleaned string, saving space.

### APPROACH (Two Pointers):
1. **Initialize pointers**: left = 0, right = length - 1
2. **Skip invalid characters**: Move pointers inward until alphanumeric characters are found
3. **Compare characters**: Check if characters match (case-insensitive)
4. **Move pointers**: Continue until pointers meet

### WHY THIS WORKS:
- Two pointers naturally check palindrome property (symmetric comparison)
- Skipping non-alphanumeric characters handles the cleaning requirement
- Case-insensitive comparison handles uppercase/lowercase requirement
- O(1) space since we don't create a new string

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### TWO APPROACHES:

#### Approach 1: Two Pointers (Optimal)
```python
while left < right:
    while left < right and not s[left].isalnum():
        left += 1
    while left < right and not s[right].isalnum():
        right -= 1
    if s[left].lower() != s[right].lower():
        return False
    left += 1
    right -= 1
```

#### Approach 2: Clean String First
```python
cleaned = ''.join(char.lower() for char in s if char.isalnum())
return cleaned == cleaned[::-1]
```

### EXAMPLE WALKTHROUGH:
```
Input: "A man, a plan, a canal: Panama"

Step 1: left=0 (A), right=30 (a)
A.lower() == a.lower() → True, continue

Step 2: left=1 ( ), right=29 (m)
Skip space: left=2 (m), right=29 (m)
m.lower() == m.lower() → True, continue

Step 3: left=3 (a), right=28 (a)
a.lower() == a.lower() → True, continue

... continue until pointers meet ...

All comparisons match → return True
```

### KEY INSIGHTS:
- Two pointers technique is perfect for palindrome checking
- In-place character skipping avoids extra space for string cleaning
- Always check bounds (left < right) when skipping characters

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
        cleaned = ''.join(char.lower() for char in s if char.isalnum())

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
