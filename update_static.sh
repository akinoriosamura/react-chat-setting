npm run build
cp -r ./build ../chat-concierge/
echo "copy build DONE"
cd ../chat-concierge/
docker stop chat-api
docker rm chat-api
docker-compose up -d
echo "docker restart DONE"
cd ../react-chat-setting
