resource "aws_cloudfront_origin_access_control" "main" {
  name                              = "portfolio.access-control"
  description                       = "Access control for portfolio website"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}


# TODO: configure logging
resource "aws_cloudfront_distribution" "next-bundle" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Distribution for portfolio website"
  default_root_object = "index.html"
  aliases             = ["www.${local.domain_name}", local.domain_name]

  origin {
    domain_name              = aws_s3_bucket.next-bundle.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.main.id
    origin_id                = aws_s3_bucket.next-bundle.bucket
  }

  # logging_config {
  #   include_cookies = true
  #   bucket          = aws_s3_bucket.logs.bucket_domain_name
  #   prefix          = "portfolio/"
  # }

  default_cache_behavior {
    allowed_methods        = ["HEAD", "GET"]
    cached_methods         = ["HEAD", "GET"]
    target_origin_id       = aws_s3_bucket.next-bundle.bucket
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.porfolio_cert.arn
    minimum_protocol_version = "TLSv1"
    ssl_support_method       = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US"]
    }
  }

  tags = local.tags
}

resource "aws_route53_zone" "portfolio_domain" {
  name = local.domain_name

  tags = local.tags
}

resource "aws_route53_record" "site" {
  zone_id = aws_route53_zone.portfolio_domain.id
  name    = ""
  type    = "A"

  alias {
    name    = aws_cloudfront_distribution.next-bundle.domain_name
    zone_id = aws_cloudfront_distribution.next-bundle.hosted_zone_id

    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.portfolio_domain.id
  name    = "www"
  type    = "A"

  alias {
    name    = aws_cloudfront_distribution.next-bundle.domain_name
    zone_id = aws_cloudfront_distribution.next-bundle.hosted_zone_id

    evaluate_target_health = false
  }
}

resource "aws_acm_certificate" "porfolio_cert" {
  domain_name               = local.domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["www.${local.domain_name}", local.domain_name]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.porfolio_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.validation_record : record.fqdn]
}


resource "aws_route53_record" "validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.porfolio_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.portfolio_domain.zone_id
}
