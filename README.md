# Handcrafted-game

I wanted to build a game from scratch with TypeScript and document the steps I'd take to get there. The point being not to use AI for it. It's been a while since I tried my hand and making a game, I wanted to see if I could still put the pieces together.

## Already some reflections:

- We are now moving things around based on elapsed time, not per frame. We might adjust the loop so we keep a consistent frame rate and then move per frame to make things more predictable and consistent. Also removes the need to keep track of the elapsed time.
- I wonder if the main loop should be a function or a class. It feels so much like it should be a function, but at the same time there are situations where you might want to give it state. For now I guess we are okay without.
- Is it a good idea to extend the `agent.ts` class to Player, Baddie, etc. classes? It might also make more sense to make the base class very composable and then feed in the properties and logic with some config file.
- As far as `update` is concerned, it's now a single function for each of the actors. Whether or not we compose or extend, it might be good to have an array of functions rather than one big huge one in some cases. We'd then loop over the collection of functions and apply one-by-one. It's for example a nice way to separate out changing position from changing state.
- I determine the correct animation frame by looking at the time elapsed between the last state change of an agent and now, and then putting a modulo on this with the maximum amount of frames. That all works, but I wonder how long it would take before that number would overflow, since time will just keep on increasing between those two points. Probably okay if it's decades, but not really okay if it's hours. I should check that.
- Scrolling is maybe not as hard as I thought. The HTML5 is also forgiving - in comparison to C/C++ screen buffer arrays for example - where you can just try to paint to outside-canvas parts and not get punished. For that reason, you can just compute a camera x position based on your main player position, and then iterate over the grid and offset drawing the grid tiles, together with translating the agents, and you're done.
- Managing state is actually really where things get interesting and brings up a lot of "what should go where" type of questions. But I think it's good to keep a lot of things in a dedicated `State` class that just keeps tracks of where things are. I remember making this a singleton in the past, but I think it might be better to just pass it around for everybody to consult. Should the music go into State, since it is state-dependent? Or can it live outside of it? Should Grid be part of the state? I think there are many ways to divide the responsibilities, but I can live with the way it's setup now.
- It's good to think about the full game cycle, for example what happens when we reset the whole game. Right now I reset at the end, so the states are ready again when we go to the `TitleScreen` state. But the question remains: should you reset everything at the end of the lifecycle or at the beginning?
- I kept the UI at a minimum. I didn't give it a layer of it's own but just made it part of the main loop, calling methods on Graphics. It felt like overengineering to give it a dedicated layer, so this is okay for now.
- I keep thinking about should things be functions or class, still in the case of `handlers.ts` and `loop.ts` the most. I do catch myself computing the same thing twice or more when everything is a function and where we can't pass around context elegantly. It's okay since it's not pressing performance too much in this context and we're still very much within budget, but one way to avoid it is to just have everything be a class where we set up some members on construction and then set and forget those.

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
2. [x] Graphics. This module should take care of all things graphics.
3. [x] Input. We will need keyboard input for our game.
4. [x] Loop. We have to set up the main game loop
5. [x] Handlers. Enumerate the several state handlers for our game
6. [x] Sound. We will need to be able to play back sounds.
7. [x] Agent. We will need to specify agents for our game.
8. [x] Frames. We will want to make use of frames
9. [x] Animations. We will then use those frames for animations
10. [x] Grid. Our game will be making use of a tile grid
11. [x] Collision. We must be able to handle collision between agents and grid
12. [x] Scroll. We want to be able to scroll the screen
13. [x] Music. We want to be able to play back music
14. [x] A UI layer to display text and status
