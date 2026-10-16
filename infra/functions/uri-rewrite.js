// CloudFront viewer-request function (cloudfront-js-2.0).
// The site is a Next.js static export with trailing slashes off, so /blog is blog.html and
// /blog/my-post is blog/my-post.html. S3 has no notion of that, so append ".html" to any
// path whose last segment has no extension. "/" is left alone for default_root_object, and a
// stray trailing slash ("/blog/") is dropped first.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri === "/") {
    return request;
  }
  if (uri.length > 1 && uri.charAt(uri.length - 1) === "/") {
    uri = uri.slice(0, -1);
  }
  var last = uri.slice(uri.lastIndexOf("/") + 1);
  if (last.indexOf(".") === -1) {
    uri = uri + ".html";
  }

  request.uri = uri;
  return request;
}
