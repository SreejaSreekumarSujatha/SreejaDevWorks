# Task Management Microservices

A modern .NET microservices application for user management with clean architecture and enterprise-level practices.

## 📸 API Documentation

https://github.com/SreejaSreekumarSujatha/SreejaDevWorks/blob/master/TaskManagementMicroservices/swagger-ui.png.png
*Interactive Swagger UI showing all user management endpoints*

## 🔧 Tech Stack

- **.NET 8** - Web API
- **Entity Framework Core** - Database ORM
- **SQL Server** - Database
- **Clean Architecture** - Project structure
- **CQRS** - MediatR pattern
- **Swagger** - API documentation

##  Features

- User registration and authentication
- Password hashing with BCrypt
- RESTful API endpoints
- Interactive API documentation
- Database migrations
- Input validation and error handling

## 📁 Project Structure

```
TaskManagementMicroservices/
├── src/
│   ├── Services/User/
│   │   ├── TaskManagement.User.API/          # Controllers & Swagger
│   │   ├── TaskManagement.User.Application/  # Business Logic (CQRS)
│   │   ├── TaskManagement.User.Domain/       # Entities & Interfaces
│   │   └── TaskManagement.User.Infrastructure/ # Database & Services
│   └── Shared/
│       └── TaskManagement.Shared.Domain/     # Common Models
```

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/SreejaSreekumarSujatha/SreejaDevWorks.git
   ```

2. **Run database migrations**
   ```bash
   dotnet ef database update --project src/Services/User/TaskManagement.User.Infrastructure --startup-project src/Services/User/TaskManagement.User.API
   ```

3. **Start the application**
   ```bash
   dotnet run --project src/Services/User/TaskManagement.User.API
   ```

4. **Open Swagger UI**
   ```
   https://localhost:7233/swagger
   ```

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | User login |
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |

## 💡 Key Features Demonstrated

- **Microservices Architecture** - Modular, scalable design
- **Clean Architecture** - Separation of concerns
- **CQRS Pattern** - Command/Query separation with MediatR
- **Repository Pattern** - Data access abstraction
- **Entity Framework** - Database operations and migrations
- **API Documentation** - Swagger/OpenAPI integration
- **Security** - Password hashing and validation

## 🧪 Test the API

1. **Register a user:**
   ```json
   POST /api/users/register
   {
     "email": "test@example.com",
     "firstName": "John",
     "lastName": "Doe",
     "password": "Password123",
     "role": "User"
   }
   ```

2. **Login:**
   ```json
   POST /api/users/login
   {
     "email": "test@example.com",
     "password": "Password123"
   }
   ```

## 🛠️ Built With

This project demonstrates modern .NET development practices including:
- Clean Architecture principles
- Domain-Driven Design
- CQRS implementation
- Repository pattern
- Entity Framework Core
- RESTful API design

## 👨‍💻 Developer

Sreeja Sreekumar Sujatha  
sreejasreekumarsujatha@gmail.com

---

*Built with .NET 8 and Clean Architecture*
