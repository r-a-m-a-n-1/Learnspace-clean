// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Typewriter } from "react-simple-typewriter";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/api";
// import { Trash2, ChevronDown, ChevronUp, Menu, X } from "lucide-react";
// import { db } from "../firebase";
// import {
//   collection,
//   doc,
//   setDoc,
//   getDoc,
// } from "firebase/firestore";

// const semesters = [
//   { name: "Semester 1" },
//   { name: "Semester 2" },
//   { name: "Semester 3" },
//   { name: "Semester 4" },
//   { name: "Semester 5" },
//   { name: "Semester 6" },
//   { name: "Semester 7" },
//   { name: "Semester 8" },
// ];

// const branches = ["IT", "IT-BI", "ECE"];

// const semesterSubjects = {
//   "Semester 1": [
//     "Engineering Physics",
//     "Fundamentals of Electrical & Electronics Engineering",
//     "Linear Algebra",
//     "Problem Solving with Programming",
//     "Technical Communication Skills",
//     "Professional Ethics",
//   ],
//   "Semester 2": {
//     IT: [
//       "Computer Organization and Architecture",
//       "Data Structures and Algorithms",
//       "Discrete Mathematical Structures",
//       "Web Development",
//       "Physical Education",
//       "Principles Of Data Communication",
//       "Principles Of Management",
//     ],
//     "IT-BI": [
//       "Computer Organization and Architecture",
//       "Data Structures and Algorithms",
//       "Discrete Mathematical Structures",
//       "Essentials Of Business Informatics",
//       "Principles Of Management",
//       "Professional Ethics",
//       "Web Development",
//     ],
//     ECE: [
//       "Digital Electronics",
//       "Data Structures and Algorithms",
//       "Electronic Devices And Circuits",
//       "Electronics Measurements And Instrumentations",
//       "Electronic WorkShop",
//       "Probability And Statistics",
//       "Principles of Management",
//       "Physical Education",
//     ],
//   },
//   "Semester 3": {
//     IT: [
//       "Indian Economics",
//       "Operating System",
//       "Software Engineering",
//       "Theory of Computation",
//       "Object Oriented Methodologies",
//       "Probability And Statistics",
//       "Yoga",
//       "Introduction To Finance",
//     ],
//     "IT-BI": [
//       "Object Oriented Methodologies",
//       "Operating System",
//       "Probability and Statistics",
//       "Indian Economics",
//       "Foundation Of Fintech",
//       "Prayas",
//       "Software Engineering",
//       "Introduction To Finance",
//     ],
//     ECE: [
//       "Analog Electronics And Linear ICs",
//       "Biology For Engineers",
//       "Electromagnetic Field And Waves",
//       "Yoga",
//       "Introduction To Finance",
//       "MicroProcessor Interface And Programming",
//       "Signal And System",
//       "Unnat Bharat And Abhiyaan",
//     ],
//   },
//   "Semester 4": {
//     IT: [
//       "Computer Graphics And Visualization",
//       "Computer Network",
//       "Database Management System",
//       "Design And Analysis Of Algorithm",
//       "Money And Banking",
//       "Principles Of Programming Language",
//     ],
//     "IT-BI": [
//       "Digital Marketing",
//       "Computer Network",
//       "Database Management System",
//       "Design And Analysis Of Algorithm",
//       "Money And Banking",
//       "Operation Research",
//     ],
//     ECE: [
//       "Analog Communication",
//       "Antenna And Waves Propagation",
//       "CMOS_VLSI_Design",
//       "Money And Banking",
//       "Control System",
//       "Integrated Circuit Technologies",
//       "Network Synthesis And Analog Filters",
//     ],
//   },
//   "Semester 5": {
//     IT: ["Subject 5.1", "Subject 5.2", "Subject 5.3"],
//     "IT-BI": ["Subject 5.1", "Subject 5.2", "Subject 5.3"],
//     ECE: ["Subject 5.1", "Subject 5.2", "Subject 5.3"],
//   },
//   "Semester 6": {
//     IT: ["Subject 6.1", "Subject 6.2", "Subject 6.3"],
//     "IT-BI": ["Subject 6.1", "Subject 6.2", "Subject 6.3"],
//     ECE: ["Subject 6.1", "Subject 6.2", "Subject 6.3"],
//   },
//   "Semester 7": {
//     IT: ["Subject 7.1", "Subject 7.2", "Subject 7.3"],
//     "IT-BI": ["Subject 7.1", "Subject 7.2", "Subject 7.3"],
//     ECE: ["Subject 7.1", "Subject 7.2", "Subject 7.3"],
//   },
//   "Semester 8": {
//     IT: ["Subject 8.1", "Subject 8.2", "Subject 8.3"],
//     "IT-BI": ["Subject 8.1", "Subject 8.2", "Subject 8.3"],
//     ECE: ["Subject 8.1", "Subject 8.2", "Subject 8.3"],
//   },
// };

