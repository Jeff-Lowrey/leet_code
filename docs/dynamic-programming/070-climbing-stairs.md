# 070 - Climbing Stairs

## Problem Description

You are climbing a staircase with `n` steps. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example:**
```
Input: n = 3
Output: 3
Explanation: There are 3 ways to climb:
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

Input: n = 4
Output: 5
Ways: [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2]
```

## Solution Explanation

### Approach: Dynamic Programming (Fibonacci Pattern)

The key insight is that to reach step `n`, you must come from either step `n-1` (taking 1 step) or step `n-2` (taking 2 steps). Therefore:
- `ways(n) = ways(n-1) + ways(n-2)`

This is actually the Fibonacci sequence!

### Algorithm Steps

1. **Base cases:**
   - 1 step: 1 way
   - 2 steps: 2 ways (1+1 or 2)

2. **Build up solution:**
   - For each step from 3 to n
   - Ways to reach current = ways to reach (current-1) + ways to reach (current-2)

3. **Space optimization:**
   - Only need to track last two values
   - Use two variables instead of array

### Visual Example

```
n = 5

Step 1: 1 way  [1]
Step 2: 2 ways [1,1] or [2]
Step 3: 3 ways [1,1,1], [1,2], [2,1]
Step 4: 5 ways [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2]
Step 5: 8 ways (coming from step 3: 3 ways) + (coming from step 4: 5 ways)

Pattern: 1, 2, 3, 5, 8, 13, 21... (Fibonacci!)
```

### Why This Works

Think of it as a decision tree. At each step, you decide whether to take 1 or 2 steps. The total number of paths to reach step n equals:
- Paths that end with a 1-step (from n-1)
- Plus paths that end with a 2-step (from n-2)

## Complexity Analysis

- **Time Complexity: O(n)**
  - Single pass through numbers 3 to n

- **Space Complexity: O(1)**
  - Only two variables needed (optimized)
  - O(n) if using array to store all values

## Alternative Approaches

### 1. Recursive with Memoization
```python
def climbStairs(n, memo={}):
    if n <= 2: return n
    if n in memo: return memo[n]
    memo[n] = climbStairs(n-1) + climbStairs(n-2)
    return memo[n]
```
**Trade-off:** More intuitive but uses O(n) space for recursion stack

### 2. Matrix Exponentiation
Can compute Fibonacci in O(log n) using matrix multiplication:
```
[F(n+1)]   [1 1]^n   [1]
[F(n)  ] = [1 0]   × [0]
```
**Use case:** When n is very large (10^9)

### 3. Direct Formula (Binet's)
```python
phi = (1 + sqrt(5)) / 2
psi = (1 - sqrt(5)) / 2
return round((phi^n - psi^n) / sqrt(5))
```
**Issue:** Floating point precision for large n

## Key Insights

1. **Recognize the pattern**: Many DP problems are hidden sequences
2. **Start with recursion**: Then optimize to iteration
3. **Space optimization**: Often only need previous few states
4. **Fibonacci appears frequently**: In paths, sequences, tree problems

## Common Variations

- **Min Cost Climbing Stairs**: Each step has a cost
- **Triple Step**: Can take 1, 2, or 3 steps
- **K Steps**: Can take 1 to K steps
- **Even/Odd Constraints**: Different rules for even/odd positions
- **Decode Ways**: Similar pattern with string decoding

## Interview Tips

1. **Start with small examples**: n=1, 2, 3 to find pattern
2. **Draw the recursion tree**: Shows overlapping subproblems
3. **Mention space optimization**: Shows attention to detail
4. **Relate to Fibonacci**: Shows pattern recognition
5. **Discuss time/space tradeoffs**: Recursion vs iteration

## Problem Extensions

```python
# Variation 1: Can take 1, 2, or 3 steps
def climbStairs3(n):
    if n <= 2: return n
    if n == 3: return 4
    a, b, c = 1, 2, 4
    for i in range(4, n + 1):
        a, b, c = b, c, a + b + c
    return c

# Variation 2: Min cost to reach top
def minCostClimbing(cost):
    a = b = 0
    for c in cost:
        a, b = b, min(a, b) + c
    return min(a, b)
```

## Real-World Applications

1. **Path counting**: Number of ways to traverse a grid
2. **Decision trees**: Counting valid decision sequences
3. **State machines**: Number of valid state transitions
4. **Combination problems**: When order matters
