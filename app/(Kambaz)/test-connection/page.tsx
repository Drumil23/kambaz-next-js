"use client";
import { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { HTTP_SERVER } from "../../lib/config";

export default function TestConnection() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testServer = async () => {
    setLoading(true);
    setResult("Testing...");
    try {
      const response = await axios.get(`${HTTP_SERVER}/hello`);
      setResult(`✅ Server is running!\nResponse: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      setResult(`❌ Server connection failed!\nError: ${error}\n\nMake sure your server is running on ${HTTP_SERVER}`);
    }
    setLoading(false);
  };

  const testCourses = async () => {
    setLoading(true);
    setResult("Fetching courses...");
    try {
      const response = await axios.get(`${HTTP_SERVER}/api/courses`);
      setResult(`✅ Courses fetched successfully!\nCount: ${response.data.length}\nData: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: unknown) {
      const err = error as { message?: string; response?: { status?: number } };
      setResult(`❌ Failed to fetch courses!\nError: ${err.message}\nStatus: ${err.response?.status}`);
    }
    setLoading(false);
  };

  const testAssignments = async () => {
    setLoading(true);
    setResult("Fetching assignments...");
    try {
      const response = await axios.get(`${HTTP_SERVER}/api/assignments`);
      setResult(`✅ Assignments fetched successfully!\nCount: ${response.data.length}\nData: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: unknown) {
      const err = error as { message?: string; response?: { status?: number } };
      setResult(`❌ Failed to fetch assignments!\nError: ${err.message}\nStatus: ${err.response?.status}`);
    }
    setLoading(false);
  };

  const testRS101Assignments = async () => {
    setLoading(true);
    setResult("Fetching RS101 assignments...");
    try {
      const response = await axios.get(`${HTTP_SERVER}/api/assignments?course=RS101`);
      setResult(`✅ RS101 Assignments fetched successfully!\nCount: ${response.data.length}\nData: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: unknown) {
      const err = error as { message?: string; response?: { status?: number } };
      setResult(`❌ Failed to fetch RS101 assignments!\nError: ${err.message}\nStatus: ${err.response?.status}`);
    }
    setLoading(false);
  };

  const testModules = async () => {
    setLoading(true);
    setResult("Fetching modules...");
    try {
      const response = await axios.get(`${HTTP_SERVER}/api/courses/RS101/modules`);
      setResult(`✅ Modules fetched successfully!\nCount: ${response.data.length}\nData: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: unknown) {
      const err = error as { message?: string; response?: { status?: number } };
      setResult(`❌ Failed to fetch modules!\nError: ${err.message}\nStatus: ${err.response?.status}`);
    }
    setLoading(false);
  };

  return (
    <div className="container p-4">
      <h1 className="mb-4">🔧 MongoDB Connection Test</h1>
      
      <Alert variant="info">
        <strong>Current Server:</strong> {HTTP_SERVER}
      </Alert>

      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Test Endpoints:</h5>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <Button onClick={testServer} disabled={loading} variant="primary">
              Test Server Health
            </Button>
            <Button onClick={testCourses} disabled={loading} variant="success">
              Test Courses API
            </Button>
            <Button onClick={testAssignments} disabled={loading} variant="warning">
              Test All Assignments
            </Button>
            <Button onClick={testRS101Assignments} disabled={loading} variant="info">
              Test RS101 Assignments
            </Button>
            <Button onClick={testModules} disabled={loading} variant="secondary">
              Test Modules API
            </Button>
          </div>

          {result && (
            <Alert variant={result.includes("✅") ? "success" : "danger"}>
              <pre style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>{result}</pre>
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h5 className="mb-3">Troubleshooting Steps:</h5>
          <ol>
            <li><strong>Check if server is running:</strong> Look for terminal with &ldquo;node index.js&rdquo; running</li>
            <li><strong>Verify MongoDB connection:</strong> Server terminal should show &ldquo;Connected to MongoDB&rdquo;</li>
            <li><strong>Check server port:</strong> Server should be on port 4000 (localhost:4000)</li>
            <li><strong>Test manually:</strong> Open <a href={`${HTTP_SERVER}/api/assignments`} target="_blank">{HTTP_SERVER}/api/assignments</a> in browser</li>
            <li><strong>Check CORS:</strong> Server must allow requests from localhost:3000</li>
            <li><strong>Restart server:</strong> Stop and restart node server if needed</li>
          </ol>
        </Card.Body>
      </Card>
    </div>
  );
}
