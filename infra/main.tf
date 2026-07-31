terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket       = "davidrwen-personal-website-tfstate"
    key          = "infra/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}

provider "aws" {
  region = "us-east-1"
}

locals {
  tags = merge(var.tags, {
    "project" = "portfolio"
  })

  domain_name = "davidrwen.com"
}
