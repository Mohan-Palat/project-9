# Project Overview


## Project Description

This project describes a full-stack application of a drive-in movie operation with multiple drive-in movie locations.  The app shows the different drive-in theaters with the movies and showtimes of each drive-in movie theater.  The app also shows a list of movies by drive-in location at each hour.  The app also shows the movies by movie name per hour and the drive-in locations that these movies are showing.

The app also provides authentication if a user logs into the app.  The user can perform create, update, and delete functionality on movies and drive-in theaters if they are authenticated in the system.  If the user is not authenticated in the system, such as a customer to the site, they can view the movies, drive-in theater pages, and views showing which movies are playing at what drive-in movie at each hour.

The app also provides a google maps interface for the address of where the movie theater is located.  The user would be able to look up the movie on the google apps snippet.

## Project Links

- https://github.com/jmurphy1972/project-2
- https://jcm-project2.herokuapp.com/


## Wireframes

Upload images of wireframe to cloudinary and add the link here with a description of the specific wireframe.

- https://docs.google.com/drawings/d/1jnb3B5vBbj16kd-iCEbEVjiZWtA1ESeFRi5WqOlaksc/edit


Define the the React components and the architectural design of your app.

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP EXAMPLE
- Find and use external api 
- Render data on page 
- Allow user to interact with the page

#### PostMVP EXAMPLE

- Add localStorage or firebase for storage

## Components
##### Writing out your components and its descriptions isn't a required part of the proposal but can be helpful.

Based on the initial logic defined in the previous sections try and breakdown the logic further into stateless/stateful components. 

| Component | Description | 
| --- | :---: |  
| App | This will make the initial data pull and include React Router| 
| Header | This will render the header include the nav | 
| Footer | This will render the header include the nav | 

## Time Frames

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Also, put a gif at the top of your Readme before you pitch, and you'll get a panda prize.

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Adding Form | H | 3hrs| 3.5hrs | 3.5hrs |
| Working with API | H | 3hrs| 2.5hrs | 2.5hrs |
| Total | H | 6hrs| 5hrs | 5hrs |

## Additional Libraries
 Use this section to list all supporting libraries and thier role in the project such as Axios, ReactStrap, D3, etc. 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description.  Code snippet should not be greater than 10 lines of code. 

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object

