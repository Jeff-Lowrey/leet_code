/**
 * 676. Magic
 * Medium
 *
 * Magic Dictionary Implementation This class implements a dictionary that supports adding words and searching for words with exactly one character different from the search word.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Magic is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Magic Dictionary Implementation
 * 
 * This class implements a dictionary that supports adding words and searching
 * for words with exactly one character different from the search word.
 */
class MagicDictionary {
    /**
     * Initialize your data structure here.
     */
    constructor() {
        this.dictionary = new Set();
    }
    
    /**
     * Builds a dictionary through an array of strings.
     * @param {string[]} dictionary - Array of words to add to the dictionary
     * @return {void}
     */
    buildDict(dictionary) {
        this.dictionary = new Set(dictionary);
    }
    
    /**
     * Returns if there is any word in the dictionary that equals to the search word 
     * after modifying exactly one character.
     * @param {string} searchWord - Word to search for with one character different
     * @return {boolean} - True if a matching word exists, false otherwise
     */
    search(searchWord) {
        // Iterate through each word in the dictionary
        for (let dictWord of this.dictionary) {
            // Words must be the same length to have exactly one character different
            if (dictWord.length !== searchWord.length) {
                continue;
            }
            
            let diffCount = 0;
            
            // Compare characters at each position
            for (let i = 0; i < dictWord.length; i++) {
                if (dictWord[i] !== searchWord[i]) {
                    diffCount++;
                }
                
                // If more than one character is different, break early
                if (diffCount > 1) {
                    break;
                }
            }
            
            // Return true if exactly one character is different
            if (diffCount === 1) {
                return true;
            }
        }
        
        return false;
    }
}

/**
 * Example usage:
 * 
 * const magicDict = new MagicDictionary();
 * magicDict.buildDict(["hello", "leetcode"]);
 * console.log(magicDict.search("hello")); // false
 * console.log(magicDict.search("hhllo")); // true
 * console.log(magicDict.search("hell")); // false
 * console.log(magicDict.search("leetcoded")); // false
 */

// Export the class for use in other files
module.exports = MagicDictionary;

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */