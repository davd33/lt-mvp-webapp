#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli() {
	aws --version
	aws configure set default.region eu-central-1
	aws configure set default.output json
}

deploy_cluster() {

    family="lt-mvp-webapp-task-family"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster LtCluster --service Webapp --task-definition $revision | \
          $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi
}

make_task_def() {
	task_template='[
		{
			"name": "lt-mvp-webapp",
			"image": "%s.dkr.ecr.eu-central-1.amazonaws.com/lt-mvp-webapp:%s",
			"essential": true,
			"memory": 500,
			"cpu": 10,
			"portMappings": [
				{
					"containerPort": 4200,
					"hostPort": 80
				}
			]
		}
	]'

	task_def=$(printf "$task_template" $AWS_ACCOUNT_ID $CIRCLE_SHA1)
}

push_ecr_image() {
	eval $(aws ecr get-login --region eu-central-1)
	docker push $AWS_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/lt-mvp-webapp:$CIRCLE_SHA1
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi
}

configure_aws_cli
push_ecr_image
deploy_cluster
