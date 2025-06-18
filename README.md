# Kensaku (研作) - Japanese Academic Research Collaboration Platform

Kensaku is a web platform designed to enhance research paper output among university students and faculty in Japan. The platform addresses key challenges in academic research by providing tools for topic discovery, collaboration, and publishing guidance.

You can visit the webpage here: https://kensaku-delta.vercel.app

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
- **Web Server**: Nginx

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
- Node.js (v16 or higher)
- Python 3.11+
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd kensaku
```

2. Start the development environment:
```bash
make dev
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
│   └── Dockerfile    # Frontend container configuration
├── backend/          # FastAPI backend
│   ├── app/         # Application code
│   └── Dockerfile   # Backend container configuration
├── docker-compose.yml # Container orchestration
└── Makefile         # Development commands
```

## Development

### Available Make Commands
- `make dev`: Start development environment
- `make build`: Build all containers
- `make down`: Stop all containers
- `make logs`: View container logs
- `make clean`: Remove all containers and volumes

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ministry of Education, Culture, Sports, Science and Technology (MEXT)
- Japanese Academic Community 