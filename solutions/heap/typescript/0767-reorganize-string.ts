/**
 * # Difficulty: Medium
 *
 * # 767. Reorganize String
 *
 * Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.
 *
 * Return any possible rearrangement of s or return "" if not possible.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"aab"</dd>
 * <dt>Output:</dt>
 * <dd>"aba" (reorganized string)</dd>
 * <dt>Explanation:</dt>
 * <dd>Reorganized string 'aab' becomes 'aba' (no two adjacent same)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use max heap to track character frequencies. Greedily pick most frequent character, add to result, decrease count, and temporarily hold it. Add back to heap after one position to ensure no adjacent duplicates.
 *
 * ### APPROACH:
 * 1. **Count frequencies**: Use Counter(s) to get character frequencies
 * 2. **Check feasibility**: If max_freq > (len(s) + 1) // 2, return empty string
 * 3. **Build max heap**: Push (-freq, char) to heap for all characters
 * 4. **Initialize result**: Set result = [], prev_char = None, prev_freq = 0
 * 5. **Build string**: While heap not empty, pop (freq, char)
 * 6. **Add to result**: Append char to result
 * 7. **Push previous back**: If prev_freq < 0, push (prev_freq, prev_char) to heap
 * 8. **Update previous**: Set prev_char = char, prev_freq = freq + 1, return ''.join(result)
 *
 * ### WHY THIS WORKS:
 * - Max heap by frequency: greedily place most frequent chars first
 * - Always pick most frequent available char (not same as previous)
 * - After placing char, decrement count and put back if count > 0
 * - If can't place without adjacent duplicates, impossible (return "")
 * - O(n log k) time: k unique chars, n total chars, O(k) space for heap
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "aab"
 * ```
 *
 * Step 1: Count character frequencies
 * freq = {'a': 2, 'b': 1}
 * Step 2: Build max heap (using negative frequencies)
 * heap = [(-2, 'a'), (-1, 'b')]
 * Step 3: Rearrange characters
 * Pick 'a': result = "a", heap = [(-1, 'b'), (-1, 'a')]
 * Pick 'b': result = "ab", heap = [(-1, 'a')]
 * Pick 'a': result = "aba"
 *
 * Output:
 * ```
 * "aba" (reorganized string)
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class MaxHeap<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  push(val: T): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return top;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parentIndex]) <= 0) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      let largest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < this.heap.length && this.compare(this.heap[left], this.heap[largest]) > 0) {
        largest = left;
      }
      if (right < this.heap.length && this.compare(this.heap[right], this.heap[largest]) > 0) {
        largest = right;
      }
      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
      index = largest;
    }
  }
}

class Solution {
  reorganizeString(s: string): string {
    if (!s) return "";

    const charCount = new Map<string, number>();
    for (const char of s) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    const maxCount = Math.max(...charCount.values());
    if (maxCount > Math.floor((s.length + 1) / 2)) {
      return "";
    }

    const heap = new MaxHeap<[number, string]>((a, b) => a[0] - b[0]);
    for (const [char, count] of charCount) {
      heap.push([count, char]);
    }

    const result: string[] = [];

    while (heap.size() >= 2) {
      const [count1, char1] = heap.pop()!;
      const [count2, char2] = heap.pop()!;

      result.push(char1, char2);

      if (count1 - 1 > 0) {
        heap.push([count1 - 1, char1]);
      }
      if (count2 - 1 > 0) {
        heap.push([count2 - 1, char2]);
      }
    }

    if (heap.size() > 0) {
      const [count, char] = heap.pop()!;
      if (count > 1) return "";
      result.push(char);
    }

    return result.join("");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.reorganizeString("aab");
  const valid1 = result1.length === 3 && !/(.)\1/.test(result1);
  console.log(`Test 1: ${valid1 ? "PASS" : "FAIL"}`);

  const result2 = solution.reorganizeString("aaab");
  console.log(`Test 2: ${result2 === "" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
