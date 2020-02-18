rm -rf build
npm run build
rm -rf ../chat-concierge/build
cp -r ./build ../chat-concierge
echo 'update build'