// export default function MainAdminHomePage() {
//   const navigate = useNavigate();
//   const { userName, logout } = useAuth();
//   const name = userName.charAt(0).toUpperCase() + userName.slice(1);
//   const initial = name.charAt(0);

//   const [admins, setAdmins] = useState([]);
//   const [showAdmins, setShowAdmins] = useState(false);
//   const [error, setError] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const dropdownRef = useRef();
//   const mobileMenuRef = useRef();
//   const adminsListRef = useRef();

//   const fetchAdmins = async () => {
//     try {
//       const res = await api.get("/admin/all");
//       setAdmins(res.data.admins);
//     } catch {
//       setError("Failed to fetch admins");
//     }
//   };

//   useEffect(() => {
//     if (showAdmins) fetchAdmins();
//   }, [showAdmins]);

//   useEffect(() => {
//     function onClickOutside(e) {
//       if (!dropdownRef.current?.contains(e.target)) {
//         setShowAdmins(false);
//       }
//       if (mobileMenuOpen && !mobileMenuRef.current?.contains(e.target)) {
//         setMobileMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", onClickOutside);
//     return () => document.removeEventListener("mousedown", onClickOutside);
//   }, [mobileMenuOpen]);

//   const deleteAdmin = async (email) => {
//     try {
//       const encodedEmail = encodeURIComponent(email);
//       await api.delete(`/admin/delete/${encodedEmail}`);
//       setAdmins((prev) => prev.filter((a) => a.email !== email));
//       alert("Admin deleted and notified via email.");
//     } catch {
//       alert("Failed to delete admin.");
//     }
//   };

//   const handleAdminsClick = (e) => {
//     e.stopPropagation();
//     setShowAdmins((s) => !s);
//   };

