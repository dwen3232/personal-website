output "next_bundle_bucket" {
  description = "Bucket for Next.js bundle"
  value       = aws_s3_bucket.next-bundle
}

output "logs" {
  description = "Bucket for logs"
  value       = aws_s3_bucket.logs
}

output "cloudfront_distribution" {
  description = "CloudFront distribution for portfolio app"
  value       = aws_cloudfront_distribution.next-bundle
}
