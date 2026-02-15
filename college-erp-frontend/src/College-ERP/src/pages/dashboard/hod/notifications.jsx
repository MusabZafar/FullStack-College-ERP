import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Typography,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";

const NotificationSender = () => {
  const [recipientType, setRecipientType] = useState("STUDENT"); // Default to stuśdents
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState(""); // New field for subject
  const [timestamp, setTimestamp] = useState(new Date().toISOString()); // Default to current time
  const [readStatus, setReadStatus] = useState(false); // Default to false
  const [sender, setSender] = useState(""); // New field for sender
  const [isLoading, setIsLoading] = useState(false);

  const handleRecipientTypeChange = (value) => {
    setRecipientType(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notificationData = {
      title: title,
      message: message,
      subject: subject,
      timestamp: timestamp,
      readStatus: readStatus,
      recipientType: recipientType,
      sender: sender,
    };

    try {
      setIsLoading(true);
      // Replace with your API endpoint
      const response = await fetch(
        "http://localhost:8080/api/notifications/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData),
        }
      );

      if (response.ok) {
        alert("Notification sent successfully!");
        resetForm();
      } else {
        alert("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setSubject("");
    setTimestamp(new Date().toISOString()); // Reset to current time
    setReadStatus(false);
    setSender("");
    setRecipientType("STUDENT");
  };

  return (
    <Card className="max-w-lg mx-auto mt-12 shadow-lg border border-gray-100">
      <CardHeader className="bg-blue-600 text-white p-4">
        <Typography variant="h5" className="font-semibold">
          Send Notification
        </Typography>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Typography
              variant="small"
              className="block text-gray-700 font-medium mb-2"
            >
              Recipient Type
            </Typography>
            <Select
              value={recipientType}
              onChange={(value) => handleRecipientTypeChange(value)}
              className="w-full"
            >
              <Option value="STUDENT">ALL_STUDENTS</Option>
              <Option value="STUDENT">STUDENT</Option>
              <Option value="PROFESSOR">ALL_PROFESSORS</Option>
              <Option value="PROFESSOR">PROFESSOR</Option>
              <Option value="BOTH">ALL_STUDENTS_AND_PROFESSORS</Option>
            </Select>
          </div>

          <div>
            <Typography
              variant="small"
              className="block text-gray-700 font-medium mb-2"
            >
              Notification Title
            </Typography>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notification title"
              required
              className="w-full"
            />
          </div>

          <div>
            <Typography
              variant="small"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </Typography>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows="4"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Typography
              variant="small"
              className="block text-gray-700 font-medium mb-2"
            >
              Subject
            </Typography>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="w-full"
            />
          </div>

          <div>
            <Typography
              variant="small"
              className="block text-gray-700 font-medium mb-2"
            >
              Timestamp
            </Typography>
            <Input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Typography
              variant="small"
              className="block text-gray-700 font-medium mb-2"
            >
              Sender
            </Typography>
            <Input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Enter sender name"
              className="w-full"
            />
          </div>

          <div>
            <Button
              type="submit"
              color="blue"
              fullWidth
              className="flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner className="h-5 w-5" />
              ) : (
                "Send Notification"
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default NotificationSender;
