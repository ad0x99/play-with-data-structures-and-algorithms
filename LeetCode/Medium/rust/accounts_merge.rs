/**
 * https://leetcode.com/problems/accounts-merge/
 *
 * Union Find Approach
 *
 * Idea: We can treat each email as a node in a graph, if email belongs to the same account name, there is a edge between them, indicating that those emails belong to the same account.
 *
 * We can think of the parent node in the graph is the account name, we will build an email graph by group email by account using account name. But, the problem is that we can have users with the same name, therefore, we will replace the account name by account index instead.
 *
 * For example, we have a list of accounts
 *
 * ```js
 * accounts = [
 *    ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
 *    ['John', 'johnsmith@mail.com', 'john00@mail.com'],
 *    ['Mary', 'mary@mail.com'],
 *    ['John', 'johnnybravo@mail.com'],
 * ]
 * ```
 * Then, we will use a Map to group each email by its account index. Each time we group email by account index, we will merge those accounts that share common emails together using union method.
 *
 * ```js
 * Graph(5) {
 *    'johnsmith@mail.com' => 0,
 *    'john_newyork@mail.com' => 0,
 *    'john00@mail.com' => 1,
 *    'mary@mail.com' => 2,
 *    'johnnybravo@mail.com' => 3
 * }
 * ```
 *
 * After that, we need to group email by its account name to form the correct result. We will use the find method to find parent account of each email, then group them by parent account.
 *
 * ```js
 * Map(3) {
 *    0 => [ 'johnsmith@mail.com', 'john_newyork@mail.com', 'john00@mail.com' ],
 *    2 => [ 'mary@mail.com' ],
 *    3 => [ 'johnnybravo@mail.com' ]
 *  }
 * ```
 * Finally, we just map the account index with account name, and sort the email list to form the valid result.
 *
 * Implementation
 *
 * 1. The `UnionFindGraph` contains 2 methods:
 * - 1.1: The `find` method: This method finds the root of a node (email) to which vertex (account index) belongs. It uses path compression to optimize future lookups by directly linking nodes to their root. That means, every time we traverse through a email, we assign the root (account index) of all vertices (emails) in the same path from vertex (email) to root (account index) to be the same root (account index).
 *
 * - 1.2: The `union` method: This method connects two nodes (u and v) by setting the parent of u to v, effectively merging the two graphs. We also use height of each graph to merge 2 graphs, this ensures when we merge 2 graphs, the new graph will be as short as possible.
 *
 * 2. We create a map (`emailToAccount`) to map each email to its parent account, where each key is the email, and value is the account index that it belongs to.
 *
 * 3. We traverse over each account and extract the email list.
 *
 * 4. We traverse through each email of the current account.
 * - 4.1: If the account has not been mapped to its account index, we add it the the `emailToAccount` map, where key is the email and value is the current account index.
 *
 * - 4.2: Otherwise, if the email is already existed in the `emailToAccount` map, that means, the email already belongs to other account. We then, merge 2 accounts that share the same current email by using `union` method.
 *
 * 5. After merging accounts, the parent array in the `UnionFindGraph` will store the root vertex of each account, where `parent[i]` is the vertex of `account[i]` in the accounts list.
 *
 * 6. We will group email by account index using the parent list. We create a map (`emailGroup`) to store the list of emails group by its account.
 *
 * 7. We iterate through each email in the `emailToAccount` map.
 * - 7.1: We extract the email and its account index.
 *
 * - 7.2: We use the `find` method to find the root of the current account to know which graph the current account belongs to.
 *
 * - 7.3: If current account has not been grouped, we initialize a new key-value pairs in the `emailGroup` map for the current account.
 *
 * - 7.4: Finally, we map all of the current account's emails to the current email list in the `emailGroup` map.
 *
 * 8. Finally step, we need to sort the emails, and form the result.
 * - 8.1:  We iterate through each account index in the `emailGroup`, and extract the account index and email list.
 *
 * - 8.2: We build the result where each item contains the first index is the account name, and the rest is the email list that belongs to the current account.
 *
 * 9. We return the result array.
 *
 *
 * Time complexity: O(m * α(n) + m log m), where m is the total number of emails and n is the number of accounts.
 *
 * Space complexity: O(n + m), where n is the number of nodes in the graph, and m is number of emails in emailToAccount, and emailGroup map.
 */
use std::collections::HashMap;

struct UnionFindGraph {
    parent: Vec<usize>,
    height: Vec<usize>,
}

impl UnionFindGraph {
    fn new(n: usize) -> Self {
        UnionFindGraph {
            parent: (0..n).collect(),
            height: vec![1; n],
        }
    }

    fn find(&mut self, node: usize) -> usize {
        let mut root = node;

        // Traverse up to find the root
        while self.parent[root] != root {
            root = self.parent[root];
        }

        // Path compression: point the node to its root directly
        let mut current = node;
        while current != root {
            let parent = self.parent[current];
            self.parent[current] = root;
            current = parent;
        }

        root
    }

    fn union(&mut self, u: usize, v: usize) {
        let root_u = self.find(u);
        let root_v = self.find(v);

        if root_u != root_v {
            if self.height[root_u] > self.height[root_v] {
                self.parent[root_v] = root_u;
                self.height[root_u] += self.height[root_v];
            } else {
                self.parent[root_u] = root_v;
                self.height[root_v] += self.height[root_u];
            }
        }
    }
}

impl Solution {
    pub fn accounts_merge(accounts: Vec<Vec<String>>) -> Vec<Vec<String>> {
        let mut union_find_graph = UnionFindGraph::new(accounts.len());
        let mut email_to_account = HashMap::new();

        // Build email graph - group email by account using account index
        for (index, account) in accounts.iter().enumerate() {
            for email in &account[1..] {
                if let Some(&existing_account_idx) = email_to_account.get(email) {
                    // Merge 2 accounts that have common emails
                    union_find_graph.union(index, existing_account_idx);
                } else {
                    // Map email to its account index
                    email_to_account.insert(email, index);
                }
            }
        }

        // Group emails by account index
        let mut email_group: HashMap<usize, Vec<String>> = HashMap::new();
        for (email, &account_idx) in email_to_account.iter() {
            let root = union_find_graph.find(account_idx);
            email_group
                .entry(root)
                .or_insert_with(Vec::new)
                .push(email.to_string());
        }

        // Sort the emails and build the result
        let mut result = Vec::new();
        for (account_idx, mut emails) in email_group {
            emails.sort();
            let mut account_info = vec![accounts[account_idx][0].clone()];
            account_info.extend(emails);
            result.push(account_info);
        }

        result
    }
}
