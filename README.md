# project1-game

Game Chosen:  Checkers

Basic Rules:

1. Player turn will be randomized at start of each game.
2. Single "jumps" are not forced if available.
3. Multi "jumps" are forced if a single "jump" is made and multiple are available.
4. A "king", which can traverse both directions of the board, will replace a regular piece when the regular piece crosses the board.
5. Player will win by "jumping" all of the opponents' pieces, or if no moves are available, by having "jumped" the most pieces.

Settings:  

- "Players" settings enable playing a friend (2 player) or an AI (1 player).  Currently, only 2 player is available.
- "Red Side" settings allow players to decide which color is on the "top" of the board.
- "Display Tips" settings allow players to show or hide gameplay tips.  Experienced users may better enjoy the game without these tips.


Thought process:

Technologies:

Additional features:


Requirements:

1. Game is playable
  Buttons or keyboard events work, monsters die when you shoot them, etc.
2. Game is 2-player (or AI)
  AI/environment is appropriately responsive, or it is designed as a 2 player game
3. Game is winnable
  Unless specifically designed as a world-exploration game, it is theoretically winnable
  and detects such a condition accurately
4. Winner is displayed
  (if applicable) Winner is congratulated, game generally stops until it is reset in some way
5. Has directions - how to play
  Explanations included for anything that isn't abundantly clear. At least in a README file if not directly inside the game itself.
6. Appropriate Use of GitHub
  Get your repository up on GitHub early on, commits are done throughout the week on a regular basis, and commit messages are clear and purposeful.
7. Deployed on GitHub Pages
  Deployed and working on gh-pages
8. Long files appropriately split up
  e.g., Avoid 500 lines of code in one file.
9. Appropriate use of functions
  Functions that are present are named and used logically, and there are few if any missed opportunities for DRYer code by using a function.
10. DRY Code
  Little to no repitition (or needless verbosity) in the code
11. Draw (Tie) detected (if applicable)
  Applicable for games like tic-tac-toe, connect-four, black jack, or go fish where ties are possible. Not typically applicable for things like platformer games.
12. Good collision detection/Ease of triggering events
  Graceful of triggering events (including collisions if applicable).
