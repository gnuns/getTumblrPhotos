const _ = require('lodash')
const tumblr = require('tumblr.js')
const client = tumblr.createClient({
  consumer_key: process.env.TUMBLR_CONSUMER_KEY,
  consumer_secret:  process.env.TUMBLR_CONSUMER_SECRET,
  token: process.env.TUMBLR_TOKEN,
  token_secret: process.env.TUMBLR_TOKEN_SECRET
})

function getPhotoList(offset = 0) {
  client.blogPosts('1or1', { type: 'photo', limit: 20, offset: offset }, function (err, data) {
    _.forEach(data.posts, (post) => {
      _.forEach(post.photos, (photo) => console.log(photo.original_size.url))
    })
    if (offset <= (data.total_posts - 19)) getPhotoList(offset + 19)
  })
}

function getLikedPhotoList(before) {
  client.blogLikes('1or1', { before: before }, function (err, data) {
    if (!data.liked_posts.length) return;

    let posts = _.filter(data.liked_posts, {type: 'photo'})
    let last = _.last(posts)

    _.forEach(posts, (post) => {
      _.forEach(post.photos, (photo) => console.log(photo.original_size.url))
    })

    getLikedPhotoList(last.liked_timestamp)
  })
}

getLikedPhotoList(0)
