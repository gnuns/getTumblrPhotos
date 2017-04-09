const tumblr = require('tumblr.js');
const client = tumblr.createClient({
  consumer_key: process.env.TUMBLR_CONSUMER_KEY
});

function getPhotoList(offset = 0) {
  client.blogPosts('1or1', { type: 'photo', limit: 20, offset: offset }, function (err, data) {
    for (let post of data.posts) {
      for (let photo of post.photos) {
        console.log(photo.original_size.url);
      }
    }
    if (offset <= (data.total_posts - 19)) getPhotoList(offset + 19);
  });
}

getPhotoList();