//   const handleDeleteClick = (e, email) => {
//     e.stopPropagation();
//     deleteAdmin(email);
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-900 text-white">
//       {/* Navbar */}
//       <nav className="bg-black px-4 py-3 flex justify-between items-center shadow-md">
//         <div className="flex items-center gap-6">
//           <h2 className="text-xl md:text-2xl font-bold">Main Admin Dashboard</h2>
//           <span className="hidden md:inline text-lg md:text-xl text-blue-400">
//             Welcome,&nbsp;
//             <Typewriter words={[name]} loop={false} cursor cursorStyle="_" typeSpeed={80} />
//           </span>
//         </div>
//         <div className="hidden md:flex items-center gap-4">
//           <div className="relative" ref={dropdownRef}>
//             <button
//               type="button"
//               onClick={() => setShowAdmins((s) => !s)}
//               className="flex items-center px-2 py-1 bg-gray-800 rounded-md hover:bg-gray-700 transition"
//             >
//               <span className="text-sm md:text-base">Admins</span>
//               {showAdmins ? (
//                 <ChevronDown size={16} className="ml-1" />
//               ) : (
//                 <ChevronUp size={16} className="ml-1" />
//               )}
//             </button>
//             {showAdmins && (
//               <div 
//                 className="absolute right-0 mt-2 w-64 max-h-60 bg-gray-800 rounded-md shadow-lg overflow-y-auto z-20 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700"
//                 onMouseDown={e => e.stopPropagation()}
//               >
//                 {error && <div className="px-3 py-2 text-red-400">{error}</div>}
//                 {admins.map((a) => (
//                   <div
//                     key={a.email}
//                     className="flex justify-between items-center px-3 py-2 hover:bg-gray-700 transition"
//                     onMouseDown={e => e.stopPropagation()}
//                   >
//                     <span className="text-sm">
//                       {a.name} ({a.email})
//                     </span>
//                     <button
//                       onClick={(e) => handleDeleteClick(e, a.email)}
//                       title="Delete Admin"
//                       className="p-1 hover:text-red-400"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <button
//             onClick={() => {
//               logout();
//               navigate("/admin/login", { replace: true });
//             }}
//             className="px-2 py-1 bg-red-600 rounded-md hover:bg-red-500 transition text-sm md:text-base"
//           >
//             Logout
//           </button>
//           <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-500 rounded-full text-sm md:text-base">
//             {initial}
//           </div>
//         </div>
//         <button
//           className="md:hidden text-white p-2 rounded-md hover:bg-gray-700"
//           onClick={() => setMobileMenuOpen(true)}
//         >
//           <Menu size={24} />
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
//           <div
//             ref={mobileMenuRef}
//             className="fixed inset-y-0 right-0 w-64 bg-gray-800 shadow-xl z-50 flex flex-col"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full">
//                   {initial}
//                 </div>
//                 <div>
//                   <div className="text-white font-medium">{name}</div>
//                   <div className="text-xs text-gray-300 truncate">{userName}</div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-gray-300 hover:text-white"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               <div className="relative" ref={adminsListRef}>
//                 <button
//                   type="button"
//                   onClick={handleAdminsClick}
//                   className="flex items-center justify-between w-full px-3 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
//                 >
//                   <span>Admins</span>
//                   {showAdmins ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
//                 </button>
//                 {showAdmins && (
//                   <div 
//                     className="mt-2 w-full max-h-52 bg-gray-700 rounded-md shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
//                     onMouseDown={e => e.stopPropagation()}
//                   >
//                     {error && <div className="px-3 py-2 text-red-400 text-sm">{error}</div>}
//                     {admins.map((a) => (
//                       <div
//                         key={a.email}
//                         className="flex justify-between items-center px-3 py-2 hover:bg-gray-600"
//                         onMouseDown={e => e.stopPropagation()}
//                       >
//                         <div className="text-xs">
//                           <div className="font-medium">{a.name}</div>
//                           <div className="text-gray-300 truncate">{a.email}</div>
//                         </div>
//                         <button
//                           onClick={(e) => handleDeleteClick(e, a.email)}
//                           title="Delete Admin"
//                           className="p-1 hover:text-red-400"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={() => {
//                   setMobileMenuOpen(false);
//                   logout();
//                   navigate("/admin/login", { replace: true });
//                 }}
//                 className="w-full px-3 py-2 bg-red-600 rounded-md hover:bg-red-500 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-900 px-4 py-6 flex justify-center">
//         <div className="w-full max-w-3xl">
//           <UploadMaterialForm />
//         </div>
//       </main>
//     </div>
//   );
// }


// function UploadMaterialForm() {
//   const [data, setData] = useState({
//     sem: "Semester 1",
//     branch: "",
//     materialType: "Previous Year Paper", // Default
//     lectureType: "",                  // NEW: holds the chosen lecture type
//     customType: "",                   // NEW: if lectureType === "Other"
//     subject: "",
//     year: "",
//     paperType: "Mid Sem",             // (only used if Previous Year Paper)
//     title: "",
//     file: null,
//   });

//   const [subjects, setSubjects] = useState(semesterSubjects["Semester 1"]);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   useEffect(() => {
//     const { sem, branch } = data;

//     if (sem === "Semester 1") {
//       setSubjects(semesterSubjects[sem] || []);
//     } else {
//       const branchSubjects = semesterSubjects[sem]?.[branch] || [];
//       setSubjects(branchSubjects);
//     }

//     setData((prev) => ({ ...prev, subject: "" }));
//   }, [data.sem, data.branch]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const {
//       sem,
//       branch,
//       year,
//       materialType,
//       lectureType,
//       customType,
//       paperType,
//       title,
//       subject,
//       file,
//     } = data;

//     const showBranch = sem !== "Semester 1";
//     const isPreviousYear = materialType === "Previous Year Paper";
//     const isLectureNotes = materialType === "Lecture Notes and Assignment";

//     // Basic required-fields check
//     if (!file || !year || !subject || !title || (showBranch && !branch)) {
//       return alert("Please fill in all required fields.");
//     }

//     // If uploading Lecture Notes, ensure lectureType is chosen (and customType if “Other”)
//     if (isLectureNotes) {
//       if (!lectureType) {
//         return alert("Please select a Lecture Type.");
//       }
//       if (lectureType === "Other" && !customType.trim()) {
//         return alert("Please specify the 'Other' lecture type.");
//       }
//     }

//     // Compute the final lectureType string
//     let finalLectureType = "";
//     if (isLectureNotes) {
//       finalLectureType =
//         lectureType === "Other" ? customType.trim() : lectureType;
//     }

