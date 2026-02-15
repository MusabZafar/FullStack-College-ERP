import React, { useState, useEffect } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showAlerts, setShowAlerts] = useState({});
  const [professor, setProfessor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedProfessorData = localStorage.getItem("professorData");

    if (storedProfessorData) {
      const professorData = JSON.parse(storedProfessorData);
      setProfessor(professorData);
      console.log("Professor data: ", professorData);
    } else {
      setError("No professor data available. Please log in again.");
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (professor) {
          const response = await axios.get(
            `http://localhost:8080/api/notifications/professor/${professor.id}`
          );

          setNotifications(response.data);
          console.log("Notifications: ", response.data);

          // Initialize showAlerts state to keep track of each notification's visibility
          const initialAlertsState = response.data.reduce(
            (acc, notification) => {
              acc[notification.id] = true; // Use notification id as the key
              return acc;
            },
            {}
          );

          setShowAlerts(initialAlertsState);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications. Please try again later.");
      }
    };

    if (professor) {
      fetchNotifications();
    }
  }, [professor]);

  const handleCloseAlert = (notificationId) => {
    setShowAlerts((prevState) => ({
      ...prevState,
      [notificationId]: false,
    }));
  };

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Notifications
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          {error && (
            <Alert
              color="red"
              icon={<InformationCircleIcon className="h-6 w-6" />}
            >
              {error}
            </Alert>
          )}
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Alert
                key={notification.id} 
                open={showAlerts[notification.id]}
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
                onClose={() => handleCloseAlert(notification.id)}
              >
                <Typography variant="h6" className="font-bold">
                  {notification.subject || "No subject available"}
                </Typography>
                <Typography>{notification.message}</Typography>
                <div className="mt-2">
                  <Typography variant="small" color="gray" className="italic">
                    Sent at{" "}
                    {notification.sentAt
                      ? new Date(notification.sentAt).toLocaleString()
                      : "Unknown time"}
                  </Typography>
                </div>
              </Alert>
            ))
          ) : (
            <Typography variant="h6" color="gray">
              No notifications available.
            </Typography>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
