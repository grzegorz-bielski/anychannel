### anychannel

test project

#### setting up Travis CI with service account credentials

```zsh
cp path/to/service-account.json $(pwd)/
docker run -it -v $(pwd):/app ruby:2.3 sh
gem install travis
travis login
travis encrypt-file service-account.json -r $REPO_NAME
```