//     // Keep existing PaperType logic
//     const finalType = materialType;

//     try {
//       const cloudName = "dv5djzhni";
//       const uploadPreset = "unsigned_preset";
//       const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

//       const formData = new FormData();
//       const uniqueFileName = `${file.name.split(".")[0]
//         }_${Date.now()}.${file.name.split(".").pop()}`;
//       formData.append("file", file, uniqueFileName);
//       formData.append("upload_preset", uploadPreset);

//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", cloudinaryUrl, true);

//       // Upload start
//       xhr.upload.onloadstart = () => {
//         setUploading(true);
//         setUploadProgress(0);
//       };

//       // Real progress tracking
//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable) {
//           const percentCompleted = Math.round(
//             (event.loaded / event.total) * 100
//           );
//           setUploadProgress(percentCompleted);
//         }
//       };

//       xhr.onerror = () => {
//         throw new Error("Upload failed. Please try again.");
//       };

//       xhr.onload = async () => {
//         if (xhr.status !== 200 && xhr.status !== 201) {
//           const err = JSON.parse(xhr.responseText);
//           throw new Error(err.error?.message || "Cloudinary upload failed.");
//         }

//         const result = JSON.parse(xhr.responseText);
//         const url = result.secure_url;

//         // Ensure the year document exists
//         const yearRef = doc(db, "semesters", sem, "years", year);
//         const yearSnap = await getDoc(yearRef);
//         if (!yearSnap.exists()) {
//           await setDoc(yearRef, {});
//         }

//         // Now save in “materials” subcollection
//         const matColl = collection(yearRef, "materials");
//         const matRef = doc(matColl);
//         await setDoc(matRef, {
//           title,
//           materialType: finalType,
//           // If it's a previous year paper, keep existing paperType; otherwise, empty
//           paperType: isPreviousYear ? paperType : "",
//           subject,
//           branch: showBranch ? branch : "",
//           fileURL: url,
//           lectureType: finalLectureType, // NEW! ensures Firestore has the chosen lectureType
//           uploadedAt: new Date().toISOString(),
//         });

//         alert("Material uploaded!");

//         // Reset form (but keep materialType so you can quickly upload another of same kind)
//         setData((prev) => ({
//           ...prev,
//           branch: "",
//           subject: "",
//           year: "",
//           title: "",
//           file: null,
//           lectureType: "",   // reset the dropdown
//           customType: "",    // reset the “Other” box
//           // materialType remains, so you can keep uploading same category
//           paperType: "Mid Sem",
//         }));
//         setUploading(false);
//         setUploadProgress(0);
//       };

//       xhr.send(formData);
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("Failed to upload material.");
//       setUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   const showBranch = data.sem !== "Semester 1";
//   const isPreviousYear = data.materialType === "Previous Year Paper";
//   const isLectureNotes = data.materialType === "Lecture Notes and Assignment";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-gray-800 p-8 rounded-xl w-full max-w-2xl shadow-lg text-white space-y-6"
//     >
//       <h2 className="text-2xl font-bold text-center text-blue-400">
//         Upload Study Material / Paper
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <select
//           name="sem"
//           value={data.sem}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-700"
//         >
//           {semesters.map((s) => (
//             <option key={s.name}>{s.name}</option>
//           ))}
//         </select>

//         {showBranch && (
//           <select
//             name="branch"
//             value={data.branch}
//             onChange={handleChange}
//             className="p-2 rounded bg-gray-700"
//           >
//             <option value="">Select Branch</option>
//             {branches.map((b) => (
//               <option key={b}>{b}</option>
//             ))}
//           </select>
//         )}

//         <select
//           name="materialType"
//           value={data.materialType}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-700"
//         >
//           <option>Previous Year Paper</option>
//           <option>Lecture Notes and Assignment</option>
//         </select>

//         <input
//           type="text"
//           name="year"
//           placeholder="Year (e.g., 2023)"
//           value={data.year}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-700"
//         />

//         <select
//           name="subject"
//           value={data.subject}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-700"
//         >
//           <option value="">Select Subject</option>
//           {subjects.map((subj) => (
//             <option key={subj}>{subj}</option>
//           ))}
//         </select>

