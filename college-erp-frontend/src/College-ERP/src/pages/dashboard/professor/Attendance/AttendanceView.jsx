import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceView = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);

  useEffect(() => {
    // Fetch attendance data from the API
    axios
      .get("http://localhost:8080/api/classes") // Assuming GET request works for fetching all classes
      .then((response) => {
        const data = response.data;
        setAttendanceData(data);

        // Extract unique dates
        const dates = Array.from(
          new Set(
            data.flatMap((session) =>
              (session.attendanceList || []).flatMap((attendance) =>
                attendance.attendance ? Object.keys(attendance.attendance) : []
              )
            )
          )
        );

        setUniqueDates(dates);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Attendance Sheet</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">
              Lecturer
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">
              Subject
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center">
                No Data Available
              </td>
            </tr>
          ) : (
            attendanceData.map((session, sessionIndex) => (
              <React.Fragment key={sessionIndex}>
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {session.lecturer || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {session.subject || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {session.time || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="bg-gray-100 text-left text-sm font-bold text-gray-600 px-6 py-3"
                  >
                    Student Name
                  </td>
                  {uniqueDates.map((date, index) => (
                    <td
                      key={index}
                      className="bg-gray-100 text-left text-sm font-bold text-gray-600 px-6 py-3"
                    >
                      {new Date(date).toLocaleDateString("en-GB")}{" "}
                      {/* Format the date */}
                    </td>
                  ))}
                </tr>
                {/* {(session.attendanceList || []).map((student, studentIndex) => (
                  <tr key={studentIndex}>
                    <td
                      colSpan={3}
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                    >
                      {student.studentName || "N/A"}
                    </td>
                    {uniqueDates.map((date, dateIndex) => (
                      <td
                        key={dateIndex}
                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center"
                      >
                        {student.attendance?.[date] || "N/A"}
                      </td>
                    ))}
                  </tr>
                ))} */}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceView;
