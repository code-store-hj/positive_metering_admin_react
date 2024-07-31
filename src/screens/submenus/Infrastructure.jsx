// ////sos
// import React, { useState, useEffect, useContext } from "react";
// import { Container, Row, Col, Card, Button, Form ,Table} from "react-bootstrap";
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import NewResuableForm from "../../components/form/NewResuableForm";

// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TablePagination from "../../components/pagination/TablePagination";
// import instance from "../../api/AxiosInstance";
// import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

// const Infrastructure = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } = useSearchExport();
//   const { shows,  toggleShows} = useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [eyeVisibilityById, setEyeVisibilityById] = useState({});
//   const tableColumns = [
//     {
//       key: "img",
//       label: "Image",
//       render: (value) => (
//         <img
//           src={value}
//           alt="Infrastructure"
//           style={{ width: "100px", height: "auto" }}
//         />
//       ),
//     },
//     { key: "title", label: "Title" },
//     { key: "desc", label: "Description" },
//   ];

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get("infrastructure/find-infrastructure", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const reversedData = response.data.responseData.reverse();
//       setTeam(reversedData);
//       setData(reversedData);
    
//     } catch (error) {
//       console.error("Error fetching infrastructure data:", error);
//     }
//   };

//   const validateForm = (formData) => {
//     let errors = {};
//     let isValid = true;

//     if (!formData.img) {
//       errors.img = "Image is required";
//       isValid = false;
//     }

//     if (!formData.title?.trim()) {
//       errors.title = "Title is required";
//       isValid = false;
//     }

//     if (!formData.desc?.trim()) {
//       errors.desc = "Description is required";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm(formData)) {
//       const accessToken = localStorage.getItem("accessToken");
//       const data = new FormData();
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }

//       try {
//         if (editMode) {
//           await instance.put(
//             `infrastructure/update-infrastructure/${editingId}`,
//             data,
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//           toast.success("Data Updated Successfully");
//       // Update the specific entry in the team array
//       const updatedTeam = team.map((member) =>
//         member.id === editingId ? formData : member
//       );
//       setTeam(updatedTeam);

//         } else {
//           await instance.post("infrastructure/create-infrastructure", data, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           toast.success("Data Submitted Successfully");

          

//         }
//         fetchTeam();
//         toggleShows(); 
//         setEditMode(false);
//         setFormData({});
//       } catch (error) {
//         console.error("Error handling form submission:", error);

//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       await instance.delete(
//         `infrastructure/isdelete-infrastructure/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       toast.success("Data Deleted Successfully");
//       fetchTeam();
//     } catch (error) {
//       console.error("Error deleting infrastructure:", error);
  
//     }
//   };

//   const handleIsActive = async (id, isVisible) => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       await instance.put(
//         `infrastructure/isactive-infrastructure/${id}`,
//         { isVisible },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (isVisible) {
//         toast.success("Data hidden successfully");
//       } else {
//         toast.success("Data shown successfully");
//       }
      
//       fetchTeam();
//     } catch (error) {
//       console.error("Error updating visibility:", error);
//       toast.error("Error updating visibility");
//     }
//   };

//   const toggleEdit = (leaderId) => {
//     const memberToEdit = team.find((item) => item.id === leaderId);
//     if (memberToEdit) {
//       setEditingId(leaderId);
//       setEditMode(true);
//       toggleShows(); 
//       setFormData(memberToEdit);
//     }
//   };

//   const toggleVisibility = (id) => {
//     const updatedEyeVisibilityById = {
//       ...eyeVisibilityById,
//       [id]: !eyeVisibilityById[id],
//     };
//     setEyeVisibilityById(updatedEyeVisibilityById);
//   };

//   useEffect(() => {
//     if (!shows) {
//       setEditMode(false);
//       setEditingId(null);
//       setFormData({});
//     }
//   }, [shows]);