//         {/* Only show this dropdown if “Previous Year Paper” is selected */}
//         {isPreviousYear && (
//           <select
//             name="paperType"
//             value={data.paperType}
//             onChange={handleChange}
//             className="p-2 rounded bg-gray-700"
//           >
//             <option>Mid Sem</option>
//             <option>End Sem</option>
//             <option>Quiz</option>
//           </select>
//         )}

//         {/* ===== NEW: Lecture Type dropdown if “Lecture Notes and Assignment” ===== */}
//         {isLectureNotes && (
//           <div className="col-span-full flex flex-col gap-2">
//             <select
//               name="lectureType"
//               value={data.lectureType}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-700"
//             >
//               <option value="">Select Lecture Type</option>
//               <option>Assignment</option>
//               <option>Tutorial Sheet</option>
//               <option>Lecture Notes</option>
//               <option>PPT</option>
//               <option>Handwritten Notes</option>
//               <option>Other</option>
//             </select>

//             {data.lectureType === "Other" && (
//               <input
//                 type="text"
//                 name="customType"
//                 placeholder="Please specify (e.g., 'Lab Manual')"
//                 value={data.customType}
//                 onChange={handleChange}
//                 className="p-2 rounded bg-gray-700"
//               />
//             )}
//           </div>
//         )}
//         {/* ===== END of Lecture Type section ===== */}

//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={data.title}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-700"
//         />

//         <input
//           type="file"
//           name="file"
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-700 text-white"
//         />
//       </div>

//       {uploading && (
//         <div className="flex items-center gap-2">
//           <div className="w-full bg-gray-700 rounded-full overflow-hidden h-4">
//             <div
//               className="h-4 bg-gradient-to-r from-green-400 to-teal-500 transition-all duration-200"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//           <span className="text-white text-sm w-12 text-right">
//             {uploadProgress}%
//           </span>
//         </div>
//       )}

//       <button
//         type="submit"
//         disabled={uploading}
//         className={`px-6 py-2 rounded ${uploading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-500 hover:bg-blue-600"
//           }`}
//       >
//         {uploading ? "Uploading..." : "Upload"}
//       </button>
//     </form>
//   );
// }





