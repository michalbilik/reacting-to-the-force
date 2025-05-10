#! /bin/bash

cd ..
npm install 
npm run build

cd infra

terraform init
terraform plan -out=plan.tfplan
terraform apply plan.tfplan

CLOUDFRONT_DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)

cd ..

aws s3 cp dist/ s3://reacting-to-the-force-static --recursive

aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*" >> /dev/null 2>&1

echo "Deployment completed successfully!"
