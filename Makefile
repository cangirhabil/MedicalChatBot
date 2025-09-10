# Medical ChatBot - Docker Makefile
.PHONY: help start dev stop restart status logs clean health build

# Default target
.DEFAULT_GOAL := help

# Colors
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m

help: ## Show this help message
	@echo "🏥 Medical ChatBot - Docker Commands"
	@echo "==================================="
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ { printf "  $(BLUE)%-12s$(NC) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

start: ## Start production services
	@echo "$(GREEN)🚀 Starting production services...$(NC)"
	./docker-deploy.sh start

dev: ## Start development services with hot reload
	@echo "$(YELLOW)🛠️  Starting development services...$(NC)"
	./docker-deploy.sh dev

stop: ## Stop all services
	@echo "$(YELLOW)🛑 Stopping services...$(NC)"
	./docker-deploy.sh stop

restart: ## Restart production services
	@echo "$(BLUE)🔄 Restarting services...$(NC)"
	./docker-deploy.sh restart

status: ## Show service status
	./docker-deploy.sh status

logs: ## Show logs for all services
	./docker-deploy.sh logs

logs-backend: ## Show backend logs
	./docker-deploy.sh logs backend

logs-frontend: ## Show frontend logs
	./docker-deploy.sh logs frontend

logs-redis: ## Show redis logs
	./docker-deploy.sh logs redis

clean: ## Stop services and clean up Docker resources
	@echo "$(YELLOW)🧹 Cleaning up...$(NC)"
	./docker-deploy.sh clean

health: ## Perform health check
	./docker-deploy.sh health

build: ## Build all images without starting
	@echo "$(BLUE)🏗️  Building images...$(NC)"
	docker-compose build

setup: ## Initial setup (copy env files and install dependencies)
	@echo "$(GREEN)⚙️  Setting up environment files...$(NC)"
	@if [ ! -f backend/.env ]; then \
		cp backend/.env.example backend/.env; \
		echo "$(YELLOW)⚠️  Please edit backend/.env with your API keys$(NC)"; \
	else \
		echo "$(GREEN)✅ Backend .env already exists$(NC)"; \
	fi
	@if [ ! -f frontend/.env.local ]; then \
		cp frontend/.env.local.example frontend/.env.local; \
		echo "$(GREEN)✅ Frontend .env.local created$(NC)"; \
	else \
		echo "$(GREEN)✅ Frontend .env.local already exists$(NC)"; \
	fi
	@echo "$(BLUE)📦 Installing backend dependencies...$(NC)"
	@cd backend && pip install -r requirements.txt
	@echo "$(BLUE)📦 Installing frontend dependencies...$(NC)"
	@cd frontend && npm install
	@echo "$(GREEN)✅ Setup complete!$(NC)"

install: setup build ## Full installation (setup + build)
	@echo "$(GREEN)✅ Installation complete! Run 'make start' to begin$(NC)"

# Docker specific commands
docker-prune: ## Remove unused Docker resources
	docker system prune -af
	docker volume prune -f

docker-reset: stop docker-prune ## Complete Docker reset
	@echo "$(YELLOW)🔥 Docker completely reset$(NC)"

# Development helpers
dev-backend: ## Start backend in development mode
	@echo "$(BLUE)🛠️  Starting backend development server...$(NC)"
	@cd backend && python main.py

dev-frontend: ## Start frontend in development mode
	@echo "$(BLUE)🛠️  Starting frontend development server...$(NC)"
	@cd frontend && npm run dev

dev-local: ## Start both backend and frontend locally (non-Docker)
	@echo "$(YELLOW)🛠️  Starting local development servers...$(NC)"
	@echo "$(BLUE)Starting backend on port 8080...$(NC)"
	@cd backend && python main.py &
	@echo "$(BLUE)Starting frontend on port 3000...$(NC)"
	@cd frontend && npm run dev

shell-backend: ## Open shell in backend container
	docker exec -it medical-chatbot-api bash

shell-frontend: ## Open shell in frontend container  
	docker exec -it medical-chatbot-frontend sh

shell-backend-dev: ## Open shell in development backend container
	docker exec -it medical-chatbot-api-dev bash

shell-frontend-dev: ## Open shell in development frontend container
	docker exec -it medical-chatbot-frontend-dev sh

# Production helpers
prod-deploy: ## Deploy to production with nginx
	docker-compose --profile production up -d --build

prod-logs: ## Show production logs
	docker-compose --profile production logs -f
