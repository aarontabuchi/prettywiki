# PrettyWiki

Wikipedia, but easy to read!

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

## Project and Technologies

PrettyWiki uses a [Google](google.com){:target="_blank"}
<a href="http://google.com" target="_blank">external link</a> styled search page connected to wikipedia's API. It then takes users to a [Medium](medium.com){:target="_blank"} styled article page for easy reading.

React is used for fast, reusable compenents.
Next.js is used for handling the dynamic routing of the search results to their own page.
