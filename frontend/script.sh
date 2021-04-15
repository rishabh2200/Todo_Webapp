#!/bin/bash
rm -rf build && \
REACT_APP_URL=$TODO_URL npm run build && \
aws s3 rm s3://$TODO_BUCKET_NAME --recursive && \
aws s3 sync build/ s3://$TODO_BUCKET_NAME  && \
aws cloudfront create-invalidation --distribution-id $TODO_CLOUD_DISTRIBUTION --paths "/*" 

