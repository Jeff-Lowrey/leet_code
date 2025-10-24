"""
# 0657. Robot Return To Origin

# Difficulty: Easy

Solve the Robot Return To Origin problem as described.

**Example:**
 *
<dl class="example-details">
<dt>Input:</dt>
<dd>```</dd>
<dt>Output:</dt>
<dd>```</dd>
<dt>Explanation:</dt>
<dd>Processing input produces the expected output</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
### METADATA:
**Techniques**: Simulation, Counting
**Data Structures**: String
**Patterns**: Position tracking, Balance checking
**Time Complexity**: **O(n²)**
**Space Complexity**: **O(1)**
 *
### INTUITION:
The key insight is to solve this problem efficiently.
 *
### APPROACH:
We solve this problem by implementing the required algorithm.
 *
### WHY THIS WORKS:
This approach works because it correctly implements the problem requirements.
 *
### EXAMPLE WALKTHROUGH:
Input:
```
example input
```

Output:
```
example output
```

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 *
### SPACE COMPLEXITY:
**O(1)** - Analysis of space complexity
 *
### EDGE CASES:
- Handle empty input
- Handle boundary conditions
 *
</details>
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
