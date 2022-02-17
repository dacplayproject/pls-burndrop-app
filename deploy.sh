# build
# yarn build

# navigate into the build output directory
cd build

echo 'swap.dacplay.org' > CNAME

git init

git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:dacplayproject/pls-burndrop-app.git master:gh-pages

cd -