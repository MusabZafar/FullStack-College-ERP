import React, { useState, useEffect } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function Notifications({ studentId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/notifications/student/${studentId}`
        );
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [studentId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

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
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Alert
                key={index}
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                <strong>{notification.title}</strong>: {notification.message}
              </Alert>
            ))
          ) : (
            <Typography>No notifications available.</Typography>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
