#!/bin/bash

# Docker deployment script for Medical ChatBot
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_step() {
    echo -e "${BLUE}🔄 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_success "Docker is running"
}

# Environment setup
setup_environment() {
    print_step "Setting up environment..."
    
    # Check if .env files exist
    if [ ! -f "./backend/.env" ]; then
        print_warning "Backend .env file not found. Creating from template..."
        cp "./backend/.env.example" "./backend/.env" 2>/dev/null || echo "# Add your environment variables here" > "./backend/.env"
    fi
    
    if [ ! -f "./frontend/.env.local" ]; then
        print_warning "Frontend .env.local file not found. Creating..."
        cat > "./frontend/.env.local" << EOL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_API_ENDPOINT=/get
NEXT_PUBLIC_APP_NAME="Medical AI Assistant"
EOL
    fi
    
    print_success "Environment setup completed"
}

# Build and start services
start_services() {
    local mode=$1
    print_step "Starting services in $mode mode..."
    
    if [ "$mode" = "development" ]; then
        docker-compose -f docker-compose.dev.yml down --remove-orphans
        docker-compose -f docker-compose.dev.yml up --build -d
    else
        docker-compose down --remove-orphans
        docker-compose up --build -d
    fi
    
    print_success "Services started successfully"
}

# Show status
show_status() {
    print_step "Checking service status..."
    docker-compose ps
    echo ""
    print_step "Service URLs:"
    echo "Frontend: http://localhost:3000"
    echo "Backend API: http://localhost:8080"
    echo "API Docs: http://localhost:8080/docs"
    echo "Redis: localhost:6379"
}

# Stop services
stop_services() {
    print_step "Stopping services..."
    docker-compose down --remove-orphans
    docker-compose -f docker-compose.dev.yml down --remove-orphans 2>/dev/null || true
    print_success "Services stopped"
}

# Clean up
cleanup() {
    print_step "Cleaning up Docker resources..."
    docker system prune -f
    docker volume prune -f
    print_success "Cleanup completed"
}

# Show logs
show_logs() {
    local service=$1
    if [ -n "$service" ]; then
        docker-compose logs -f "$service"
    else
        docker-compose logs -f
    fi
}

# Health check
health_check() {
    print_step "Performing health check..."
    
    # Wait for services to start
    sleep 10
    
    # Check backend
    if curl -f http://localhost:8080/ > /dev/null 2>&1; then
        print_success "Backend is healthy"
    else
        print_error "Backend health check failed"
    fi
    
    # Check frontend
    if curl -f http://localhost:3000/ > /dev/null 2>&1; then
        print_success "Frontend is healthy"
    else
        print_error "Frontend health check failed"
    fi
}

# Main script
main() {
    echo "🏥 Medical ChatBot Docker Management"
    echo "==================================="
    
    case "${1:-start}" in
        "start")
            check_docker
            setup_environment
            start_services "production"
            show_status
            health_check
            ;;
        "dev")
            check_docker
            setup_environment
            start_services "development"
            show_status
            ;;
        "stop")
            stop_services
            ;;
        "restart")
            stop_services
            sleep 2
            start_services "production"
            show_status
            ;;
        "status")
            show_status
            ;;
        "logs")
            show_logs "${2:-}"
            ;;
        "clean")
            stop_services
            cleanup
            ;;
        "health")
            health_check
            ;;
        *)
            echo "Usage: $0 {start|dev|stop|restart|status|logs [service]|clean|health}"
            echo ""
            echo "Commands:"
            echo "  start    - Start production services"
            echo "  dev      - Start development services with hot reload"
            echo "  stop     - Stop all services"
            echo "  restart  - Restart production services"
            echo "  status   - Show service status and URLs"
            echo "  logs     - Show logs (optionally for specific service)"
            echo "  clean    - Stop services and clean up Docker resources"
            echo "  health   - Perform health check"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
