/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Tweet class to store tweet information
 */
class Tweet {
    constructor(tweetId, timestamp) {
        this.tweetId = tweetId;
        this.timestamp = timestamp;
    }
}

/**
 * Twitter class - Simplified Twitter implementation
 *
 * Core data structures:
 * - userTweets: Map from userId to array of Tweet objects
 * - followMap: Map from userId to Set of users they follow
 * - timestamp: Global counter for chronological ordering
 */
class Twitter {
    /**
     * Initialize Twitter data structure.
     */
    constructor() {
        this.userTweets = new Map();  // userId -> [Tweet, Tweet, ...]
        this.followMap = new Map();   // userId -> Set(followeeIds)
        this.timestamp = 0;           // Global timestamp for tweet ordering
    }

    /**
     * Post a new tweet by user.
     * @param {number} userId - User posting the tweet
     * @param {number} tweetId - Unique tweet identifier
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    postTweet(userId, tweetId) {
        if (!this.userTweets.has(userId)) {
            this.userTweets.set(userId, []);
        }

        const tweet = new Tweet(tweetId, this.timestamp++);
        this.userTweets.get(userId).push(tweet);
    }

    /**
     * Retrieve the 10 most recent tweet IDs in user's news feed.
     * @param {number} userId - User requesting the news feed
     * @return {number[]} - Array of up to 10 most recent tweet IDs
     *
     * Time Complexity: O(f * t) where f = followees, t = tweets per user
     * Space Complexity: O(f * t) for collecting tweets
     */
    getNewsFeed(userId) {
        const allTweets = [];

        // Collect user's own tweets
        if (this.userTweets.has(userId)) {
            allTweets.push(...this.userTweets.get(userId));
        }

        // Collect tweets from followed users
        if (this.followMap.has(userId)) {
            for (const followeeId of this.followMap.get(userId)) {
                if (this.userTweets.has(followeeId)) {
                    allTweets.push(...this.userTweets.get(followeeId));
                }
            }
        }

        // Sort by timestamp (most recent first) and take top 10
        allTweets.sort((a, b) => b.timestamp - a.timestamp);
        return allTweets.slice(0, 10).map(tweet => tweet.tweetId);
    }

    /**
     * User starts following another user.
     * @param {number} followerId - User who is following
     * @param {number} followeeId - User being followed
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    follow(followerId, followeeId) {
        // Users cannot follow themselves
        if (followerId === followeeId) {
            return;
        }

        if (!this.followMap.has(followerId)) {
            this.followMap.set(followerId, new Set());
        }

        this.followMap.get(followerId).add(followeeId);
    }

    /**
     * User stops following another user.
     * @param {number} followerId - User who is unfollowing
     * @param {number} followeeId - User being unfollowed
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    unfollow(followerId, followeeId) {
        if (this.followMap.has(followerId)) {
            this.followMap.get(followerId).delete(followeeId);
        }
    }
}

/**
 * Factory function for creating Twitter instances
 * @return {Twitter}
 */
function solve() {
    return new Twitter();
}

/**
 * Test cases for Problem 355: Design Twitter
 */
function testSolution() {
    console.log('Testing 355. Design Twitter');

    // Test case 1: Basic functionality - LeetCode example
    const twitter1 = new Twitter();
    twitter1.postTweet(1, 5);
    const feed1 = twitter1.getNewsFeed(1);
    console.assert(JSON.stringify(feed1) === JSON.stringify([5]), 'Test 1a failed: single tweet');

    twitter1.follow(1, 2);
    twitter1.postTweet(2, 6);
    const feed2 = twitter1.getNewsFeed(1);
    console.assert(JSON.stringify(feed2) === JSON.stringify([6, 5]), 'Test 1b failed: followed user tweet');

    twitter1.unfollow(1, 2);
    const feed3 = twitter1.getNewsFeed(1);
    console.assert(JSON.stringify(feed3) === JSON.stringify([5]), 'Test 1c failed: after unfollow');

    // Test case 2: Multiple users and tweets
    const twitter2 = new Twitter();
    twitter2.postTweet(1, 1);
    twitter2.postTweet(2, 2);
    twitter2.postTweet(1, 3);
    twitter2.follow(1, 2);
    const feed4 = twitter2.getNewsFeed(1);
    console.assert(JSON.stringify(feed4) === JSON.stringify([3, 2, 1]), 'Test 2a failed: chronological order');

    // Test case 3: Self-follow should be ignored
    const twitter3 = new Twitter();
    twitter3.postTweet(1, 1);
    twitter3.follow(1, 1); // Self-follow should be ignored
    const feed5 = twitter3.getNewsFeed(1);
    console.assert(JSON.stringify(feed5) === JSON.stringify([1]), 'Test 3a failed: self-follow ignored');

    // Test case 4: Empty feed for user with no tweets or follows
    const twitter4 = new Twitter();
    const feed6 = twitter4.getNewsFeed(99);
    console.assert(JSON.stringify(feed6) === JSON.stringify([]), 'Test 4a failed: empty feed');

    // Test case 5: More than 10 tweets
    const twitter5 = new Twitter();
    for (let i = 1; i <= 15; i++) {
        twitter5.postTweet(1, i);
    }
    const feed7 = twitter5.getNewsFeed(1);
    console.assert(feed7.length === 10, 'Test 5a failed: feed limited to 10');
    console.assert(feed7[0] === 15 && feed7[9] === 6, 'Test 5b failed: most recent 10 tweets');

    // Test case 6: Unfollow user not followed
    const twitter6 = new Twitter();
    twitter6.unfollow(1, 2); // Should not crash
    twitter6.postTweet(1, 1);
    const feed8 = twitter6.getNewsFeed(1);
    console.assert(JSON.stringify(feed8) === JSON.stringify([1]), 'Test 6a failed: unfollow non-followed user');

    console.log('All test cases passed for 355. Design Twitter!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 355. Design Twitter ===');
    console.log('Category: Design');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration
    const twitter = new Twitter();
    console.log('Creating Twitter instance');
    console.log('');

    console.log('User 1 posts tweet 5');
    twitter.postTweet(1, 5);
    console.log('User 1 news feed:', twitter.getNewsFeed(1)); // [5]

    console.log('User 1 follows user 2');
    twitter.follow(1, 2);

    console.log('User 2 posts tweet 6');
    twitter.postTweet(2, 6);
    console.log('User 1 news feed:', twitter.getNewsFeed(1)); // [6, 5]

    console.log('User 1 unfollows user 2');
    twitter.unfollow(1, 2);
    console.log('User 1 news feed:', twitter.getNewsFeed(1)); // [5]

    console.log('User 2 posts tweet 7 (should not appear in user 1 feed)');
    twitter.postTweet(2, 7);
    console.log('User 1 news feed:', twitter.getNewsFeed(1)); // [5]
    console.log('User 2 news feed:', twitter.getNewsFeed(2)); // [7, 6]
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    Twitter,
    Tweet,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution prioritizes simplicity and correctness over scalability
 * - Global timestamp ensures correct chronological ordering across all users
 * - Real Twitter would use database indexes and more sophisticated feed algorithms
 * - Could be optimized with priority queues or merge-k-lists for large-scale scenarios
 * - The approach demonstrates fundamental social media feed generation concepts
 * - Critical for system design interviews involving social networks
 * - Follow relationships stored as adjacency list representation
 */
