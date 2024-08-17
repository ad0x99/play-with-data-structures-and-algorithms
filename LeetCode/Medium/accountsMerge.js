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
class UnionFindGraph {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.height = new Array(n).fill(1);
  }

  find(node) {
    let root = node;

    // Traverse up to find the root
    while (this.parent[root] !== root) {
      // Move up to the parent
      root = this.parent[root];
    }

    // Path compression: point the node to its root directly
    while (node !== root) {
      const parent = this.parent[node];
      this.parent[node] = root;
      node = parent;
    }

    return root;
  }

  union(u, v) {
    const rootU = this.find(u);
    const rootV = this.find(v);

    if (rootU !== rootV) {
      if (this.height[rootU] > this.height[rootV]) {
        this.parent[rootV] = rootU;
        this.height[rootU] += this.height[rootV];
      } else {
        this.parent[rootU] = rootV;
        this.height[rootV] += this.height[rootU];
      }
    }
  }
}

const accountsMerge = (accounts) => {
  const unionFindGraph = new UnionFindGraph(accounts.length);
  // {email -> account (using accountIdx)}
  // we can't use account name because there are many accounts have the same name
  const emailToAccount = new Map();

  // Build email graph - group email by account using account index
  for (let index = 0; index < accounts.length; index++) {
    const account = accounts[index];
    const emails = account.slice(1);

    for (const email of emails) {
      if (emailToAccount.has(email)) {
        // Merge 2 accounts that have common emails
        unionFindGraph.union(index, emailToAccount.get(email));
      } else {
        // Map email to its account index
        emailToAccount.set(email, index);
      }
    }
  }

  // Group email by account index - { accountIndex: [emails...] }
  const emailGroup = new Map();
  for (const [email, accountIdx] of emailToAccount.entries()) {
    const root = unionFindGraph.find(accountIdx);

    if (!emailGroup.has(root)) {
      emailGroup.set(root, new Array());
    }
    emailGroup.get(root).push(email);
  }

  // Sort the emails and build the result
  const result = [];
  for (const [accountIdx, emails] of emailGroup.entries()) {
    const accountName = accounts[accountIdx][0];
    result.push([accountName, ...emails.sort()]);
  }

  return result;
};
