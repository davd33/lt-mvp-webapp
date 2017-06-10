#!/usr/bin/env bash

configure_aws_cli() {
	aws --version
	aws configure set default.region eu-central-1
	aws configure set default.output json
}

push_ecr_image() {
	eval $(aws ecr get-login --region eu-central-1)
	docker push $AWS_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/lt-mvp-webapp:$TAG
}

configure_aws_cli
push_ecr_image
