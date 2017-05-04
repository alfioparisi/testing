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
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have url', () => {
           // Chek that every feed as a url defined.
           allFeeds.forEach(feed => {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe('');
           });
         });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have name', () => {
           // Check that every feed has a name defined.
           allFeeds.forEach(feed => {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           });
         });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', () => {

      /* Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
       it('should be hidden by default', () => {
         // Check wheter the body has the .menu-hidden class.
         expect($('body').hasClass("menu-hidden")).toBe(true);
       });

       /* Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('should change visibility on icon click', () => {
          // Trigger the click event on .menu-icon
          $('.menu-icon-link').click();
          // Check that the body hasn't the .menu-hidden class.
          expect($('body').hasClass('menu-hidden')).toBe(false);

          // Again, but body has to have the class.
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
      });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial entries', () => {

      /* Write a test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      * Remember, loadFeed() is asynchronous so this test will require
      * the use of Jasmine's beforeEach and asynchronous done() function.
      */

      // Pass done to beforeEach, so the spec will wait for loadFeed() to run.
      beforeEach(done => loadFeed(0, done));

      // Check that .entry has content.
      it('should not be empty', () => expect($('.feed .entry').length).not.toBe(0));

    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {

      /* Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */

       // Save the content of the list when we load the feeds at index 0 and 2.
       let a = '', b = '';
       beforeEach(done => {
         setTimeout(() => {
           loadFeed(0, () => {
             a = $('.feed').html();
             loadFeed(2, () => {
               b = $('.feed').html();
               done();
             });
           });
         }, 3000);
       });
       beforeEach(done => loadFeed(0, () => {
         a = $('.feed').html();
         loadFeed(2, () => {
           b = $('.feed').html();
           done();
         });
       }));

      it('should update the content', () => {
        // Check if the list actually has content.
        // Check that the content changes after a new call to loadFeed()
        expect(a).not.toBe('');
        expect(b).not.toBe('');
        expect(a).not.toEqual(b);
      });

    });

}());
