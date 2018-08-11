/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page? Setting allFeeds to be an empty array make the tests
         * fail. The RSS feeds don't show up on the index.html web page
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL and is not empty', function() {
          // Inspect the url property of each RSS feed in turn
          allFeeds.forEach(function (feed) {
            // expect the URL of each RSS feed to be defined
            expect(feed.url).toBeDefined();
            // expect the URL of each RSS feed not to be empty
            expect(feed.url).not.toBe('');
          });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name and is not empty', function() {
          // Inspect the name property of each RSS feed in turn
          allFeeds.forEach(function (feed) {
            // expect the name of each RSS feed to be defined
            expect(feed.name).toBeDefined();
            // expect the name of each RSS feed not to be empty
            expect(feed.name).not.toBe('');
          });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
          // expect the body to have a class of menu-hidden
          expect($('body.menu-hidden')).toBeDefined();
          // or use the attr method to make sure
          // the body has a class of menu-hidden
          // expect($('body').attr('class')).toBe('menu-hidden');
        });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should toggle visibility when the menu icon is clicked', function() {
          // simulate a click event on the menu icon
          $('.menu-icon-link').click();
          // expect the menu to be visible
          // (ensure .menu-hidden is removed from the body)
          expect($('body').attr('class')).not.toBe('menu-hidden');
          // comment the following lines to make menu visible
          // re-simulate a click event on the menu icon
          $('.menu-icon-link').click();
          // expect the menu to be hidden again
          expect($('body').attr('class')).toBe('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
          // ensure feeds have loaded asynchonously
          // before running any tests in this suite
          loadFeed(1, done);
        });
        it('gets at least one entry into the feed container', function(done) {
          // expect the feed container to have at least one entry
          expect($('.feed .entry').size() >= 1).toBe(true);
          done(); // make sure to invoke the callback to avoid Timeout error
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // define variables to hold the feed selection
        // can't have the tests to be interdependent so let's have it here
        let currentFeedSelection, newFeedSelection;
        beforeEach(function(done) {
          // load new feeds to change the content
          loadFeed(2, done);
          // grab current feeds
          currentFeedSelection = $('.feed .entry');
          loadFeed(3, done);
          // grab new feeds
          newFeedSelection = $('.feed .entry');
        });
        it('ensures the content actually changes', function(done) {
          // ensure feed container won't be the same again
          expect(newFeedSelection).not.toBe(currentFeedSelection);
          done();
        });
    })
}());
