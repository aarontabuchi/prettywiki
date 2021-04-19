# [PrettyWiki](https://www.prettywiki.netlify.app)

Wikipedia, but easy to read!
### [See it live here!](https://www.prettywiki.netlify.app)

## Problem

If you've used wikipedia on a large screen, you've seen something like this:

![Wikipedia screenshot](/public/wikipedia_screenshot.png)

The width of the paragraphs will continue increasing with the width of your browser window.

Problems with wide text:

- Is more difficult to skim
  
- Tiring for the eyes, as they have to move a long distance or require turning the head
  
- Is more difficult to return to the next line of text

## Solution

Newspapers, magazines, code editors (80 char limit suggestion), etc. use columns with a max-width to prevent these problems.

The ideal text length is [reportedly 45 to 75 characters](https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/).

Setting a max-width for articles creates a much better user experience.

` /* Fun fact: CSS has a 'ch' unit that represents the width of the font's character "0", presumably to solve the above problem. */ `

![PrettyWiki demo gif](/public/prettywiki_demo.gif)

### [See it live here!](https://www.prettywiki.netlify.app)

## Project and Technologies

[PrettyWiki](https://www.prettywiki.netlify.app) uses a [Google](https://www.google.com) styled and Google functional search page to fetch [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) search results.

Following a search result takes users to the wiki article, but with the look and feel of [Medium](https://www.medium.com), a popular online publishing platform.

[React](https://www.reactjs.org) is used for fast, reusable compenents.

[Next.js](https://www.nextjs.org) is used for handling the dynamic routing of the search results to their own page.

## Google Search Specifications Replicated:
Functional
- Focus is on text input on page load
- Arrow-key up/down navigation through search results
  - Search input changes with arrow-key navigation
  - Typing refreshes the search
  - Up arrow-key does not move text cursor to the beginning of text input
- Click on search result directs to the page
- Hitting Enter on keyboard will also direct to the page
- Clear input by clicking the "X" clear button

Visual
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

## No Search Button
I didn't add the "Google Search" and "I'm feeling lucky" buttons onto my site because Wikipedia isn't for searching and discovering, but an index of the articles. People go to Wikipedia already knowing what they want (typically they get to Wikipedia from a Google search). Hitting enter on Wikipedia search will take the user directly to the top article (unless what the user typed is ambiguous) and not to search results, so I made mine the same.

## Bonus: Google Homepage Visual Bug (is live Apr 19)
While researching the functionality of the Google search bar I found this small visual bug.

1. Go to [Google.com](https://www.google.com) and don't click or type
2. Press the Up Arrow key on your keyboard
3. A drop-down list will be displayed, but it is empty.

If you press the Down Arrow key or click on the search area, the drop-down list will show recent searches and/or trending searches.

Only after being loaded for the first time, the Up Arrow key will now show the drop-down list will recent searches and/or trending searches.

The intended behavior should be to show correctly populated drop-down list and not an empty one, or for the Up Arrow key to not display anything.

You can also find this bug if you keep typing into the search until there aren't any suggestions (e.g. "ggggg"). Without suggestions, the drop-down list will disappear. Pressing the Down Arrow key does not do anything at this point, but pressing the Up Arrow key will bring up the empty drop-down list. The intended behavior for this should be to copy the Down Arrow key and not display anything.

![Google Bug gif](/public/google_search_bug.gif)

I tested and reproduced this on multiple browsers and desktops.
