rm -rf node_modules
mv /node_modules node_modules

cd /react-generic-form
npm link

cd /app
npm link react-generic-form

npm run dev-server-build
