# Kensaku (研作) - Japanese Academic Research Collaboration Platform

Kensaku is a web platform designed to enhance research paper output among university students and faculty in Japan. The platform addresses key challenges in academic research by providing tools for topic discovery, collaboration, and publishing guidance.

## Features

### Core Features (MVP)
- **Topic Suggestion System**: AI-powered recommendations for trending research topics and areas
- **Collaboration Hub**: Connect students with professors and other researchers
- **Publishing Support**: Templates, checklists, and journal recommendations

### Target Users
- Undergraduate Students
- Graduate Students
- Professors
- Academic Instructors

## Tech Stack

### Frontend
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Container**: Docker

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **API Documentation**: OpenAPI/Swagger

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Deployment**: Railway

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (v18.17.0 or higher)
- Python 3.11+
- npm

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd kensaku
```

2. Start the development environment:
```bash
docker-compose up
```

This will:
- Build and start the frontend container
- Build and start the backend container
- Set up the development environment

3. Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Project Structure

```
kensaku/
├── frontend/          # Vite + React frontend
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── Dockerfile    # Frontend container configuration
│   └── .dockerignore # Docker ignore rules
├── backend/          # FastAPI backend
│   ├── app/         # Application code
│   └── Dockerfile   # Backend container configuration
├── docker-compose.yml # Container orchestration
├── railway.toml      # Railway deployment configuration
└── Makefile         # Development commands
```

## Development

### Available Make Commands
- `make dev`: Start development environment
- `make build`: Build all containers
- `make down`: Stop all containers
- `make logs`: View container logs
- `make clean`: Remove all containers and volumes

## Deployment

The application is deployed on Railway using Docker containers. The deployment process is automated through Railway's CI/CD pipeline.

### Deployment Steps
1. Push changes to the main branch
2. Railway automatically builds and deploys the containers
3. The application is available at the Railway-provided URL

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ministry of Education, Culture, Sports, Science and Technology (MEXT)
- Japanese Academic Community 