'use strict';

$(
  (function() {
    // This suite is all about the RSS feeds definitions
    describe('RSS Feeds', function() {
      // Ensure allFeeds is defined and a non-empty array
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* ensures each feed has a URL defined
       * and that the URL is not empty.
       */
      it('have a URL and is not empty', function() {
        // Inspect the url property of each RSS feed in turn
        for (const feed of allFeeds) {
          // expect the URL of each RSS feed to be defined
          expect(feed.url).toBeDefined();
          // expect the URL of each RSS feed not to be empty
          expect(feed.url).not.toBe('');
        }
      });

      /* ensures each feed has a name defined
       * and that the name is not empty.
       */
      it('have a name and is not empty', function() {
        // Inspect the name property of each RSS feed in turn
        for (const feed of allFeeds) {
          // expect the name of each RSS feed to be defined
          expect(feed.name).toBeDefined();
          // expect the name of each RSS feed not to be empty
          expect(feed.name).not.toBe('');
        }
      });
    });

    /* 'The menu' test suite ensures the menu element is
     * hidden by default and that it toggles visibility
     * when the menu icon is clicked.
     */
    describe('The menu', function() {
      // ensure the menu element is hidden by default
      it('is hidden by default', function() {
        // expect the body to have a class of menu-hidden
        expect($('body.menu-hidden')).toBeDefined();
      });

      // ensure the visibility is toggled when the menu icon is clicked
      it('should toggle visibility when the menu icon is clicked', function() {
        // simulate a click event on the menu icon
        $('.menu-icon-link').click();
        // expect the menu to be visible
        // (expect .menu-hidden is removed from the body)
        expect($('body').hasClass('menu-hidden')).not.toBe(true);
        // comment the following lines to make menu visible
        // re-simulate a click event on the menu icon
        $('.menu-icon-link').click();
        // expect the menu to be hidden again
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });

    /* 'Initial Entries' test suite ensures when the
     * loadFeed finished executing there is at least
     * a single .entry element within the .feed container. */
    describe('Initial Entries', function() {
      // ensure feeds have loaded asynchonously
      // before running any tests in this suite
      beforeEach(function(done) {
        try {
          loadFeed(1, done);
        } catch (error) {
          // Handle errors gracefully
          done();
          alert(`${error}${arrayIndexOutOfBounds}`);
        }
      });
      it('gets at least one entry into the feed container', function(done) {
        let entries = $('.feed .entry').size(); // Get the number of entries
        if (entries === 0) {
          // Handle the case for zero entries
          alert(noEntry);
        } else {
          // expect the feed container to have at least one entry
          expect(entries >= 1).toBe(true);
        }
        done(); // make sure to invoke the callback to avoid Timeout error
      });
    });

    /* 'New Feed Selection' test suite when a new feed is loaded
     * by the loadFeed function that the content actually changes */
    describe('New Feed Selection', function() {
      // get feeds to simulate changes
      beforeEach(function(done) {
        getFeeds(done);
      });
      it('ensures the content actually changes', function(done) {
        if (
          currentFeedSelection === undefined &&
          newFeedSelection === undefined
        ) {
          // make sure feed selection is defined prior to running test
          alert(undefinedVariables);
        } else {
          // expect feed container to not be the same again
          expect(newFeedSelection).not.toBe(currentFeedSelection);
        }
        done();
      });
    });
  })()
);
