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

const AttendanceByProf = () => {
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [dates, setDates] = useState([]);
  const [error, setError] = useState(null);

  const fetchAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8080/api/attendance/lecturer/subject",
        {
          params: {
            lecturer: selectedLecturer,
            subject: selectedSubject,
          },
        }
      );

      // Transform the response data
      const transformedData = transformData(response.data);
      setAttendanceRecords(transformedData.records);
      setDates(transformedData.dates);
    } catch (err) {
      setError("Error fetching attendance data");
      console.error("Error fetching attendance data:", err);
    }
  };

  // Function to transform the fetched data
  const transformData = (data) => {
    const dates = Object.keys(data); // Extract dates
    const studentRecords = {};

    dates.forEach((date) => {
      data[date].forEach((record) => {
        if (!studentRecords[record.studentName]) {
          studentRecords[record.studentName] = { id: record.id };
        }
        studentRecords[record.studentName][date] = record.status;
      });
    });

    const records = Object.entries(studentRecords).map(
      ([studentName, record]) => ({
        studentName,
        ...record,
      })
    );

    return { records, dates };
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">View Attendance</h2>
      <form onSubmit={fetchAttendance} className="mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-bold mb-2">Lecturer</label>
            <select
              value={selectedLecturer}
              onChange={(e) => setSelectedLecturer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
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
          <div>
            <label className="block text-sm font-bold mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
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
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Attendance
        </button>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {attendanceRecords.length > 0 && (
        <div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">
                  Sr. No
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">
                  Student Name
                </th>
                {dates.map((date, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600"
                  >
                    {new Date(date).toLocaleDateString("en-GB")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {record.studentName}
                  </td>
                  {dates.map((date, idx) => (
                    <td
                      key={idx}
                      className="px-6 py-4 border-b border-gray-200"
                    >
                      {record[date] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceByProf;
