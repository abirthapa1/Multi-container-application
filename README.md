# Multi-container Application 🚀

This repository contains Infrastructure as Code (IaC) and automation scripts to provision infrastructure and deploy an application which uses the **MERN** stack using **Terraform**,**Docker** , **Ansible**, and **GitHub Actions**.

---

## Requirements

- Knowledge of AWS EC2, VPC and security groups
- Intermediate knowledge of Ansible and github actions
- Good knowledge of containerization and docker
- Good knowledge of MERN stack.

## 📂 Project Structure

```bash
multi-container-application/
├── .github/
│   └── workflows/
│       └── deploying.yaml
├── backend/
│   ├── connection/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── store/
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── roles/
│   └── docker/
│       └── tasks/
│           └── main.yaml
├── terraform/
│   ├── main.tf
│   ├── outputs.tf
│   └── variables.tf
├── .gitignore
├── README.md
├── docker-compose.yaml
└── setup-server.yaml
```

---

## ⚙️ Tools & Technologies

- **Terraform** → Infrastructure provisioning (EC2 instance, VPC, Security Group)
- **Ansible** → Configuration management & application deployment
- **GitHub Actions** → CI/CD automation pipeline
- **MERN** → Created Application 

---

## 🚀 Workflow

1. **Terraform** provisions the infrastructure (e.g., EC2 instance on AWS).
2. **Ansible** connects to the provisioned host and:
   - Installs dependencies (Node.js, npm, package.json, docker and docker compose)
3. **GitHub Actions** automates:
   - Ansible playbook execution on the designated hosts.
   - Creates new images and pushes it to dockerhub.
   - Runs docker compose up to deploy the application
   - Continuous deployment on code changes
4. **Docker** to:
   - Containerize the application and API
   - Push and pull the images from dockerhub
5. **Docker-compose** to:
   - Handle multi-container deployments by using one simple configuration file
6. **MERN** stack used to create the application.

---

## 🔑 Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/abirthapa1/Multi-container-application.git
cd Multi-container-application
```

### 2️⃣ Provision Infrastructure with Terraform

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### 3️⃣  CI/CD with GitHub Actions

**Note**: Make sure you have added the secrets with the correct naming as written in the workflow yaml.

```bash
SSH_HOST: <public-ip-address>
SSH_KEY: <private-key-file>
DOCKERHUB_TOKEN: <dockerhub-personal-access-token>
DOCKERHUB_USER: <dockerhub-username>
```

If not then you can check this documentation on how to add github secrets
https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets

and

how to create a personal access token
https://docs.docker.com/security/access-tokens/

1. Push changes to the main branch.
2. The GitHub Actions workflow:

- Checks out the repo
- Set's up the SSH for Ansible
- Installs Ansible
- Runs the playbook
- Runs the 2nd job
- Sets up docker credentials
- Creates the new images and pushes it to Dockerhub
- SSH into the remote-server and runs docker-compose up

```

```
