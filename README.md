
# College ERP System

## 📚 Description  
The **College ERP System** is a comprehensive management tool designed to streamline and automate academic and administrative processes in colleges. It provides distinct roles for HODs (Heads of Departments), Professors, and Students, each with specific functionalities. The system is built using modern technologies with a robust backend and an interactive frontend, ensuring efficiency and user-friendliness.

---

## 🌟 Features  

### **Frontend**  
- **Dynamic UI** using **React** and **TailwindCSS** for a responsive and modern design.  
- **Routing** enabled by **React Router** for seamless navigation.  
- **State Management** using **Redux** to handle complex data interactions.  
- **Charts and Analytics** with **ApexChart** for visualization of academic and attendance data.  
- **API Integration** using **Axios** for smooth communication between frontend and backend.  

### **Backend**  
- **Role-Based Access Control**:  
- **MySQL Database**: Efficient handling of numerical and relational data through MySQL Workbench.  
- **Google Firebase**:  
  - Storage for student images.  
  - Authentication for secure access.  
- **Notification System**: Personalized notifications for students and professors.  
- **Email Integration**: Flexible email services for bulk or individual messaging with attachments.  
- **Attendance Tracking**: Professors can save and retrieve attendance records.  
- **Subject & Practical Management**: CRUD operations for subjects, semesters, and practicals.  

---

## 🛠️ Tech Stack  

### **Frontend**  
- React  
- React Router  
- Redux  
- Vite  
- TailwindCSS  
- Axios  
- ApexCharts  

### **Backend**  
- Java Spring Boot  
- Google Firebase  
- MySQL  

---

## 🚀 How to Use  

### **Roles and Functionalities**  

1. **HOD**  
   - Manage Students, Professors, and Departments.  
   - Handle CRUD operations for Subjects, Semesters, and Class Records.  
   - Send bulk notifications and emails to faculty and students.  

2. **Professor**  
   - Add or update attendance records.  
   - Send notifications to students.  
   - View and manage student records.  

3. **Student**  
   - Update personal details.  
   - View notifications and attendance records.  

---

## 📋 Setup Instructions  

### **Prerequisites**  
Ensure the following are installed on your system:  
- Node.js (v14 or above)  
- Java JDK (v11 or above)  
- MySQL Workbench  
- Firebase account for storage and authentication  

---

### **Frontend Setup**  
1. Clone the repository:  
   ```bash  
   git clone <repository-url>  
   cd frontend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Start the development server:  
   ```bash  
   npm run dev  
   ```  
4. Access the application at `http://localhost:3000`.

---

### **Backend Setup**  
1. Clone the repository:  
   ```bash  
   git clone <repository-url>  
   cd backend  
   ```  
2. Configure the application properties:  
   - Update `application.properties` with your MySQL and Firebase credentials.  

3. Build the project:  
   ```bash  
   ./mvnw clean install  
   ```  
4. Run the server:  
   ```bash  
   ./mvnw spring-boot:run  
   ```  

---

### **Database Setup**  
1. Create a database in MySQL Workbench:  
   ```sql  
   CREATE DATABASE college_erp;  
   ```  
2. Update the database credentials in `application.properties`.  
3. The tables will be created automatically using JPA when you run the backend.

---

### **Firebase Setup**  
1. Create a Firebase project.  
2. Enable **Firestore** and **Storage**.  
3. Download the Firebase configuration file and place it in the backend project.  

---


