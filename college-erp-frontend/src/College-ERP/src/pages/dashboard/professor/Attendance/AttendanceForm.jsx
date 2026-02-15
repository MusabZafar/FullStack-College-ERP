import { useState } from "react";
import axios from "axios";

const lecturers = [
  "Dr. Roshan  Chandekar(Prof)",
  "Prof. Sagar Tarekar",
  "Prof. BalaKrishna Das",
  "Prof. Shambhavi Holay",
  "Prof. Nikita Khanzode",
  "Prof. Triveni Rahangdale",
  "Prof. Aniket Girde",
];
const subjects = [
  "Software Testing and Quality Assurance",
  "Data Science",
  "Deep Learning",
  "Asp. Net Using C#",
  "Cloud Computing",
  "Business Analytics",
];
const students = [
  "Aastha Parmeshwar Dhongade",
  "Akshata Gautam Parghane",
  "Anushka Gautam Fulkar",
  "Anushka Rajesh Gudsundare",
  "Apeksha Sunil Gadpayale",
  "Apoorva Dinesh Moon",
  "Ashwini Motiram Kawale",
  "Diksha Siddharth Sontakke",
  "Dipti Deepak Golait",
  "Disha Deorao Raut",
  "Divya Diwanji Madaye",
  "Gayatri Anil Karadbhajane",
  "Janvi Prakash Chincholkar",
  "Kalyani Sureshrao Lonare",
  "Komal Ravindra Gaikwad",
  "Laxmi Mohan Badge",
  "Likhita Dinesh Khonde",
  "Neha Umesh Nagose",
  "Nikita Maroti Chahande",
  "Pallavi Rambhau Munghate",
  "Prachi Ghanshyam Bharre",
  "Priya Raju Koche",
  "Puja Zanakalal Kodwate",
  "Ragini Rajesh Waghmare",
  "Rashmi Ramesh Fulzele",
  "Ritika Nagaji Paikrao",
  "Rutuja Krishnaji Nagpure",
  "Sachi Ravindra Jiwane",
  "Samiksha Sunil Fule",
  "Sanskruti Ganesh Charde",
  "Sejal Ashok Mohitkar",
  "Shruti Ashish Amley",
  "Shruti Satish Khobragade",
  "Shubhangini Omprakash Bhoyar",
  "Siya Satish Turkar",
  "Srushti Pramod Dahekar",
  "Tannu Chandrashekhar Kamble",
  "Unnati Mahendra Shende",
  "Yugeshwari Lomeshwar Isapure",
  "Adarsh Baban Sathe",
  "Akshay Kishor Khanke",
  "Akshay Rameshrao Wawarkar",
  "Alpesh Dhanraj Ande",
  "Aman Baban Bagade",
  "Amit Ganpat Konge",
  "Aryan Shravanji Ganeshkar",
  "Ashik Chotu Kewat",
  "Ayush Mahendra Kopulwar",
  "Ayush Sudhakar Bhakte",
  "Chandan Vinod Jadhav",
  "Chetan Ashok Modak",
  "Chirag Ganesh Mohature",
  "Dikshant Naresh Kamble",
  "Divyanshu Anant Lamsoge",
  "Gaurav Ramlal Nakhate",
  "Gaurav Mangesh Umare",
  "Harsh Manoj Nagdeve",
  "Harshal Kolba Khapekar",
  "Himanshu Prashant Meshram",
  "Hitesh Govindrao Barde",
  "Kaushik Kartik Dhongade",
  "Kuldeep Suresh Thakre",
  "Mohan Dattaji Masurkar",
  "Piyush Ashok Ghugal",
  "Piyush Kishor Gaidhane",
  "Pranay Laxminarayan Mohankar",
  "Pranay Narayan Bawane",
  "Pratham Kamlesh Shambharkar",
  "Pratham Vijay Mohile",
  "Prathmesh Kishor Lokhande",
  "Pratik Balu Gondkar",
  "Pratik Gautam Dhakne",
  "Pratik Ramkrushna Mendhe",
  "Rehan Ali Rizwan Ali Nawab",
  "Ritesh Praful Yesmbare",
  "Rohit Khushal Raut",
  "Rohit Raju Kosare",
  "Sanath Chandrashekhar Bansod",
  "Sarang Yuvraj Mate",
  "Shubham Dudharam Tighare",
  "Sourabh Rajendra Meshram",
  "Sushant Shankar Khelkar",
  "Tushar Shivkumar Zade",
  "Vinay Rajaram Gawande",
  "Vishal Rajesh Mohod",
  "Vishwajeet Virendra Singh",
  "Yash Ravindra Navnage",
  "Yash Yadavrao Yawale",
];

const AttendanceForm = () => {
  const [lecturer, setLecturer] = useState("");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState(""); // Initialize as empty
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendanceList, setAttendanceList] = useState(
    students.map((student) => ({
      studentName: student,
      status: false,
    }))
  );

  const handleLecturerChange = (e) => setLecturer(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value); // Update time state
  const handleDateChange = (e) => setAttendanceDate(e.target.value);

  const handleAttendanceChange = (index) => {
    const updatedAttendanceList = [...attendanceList];
    updatedAttendanceList[index].status = !updatedAttendanceList[index].status;
    setAttendanceList(updatedAttendanceList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedTime = time + ":00"; // Format time to HH:mm:ss

    const attendanceData = {
      lecturer,
      subject,
      time: formattedTime,
      attendanceDate,
      attendanceList: attendanceList.map((student) => ({
        studentName: student.studentName,
        status: student.status ? "P" : "A",
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/attendance/save",
        attendanceData
      );
      console.log("Attendance submitted successfully:", response.data);
      alert("successful submission");

      setLecturer("");
      setSubject("");
      setTime("");
      setAttendanceDate("");
      setAttendanceList(
        students.map((student) => ({
          studentName: student,
          status: false,
        }))
      );
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Attendance Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Form Inputs */}
        <div className="flex-1 space-y-3 space-x-2  ">
          {/* Lecturer Dropdown */}
          <div>
            <label className="block font-medium mb-2">Lecturer:</label>
            <select
              value={lecturer}
              onChange={handleLecturerChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Lecturer</option>
              {lecturers.map((lecturer, index) => (
                <option key={index} value={lecturer}>
                  {lecturer}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Dropdown */}
          <div>
            <label className="block font-medium mb-2">Subject:</label>
            <select
              value={subject}
              onChange={handleSubjectChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Time Input */}
          <div>
            <label className="block font-medium mb-2">Time:</label>
            <input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block font-medium mb-2">Attendance Date:</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-auto h-80 bg-gray-50 p-4 rounded-md border border-gray-300">
          <label className="block font-medium mb-2">Students:</label>
          <div className="space-y-2">
            {attendanceList.map((student, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={student.status}
                  onChange={() => handleAttendanceChange(index)}
                  className="mr-4 h-4 w-4"
                />
                <span className="text-lg">{student.studentName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-20 h-10 bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 mt-4 lg:mt-0"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
