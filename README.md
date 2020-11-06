## Project Overview - Drive-In Movie App
## John Murphy


## Project Description

This project describes a full-stack application of a drive-in movie company with multiple drive-in movie locations.  The app shows the different drive-in theaters with the movies and showtimes of each drive-in movie theater.  The app also shows a list of movies by drive-in location and movie title at each hour.

The app also provides authentication if a user logs into the app.  An authenticated user can perform create, update, and delete functionality on both movies and drive-in theaters.  The user can also add, delete, or update showtimes of movies at the different drive-in theater locations.

If the user is not authenticated, such as a customer who is visiting the site, they have read-only access to the system.  The customer can view the list of movies, view the drive-in theater pages, and view the list of movies that are playing on each hour.  These view pages show movies listed by both by the drive-in theater and the movie title.

The app also provides a google maps interface for the address of where the movie theater is located.  The app takes the address of the drive-in theater and sends it in a query to the Google Maps script module.  The Google search engine is capable of parsing a location that does not need to adhere to strict format guidelines (i.e. "Mesa, AZ", "Salt Lake City", "Grand Canyon", etc.)


## Project Links

Github Location:
- https://github.com/jmurphy1972/project-2

Heroku App:
- https://jcm-project2.herokuapp.com/


## Wireframes

Here is the wireframe of the data model that was used for the drive-in app.  It consists of data objects for both the drive-in theater and the movies.  It shows the many-to-many relationship between drive-in theaters and movies (since drive-in theaters play more than one movie and the same movie can play at many different drive-in theaters.  I have provided a PDF copy of the wireframe design in the project root directory. 

- https://docs.google.com/drawings/d/1jnb3B5vBbj16kd-iCEbEVjiZWtA1ESeFRi5WqOlaksc/edit


## User Stories

Here are the user stories that were written and completed for the application.

1.) As a user, I can add a Drive-in Theater to the application

2.) As a user, I can add a Movie to the application

3.) As a user, I can add Movie Showtimes for a Movie in the application

4.) As a user, I can delete a Movie from the application

5.) As a user, I can update Movie Showtimes on a Movie showing at a Drive-In Theater.

6.) As a user, I can delete a Drive-in Theater from the application

7.) As a user, I can update the movie name and movie description.  This update will be updated at every drive-in.

8.) As a user, I can update the Drive-in Theater name and address.

9.) As a user or customer, I can view a list of Drive-In Theaters.

10.) As a user or customer, I can view Movies with list of Drive-In Theaters that are showing the movie.

11.) As a user or customer, I want to view a list of Movies by the hour and see the Drive-In Theaters that are showing them.

12.) As a user or customer, I want to view a list of Drive-In Theaters by the hour and see what Movies they are showing.

13.) As a user, I can login and be authenticated in the application so I can create, update, and delete both Movies and Drive-In Theaters.  I can also add, update, and delete movies from the Drive-In theaters.

14.) Apply the Materialize CSS style framework to provide a more professional look.  This includes using CSS Collections and checkboxes on the view pages.  It also includes using a nav bar from the Materialize CSS style framework.

15.) As a user, I can navigate to the drive-in theater show page and see a Google Map of the location of the drive-in theater.

16.) As a user, I can easily navigate to different pages with the use of EJS partials integrated into the full-stack app.

17.) As a user, I can Create, Read, Update, and Delete Snack items.  The Snack data model is NOT yet connected to the drive-in theater data model.


### Data Model
The data model mainly consists of two different schemas: Movies and Drive-Ins.

The Movies Schema Model consists of two fields:

| Field | Description |
| --- | :---: |  
| Title | Title of Movie |
| Description | Description of Movie | 

The Drive-Ins Schema Model consists of these fields:

| Field | Description |
| --- | :---: |  
| Name | Name of Drive-In |
| Address | Address of Drive-In (i.e. City and State) | 
| Movies Array | Array of movies that are showing at the Drive-In Theater |
| Showtimes Array | Array of an array of showtimes for movies at the Drive-In Theater | 

The indices of the Movies Array correspond with the indices of the Showtimes Array.  This means that a movie that is at index 2 of the Movies Array would have showtimes that correspond with index 2 of the Showtimes Array.  The Showtimes array at index 2 would consist of an array of the showtimes for that movie at that drive-in theater.  Note that the Movies Array contains references to the Movies Schema and NOT the titles of the movies.

For example:

| Array Field | Value |
| --- | :---: |  
| Movies Array | [Reference to "Thor", Reference to "Star Wars", Reference to "Parasite", Reference to "The Irishman"] |
| Showtimes Array | [ ["7:00", "8:00", "9:00"], ["7:00", "9:00"], ["7:00", "8:00"], ["8:00", "9:00"] ] | 


