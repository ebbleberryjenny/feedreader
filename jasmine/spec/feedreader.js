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
  describe('RSS Feeds', function() {
    it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
    });

    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('all URLS are defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
     it('name defined', function() {
       allFeeds.forEach(function(feed) {
         expect(feed.name).toBeDefined();
         expect(feed.name.length).not.toBe(0);
         expect(feed.name).not.toBe('');
       });
     });
  });

  describe('The menu', function() {
    /* A test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toEqual(true);
    });

   /* A test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */

    it('menu changes when clicked', function() {
      var menuIconLink = $('.menu-icon-link');
      menuIconLink.click();
      expect($('body').hasClass('menu-hidden')).toEqual(false);
      menuIconLink.click();
      expect($('body').hasClass('menu-hidden')).toEqual(true);
    });
  });

  describe('Initial Entries', function() {
    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
     beforeEach(function(done) {
       loadFeed(0, done);
     });

     it('has one entry', function() {
       var entryNumber = $('$.feed.entry').length;
       expect(entryNumber).toBeGreaterThan(0);
     });
  });

  describe('New Feed Selection', function() {
    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
     var firstFeed = $('.feed').html();

     beforeEach(function(done) {
       loadFeed(0, function() {
         loadFeed(1, function() {
           var secondFeed = $('.feed').html();
           done();
         });
       });
     });

     it('content is changed', function() {
       expect($('.feed').html()).not.toEqual(firstFeed);
     });
  });
}());
