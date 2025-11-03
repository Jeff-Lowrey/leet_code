"""
### INTUITION:
The key insight is that for a robot to return to origin, the number of up moves must equal down moves AND the number of left moves must equal right moves. Instead of simulating the actual position, we can simply count the moves and check if they balance out.

### APPROACH:
1. **Count matching pairs**: For the robot to return to origin, every U must be canceled by a D, and every L by an R
2. **Use string counting**: Python's count() method efficiently counts occurrences of each move type
3. **Check balance**: Return true only if count('U') == count('D') AND count('L') == count('R')
4. **Alternative simulation**: Can also explicitly track x,y coordinates and check if both return to 0

### WHY THIS WORKS:
- This ensures that the robot's net displacement in both x and y directions is zero
- Counting is more efficient than simulation because we don't need to track intermediate positions
- The robot can only return to origin if moves are perfectly balanced in both dimensions
- Since moves are independent in x and y directions, we can check them separately

### EXAMPLE WALKTHROUGH:
Input:
```
moves = "UDLR"
```

Execution:
1. Count U moves: 1
2. Count D moves: 1
3. Count L moves: 1
4. Count R moves: 1
5. Check: U == D (1 == 1) ✓
6. Check: L == R (1 == 1) ✓
7. Both balanced, return true

Output:
```
true
```

### TIME COMPLEXITY:
**O(n)** where n is the length of the moves string. Each count() operation scans the string once, and we perform 4 count operations, giving us **O(4n)** = **O(n)**.

### SPACE COMPLEXITY:
**O(1)** - We use constant extra space regardless of input size. The count() method doesn't allocate any additional data structures; it scans the string and returns an integer count. Our function only stores these four integer counts plus the boolean return value, giving us **O(1)** space complexity. The input string itself is not counted toward space complexity as it's provided as input.

### EDGE CASES:
- **Empty string**: Returns true (robot doesn't move, stays at origin)
- **Single move**: Returns false (can't balance with just one move)
- **All same direction**: Returns false (e.g., "UUU" moves away from origin)
- **Interleaved moves**: Order doesn't matter, only counts (e.g., "UDUD" and "UUDD" both return true)

"""


def judgeCircle(moves: str) -> bool:
    """Check if robot returns to origin after all moves."""
    return moves.count('U') == moves.count('D') and moves.count('L') == moves.count('R')


def judgeCircleSimulation(moves: str) -> bool:
    """Alternative solution using explicit position tracking."""
    x, y = 0, 0
    for move in moves:
        if move == 'U':
            y += 1
        elif move == 'D':
            y -= 1
        elif move == 'L':
            x -= 1
        elif move == 'R':
            x += 1
    return x == 0 and y == 0


if __name__ == "__main__":
    test_cases = [
        ("UD", True),
        ("LL", False),
        ("RRDD", False),
        ("LDRRLRUULR", False),
        ("UDLR", True),
    ]

    print("Testing judgeCircle:")
    for moves, expected in test_cases:
        result = judgeCircle(moves)
        status = "✓" if result == expected else "✗"
        print(f"{status} judgeCircle(\"{moves}\") = result, expected = expected")
