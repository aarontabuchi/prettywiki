![PrettyWiki](/public/logo.svg)

### Wikipedia, but easier to read! [Try it here!](https://www.prettywiki.netlify.app)

## Table of Contents
- [Problem](https://github.com/aarontabuchi/prettywiki#problem)
- [Solution](https://github.com/aarontabuchi/prettywiki#solution)
- [Project and Technologies](https://github.com/aarontabuchi/prettywiki#project-and-technologies)
- [Demo](https://github.com/aarontabuchi/prettywiki#demo)
- [Google Search Specifications Replicated](https://github.com/aarontabuchi/prettywiki#google-search-specifications-replicated)
- [Learnings](https://github.com/aarontabuchi/prettywiki#learnings)
- [Design Decisions](https://github.com/aarontabuchi/prettywiki#design-decisions)
- [Bonus: Google Homepage Visual Bug](https://github.com/aarontabuchi/prettywiki#bonus-google-homepage-visual-bug)

## Problem

If you've used Wikipedia on a large screen, you've seen something like this:

![Wikipedia screenshot](/public/wikipedia_screenshot.png)

The width of the paragraphs will continue increasing with the width of your browser window.

Problems with wide text:

- Is more difficult to skim
  
- Tiring for the eyes, as they have to move a long distance or require turning the head
  
- Is more difficult to continue reading on the next line of text

## Solution

Newspapers, magazines, code editors (80 char limit suggestion), etc. use columns with a max-width to prevent these problems.

The ideal text length is [reportedly 45 to 75 characters](https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/).

Setting a max-width for articles creates a much better user experience.

```css
/* Fun fact: CSS has a 'ch' unit that represents the width of the font's character "0", presumably to solve the above problem. I set the article pages to have a max-width of 70ch */
```

## Project and Technologies

[PrettyWiki](https://www.prettywiki.netlify.app) uses a [Google](https://www.google.com) styled and Google functional search page to fetch [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) search results.

Following a search result takes users to the Wiki article, but with the look and feel of [Medium](https://www.medium.com), a popular online publishing platform.

[React](https://www.reactjs.org) is used for fast, reusable compenents.

[Next.js](https://www.nextjs.org) is used for handling the dynamic routing of the search results to their own page.

## Demo
![PrettyWiki demo gif](/public/prettywiki_demo.gif)

### [Try it here!](https://www.prettywiki.netlify.app)

## Google Search Specifications Replicated:
### Functional
- Focus is on text input on page load
- ArrowUp/Down keys navigate through search results
  - Search input changes with arrow-key navigation
  - Typing refreshes the search
  - ArrowUp key does not move text cursor to the beginning of text input
- Click on search result directs to the page
- Hitting Enter on keyboard will also direct to the page
- Clear input by clicking the "X" clear button
- Escape key hides the search results and removes auto-completed text from the input
  - Clicking on the input or pressing the ArrowUp/ArrowDown key will redisplay the search results without changing the selection
  - The ArrowLeft/ArrowRight keys move the text cursor without affecting the search results display

### Visual
- Box shadow appears on hover and focus of the input
  - but not when there are no search results!
- Highlight on arrow-key selected search result or on mouse cursor hover
  - Mouse movement overrides arrow-key selection highlight
  - Using arrow-keys after mouse movement will pick up from where mouse cursor was
- Clicking outside of search input hides the search results
- Show "X" clear-input button after type input
- Auto-completed/search result suggestions are **bold** with the typed text not bold
- The typed input capitalization of the user is preserved
- Search results have search/magnifying glass icon
- On mobile:
  - Search input is not in focus on page load
  - Clicking into search input makes the search go full screen (hides the logo to make room for the on-screen keyboard)

## Complete End-to-End test coverage with Cypress
![PrettyWiki complete e2e test coverage](/public/completeTestCoverage.gif)

## Learnings
### Project Scope and Planning
This project really taught me the importance of project scoping and planning. My initial plan was to just make the Wiki article page look like Medium and to have a Google styled search page. Only later on did I decide to copy all the functionality of Google search, and I was adding each function in piecewise, instead of considering how they would integrate together.

I wanted the arrow-keys to work with the search results, so I added that function in after I already had a CSS hover state added to show which search result was hovered by the mouse cursor. This caused a visual bug that if a user selected a search result with the arrow-keys and then moved the mouse cursor over a different search result, it would show the two different search results in the selected/hover state. To fix this I needed to have both the mouse and the arrow-keys control the same "selected" state so that there would never appear to be two search results selected at the same time.

Fixing that issue caused a different bug. I was using the "selected" state to update the search input, but it should update for the arrow-keys and not for the mouse cursor (because that is how Google does it (and it is a better user experience), otherwise I would have just left it). To fix this I needed to have a separate state for just the arrow-keys, and another state for visually updating the selected search result.

These multiple issues could have been avoided by properly scoping the project from the beginning, and also teaches me how a client (me, in this case), adding on additional requirements or deliverables during development can greatly delay the process.

### Programming Principles
I also learned first-hand how bad design and practices leads to spagetti code and bugs. I believe the above problems highlight not following the *separation of concerns principle* of separating the visual and data content, as well as the *single-responsibility principle* of one function being responsible for one functionality.

Test driven development would have also helped me think about the design and state-management more, without having to break something with each function I added.

### Testing
After completing this project, I decided to come back and practice adding tests. I used Cypress to get *nearly* complete end-to-end and functional testing of my entire app. The one specification that Cypress couldn't test is the CSS psuedo hover states: [6 year old feature request](https://github.com/cypress-io/cypress/issues/10), so still 100% test coverage with what Cypress can accomplish.

#### Flaw in my testing
I used snapshots for the visual testing of the mousemove highlight interaction. This works, except in the edge case that the most popular search results for the search string used in my test are changed, and then the test will give a false-positive fail, due to the snapshot differing, but the highlight interaction actually is ok.

To fix this it looks like I would need to stub my fetch request with fake results so that the search results don't change. I'm not sure how I'd implement this in my own app right now, because the fetch is called from the keyup event and sets the fetch results using React state method.

## Design Decisions
### No Search Buttons
I didn't add the "Google Search" and "I'm feeling lucky" buttons onto my site because Wikipedia isn't for searching and discovering, but an index of the articles. People go to Wikipedia already knowing what they want (typically they get to Wikipedia from a Google search). Hitting enter on Wikipedia search will take the user directly to the top article (unless what the user typed is ambiguous) and not to search results, so I made mine the same.

### No Search Bar on Article Page
I didn't add the search bar because Medium doesn't have one unless you are signed in to Medium. The style is very minimalistic and just a logo and search bar didn't look very good at the top of the page without other elements like "Sign in"/Profile and other navigation.
However, the search bar on the homepage is a stand alone React component so it is readily available to be reused in other places.

## Bonus: Google Homepage Visual Bug
While researching the functionality of the Google search bar I found this small visual bug.

1. Go to [Google.com](https://www.google.com) and don't click or type
2. Press the ArrowUp-key on your keyboard
3. A drop-down list will be displayed, but it is empty

If you press the ArrowDown-key or click on the search area, the drop-down list will show recent searches and/or trending searches.

Only after being loaded for the first time, the ArrowUp-key will now show the drop-down list will recent searches and/or trending searches.

The intended behavior should be to show correctly populated drop-down list and not an empty one, or for the ArrowUp-key to not display anything.

You can also find this bug if you keep typing into the search until there aren't any suggestions (e.g. "ggggg"). Without suggestions, the drop-down list will disappear. Pressing the ArrowDown-key does not do anything at this point, but pressing the ArrowUp-key will bring up the empty drop-down list. The intended behavior for this should be to copy the ArrowDown-key and not display anything.

![Google Bug gif](/public/google_search_bug.gif)

### Bonus Bonus!
This bug is also present in the search of Google Images and Shopping. The ArrowUp-key on News, Videos, Maps etc. just returns the cursor to the start of the text like a normal text input element.

![Images Search bug](/public/images_search_bug.png)

![Shopping Search bug](/public/shopping_search_bug.png)