// file size validation added 


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { Trash2, ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const semesters = [
  { name: "Semester 1" },
  { name: "Semester 2" },
  { name: "Semester 3" },
  { name: "Semester 4" },
  { name: "Semester 5" },
  { name: "Semester 6" },
  { name: "Semester 7" },
  { name: "Semester 8" },
];

const branches = ["IT", "IT-BI", "ECE"];

const semesterSubjects = {
  "Semester 1": [
    "Engineering Physics",
    "Fundamentals of Electrical & Electronics Engineering",
    "Linear Algebra",
    "Problem Solving with Programming",
    "Technical Communication Skills",
    "Professional Ethics",
  ],
  "Semester 2": {
    IT: [
      "Computer Organization and Architecture",
      "Data Structures and Algorithms",
      "Discrete Mathematical Structures",
      "Web Development",
      "Physical Education",
      "Principles Of Data Communication",
      "Principles Of Management",
    ],
    "IT-BI": [
      "Computer Organization and Architecture",
      "Data Structures and Algorithms",
      "Discrete Mathematical Structures",
      "Essentials Of Business Informatics",
      "Principles Of Management",
      "Professional Ethics",
      "Web Development",
    ],
    ECE: [
      "Digital Electronics",
      "Data Structures and Algorithms",
      "Electronic Devices And Circuits",
      "Electronics Measurements And Instrumentations",
      "Electronic WorkShop",
      "Probability And Statistics",
      "Principles of Management",
      "Physical Education",
    ],
  },
  "Semester 3": {
    IT: [
      "Indian Economics",
      "Operating System",
      "Software Engineering",
      "Theory of Computation",
      "Object Oriented Methodologies",
      "Probability And Statistics",
      "Yoga",
      "Introduction To Finance",
    ],
    "IT-BI": [
      "Object Oriented Methodologies",
      "Operating System",
      "Probability and Statistics",
      "Indian Economics",
      "Foundation Of Fintech",
      "Prayas",
      "Software Engineering",
      "Introduction To Finance",
    ],
    ECE: [
      "Analog Electronics And Linear ICs",
      "Biology For Engineers",
      "Electromagnetic Field And Waves",
      "Yoga",
      "Introduction To Finance",
      "MicroProcessor Interface And Programming",
      "Signal And System",
      "Unnat Bharat And Abhiyaan",
    ],
  },
  "Semester 4": {
    IT: [
      "Computer Graphics And Visualization",
      "Computer Network",
      "Database Management System",
      "Design And Analysis Of Algorithm",
      "Money And Banking",
      "Principles Of Programming Language",
    ],
    "IT-BI": [
      "Digital Marketing",
      "Computer Network",
      "Database Management System",
      "Design And Analysis Of Algorithm",
      "Money And Banking",
      "Operation Research",
    ],
    ECE: [
      "Analog Communication",
      "Antenna And Waves Propagation",
      "CMOS_VLSI_Design",
      "Money And Banking",
      "Control System",
      "Integrated Circuit Technologies",
      "Network Synthesis And Analog Filters",
    ],
  },
  "Semester 5": {
    IT: ["Subject 5.1", "Subject 5.2", "Subject 5.3"],
    "IT-BI": ["Subject 5.1", "Subject 5.2", "Subject 5.3"],
    ECE: ["Subject 5.1", "Subject 5.2", "Subject 5.3"],
  },
  "Semester 6": {
    IT: ["Subject 6.1", "Subject 6.2", "Subject 6.3"],
    "IT-BI": ["Subject 6.1", "Subject 6.2", "Subject 6.3"],
    ECE: ["Subject 6.1", "Subject 6.2", "Subject 6.3"],
  },
  "Semester 7": {
    IT: ["Subject 7.1", "Subject 7.2", "Subject 7.3"],
    "IT-BI": ["Subject 7.1", "Subject 7.2", "Subject 7.3"],
    ECE: ["Subject 7.1", "Subject 7.2", "Subject 7.3"],
  },
  "Semester 8": {
    IT: ["Subject 8.1", "Subject 8.2", "Subject 8.3"],
    "IT-BI": ["Subject 8.1", "Subject 8.2", "Subject 8.3"],
    ECE: ["Subject 8.1", "Subject 8.2", "Subject 8.3"],
  },
};

export default function MainAdminHomePage() {
  const navigate = useNavigate();
  const { userName, logout } = useAuth();
  const name = userName.charAt(0).toUpperCase() + userName.slice(1);
  const initial = name.charAt(0);

  const [admins, setAdmins] = useState([]);
  const [showAdmins, setShowAdmins] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const mobileMenuRef = useRef();
  const adminsListRef = useRef();

  const fetchAdmins = async () => {
    try {
      const res = await api.get("/admin/all");
      setAdmins(res.data.admins);
    } catch {
      setError("Failed to fetch admins");
    }
  };

  useEffect(() => {
    if (showAdmins) fetchAdmins();
  }, [showAdmins]);

  useEffect(() => {
    function onClickOutside(e) {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowAdmins(false);
      }
      if (mobileMenuOpen && !mobileMenuRef.current?.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [mobileMenuOpen]);

  const deleteAdmin = async (email) => {
    try {
      const encodedEmail = encodeURIComponent(email);
      await api.delete(`/admin/delete/${encodedEmail}`);
      setAdmins((prev) => prev.filter((a) => a.email !== email));
      alert("Admin deleted and notified via email.");
    } catch {
      alert("Failed to delete admin.");
    }
  };

  const handleAdminsClick = (e) => {
    e.stopPropagation();
    setShowAdmins((s) => !s);
  };

  const handleDeleteClick = (e, email) => {
    e.stopPropagation();
    deleteAdmin(email);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-black px-4 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-6">
          <h2 className="text-xl md:text-2xl font-bold">Main Admin Dashboard</h2>
          <span className="hidden md:inline text-lg md:text-xl text-blue-400">
            Welcome,&nbsp;
            <Typewriter words={[name]} loop={false} cursor cursorStyle="_" typeSpeed={80} />
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowAdmins((s) => !s)}
              className="flex items-center px-2 py-1 bg-gray-800 rounded-md hover:bg-gray-700 transition"
            >
              <span className="text-sm md:text-base">Admins</span>
              {showAdmins ? (
                <ChevronDown size={16} className="ml-1" />
              ) : (
                <ChevronUp size={16} className="ml-1" />
              )}
            </button>
            {showAdmins && (
              <div 
                className="absolute right-0 mt-2 w-64 max-h-60 bg-gray-800 rounded-md shadow-lg overflow-y-auto z-20 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700"
                onMouseDown={e => e.stopPropagation()}
              >
                {error && <div className="px-3 py-2 text-red-400">{error}</div>}
                {admins.map((a) => (
                  <div
                    key={a.email}
                    className="flex justify-between items-center px-3 py-2 hover:bg-gray-700 transition"
                    onMouseDown={e => e.stopPropagation()}
                  >
                    <span className="text-sm">
                      {a.name} ({a.email})
                    </span>
                    <button
                      onClick={(e) => handleDeleteClick(e, a.email)}
                      title="Delete Admin"
                      className="p-1 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/admin/login", { replace: true });
            }}
            className="px-2 py-1 bg-red-600 rounded-md hover:bg-red-500 transition text-sm md:text-base"
          >
            Logout
          </button>
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-500 rounded-full text-sm md:text-base">
            {initial}
          </div>
        </div>
        <button
          className="md:hidden text-white p-2 rounded-md hover:bg-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div
            ref={mobileMenuRef}
            className="fixed inset-y-0 right-0 w-64 bg-gray-800 shadow-xl z-50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full">
                  {initial}
                </div>
                <div>
                  <div className="text-white font-medium">{name}</div>
                  <div className="text-xs text-gray-300 truncate">{userName}</div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="relative" ref={adminsListRef}>
                <button
                  type="button"
                  onClick={handleAdminsClick}
                  className="flex items-center justify-between w-full px-3 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
                >
                  <span>Admins</span>
                  {showAdmins ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
                {showAdmins && (
                  <div 
                    className="mt-2 w-full max-h-52 bg-gray-700 rounded-md shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                    onMouseDown={e => e.stopPropagation()}
                  >
                    {error && <div className="px-3 py-2 text-red-400 text-sm">{error}</div>}
                    {admins.map((a) => (
                      <div
                        key={a.email}
                        className="flex justify-between items-center px-3 py-2 hover:bg-gray-600"
                        onMouseDown={e => e.stopPropagation()}
                      >
                        <div className="text-xs">
                          <div className="font-medium">{a.name}</div>
                          <div className="text-gray-300 truncate">{a.email}</div>
                        </div>
                        <button
                          onClick={(e) => handleDeleteClick(e, a.email)}
                          title="Delete Admin"
                          className="p-1 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate("/admin/login", { replace: true });
                }}
                className="w-full px-3 py-2 bg-red-600 rounded-md hover:bg-red-500 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-900 px-4 py-6 flex justify-center">
        <div className="w-full max-w-3xl">
          <UploadMaterialForm />
        </div>
      </main>
    </div>
  );
}

function UploadMaterialForm() {
  const [data, setData] = useState({
    sem: "Semester 1",
    branch: "",
    materialType: "Previous Year Paper",
    lectureType: "",
    customType: "",
    subject: "",
    year: "",
    paperType: "Mid Sem",
    title: "",
    file: null,
  });

  const [subjects, setSubjects] = useState(semesterSubjects["Semester 1"]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // File size validation
    if (name === "file" && files && files[0]) {
      const fileSizeMB = files[0].size / (1024 * 1024);
      const maxSizeMB = 10;
      
      if (fileSizeMB > maxSizeMB) {
        alert(`File size is too large (${fileSizeMB.toFixed(2)} MB). Please select a file smaller than ${maxSizeMB} MB.`);
        return;
      }
    }

    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  useEffect(() => {
    const { sem, branch } = data;

    if (sem === "Semester 1") {
      setSubjects(semesterSubjects[sem] || []);
    } else {
      const branchSubjects = semesterSubjects[sem]?.[branch] || [];
      setSubjects(branchSubjects);
    }

    setData((prev) => ({ ...prev, subject: "" }));
  }, [data.sem, data.branch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Double check file size at submission
    if (data.file) {
      const fileSizeMB = data.file.size / (1024 * 1024);
      const maxSizeMB = 10;
      
      if (fileSizeMB > maxSizeMB) {
        alert(`File size is too large (${fileSizeMB.toFixed(2)} MB). Please select a file smaller than ${maxSizeMB} MB.`);
        return;
      }
    }

    const {
      sem,
      branch,
      year,
      materialType,
      lectureType,
      customType,
      paperType,
      title,
      subject,
      file,
    } = data;

    const showBranch = sem !== "Semester 1";
    const isPreviousYear = materialType === "Previous Year Paper";
    const isLectureNotes = materialType === "Lecture Notes and Assignment";

    if (!file || !year || !subject || !title || (showBranch && !branch)) {
      return alert("Please fill in all required fields.");
    }

    if (isLectureNotes) {
      if (!lectureType) {
        return alert("Please select a Lecture Type.");
      }
      if (lectureType === "Other" && !customType.trim()) {
        return alert("Please specify the 'Other' lecture type.");
      }
    }

    let finalLectureType = "";
    if (isLectureNotes) {
      finalLectureType = lectureType === "Other" ? customType.trim() : lectureType;
    }

    const finalType = materialType;

    try {
      const cloudName = "dv5djzhni";
      const uploadPreset = "unsigned_preset";
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

      const formData = new FormData();
      const uniqueFileName = `${file.name.split(".")[0]}_${Date.now()}.${file.name.split(".").pop()}`;
      formData.append("file", file, uniqueFileName);
      formData.append("upload_preset", uploadPreset);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", cloudinaryUrl, true);

      xhr.upload.onloadstart = () => {
        setUploading(true);
        setUploadProgress(0);
      };

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentCompleted);
        }
      };

      xhr.onerror = () => {
        throw new Error("Upload failed. Please try again.");
      };

      xhr.onload = async () => {
        if (xhr.status !== 200 && xhr.status !== 201) {
          const err = JSON.parse(xhr.responseText);
          throw new Error(err.error?.message || "Cloudinary upload failed.");
        }

        const result = JSON.parse(xhr.responseText);
        const url = result.secure_url;

        const yearRef = doc(db, "semesters", sem, "years", year);
        const yearSnap = await getDoc(yearRef);
        if (!yearSnap.exists()) {
          await setDoc(yearRef, {});
        }

        const matColl = collection(yearRef, "materials");
        const matRef = doc(matColl);
        await setDoc(matRef, {
          title,
          materialType: finalType,
          paperType: isPreviousYear ? paperType : "",
          subject,
          branch: showBranch ? branch : "",
          fileURL: url,
          lectureType: finalLectureType,
          uploadedAt: new Date().toISOString(),
        });

        alert("Material uploaded!");

        setData((prev) => ({
          ...prev,
          branch: "",
          subject: "",
          year: "",
          title: "",
          file: null,
          lectureType: "",
          customType: "",
          paperType: "Mid Sem",
        }));
        setUploading(false);
        setUploadProgress(0);
      };

      xhr.send(formData);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload material.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const showBranch = data.sem !== "Semester 1";
  const isPreviousYear = data.materialType === "Previous Year Paper";
  const isLectureNotes = data.materialType === "Lecture Notes and Assignment";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-8 rounded-xl w-full max-w-2xl shadow-lg text-white space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-blue-400">
        Upload Study Material / Paper
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="sem"
          value={data.sem}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        >
          {semesters.map((s) => (
            <option key={s.name}>{s.name}</option>
          ))}
        </select>

        {showBranch && (
          <select
            name="branch"
            value={data.branch}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          >
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        )}

        <select
          name="materialType"
          value={data.materialType}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        >
          <option>Previous Year Paper</option>
          <option>Lecture Notes and Assignment</option>
        </select>

        <input
          type="text"
          name="year"
          placeholder="Year (e.g., 2023)"
          value={data.year}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        />

        <select
          name="subject"
          value={data.subject}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        >
          <option value="">Select Subject</option>
          {subjects.map((subj) => (
            <option key={subj}>{subj}</option>
          ))}
        </select>

        {isPreviousYear && (
          <select
            name="paperType"
            value={data.paperType}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          >
            <option>Mid Sem</option>
            <option>End Sem</option>
            <option>Quiz</option>
          </select>
        )}

        {isLectureNotes && (
          <div className="col-span-full flex flex-col gap-2">
            <select
              name="lectureType"
              value={data.lectureType}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700"
            >
              <option value="">Select Lecture Type</option>
              <option>Assignment</option>
              <option>Tutorial Sheet</option>
              <option>Lecture Notes</option>
              <option>PPT</option>
              <option>Handwritten Notes</option>
              <option>Other</option>
            </select>

            {data.lectureType === "Other" && (
              <input
                type="text"
                name="customType"
                placeholder="Please specify (e.g., 'Lab Manual')"
                value={data.customType}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
            )}
          </div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700"
        />

        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
      </div>

      {uploading && (
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-700 rounded-full overflow-hidden h-4">
            <div
              className="h-4 bg-gradient-to-r from-green-400 to-teal-500 transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <span className="text-white text-sm w-12 text-right">
            {uploadProgress}%
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className={`px-6 py-2 rounded ${
          uploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}