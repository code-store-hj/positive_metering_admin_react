

// ////style a1 image and row not in row
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import instance from "../../api/AxiosInstance";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from 'react-icons/fa';
import logo from "../../assets/images/logo.png";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await instance.post(
          `/auth/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.result) {
          const { token } = response.data.responseData;
          localStorage.setItem("accessToken", token);

          toast.success("Login successful");
          navigate("/headercontact");
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        console.error("Error handling form submission:", error);
        toast.error("Error in Submit");
      }
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body className="p-5 bg-white">
              <Row className="align-items-center mb-4">
                <Col xs={12} className="text-center mb-3">
                  <Image src={logo} alt="Logo" fluid style={{ maxWidth: "100px" }} />
                </Col>
                <Col xs={12}>
                  <h3 className="text-center text-primary font-weight-bold">POSITIVE METERING PUMPS PVT LTD</h3>
                </Col>
              </Row>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <FaUser className="me-2 text-secondary" />
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-light border-0 shadow-sm rounded-pill px-3"
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <FaLock className="me-2 text-secondary" />
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-light border-0 shadow-sm rounded-pill px-3"
                  />
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </Form.Group>

                <Row className="justify-content-center">
                  <Col xs="auto">
                    <Button
                      variant="primary"
                      type="submit"
                      className="mt-4 py-2 px-5 rounded-pill shadow-lg"
                      style={{ backgroundColor: "#007bff", border: "none" }}
                    >
                      Login
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;





