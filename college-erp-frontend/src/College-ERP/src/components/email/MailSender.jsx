import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Typography,
  Spinner,
  Select,
  Option,
  Checkbox,
} from "@material-tailwind/react";
import { PaperClipIcon } from "@heroicons/react/24/outline";

const MailSender = () => {
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipientType, setRecipientType] = useState("all-students"); // Default to 'all-students'
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedProfessors, setSelectedProfessors] = useState([]);

  useEffect(() => {
    if (recipientType === "selected-students") {
      fetchStudents();
    } else if (recipientType === "selected-professors") {
      fetchProfessors();
    }
  }, [recipientType]);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:8080/api/students");
    setStudents(response.data);
  };

  const fetchProfessors = async () => {
    const response = await axios.get("http://localhost:8080/api/professors"); // Adjust endpoint as needed
    setProfessors(response.data);
  };

  const handleAttachmentsChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleRecipientTypeChange = (value) => {
    setRecipientType(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipientType", recipientType);
    formData.append("subject", subject);
    formData.append("body", body);
    if (recipientType === "selected-students") {
      formData.append("selectedStudents", JSON.stringify(selectedStudents));
    } else if (recipientType === "selected-professors") {
      formData.append("selectedProfessors", JSON.stringify(selectedProfessors));
    } else if (
      recipientType === "individual-student" ||
      recipientType === "individual-professor"
    ) {
      formData.append("recipients", recipients);
    }

    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      setIsLoading(true);
      await axios.post("http://localhost:8080/api/email/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Emails sent successfully!");
      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setRecipients("");
    setSubject("");
    setBody("");
    setAttachments([]);
    setRecipientType("all-students"); // Reset to default
    setSelectedStudents([]);
    setSelectedProfessors([]);
  };

  return (
    <Card className="max-w-2xl mx-auto mt-12 shadow-lg border border-gray-100">
      <CardHeader className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <Typography variant="h5" className="font-semibold">
          Send Email
        </Typography>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Typography
              variant="small"
              className="block text-gray-700 font-medium mb-2"
            >
              Recipients Type
            </Typography>
            <Select
              value={recipientType}
              onChange={(value) => handleRecipientTypeChange(value)}
              className="w-full"
            >
              <Option value="all-students">All Students</Option>
              <Option value="all-professors">All Professors</Option>
              <Option value="all">All Students + All Professors</Option>
              <Option value="individual-student">Individual Student</Option>
              <Option value="individual-professor">Individual Professor</Option>
              <Option value="selected-students">Selected Students</Option>
              <Option value="selected-professors">Selected Professors</Option>
            </Select>
          </div>

          {recipientType === "individual-student" && (
            <div>
              <Typography
                variant="small"
                className="block text-gray-700 font-medium mb-2"
              >
                Individual Student Email
              </Typography>
              <Input
                type="text"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="Enter the student's email"
                required
                className="w-full"
              />
            </div>
          )}
          {recipientType === "individual-professor" && (
            <div>
              <Typography
                variant="small"
                className="block text-gray-700 font-medium mb-2"
              >
                Individual Professor Email
              </Typography>
              <Input
                type="text"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="Enter the professor's email"
                required
                className="w-full"
              />
            </div>
          )}

          {/* Selected Students Checkbox List */}
          {recipientType === "selected-students" && (
            <div>
              <Typography
                variant="small"
                className="block text-gray-700 font-medium mb-2"
              >
                Select Students
              </Typography>
              <div>
                {students.map((student) => (
                  <Checkbox
                    key={student.id}
                    label={student.email}
                    checked={selectedStudents.includes(student.email)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents([
                          ...selectedStudents,
                          student.email,
                        ]);
                      } else {
                        setSelectedStudents(
                          selectedStudents.filter(
                            (email) => email !== student.email
                          )
                        );
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Selected Professors Checkbox List */}
          {recipientType === "selected-professors" && (
            <div>
              <Typography
                variant="small"
                className="block text-gray-700 font-medium mb-2"
              >
                Select Professors
              </Typography>
              <div>
                {professors.map((professor) => (
                  <Checkbox
                    key={professor.id}
                    label={professor.email}
                    checked={selectedProfessors.includes(professor.email)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProfessors([
                          ...selectedProfessors,
                          professor.email,
                        ]);
                      } else {
                        setSelectedProfessors(
                          selectedProfessors.filter(
                            (email) => email !== professor.email
                          )
                        );
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          )}

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
              required
              className="w-full"
            />
          </div>
          <div>
            <Typography
              variant="small"
              className="block text-gray-700 font-medium mb-2"
            >
              Body
            </Typography>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter email body (HTML allowed)"
              rows="4"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Typography
              variant="small"
              className="block text-gray-700 font-medium mb-2"
            >
              Attachments
            </Typography>
            <div className="flex items-center gap-4">
              <input
                type="file"
                multiple
                onChange={handleAttachmentsChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center gap-2 text-blue-500 hover:text-blue-700"
              >
                <PaperClipIcon className="h-5 w-5" />
                <span className="underline">Attach files</span>
              </label>
              {attachments.length > 0 && (
                <Typography variant="small" className="text-gray-600">
                  {attachments.length} file(s) selected
                </Typography>
              )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              color="blue"
              disabled={isLoading}
              fullWidth
              className="flex items-center justify-center"
            >
              {isLoading ? <Spinner className="h-5 w-5" /> : "Send Email"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default MailSender;
