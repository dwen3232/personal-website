# TODO: add bucket versioning?
resource "aws_s3_bucket" "next-bundle" {
  bucket = "portfolio.next-bundle"

  tags = local.tags
}

data "aws_iam_policy_document" "cdn_policy_document" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.next-bundle.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.next-bundle.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "cdn_policy" {
  bucket = aws_s3_bucket.next-bundle.bucket
  policy = data.aws_iam_policy_document.cdn_policy_document.json
}

# -------

resource "aws_s3_bucket" "logs" {
  bucket = "portfolio.logs"

  tags = local.tags
}

# TODO: configure the bucket for logs
resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.bucket
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "logs" {
  depends_on = [aws_s3_bucket_ownership_controls.logs]
  bucket     = aws_s3_bucket.logs.bucket
  acl        = "private"
}
