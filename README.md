# WEB103 Project 3 - *Virtual Community Space*

Submitted by: **Judah Bowers**

About this web app: **This is about creating a site that displays events in different locations in an interactive way**

Time spent: **30** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [X] **The web app uses React to display data from the API**
- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [X]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [X]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [X] **The web app displays a title.**
- [X] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [X] *Note: A non-visual list of links to different locations is insufficient.* 
- [X] **Each location has a detail page with its own unique URL.**
- [X] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [X] An additional page shows all possible events
  - [X] Users can sort *or* filter events by location.
- [X] Events display a countdown showing the time remaining before that event
  - [X] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='client\public\Virtual-Community-Space.gif' title='Virtual Community Space' width='' alt='Video Walkthrough' />


GIF created with ...  ScreenToGif

## Notes

Describe any challenges encountered while building the app or any additional context you'd like to add.
- Combining Express and React routing together to make this project work
- Using the right scripts to send the data to the database
- Having the countdown appear
- Having the controllers function properly
- Making sure that the data from the database is properly seen in the grid