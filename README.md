# lush-dew-devopsified


->  first run the application locally and test it

->  Then containerize the application and push it to container registry

->  Create a k8s manifest (deployment , service , ingress)

->  set up the ingress controller    (ingress <-- ingress controller  --> load balancer)
In minikube , using addons , nginx controller can be easily setup

configure DNS locally
sudo vim /etc/hosts

->  setup the helm and put the k8s manifest into the helm chart and use the template to varaiblise it

helm create lushdew-chart ( this create the chart where the k8s manifests and values.yml can be done)

To deploy those manifests onto the cluster , use
helm install lushdew-chart ./lushdew-chart  ( from helm directory , run this command)


->  Setup CICD (github actions)

->  Setup argoCD for CD

->  If possible setup monitoring

