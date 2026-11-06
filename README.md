# SmartBuy – AI-Based Personalized Shopping

## 1. Project Description

SmartBuy is an AI-based personalized shopping application designed to simplify online shopping by helping users discover products based on their interests, budget and preferences.

The application provides product discovery, personalized recommendations and essential e-commerce functionalities.

## 2. Project Objectives

- Simplify product discovery.
- Provide personalized product recommendations.
- Support budget-based product filtering.
- Improve the online shopping experience.
- Develop and deploy a full-stack e-commerce application.

## 3. Key Features

- Product catalog with 21 products across four categories.
- Product search and filtering.
- Budget-based filtering and sorting.
- Personalized product recommendations.
- Wishlist management.
- Product comparison.
- Shopping cart.
- User registration and login.
- User profile management.
- Checkout workflow without payment integration.

## 4. Technology Stack

| Technology | Application |
|---|---|
| React | Frontend |
| Vite | Frontend build tool |
| Java 21 | Backend programming |
| Spring Boot | Backend development |
| MySQL 8.0 | Database |
| Axios | API communication |
| Maven | Backend build management |
| Docker | Containerization |
| Docker Compose | Multi-container deployment |
| Kubernetes | Container orchestration |
| Minikube | Local Kubernetes deployment |
| Git and GitHub | Version control and repository hosting |
| Jira | Project management |

## 5. Application Architecture

SmartBuy follows a three-tier architecture.

**Presentation Layer – React**
- Displays the user interface.
- Handles user interactions.
- Communicates with backend APIs using Axios.

**Application Layer – Spring Boot**
- Processes user requests.
- Implements business logic.
- Handles authentication.
- Communicates with MySQL.

**Data Layer – MySQL**
- Stores user information.
- Stores product information.
- Maintains application data.

### Application Workflow

1. User interacts with the frontend.
2. Frontend sends requests to the backend.
3. Backend processes requests.
4. Backend communicates with MySQL.
5. Database returns the required information.
6. Backend sends responses to the frontend.

## 6. Authentication

SmartBuy provides user registration and login.

- User registration creates an account.
- BCrypt is used for password hashing.
- JWT is used for token-based authentication.
- Spring Security manages access control.
- Protected requests use authentication tokens.

## 7. Database Management

MySQL is used to store application information.

Two separate database instances are maintained:

| Deployment | Database |
|---|---|
| Docker Compose | Docker MySQL |
| Kubernetes | Kubernetes MySQL |

Separate databases allow both deployment environments to operate independently with their own user accounts and application records.

## 8. Docker Deployment

Docker is used to containerize the SmartBuy application.

Docker Compose manages three services:

1. Frontend – React application served using Nginx.
2. Backend – Spring Boot application.
3. Database – MySQL.

**Application URL:** http://localhost:8081

## 9. Kubernetes Deployment

The application is also deployed using Kubernetes on Minikube.

### Kubernetes Resources

| Resource | Purpose |
|---|---|
| Namespace | Separates SmartBuy resources |
| Frontend Deployment | Manages frontend Pods |
| Backend Deployment | Manages backend Pods |
| MySQL StatefulSet | Manages MySQL |
| Services | Provides network connectivity |
| Secret | Stores sensitive configuration |
| PVC | Provides persistent storage for MySQL |

### Main Application Pods

1. Frontend Pod – React application served through Nginx.
2. Backend Pod – Spring Boot application.
3. MySQL Pod – Database service.

**Application URL:** http://localhost:8082

## 10. Project Structure

```text
SmartBuy/
│
├── ecommerce-frontend/
│   └── ecommerce-frontend/
│       ├── src/
│       ├── public/
│       ├── Dockerfile
│       └── package.json
│
├── ecommerce-backend/
│   └── shopfront/
│       ├── src/
│       ├── pom.xml
│       ├── Dockerfile
│       └── database/
│
├── kubernetes/
│   ├── backend.yaml
│   ├── frontend.yaml
│   └── mysql.yaml
│
├── docker-compose.yml
├── README.md
└── .gitignore
