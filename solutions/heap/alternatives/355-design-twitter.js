/**
 * 355. Design Twitter
 * Medium
 *
 * Twitter System Design Implementation This implementation includes core Twitter functionalities: - Post tweets - Follow/unfollow users - Get news feed (recent tweets from followed users) Time Complexity: - postTweet: O(1) - getNewsFeed: O(n log k) where n is number of tweets and k is feed limit - follow: O(1) - unfollow: O(1)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Design Twitter is to understand the core problem pattern
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
 * Twitter System Design Implementation
 * 
 * This implementation includes core Twitter functionalities:
 * - Post tweets
 * - Follow/unfollow users
 * - Get news feed (recent tweets from followed users)
 * 
 * Time Complexity:
 * - postTweet: O(1)
 * - getNewsFeed: O(n log k) where n is number of tweets and k is feed limit
 * - follow: O(1)
 * - unfollow: O(1)
 */

class Twitter {
    constructor() {
        // Initialize data structures
        this.tweets = [];         // Store all tweets
        this.following = {};      // Map users to their following list
        this.FEED_LIMIT = 10;     // Maximum tweets to return in news feed
    }

    /**
     * Post a new tweet
     * @param {number} userId - ID of user posting tweet
     * @param {number} tweetId - ID of the tweet
     * @return {void}
     */
    postTweet(userId, tweetId) {
        this.tweets.push({
            userId: userId,
            tweetId: tweetId,
            timestamp: Date.now()
        });
    }

    /**
     * Retrieve recent tweets from followed users
     * @param {number} userId - ID of user requesting feed
     * @return {number[]} - List of tweet IDs in feed
     */
    getNewsFeed(userId) {
        // Get list of users being followed
        const followedUsers = this.following[userId] || new Set();
        
        // Filter and sort relevant tweets
        const feed = this.tweets
            .filter(tweet => 
                tweet.userId === userId || followedUsers.has(tweet.userId)
            )
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, this.FEED_LIMIT)
            .map(tweet => tweet.tweetId);

        return feed;
    }

    /**
     * Follow another user
     * @param {number} followerId - ID of follower
     * @param {number} followeeId - ID of user being followed
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (!this.following[followerId]) {
            this.following[followerId] = new Set();
        }
        this.following[followerId].add(followeeId);
    }

    /**
     * Unfollow another user
     * @param {number} followerId - ID of follower
     * @param {number} followeeId - ID of user being unfollowed
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (this.following[followerId]) {
            this.following[followerId].delete(followeeId);
        }
    }
}

/**
 * Example usage:
 */
function runExample() {
    const twitter = new Twitter();

    // Post some tweets
    twitter.postTweet(1, 5);      // User 1 posts tweet with ID 5
    twitter.postTweet(2, 3);      // User 2 posts tweet with ID 3
    twitter.postTweet(1, 101);    // User 1 posts tweet with ID 101

    // User 2 follows User 1
    twitter.follow(2, 1);

    // Get news feeds
    console.log("User 2's feed:", twitter.getNewsFeed(2));  // Should see tweets from User 1 and 2

    // User 2 unfollows User 1
    twitter.unfollow(2, 1);

    // Get updated feed
    console.log("User 2's feed after unfollow:", twitter.getNewsFeed(2));  // Should only see User 2's tweets
}

// Export the Twitter class
module.exports = Twitter;

// Uncomment to run example
// runExample();