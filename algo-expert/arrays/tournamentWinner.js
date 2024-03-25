/**
 * QUESTION
 *
 * There's an algorithms tournament taking place in which teams of programmers compete against each other to solve algorithmic problems as fast as possible. Teams compete in a round robin, where each team faces off against all other teams. Only two teams compete against each other at a time, and for each competition, one team is designated the home team, white the other team is the away team. In each competition there's always one winner and one loser; there are no ties. A team receives 3 points if it wins and 0 points if it loses. The winner of the tournament is the team that receives the most amount of points.
 *
 * Given an array of pairs representing the teams that have competed against each other and an array containing the results of each competition, write a function that returns the winner of the tournament. The input arrays are named `competitions` and `results`, respectively. The `competitions` array has elements in the form of `[homeTeam, awayTeam]`, where each team is a string of at most 30 characters representing the name of the team. The `results` array contains information about the winner of each corresponding competition in the `competitions` array. Specifically, `results[i]` denotes the winner of `competitions[i]`, where a `1` in the `results` array means that the home team in the corresponding competition won and a `0` means that the away team won.
 *
 * It's guaranteed that exactly one team will win the tournament and that each team will compete against all other teams exactly once. It's also guaranteed that the tournament will always have at lest 2 teams.
 *
 * Sample Input:
 * competitions = [
 *    ["HTML", "C#"],
 *    ["C#", "Python"],
 *    ["Python", "HTML"]
 * ]
 *
 * results = [0, 0, 1]
 *
 * Sample Output:
 * "Python"
 * // C# beats HTML, Python beats C#, and Python beats HTML
 * // HTML - 0 pts
 * // C# - 3 pts
 * // Python - 6 pts
 */

/**
 * SOLUTION 1
 * 
 * The time complexity of this solution is O(n), where n is the number of competitions. This is because we iterate through the competitions array once to calculate the points for each team.

 * The space complexity of this solution is O(k), where k is the number of teams. This is because we use a hashmap to store the points for each team, and the number of teams is the maximum number of entries in the hashmap.
 */
const tournamentWinnerFirstSolution = (competitions, results) => {
  // We use a hashmap to keep track points of winning team
  let points = {};

  // Loop through the competitions array
  for (let i = 0; i < competitions.length; i++) {
    let result = results[i];
    let homeTeam = competitions[i][0];
    let awayTeam = competitions[i][1];

    // If result === 0, this means the await team is the winner
    // Then, we update the winner's point to the points hashmap
    if (result === 0) {
      points[awayTeam] = !points[awayTeam] ? 3 : points[awayTeam] + 3;
    } else {
      // Otherwise, the home team is the winner
      // Then, we update the winner's point to the points hashmap
      points[homeTeam] = !points[homeTeam] ? 3 : points[homeTeam] + 3;
    }
  }

  // We loop through points result to find the highest point, that means the winner
  return Object.keys(points).reduce((a, b) => (points[a] > points[b] ? a : b));
};

/**
 * C# beats HTML (HTML: 0, C#: 3), Python beats C# (Python: 3, C#: 3), and Python beats HTML (Python: 6, HTML: 0) => Winner is Python with 6 points
 */
console.log(
  tournamentWinnerFirstSolution(
    [
      ['HTML', 'C#'],
      ['C#', 'Python'],
      ['Python', 'HTML'],
    ],
    [0, 0, 1]
  )
);

/**
 * SOLUTION 2
 * 
 * The time complexity of this solution is O(n), where n is the number of competitions. This is because we iterate through the competitions array once.

 * The space complexity of this solution is O(k), where k is the number of teams. This is because we use a hashmap to store the points of each team, and the size of the hashmap is determined by the number of teams.
 */
const tournamentWinnerOptimalSolution = (competitions, results) => {
  // We use a hashmap to keep track points of winning team
  // And the currentBestTeam to keep track the latest winner
  let points = { currentBestTeam: 0 };
  let currentBestTeam = { point: 0, name: '' };

  // Loop through the competitions array
  for (let i = 0; i < competitions.length; i++) {
    let result = results[i];
    let homeTeam = competitions[i][0];
    let awayTeam = competitions[i][1];

    // Get the winning team
    let winningTeam = result === 1 ? homeTeam : awayTeam;

    // Update score for winning team
    if (!points[winningTeam]) {
      points[winningTeam] = 0;
    }
    points[winningTeam] += 3;

    // Update current best team's point & team name
    if (points[winningTeam] > currentBestTeam.point) {
      currentBestTeam.point = points[winningTeam];
      currentBestTeam.name = winningTeam;
    }
  }

  return currentBestTeam.name;
};

/**
 * C# beats HTML (HTML: 0, C#: 3), Python beats C# (Python: 3, C#: 3), and Python beats HTML (Python: 6, HTML: 0) => Winner is Python with 6 points
 */
console.log(
  tournamentWinnerOptimalSolution(
    [
      ['HTML', 'C#'],
      ['C#', 'Python'],
      ['Python', 'HTML'],
    ],
    [0, 0, 1]
  )
);
