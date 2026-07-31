# infra

Terraform for the AWS infra behind davidrwen.com: S3 (content + logs), CloudFront, Route53, ACM.

Previously lived in `myinfra`'s `portfolio` module; moved here so this site's infra has its own
state, independent of unrelated projects.

## State

Remote backend: S3 bucket `davidrwen-personal-website-tfstate`, key `infra/terraform.tfstate`,
region `us-east-1`. Locking via S3 conditional writes (`use_lockfile = true`, requires
Terraform >= 1.10 — this repo pins 1.15.8 via `.tool-versions`).

The backend bucket itself is **not** managed by this Terraform config (avoids the chicken-and-egg
problem of a backend managing its own bucket). It was created once via:

```bash
BUCKET=davidrwen-personal-website-tfstate
REGION=us-east-1

aws s3api create-bucket --bucket "$BUCKET" --region "$REGION"
aws s3api put-bucket-versioning --bucket "$BUCKET" --versioning-configuration Status=Enabled
aws s3api put-bucket-encryption --bucket "$BUCKET" \
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"},"BucketKeyEnabled":true}]}'
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

## Usage

No CI runs Terraform for this directory — apply manually, same as `myinfra` today.

```bash
cd infra
terraform init
terraform plan
terraform apply
```

AWS credentials come from your local AWS CLI configuration (same account/profile used for
`myinfra`, account `730335404092`).

## Notes

- `aws_route53_zone.portfolio_domain` is the authoritative DNS zone for `davidrwen.com` — never
  destroy/recreate it; a new zone gets new NS records and breaks domain delegation.
- The GitHub Actions deploy workflow (`.github/workflows/cicd.yml`) references the S3 bucket and
  CloudFront distribution by name/ID via GitHub vars/secrets, not via Terraform state — it needs
  no changes as long as those real-world resource identities stay the same.
- The GitHub OIDC provider and IAM role (`github-actions-rmodi`) that the deploy workflow assumes
  live in `myinfra`'s `core` module, shared with another project — intentionally not part of this
  repo.
