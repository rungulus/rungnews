let parser = new RSSParser();
parser.parseURL('npr-061423.xml', function(err, feed) { 
  //this needs to be local, or else we get a CORS error (Access-Control-Allow-Origin)
  //i'm pretty sure its not github, maybe it's cloudflare, but it also does happen locally
  //so im going to hedge a bet that its the rss-parser.min.js library
  //todo: #4 grab current rss feeds without running into CORS issues
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
  
  



  
  
