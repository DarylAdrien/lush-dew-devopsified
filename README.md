# 🌿 lushdew-devopsified

This project is a fully DevOpsified version of the `lushdew` application, demonstrating the entire lifecycle from local development to production-grade deployment using containerization, Kubernetes, Helm, CI/CD (GitHub Actions + ArgoCD), and monitoring with Prometheus & Grafana.

---

## 📦 Project Workflow Overview

1. [Run the application locally](#1-run-locally)
2. [Containerize the application and push to registry](#2-containerize-application)
3. [Create Kubernetes manifests](#3-kubernetes-manifests)
4. [Set up Ingress Controller](#4-ingress-controller)
5. [Create Helm chart from manifests](#5-helm-setup)
6. [Configure CI/CD using GitHub Actions and ArgoCD](#6-cicd-pipeline)
7. [Enable Monitoring with Prometheus and Grafana](#7-monitoring-stack)

---

## 1. 🚀 Run Locally

Before deploying, ensure your application runs successfully in the local environment:

```bash
# Frontend (React)
npm install
npm run dev
```

```bash
# Backend (Django)

pip install -r requirements.txt
python manage.py runserver

```

---

## 2. 🐳 Containerize Application

Create a Dockerfile and build your image:

    docker build -t lushdew:latest .

Tag and push to your container registry (e.g., Docker Hub or GitHub Container Registry):

    docker tag lushdew:latest your-docker-id/lushdew:latest
    
    docker push your-docker-id/lushdew:latest

---

## 3. 📁 Kubernetes Manifests

Create the required Kubernetes manifests:

    deployment.yaml

    service.yaml

    ingress.yaml

Make sure they are configured correctly for your app.

---

## 4. 🌐 Ingress Controller & Local DNS

Ingress controller concept   (ingress <-- ingress controller  --> load balancer)

Use Minikube's NGINX ingress controller addon:

    minikube addons enable ingress

Configure local DNS:

    sudo vim /etc/hosts

    Add:
    
    127.0.0.1 lushdew.local

---

## 5. 📦 Helm Setup

Create a Helm chart:

    helm create lushdew-chart

Move your existing Kubernetes manifests into the templates/ folder of the Helm chart.

Use values.yaml to parameterize your configs.

Install the chart on the cluster:

    cd helm
    
    helm install lushdew-chart ./lushdew-chart  ( from helm directory , run this command)

---

## 6. 🔁 CI/CD Pipeline


### CI - GitHub Actions

Configure a .github/workflows/deploy.yml for your build, test, and image push steps.

### CD - ArgoCD Setup

Create the ArgoCD namespace:

    kubectl create namespace argocd

Install ArgoCD:

    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

Expose ArgoCD via NodePort:

    kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'


To get the initial password

    kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

---

## 7. 📊 Monitoring Stack

### Install Prometheus

    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    
    helm repo update

    helm install prometheus prometheus-community/prometheus

    kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-ext

### Install Grafana

    helm repo add grafana https://grafana.github.io/helm-charts
    
    helm repo update

    helm install grafana grafana/grafana

    kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

    kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-ext

### Configure Grafana

Visit Grafana at the exposed NodePort.

Login using:

    Username: admin

    Password: (retrieved above)

Add Prometheus as a data source.

Import dashboard ID 3662 from Grafana dashboard marketplace.

---

## ✅ Final Outcome

🚀 Application runs on Kubernetes via Helm

🔄 Automatic CI/CD pipeline using GitHub Actions and ArgoCD

📊 Real-time monitoring enabled with Prometheus + Grafana

