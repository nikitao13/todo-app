# Todo CRUD app

A todo list for managing tasks and staying productive.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nikitao13/todo-app.git
   ```

2. Navigate to the client folder:

   ```bash
   cd client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create .env file with backend endpoint:

   ```bash
   VITE_API_URL=http://localhost:8080/api
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Navigate to todo folder:

   ```bash
   cd todo
   ```

7. Create .env file with MySQL database credentials:
   example .env config

   ```bash
   DB_URL=jdbc:mysql://localhost:3306/todo_db?createDatabaseIfNotExist=true
   DB_USER=root
   DB_PASSWORD=
   ```

8. Start the backend server:

   ```bash
   mvn spring-boot:run
   ```

## Technologies Used

Frontend

- **React**
- **Typescript**
- **SCSS**

Backend

- **Java**
- **Springboot**

## Future Plans

- Improved error handling
- Tabs for completed/uncompleted tasks
- Implement testing
- Tidy UI

---
