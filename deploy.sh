# build images
docker build -t pesiok/anychan-frontend:latest -t pesiok/anychan-frontend:$GIT_SHA -f ./frontend/Dockerfile ./frontend
docker build -t pesiok/anychan-backend:latest -t pesiok/anychan-backend:$GIT_SHA -f ./backend/Dockerfile ./backend

# push images to the repository
docker push pesiok/anychan-frontend:latest
docker push pesiok/anychan-frontend:$GIT_SHA
docker push pesiok/anychan-backend:latest
docker push pesiok/anychan-backend:$GIT_SHA

# update k8 and use newest images
kubectl apply -f kubernetes
kubectl set image deployments/backend-deployment backend=pesiok/anychan-backend:$GIT_SHA
kubectl set image deployments/frontend-deployment frontend=pesiok/anychan-frontend:$GIT_SHA