//   const handleChange = (name, value) => {
//     if (name === "img") {
//       setFormData({ ...formData, [name]: value });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   return (
//     <Container>
//       <Row>
//       <Col>
//           {!shows && !editMode && (
//             <SearchInput
//               searchQuery={searchQuery}
//               onSearch={handleSearch}
//               onExport={handleExport}
//             />
//           )}
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           {!shows && !editMode ? (
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   {tableColumns.map((col) => (
//                     <th key={col.key}>{col.label}</th>
//                   ))}
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(searchQuery.trim() ? filteredData : team).map((item) => (
//                   <tr key={item.id}>
//                     {tableColumns.map((col) => (
//                       <td key={col.key}>
//                         {col.render ? col.render(item[col.key]) : item[col.key]}
//                       </td>
//                     ))}
//                     <td>
//                       <div className="d-flex">
//                         <Button className="ms-1" onClick={() => toggleEdit(item.id)}>
//                           <FaEdit />
//                         </Button>
//                         <Button className="ms-1" onClick={() => handleDelete(item.id)}>
//                           <FaTrash />
//                         </Button>
//                         <Button
//                           className="ms-1"
//                           onClick={() => {
//                             toggleVisibility(item.id);
//                             handleIsActive(item.id, !eyeVisibilityById[item.id]);
//                           }}
//                         >
//                           {eyeVisibilityById[item.id] ? <FaEyeSlash /> : <FaEye />}
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           ) : (
//             <Card className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                   {formData.img && (
//                       <img
//                         src={formData.img}
//                         alt="current image for post"
//                         style={{ width: "100px", height: "auto", marginBottom: '10px' }}
//                       />
//                     )}
//                     <NewResuableForm
//                       label="Image Upload"
//                       placeholder="Upload Image"
//                       name="img"
//                       type="file"
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.img && (
//                       <p className="text-danger">{errors.img}</p>
//                     )}
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Title"
//                       placeholder="Enter Title"
//                       name="title"
//                       type="text"
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.title && (
//                       <p className="text-danger">{errors.title}</p>
//                     )}
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Description"
//                       placeholder="Enter description"
//                       name="desc"
//                       type="text"
//                       onChange={handleChange}
//                       initialData={formData}
//                       textarea
//                     />
//                     {errors.desc && (
//                       <p className="text-danger">{errors.desc}</p>
//                     )}
//                   </Col>
//                 </Row>
//                 <Row>
               
//                 <div className="mt-3 d-flex justify-content-end">
//                     <Button
//                       type="submit"
//                       variant={editMode ? "success" : "primary"}
//                     >
//                       {editMode ? "Update" : "Submit"}
//                     </Button>
//                   </div>
//                 </Row>
//               </Form>
//             </Card>
//           )}
//         </Col>
//       </Row>


//       <Row>
//   <Col className="mt-3">
//   <TablePagination />

//   </Col>
// </Row>
//     </Container>
//   );
// };

// export default Infrastructure;



////sos final

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form, Table } from "react-bootstrap";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewResuableForm from "../../components/form/NewResuableForm";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "../../components/pagination/TablePagination";
import instance from "../../api/AxiosInstance";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const Infrastructure = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } = useSearchExport();
  const { shows, toggleShows } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [eyeVisibilityById, setEyeVisibilityById] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  const tableColumns = [
    {
      key: "img",
      label: "Image",
      render: (value) => (
        <img
          src={value}
          alt="Infrastructure"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    { key: "title", label: "Title" },
    { key: "desc", label: "Description" },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    if (formData.img && formData.img instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(formData.img);
    } else if (formData.img && typeof formData.img === 'string') {
      setImagePreview(formData.img);
    } else {
      setImagePreview("");
    }
  }, [formData.img]);

  const fetchTeam = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("infrastructure/find-infrastructure", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
    } catch (error) {
      console.error("Error fetching infrastructure data:", error);
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.img) {
      errors.img = "Image is required";
      isValid = false;
    }

    if (!formData.title?.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.desc?.trim()) {
      errors.desc = "Description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      const accessToken = localStorage.getItem("accessToken");
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      try {
        if (editMode) {
          await instance.put(
            `infrastructure/update-infrastructure/${editingId}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success("Data Updated Successfully");

          const updatedTeam = team.map((member) =>
            member.id === editingId ? { ...member, ...formData } : member
          );
          setTeam(updatedTeam);
        } else {
          await instance.post("infrastructure/create-infrastructure", data, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Data Submitted Successfully");
        }
        fetchTeam();
        toggleShows();
        setEditMode(false);
        setFormData({});
        setImagePreview(""); 
      } catch (error) {
        console.error("Error handling form submission:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.delete(
        `infrastructure/isdelete-infrastructure/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting infrastructure:", error);
    }
  };

  const handleIsActive = async (id, isVisible) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.put(
        `infrastructure/isactive-infrastructure/${id}`,
        { isVisible },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (isVisible) {
        toast.success("Data hidden successfully");
      } else {
        toast.success("Data shown successfully");
      }
      fetchTeam();
    } catch (error) {
      console.error("Error updating visibility:", error);
      toast.error("Error updating visibility");
    }
  };

  const toggleEdit = (leaderId) => {
    const memberToEdit = team.find((item) => item.id === leaderId);
    if (memberToEdit) {
      setEditingId(leaderId);
      setEditMode(true);
      toggleShows();
      setFormData(memberToEdit);
    }
  };

  const toggleVisibility = (id) => {
    const updatedEyeVisibilityById = {
      ...eyeVisibilityById,
      [id]: !eyeVisibilityById[id],
    };
    setEyeVisibilityById(updatedEyeVisibilityById);
  };

  useEffect(() => {
    if (!shows) {
      setEditMode(false);
      setEditingId(null);
      setFormData({});
      setImagePreview("");
    }
  }, [shows]);

  const handleChange = (name, value) => {
    if (name === "img") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          {!shows && !editMode && (
            <SearchInput
              searchQuery={searchQuery}
              onSearch={handleSearch}
              onExport={handleExport}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {!shows && !editMode ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  {tableColumns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(searchQuery.trim() ? filteredData : team).map((item) => (
                  <tr key={item.id}>
                    {tableColumns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(item[col.key]) : item[col.key]}
                      </td>
                    ))}
                    <td>
                      <div className="d-flex">
                        <Button className="ms-1" onClick={() => toggleEdit(item.id)}>
                          <FaEdit />
                        </Button>
                        <Button className="ms-1" onClick={() => handleDelete(item.id)}>
                          <FaTrash />
                        </Button>
                        <Button
                          className="ms-1"
                          onClick={() => {
                            toggleVisibility(item.id);
                            handleIsActive(item.id, !eyeVisibilityById[item.id]);
                          }}
                        >
                          {eyeVisibilityById[item.id] ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Card className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Selected Preview"
                        style={{ width: "100px", height: "auto", marginBottom: '10px' }}
                      />
                    )}
                    <NewResuableForm
                      label="Image Upload"
                      placeholder="Upload Image"
                      name="img"
                      type="file"
                      onChange={(name, value) => {
                        const file = value;
                        if (file) {
                          handleChange(name, file);
                        }
                      }}
                      initialData={formData}
                    />
                    {errors.img && <p className="text-danger">{errors.img}</p>}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Title"
                      placeholder="Enter Title"
                      name="title"
                      type="text"
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.title && <p className="text-danger">{errors.title}</p>}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Description"
                      placeholder="Enter description"
                      name="desc"
                      type="text"
                      onChange={handleChange}
                      initialData={formData}
                      textarea
                    />
                    {errors.desc && <p className="text-danger">{errors.desc}</p>}
                  </Col>
                </Row>
                <Row>
                  <div className="mt-3 d-flex justify-content-end">
                    <Button
                      type="submit"
                      variant={editMode ? "success" : "primary"}
                    >
                      {editMode ? "Update" : "Submit"}
                    </Button>
                  </div>
                </Row>
              </Form>
            </Card>
          )}
        </Col>
      </Row>

      <Row>
        <Col className="mt-3">
          <TablePagination />
        </Col>
      </Row>
    </Container>
  );
};

export default Infrastructure;