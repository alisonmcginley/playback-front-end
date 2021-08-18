![Screen Shot 2021-08-18 at 10 02 54 AM](https://user-images.githubusercontent.com/22807951/129932235-ee2cd252-5ae7-47da-b7dd-ea63493a8630.png)

# Playback Front End (in Development)
Playback is a React application that allows transforms user inputs into music, looping through notes from four instruments. This app is for all, regardless of previous music experience.

## Author
Alison McGinley

## Main Features
- User can select one of four instruments
- Each selection loads ten instrument sounds to QWERTYUIOP keys that can be played independently, or together
- "Play" returns the notes that the user has played so far
- While playing, the user can continue to add to the loop
- User can set their own tempo, which trickles down into all rhythmic functionality
- No rhythm? No problem! An exciting quantize function snaps all sounds to a grid of 16th notes. 

## Current Bugs
- Re-renders components with each new selection and play, resulting in a very slow interface
- Schedule not updating as user adds notes
- Though the functions are written, the app isn't currently listening when the user "clear"s or "stop"s play
- Deployment pending

## Why did I build this?
This project serves as my Capstone submission for Ada Developer's Academy, which is an opportunity to learn new technologies, while experiencing my first foray into independent development.

Working with audio was a huge challenge for me, a new software engineer. More specifically, working with Time pushed me to thoughtfully consider the expense of my algorithms, and face scary words like "Promise", "async", and "await". Given that most of my previous experience is in Python, I seized this opportunity to build an app using Javascript so that I can be a more confident and versatile junior engineer. 

## What have I learned so far?
Well, a lot. Most importantly, I've learned that I'm in the right place at the right time, and building things is really cool! Besides that, I've learned or practiced -
- State management
- Hooks
- Complicated component journeys
- Promise, async, await
- Turns out those Leetcode algorithms can be useful!
- Nested data structures
- Setting & updating the state of said complicated nested data structures
- The importance of space and time complexity
- and More!
