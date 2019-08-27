### anychannel

test project

## Provisioning on Google Cloud (GKE)

#### Setting up Travis CI with service account credentials

```zsh
cp path/to/service-account.json $(pwd)/
docker run -it -v $(pwd):/app ruby:2.3 sh
cd app
gem install travis
travis login --pro
travis encrypt-file service-account.json --pro -r $REPO_NAME
```

#### Configuring Google Cloud CLI

```zsh
# set project context
gcloud config set project $PROJECT
gcloud config set compute/zone $ZONE
gcloud container clusters get-credentials $CLUSTER

# create secret
kubectl create secret generic pgpassword --from-literal PGPASSWORD=$PGPASSWORD
```

#### Help setup

```zsh
# Installation
curl -LO https://git.io/get_helm.sh
chmod 700 get_helm.sh
./get_helm.sh

# Assign service account to tiller
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-role --clusterrole=cluster-admin --serviceaccount=kube-system:tiller

# Init
helm init --service-account tiller --upgrade
```

#### Install Ingress-Nginx

```zsh
helm install stable/nginx-ingress --name my-nginx --set rbac.create=true
```

TODO

- fix migrations setup -> ormconfig.js, "typeorm migration:generate -n CreateDatabase"
- test k8 build
