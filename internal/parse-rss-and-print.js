function parseRSS(link){
  let parser = new RSSParser();
  parser.parseURL(link, function(err, feed) { 
  if (err) throw err;
  for (let i = 0; i < 11; i++) {
    const entry = feed.items[i];
    console.log('Entry:', entry); // for debugging
    printPost(entry, i);
  }
});
}

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
    if (number == 0){ //only article0 has a quote element
    const articleQuote = document.getElementById('article' + number + 'ArticleQuote');
    console.log('Article Quote:', articleQuote);
    articleQuote.innerText = entry.creator;
    }

    const articleImage = document.getElementById('article' + number + 'Image');
    console.log('Article Image Element:', articleImage); // for debugging

    // this doesn't seem to work, and it seems each news site displays these differently, so thats cool!
    // i wonder if we can rig up a google search api type deal to get a generic image so we don't have to rely on the providers
    // however, that could be rather odd if the images don't make sense
    // todo: figure out what we are going to do for images!
    //
    // if (articleImage) {
    //   const imageUrl = extractImageUrl(entry);
    //   console.log('Image URL:', imageUrl); // for debugging
  
    //   if (imageUrl) {
    //     articleImage.src = imageUrl;
    //     articleImage.className = 'img-fluid';
    //   }
    // } else {
    //   console.log('Article Image Element not found.'); // for debugging
    // }
  }

parseRSS('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
  
// cnn - http://rss.cnn.com/rss/cnn_topstories.rss <- Access-Control-Allow-Origin
// nyt - https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml <- works
// npr - https://feeds.npr.org/1001/rss.xml <- Access-Control-Allow-Origin