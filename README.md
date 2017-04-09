## getTumblrPhotos

It's definitely not the best way to do this, but works.

Usage example:
```sh
TUMBLR_CONSUMER_KEY=**************************************** \
TUMBLR_CONSUMER_SECRET=**************************************** \
TUMBLR_TOKEN=**************************************** \
TUMBLR_TOKEN_SECRET=**************************************** node app.js > likedPhotoList
```
```sh
mkdir likedPhotos && cd likedPhotos
nohup parallel -a ../likedPhotoList --jobs 20 wget &
```
