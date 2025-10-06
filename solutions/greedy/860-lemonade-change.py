"""
# 860. Lemonade Change
**Easy**

At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.

Note that you do not have any change in hand at first.

Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide the correct change to every customer, or false otherwise.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a greedy problem about making change optimally. We need to track our cash inventory and make change using the fewest bills possible. The key insight is to always use larger bills first when making change.

### APPROACH:
1. **Track inventory**: Keep count of $5 and $10 bills
2. **Process each customer**: Handle payment based on bill amount
3. **Make change greedily**: Use largest bills first for optimal change-making
4. **Check feasibility**: Return false if we can't make proper change

### WHY GREEDY WORKS:
- $5 bills are most versatile (needed for all change scenarios)
- $10 bills can only be used for $20 change
- Using $10s first for $20 change preserves more flexible $5 bills
- This greedy strategy maximizes our ability to handle future customers

### TIME COMPLEXITY: O(n)
Process each customer once

### SPACE COMPLEXITY: O(1)
Only tracking counts of two bill denominations

### EXAMPLE WALKTHROUGH:
```
Input: [5,5,5,10,20]
Step 1: 5 → count_5=1, count_10=0 ✓
Step 2: 5 → count_5=2, count_10=0 ✓
Step 3: 5 → count_5=3, count_10=0 ✓
Step 4: 10 → need $5 change → count_5=2, count_10=1 ✓
Step 5: 20 → need $15 change → use 1×$10 + 1×$5 → count_5=1, count_10=0 ✓
Output: True
```

### CHANGE STRATEGIES:
- **$5 payment**: No change needed, add to inventory
- **$10 payment**: Give 1×$5 change
- **$20 payment**: Give 1×$10 + 1×$5 OR 3×$5 (prefer first)

### EDGE CASES:
- Not enough $5 bills for $10 payment
- Not enough change combinations for $20 payment
- Empty input (return True)

</details>
"""

class Solution:
    def lemonadeChange(self, bills: list[int]) -> bool:
        """
        Determine if we can provide correct change to all customers.

        Args:
            bills: List of bill amounts from customers in order

        Returns:
            True if we can provide change to all customers, False otherwise

        Time Complexity: O(n) - process each customer once
        Space Complexity: O(1) - only track two bill counts
        """
        count_5 = 0  # Count of $5 bills
        count_10 = 0  # Count of $10 bills
        # Note: We don't need to track $20 bills as they're never used for change

        for bill in bills:
            if bill == 5:
                # No change needed, just add to inventory
                count_5 += 1
            elif bill == 10:
                # Need to give $5 change
                if count_5 > 0:
                    count_5 -= 1
                    count_10 += 1
                else:
                    return False  # Cannot make change
            else:  # bill == 20
                # Need to give $15 change
                # Prefer: 1×$10 + 1×$5 over 3×$5 (greedy choice)
                if count_10 > 0 and count_5 > 0:
                    count_10 -= 1
                    count_5 -= 1
                elif count_5 >= 3:
                    count_5 -= 3
                else:
                    return False  # Cannot make change

        return True

    def lemonadeChangeVerbose(self, bills: list[int]) -> bool:
        """
        Alternative verbose implementation with detailed tracking.

        Args:
            bills: List of bill amounts from customers

        Returns:
            True if we can provide change to all customers, False otherwise
        """
        inventory = {5: 0, 10: 0, 20: 0}

        for bill in bills:
            # Add current bill to inventory
            inventory[bill] += 1

            # Calculate required change
            change_needed = bill - 5

            if change_needed == 0:
                continue  # No change needed

            # Make change greedily (largest bills first)
            remaining_change = change_needed

            # Use $10 bills first for change
            if remaining_change >= 10 and inventory[10] > 0:
                tens_to_use = min(inventory[10], remaining_change // 10)
                inventory[10] -= tens_to_use
                remaining_change -= tens_to_use * 10

            # Use $5 bills for remaining change
            if remaining_change >= 5:
                fives_needed = remaining_change // 5
                if inventory[5] >= fives_needed:
                    inventory[5] -= fives_needed
                    remaining_change -= fives_needed * 5
                else:
                    return False  # Cannot make change

            # Check if we made exact change
            if remaining_change > 0:
                return False

        return True


def test_solution():
    """Test cases for Problem 860."""
    solution = Solution()

    # Test case 1: Can make all change
    result1 = solution.lemonadeChange([5,5,5,10,20])
    expected1 = True
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Cannot make change for $10
    result2 = solution.lemonadeChange([5,5,10,10,20])
    expected2 = False
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: All $5 bills
    result3 = solution.lemonadeChange([5,5,5,5])
    expected3 = True
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Immediate failure
    result4 = solution.lemonadeChange([10,10])
    expected4 = False
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Complex scenario
    result5 = solution.lemonadeChange([5,5,10,20,5,5,5,5,5,5,5,5,5,10,5,5,20,5,20,5])
    expected5 = True
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Empty input
    result6 = solution.lemonadeChange([])
    expected6 = True
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test verbose implementation
    result7 = solution.lemonadeChangeVerbose([5,5,5,10,20])
    expected7 = True
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 860. Lemonade Change ===")
    print(f"lemonadeChange([5,5,5,10,20]) -> {solution.lemonadeChange([5,5,5,10,20])}")
    print(f"lemonadeChange([5,5,10,10,20]) -> {solution.lemonadeChange([5,5,10,10,20])}")
    print(f"lemonadeChange([10,10]) -> {solution.lemonadeChange([10,10])}")
