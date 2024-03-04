# HEMA-Broadcast
Graphical overlay elements for HEMA Broadcasts powered by [HEMA Ratings](https://hemaratings.com/). 

Tired of manually editing big photoshop files with your stream overlays for every single tournament participant? Tired of collecting information on every fencer manually? Then boy do we have a new product for you! Introducing HEMA-Broadcast (name subject to change)! 

This project is intended to be a user-friendly web app that does the tedious and difficult tasks of creating stream overlays for HEMA tournaments for you. All you need to do is enter the name of the relevant fencers and out comes a ready to use graphical element. 

This is very much a work in progress and there are plans to add multiple different templates and add options for changing the visual style etc.

Here's an early alpha demo to show the intended usage flow:

https://github.com/Aryuko/HEMA-Broadcast/assets/7040167/d0d6f3f7-1b7b-4f23-b935-0f973d465c2b

# Development
Use [pnpm](https://pnpm.io/) as your package manager for best results. Developed on [Node.js](https://nodejs.org/) version `20.9.0`

1. Clone repository
2. Run `pnpm install`
3. Create a copy of `example.env`, call it `.env`, and add your API key
4. To run, use `pnpm run dev`
5. Navigate to `localhost:3000`