### Data Model Challenges:
The main challenge with the data model was keeping the correspondence between the index of the Movies Array and the index of the Showtimes Array.  If a movie is pushed to the Movies Array, then the array of showtimes for that movie are also pushed to the Showtimes Array so that the indices continue to correspond.  If a movie is removed from the array, the corresponding index of showtimes must also be removed from the array as well.

When updating a showtime on an existing movie at a drive-in theater, the new movie reference and the new array of showtimes are pushed onto  the Movies Array and the Showtimes Array, respectively.  The algorithm of the PUT method in the Drive-In Controller then scans the arrays for duplicates.  When a duplicate is found, the original movie reference and the corresponding array of showtimes for that movie are removed from the drive-in object.  This process ensures that the showtimes are updated for an existing movie while keeping the movies and showtimes aligned with each other.


#### Technologies and Libraries
- Node.js
- MongoDB and Mongoose
- Express and EJS
- Flexbox CSS Framework
- Materialize CSS Framework
- Google APIs


## Components

Here is a brief description of the components of the system.

| Component | Description | 
| --- | :---: |  
| Movie Controller | This controller contains the routes for the Movie object model | 
| Drive-In Controller | This controller contains the routes for the Drive-In object model | 
| Food Controller | This controller contains the routes for the Food object model | 
| Movie Views | Views for the Movie object model |
| Drive-In Views | Views for the Drive-In object model |
| Food Views | Views for the Drive-In object model | 


## Minimum Viable Product

- A working full-stack application using Node.js, MongoDB, Express and EJS

- Adhere to the MVC file structure: Models, Views, Controllers

- Two models with all 7 RESTful routes and full CRUD for both models
  - Movie Model
  - Drive-In Model

- Two models that are associated in a many-to-many relationship with each other

- A git repository not inside the class repo.

- At least one Github commit per day.

- Wrote over 10 User Stories (i.e. 17 user stories)

- Deployed full-stack application online and it is accessible to the public via Heroku


## Beyond Minimum-Viable-Product

- Authentication feature for create, update, and delete functionality on both Drive-In and Movie models

- EJS Partials integrated into application for easy navigation

- Integrated CSS Frameworks using Flexbox and Materialize CSS

- Integrated Google Maps on Drive-In Theater Show Page

- Started building a model for Snacks/Food Packages


## Code Snippet
Here is a code snippet below that I am proud of and found challenging.  This part of the code loops over the drivein object and look for duplicates in the array.  It compares each element of the drivein object with every other element of the drivein object.  When a duplicate is found, the duplicate copy that appears first is spliced from the array since this is the older version of the information.  Note that both the movies and showtimes array are both spliced in order to keep the correspondence between the reference to a movie and the array of showtimes for that movie.

One other thing to note about this snippet of code is that the comparisons start over again if duplicates are found.  This is because many duplicates can be found and the removal of multiple elements could mean that ceratin elements may not be compared with each other.  I could have used while loops and then not advanced the counter when a match was found, but I felt it was more simpler algorithmically to run through the code again.  For a relatively small number of elements in each array, I felt that this solution was acceptable.

```
  // This algorithm goes through the drivein object and removes the duplicates
    // The updated movies are pushed after the original movies and showtimes
    // Remove the earlier instances since the later instances have more updated data
    let duplicateFlag = true;
    while (duplicateFlag) {
      duplicateFlag = false;
      for (let i=0; i<drivein.movies.length; i++) {
        for (let j=i; j<drivein.movies.length; j++) {
          if (i != j) {
            if (String(drivein.movies[i]) == String(drivein.movies[j])) {
              drivein.movies.splice(i, 1);
              drivein.showtimes.splice(i, 1);
              duplicateFlag = true;
            }
          }
        }
      }
    }
```


## Future Enhancements:

1.) The Snack object model was implemented in the Drive-In application, but it was not connected to the Drive-In object model yet.  A future enhancement could have the user able to see what types of snacks and food packages (i.e. romantic packages) are available at which drive-in theaters.

2.) The address field of the drive-in theaters is a text field in the Drivein Schema.  The value in the address field is used as a query in the Google API script plug-in.  The Google search engine parser does a good job with a loose entry of the address of the drive-in theater to produce a map of that area.  A future enhancement could have the city and states correspond with entries from another location database.

3.) Each movie could have a movie poster associated with that movie.  The user could pull up the movie poster when on the show page of the movie.  It might be useful from a marketing perspective to have the movie thumbnail picture adjacent to the entry for the movie on the drive-in movie page.

4.) Each drive-in theater could have pictures of that drive-in theater on their page.  The drive-in theater could also have a gallery page to enable the user to see all the fun things that you can do at the drive-in theater.  The user could get a good idea of what the movie theater looks like before going there.

5.) Each drive-in theater could have a model for parking spaces to understand what availability there is at the drive-in movie for a certain showing.

6.) An application process so that the owner of a parking lot could offer the lot for rental if the drive-in company determines that the lot could bring in some revenue (i.e. prime location, nice view, good population).

