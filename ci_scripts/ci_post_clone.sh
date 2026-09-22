#!/bin/sh
# Xcode Cloud runs this right after cloning, before it builds ios/App/App.xcworkspace.
# It rebuilds www/ from the storefront's copy of the game and syncs it into the
# Xcode project, so every build ships the latest web version automatically.
set -e

echo "== Install Node"
brew install node@22 >/dev/null 2>&1 || brew install node
export PATH="/opt/homebrew/opt/node@22/bin:/usr/local/opt/node@22/bin:$PATH"
node --version

echo "== Repo root: $CI_PRIMARY_REPOSITORY_PATH"
cd "$CI_PRIMARY_REPOSITORY_PATH"

echo "== Fetch the web app (public storefront repo)"
rm -rf ../1084.github.io
git clone --depth 1 https://github.com/1084/1084.github.io.git ../1084.github.io

echo "== Install and build www/"
npm ci
npm run prepare-www

echo "== Sync web assets and plugins into the Xcode project"
npx cap sync ios

echo "== Done"
