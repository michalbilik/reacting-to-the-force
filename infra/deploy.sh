#! /bin/bash

cd ..
npm install 
npm run build

cd infra

terraform init
terraform plan -out=plan.tfplan
terraform apply plan.tfplan

S3_BUCKET_NAME=$(terraform output -raw s3_bucket_name)
CLOUDFRONT_DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)

cd ..

aws s3 cp dist/ s3://$S3_BUCKET_NAME --recursive

aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*" >> /dev/null 2>&1

echo "Deployment completed successfully!"
