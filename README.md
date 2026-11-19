# Handcrafted-game

I wanted to build a game from scratch with TypeScript and document the steps I'd take to get there. The point being not to use AI for it. It's been a while since I tried my hand and making a game, I wanted to see if I could still put the pieces together.

## Already some reflections:

- We are now moving things around based on elapsed time, not per frame. We might adjust the loop so we keep a consistent frame rate and then move per frame to make things more predictable and consistent. Also removes the need to keep track of the elapsed time.
- I wonder if the main loop should be a function or a class. It feels so much like it should be a function, but at the same time there are situations where you might want to give it state. For now I guess we are okay without.
- Is it a good idea to extend the `agent.ts` class to Player, Baddie, etc. classes? It might also make more sense to make the base class very composable and then feed in the properties and logic with some config file.
- I determine the correct animation frame by looking at the time elapsed between the last state change of an agent and now, and then putting a modulo on this with the maximum amount of frames. That all works, but I wonder how long it would take before that number would overflow, since time will just keep on increasing between those two points. Probably okay if it's decades, but not really okay if it's hours. I should check that.

## Some notes on animations

I seem to always confuse myself when I set up the animations, so here's a quick overview of how it works:

- We load in a spritesheet as a flyweight, we do that in animation.ts with the loadAnimations function.
- In this function, we make frames, each corresponding to a slice of the flyweight that it represents
- We then make the animations that are really not much else than a map with str keys to arrays of frame indices
- Then in the `draw` method in the `Animation` class, we use elapsed time to determine what frame in the series to show
- We use the state of the Agent to determine which of the array of indices to target, by turning it into a key, like `player-${this.state}-${this.direction}`. See the `draw` method in the `Player` class that demonstrates this.
- Determining that elapsed time is tricky, and it's actually the time elapsed from the last state change of the Agent instance to now. In that way, if we then modulo it by the amount of frames we have, we can show a continuous loop. See the `draw` and `updateAnimation` methods in the `Player` class that can serve as an example.

## Todo:

1. [x] Scaffold the project. I used Vite to set it up, following instructions from `https://vite.dev/guide/`.
2. [x] Add a graphics module. This module should take care of all things graphics.
3. [x] Input. We will need keyboard input for our game.
4. [x] Loop. We have to set up the main game loop
5. [x] Handlers. Enumerate the several state handlers for our game
6. [x] Sound. We will need to be able to play back sounds.
7. [x] Agent. We will need to specify agents for our game.
8. [x] Frames. We will want to make use of frames
9. [x] Animations. We will then use those frames for animations
10. [ ] Grid. Our game will be making use of a tile grid
11. [ ] Collision. We must be able to handle collision between agents
12. [ ] Scroll. We want to be able to scroll the screen
13. [ ] Music. We want to be able to play back music
14. [ ] A UI layer to display text and status
