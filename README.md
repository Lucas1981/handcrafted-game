# Handcrafted-game

I wanted to build a game from scratch with TypeScript and document the steps I'd take to get there. The point being not to use AI for it. It's been a while since I tried my hand and making a game, I wanted to see if I could still put the pieces together.

Already some reflections:

- We are now moving things around based on elapsed time, not per frame. We might adjust the loop so we keep a consistent frame rate and then move per frame to make things more predictable and consistent. Also removes the need to keep track of the elapsed time.
- I wonder if the main loop should be a function or a class. It feels so much like it should be a function, but at the same time there are situations where you might want to give it state. For now I guess we are okay without.
- Is it a good idea to extend the `agent.ts` class to Player, Baddie, etc. classes? It might also make more sense to make the base class very composable and then feed in the properties and logic with some config file.

1. [x] Scaffold the project. I used Vite to set it up, following instructions from `https://vite.dev/guide/`.
2. [x] Add a graphics module. This module should take care of all things graphics.
3. [x] Input. We will need keyboard input for our game.
4. [x] Loop. We have to set up the main game loop
5. [x] Handlers. Enumerate the several state handlers for our game
6. [x] Sound. We will need to be able to play back sounds.
7. [ ] Agent. We will need to specify agents for our game.
8. [ ] Frames. We will want to make use of frames
9. [ ] Animations. We will then use those frames for animations
10. [ ] Grid. Our game will be making use of a tile grid
11. [ ] Collision. We must be able to handle collision between agents
12. [ ] Scroll. We want to be able to scroll the screen
13. [ ] Music. We want to be able to play back music
14. [ ] A UI layer to display text and status
