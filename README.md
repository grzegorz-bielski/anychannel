### anychannel

a test project

## Development

#### Prerequisites

1. [Make](https://www.gnu.org/software/make/)
1. [Docker](https://www.docker.com/)
1. [Kubernetes](https://kubernetes.io/docs/setup/) and ([kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/))
1. [Skaffold](https://skaffold.dev)
1. setting up [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)
1. setting up database:

```zsh
kubectl apply -f ./kubernetes/prod/postgres.yml
```

#### Running the project

1. run the app:

```zsh
make dev
```

## Provisioning on Google Cloud (GKE) with Travis-CI

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

#### Install ingress-nginx chart

```zsh
helm install stable/nginx-ingress --name my-nginx --set rbac.create=true
```

#### Install cert-manager chart

- check steps at [docs](https://docs.cert-manager.io/en/latest/getting-started/install/kubernetes.html)
