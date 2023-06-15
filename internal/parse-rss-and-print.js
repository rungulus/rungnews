let parser = new RSSParser();
parser.parseURL('https://feeds.npr.org/1001/rss.xml', function(err, feed) { //right now we are only pulling from npr, we will deal with more news sources in the future!
  if (err) throw err;
  for (let i = 0; i < 10; i++) {
    const entry = feed.items[i];
    console.log('Entry:', entry); // for debugging
    printPost(entry, i);
  }
});
function extractImageUrl(entry) {
    if (entry.content && entry.content.encoded) {
      const htmlParser = new DOMParser().parseFromString(entry.content.encoded, 'text/html');
      const imgElement = htmlParser.querySelector('img');
      if (imgElement && imgElement.src) {
        return imgElement.src;
      }
    }
  
    if (entry.enclosure && entry.enclosure.url) {
      return entry.enclosure.url;
    }
  
    return null;
  }
  
  
  

  function printPost(entry, number) {
    const articleTitle = document.getElementById('article' + number + "Headline");
    console.log('Article Title Element:', articleTitle); // for debugging
  
    if (articleTitle) {
      articleTitle.innerText = entry.title;
    } else {
      console.log('Article Title Element not found.'); // for debugging
    }
  
    const articleImage = document.getElementById('article' + number + 'Image');
    console.log('Article Image Element:', articleImage); // for debugging
  
    if (articleImage) {
      const imageUrl = extractImageUrl(entry);
      console.log('Image URL:', imageUrl); // for debugging
  
      if (imageUrl) {
        articleImage.src = imageUrl;
        articleImage.className = 'img-fluid';
      }
    } else {
      console.log('Article Image Element not found.'); // for debugging
    }
  }
  
  



  
  
