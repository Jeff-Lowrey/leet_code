# Language-Specific Examples and Use Cases

[← Previous: Language Selection](09-language-selection.md) | [🏠 Home](README.md)

---

## Table of Contents

- [Language Characteristics](#language-characteristics)
- [Problem-Specific Language Recommendations](#problem-specific-language-recommendations)
- [Side-by-Side Examples](#side-by-side-examples)
- [Language-Specific Features](#language-specific-features)
- [Performance Considerations](#performance-considerations)
- [Interview Context](#interview-context)

## Language Characteristics

### Python
**Philosophy**: "There should be one-- and preferably only one --obvious way to do it."

**Strengths:**
- Extremely readable and maintainable code
- Rich standard library with powerful data structures
- Dynamic typing allows rapid prototyping
- List comprehensions and generator expressions
- Duck typing and protocol-oriented design

**Best Use Cases:**
```python
# Hash maps and sets
seen = {}
unique = set(nums)

# List comprehensions
squares = [x**2 for x in range(10)]

# Multiple return values
def min_max(arr):
    return min(arr), max(arr)

# Slicing
reversed_str = s[::-1]
```

**When to Choose:**
- Learning algorithms for the first time
- Interview prep where pseudocode clarity matters
- Problems involving heavy data structure manipulation
- Quick prototyping and testing ideas

### JavaScript
**Philosophy**: "Write once, run anywhere" (in the browser context)

**Strengths:**
- Ubiquitous in web development
- Powerful array methods (map, filter, reduce)
- First-class functions and closures
- Async/await for concurrent operations
- JSON native support

**Best Use Cases:**
```javascript
// Array methods
const doubled = nums.map(x => x * 2);
const evens = nums.filter(x => x % 2 === 0);
const sum = nums.reduce((acc, x) => acc + x, 0);

// Destructuring
const [first, ...rest] = array;
const {name, age} = person;

// Arrow functions
const squares = arr.map(x => x * x);

// Spread operator
const combined = [...arr1, ...arr2];
```

**When to Choose:**
- Web developer learning algorithms
- Problems involving arrays and objects
- Asynchronous problem scenarios
- Front-end interview preparation

### TypeScript
**Philosophy**: "JavaScript that scales"

**Strengths:**
- Static type checking catches errors early
- Excellent IDE support and autocomplete
- Interfaces and type aliases for complex data
- Generics for reusable code
- All JavaScript features plus types

**Best Use Cases:**
```typescript
// Type safety
function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>();
    // ...
}

// Interfaces
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

// Generics
function reverse<T>(arr: T[]): T[] {
    return arr.slice().reverse();
}

// Type guards
function isString(val: unknown): val is string {
    return typeof val === 'string';
}
```

**When to Choose:**
- Large codebases requiring type safety
- When IDE support and refactoring tools matter
- Complex data structure problems
- TypeScript-focused interview preparation

### Java
**Philosophy**: "Write once, run anywhere" (JVM context)

**Strengths:**
- Strong static typing prevents many errors
- Mature collections framework
- Object-oriented design patterns
- Industry-standard in enterprise
- Excellent tooling and ecosystem

**Best Use Cases:**
```java
// Collections framework
Map<Integer, Integer> map = new HashMap<>();
List<Integer> list = new ArrayList<>();
Set<Integer> set = new HashSet<>();
PriorityQueue<Integer> pq = new PriorityQueue<>();

// Streams API
int sum = nums.stream()
    .filter(x -> x > 0)
    .mapToInt(Integer::intValue)
    .sum();

// Class design
class LRUCache {
    private Map<Integer, Node> cache;
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new LinkedHashMap<>();
    }
}
```

**When to Choose:**
- Corporate/enterprise interviews (Google, Amazon, etc.)
- Object-oriented design problems
- Problems requiring class design
- Android development context

### C++
**Philosophy**: "Zero-overhead principle" - you don't pay for what you don't use

**Strengths:**
- Maximum performance and control
- STL (Standard Template Library) is powerful
- Memory management control
- Template metaprogramming
- Used in competitive programming

**Best Use Cases:**
```cpp
// STL containers
unordered_map<int, int> map;
vector<int> vec;
set<int> set;
priority_queue<int> pq;

// Iterators
for (auto it = vec.begin(); it != vec.end(); ++it) {
    // ...
}

// Range-based for (C++11+)
for (const auto& num : nums) {
    // ...
}

// Lambda functions
sort(vec.begin(), vec.end(),
     [](int a, int b) { return a > b; });

// Move semantics
vector<int> v2 = std::move(v1);
```

**When to Choose:**
- Performance-critical problems
- Systems programming interviews
- Competitive programming
- Low-level memory management problems
- When you need fine-grained control

### Go
**Philosophy**: "Simplicity is complicated"

**Strengths:**
- Simple, clean syntax
- Built-in concurrency (goroutines, channels)
- Fast compilation
- Garbage collected but efficient
- Great for concurrent problems

**Best Use Cases:**
```go
// Built-in map
seen := make(map[int]int)

// Slices
nums := []int{1, 2, 3, 4, 5}
nums = append(nums, 6)

// Multiple return values
func divMod(a, b int) (int, int) {
    return a / b, a % b
}

// Error handling
result, err := someFunction()
if err != nil {
    return nil, err
}

// Goroutines (concurrency)
go processInBackground()
```

**When to Choose:**
- Concurrent algorithm problems
- Modern systems programming
- Cloud/microservices context
- When simplicity and readability matter
- Learning goroutines and channels

### Rust
**Philosophy**: "Safety without garbage collection"

**Strengths:**
- Memory safety guaranteed at compile time
- No null pointer exceptions
- Zero-cost abstractions
- Ownership system prevents data races
- Growing in systems programming

**Best Use Cases:**
```rust
// Ownership system
let v = vec![1, 2, 3];
// v moved here, can't use old binding

// Pattern matching
match option {
    Some(x) => println!("{}", x),
    None => println!("None"),
}

// Error handling with Result
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}

// Iterators
let doubled: Vec<i32> = nums.iter()
    .map(|&x| x * 2)
    .collect();
```

**When to Choose:**
- Systems programming with safety
- Learning modern systems language
- Problems requiring memory safety
- Concurrent programming without data races
- Performance + safety required

## Problem-Specific Language Recommendations

### Array and String Problems
**Best Choice: Python or JavaScript**
- Both have excellent built-in methods
- Python: slicing, list comprehensions
- JavaScript: map/filter/reduce

```python
# Python - Array manipulation
reversed = arr[::-1]
doubled = [x * 2 for x in arr]
filtered = [x for x in arr if x > 0]
```

```javascript
// JavaScript - Array methods
const reversed = arr.slice().reverse();
const doubled = arr.map(x => x * 2);
const filtered = arr.filter(x => x > 0);
```

### Tree and Graph Problems
**Best Choice: Python or Java**
- Python: Clean recursive syntax
- Java: Strong OOP for node classes

```python
# Python - Clean recursion
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)
```

```java
// Java - OOP design
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
```

### Dynamic Programming
**Best Choice: Python or C++**
- Python: Clean tabulation/memoization
- C++: Performance for large inputs

```python
# Python - Memoization with decorator
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```

```cpp
// C++ - Performance-optimized DP
vector<int> dp(n + 1);
dp[0] = dp[1] = 1;
for (int i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}
```

### Design Problems (OOP)
**Best Choice: Java or C++**
- Strong class design and encapsulation
- Interface/abstract class support

```java
// Java - LRU Cache design
class LRUCache {
    private LinkedHashMap<Integer, Integer> cache;
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry eldest) {
                return size() > capacity;
            }
        };
    }
}
```

### Concurrent Problems
**Best Choice: Go or Rust**
- Go: Easy concurrency with goroutines
- Rust: Safe concurrency

```go
// Go - Concurrent processing
func process(nums []int) []int {
    results := make(chan int, len(nums))
    for _, num := range nums {
        go func(n int) {
            results <- compute(n)
        }(num)
    }
    // Collect results...
}
```

### Performance-Critical Problems
**Best Choice: C++ or Rust**
- Maximum performance
- Fine-grained control

```cpp
// C++ - Optimized with reserve
vector<int> result;
result.reserve(n); // Pre-allocate
for (int i = 0; i < n; i++) {
    result.push_back(compute(i));
}
```

## Side-by-Side Examples

### Example: Valid Parentheses

**Python** (Most Concise):
```python
def isValid(s: str) -> bool:
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}

    for char in s:
        if char in pairs:
            stack.append(char)
        elif not stack or pairs[stack.pop()] != char:
            return False

    return not stack
```

**JavaScript** (Functional Style):
```javascript
function isValid(s) {
    const stack = [];
    const pairs = {'(': ')', '[': ']', '{': '}'};

    for (const char of s) {
        if (pairs[char]) {
            stack.push(char);
        } else if (stack.length === 0 || pairs[stack.pop()] !== char) {
            return false;
        }
    }

    return stack.length === 0;
}
```

**Java** (Type-Safe):
```java
public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> pairs = new HashMap<>();
    pairs.put('(', ')');
    pairs.put('[', ']');
    pairs.put('{', '}');

    for (char c : s.toCharArray()) {
        if (pairs.containsKey(c)) {
            stack.push(c);
        } else if (stack.isEmpty() || pairs.get(stack.pop()) != c) {
            return false;
        }
    }

    return stack.isEmpty();
}
```

**C++** (Performance):
```cpp
bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> pairs = {
        {'(', ')'}, {'[', ']'}, {'{', '}'}
    };

    for (char c : s) {
        if (pairs.count(c)) {
            st.push(c);
        } else if (st.empty() || pairs[st.top()] != c) {
            return false;
        } else {
            st.pop();
        }
    }

    return st.empty();
}
```

## Language-Specific Features

### Python Unique Features
```python
# List/Dict/Set comprehensions
squares = {x: x**2 for x in range(10)}

# Multiple assignment
a, b = b, a  # Swap

# enumerate and zip
for i, val in enumerate(arr):
    print(f"{i}: {val}")

for a, b in zip(arr1, arr2):
    print(a, b)

# Default dict
from collections import defaultdict
count = defaultdict(int)
```

### JavaScript Unique Features
```javascript
// Destructuring
const {first, last, ...rest} = object;

// Optional chaining
const value = obj?.prop?.nestedProp;

// Nullish coalescing
const result = value ?? defaultValue;

// Template literals
const message = `Value is ${x}`;

// Promise/async-await
const data = await fetchData();
```

### Java Unique Features
```java
// Streams
List<Integer> evens = list.stream()
    .filter(x -> x % 2 == 0)
    .collect(Collectors.toList());

// Optional
Optional<String> opt = Optional.ofNullable(str);
String result = opt.orElse("default");

// Try-with-resources
try (Scanner sc = new Scanner(file)) {
    // Auto-close
}
```

### C++ Unique Features
```cpp
// Smart pointers
auto ptr = make_unique<TreeNode>(5);
shared_ptr<TreeNode> shared = make_shared<TreeNode>(10);

// Template metaprogramming
template<typename T>
T max(T a, T b) {
    return a > b ? a : b;
}

// Move semantics
vector<int> v2 = move(v1);

// std::optional (C++17)
optional<int> opt = findValue(key);
if (opt.has_value()) {
    cout << opt.value();
}
```

## Performance Considerations

### Benchmark Comparison (Two Sum - 10,000 elements)

| Language   | Time (ms) | Memory (MB) | Notes |
|------------|-----------|-------------|-------|
| C++        | 2-3       | 8           | Fastest |
| Rust       | 2-3       | 8           | Safe + Fast |
| Go         | 3-5       | 10          | Good balance |
| Java       | 5-8       | 25          | JVM overhead |
| JavaScript | 15-20     | 30          | V8 optimized |
| Python     | 20-30     | 40          | Interpreted |
| TypeScript | 15-20     | 30          | Compiles to JS |

**Note**: Performance varies by problem type. These are approximate ranges.

## Interview Context

### By Company Type

**FAANG/Big Tech:**
- **Preferred**: Python (coding speed), Java (for Android/backend roles)
- **Acceptable**: C++, JavaScript, Go
- **Focus**: Algorithm correctness over language choice

**Systems/Low-Level:**
- **Preferred**: C++, Rust
- **Acceptable**: Go
- **Focus**: Memory management, performance

**Startups/Web:**
- **Preferred**: JavaScript/TypeScript, Python, Go
- **Focus**: Practical problem-solving, modern stack

**Finance/Trading:**
- **Preferred**: C++, Java
- **Focus**: Performance, reliability

### Language Selection Strategy

1. **Know the Company**: Research their tech stack
2. **Play to Strengths**: Use language you're most comfortable with
3. **Consider the Problem**: Some problems favor certain languages
4. **Communication**: Choose language you can explain clearly
5. **Consistency**: Stick with one language during interview

**Interview Tips:**
- Python: Great for showing clear thinking
- Java: Shows enterprise readiness
- C++: Demonstrates technical depth
- JavaScript: Good for web-focused roles
- Go: Shows modern systems knowledge

---

[← Previous: Language Selection](09-language-selection.md) | [🏠 Home](README.md)
