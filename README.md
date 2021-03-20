# [PrettyWiki](https://www.prettywiki.netlify.app)

Wikipedia, but easy to read!
### [Live here!](https://www.prettywiki.netlify.app)

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

The ideal text length is [reportedly 45 to 75 characters](https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/){:target="_blank"}.

Setting a max-width for articles creates a much better user experience.

` /* Fun fact: CSS has a 'ch' unit that represents the width of the font's character "0", presumably to solve the above problem. */ `

## Project and Technologies

[PrettyWiki](https://www.prettywiki.netlify.app) uses a [Google](https://www.google.com) styled search page to fetch [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) search results.

Following a search result then takes users to the wiki article, but styled like [Medium](https://www.medium.com)(a popular online publishing platform).

[React](https://www.reactjs.org) is used for fast, reusable compenents.

[Next.js](https://www.nextjs.org) is used for handling the dynamic routing of the search results to their own page.
