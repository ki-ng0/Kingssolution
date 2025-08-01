import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";
import { getFirestore, collection, query, where, getDoc, getDocs, addDoc, doc, } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEA3gSy36gSnyKoPj4NFLl9yIldR4LkpY",
  authDomain: "kings-solution-bba0e.firebaseapp.com",
  projectId: "kings-solution-bba0e",
  storageBucket: "kings-solution-bba0e.firebasestorage.app",
  messagingSenderId: "18111445430",
  appId: "1:18111445430:web:5ca39cd117b0e2a7e6a917",
  measurementId: "G-XL28VT1DGT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function uploadData() {
  try {
    let selectedExam = JSON.parse(localStorage.getItem('selectedExam'));
    let studentName = JSON.parse(localStorage.getItem('studentName'));
    let studentNumber = JSON.parse(localStorage.getItem('studentNumber'));
    let studentEmail = JSON.parse(localStorage.getItem('studentEmail'));
    let selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'));
    let selectDepartment = JSON.parse(localStorage.getItem('selectDepartment'));
    let selectYear = JSON.parse(localStorage.getItem('selectYear'));
    let subjects = JSON.parse(localStorage.getItem('selectedSubjects'));
    let selectedCount = JSON.parse(localStorage.getItem('selectedCount'));
    let amount = JSON.parse(localStorage.getItem('amount'));
    
    let referralCode = localStorage.getItem('referralMarketer');
    
    let userId = Math.floor(100000 + Math.random() * 900000);
    
    const docRef = await addDoc(collection(db, "students"), {
      userId: userId,
      examType: selectedExam,
      name: studentName,
      phone: studentNumber,
      email: studentEmail,
      packageType: selectedPackage,
      department: selectDepartment,
      examYear: selectYear,
      subjects: subjects,
      amount: amount,
      totalSubjects: selectedCount,
      referredBy: referralCode || null,
      pending: true,
      timestamp: new Date().toISOString()
    });
    
    Swal.fire({
      icon: 'success',
      title: 'Upload Successful',
      text: `Your PIN is: ${userId}`,
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonText: 'Continue',
      confirmButtonColor: '#f5c518',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        popup: 'kings-swal-popup',
        title: 'kings-swal-title',
        confirmButton: 'kings-swal-confirm'
      }
    }).then(() => {
      localStorage.setItem("userPin", userId);
      window.location.href = "user-details.html";
    });
    
  } catch (error) {
    console.error("Error adding document: ", error);
    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: 'Error uploading data. Please try again.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#ff4d4f',
      confirmButtonText: 'Retry',
      confirmButtonColor: '#f5c518',
      showClass: {
        popup: 'animate__animated animate__shakeX'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      },
      customClass: {
        popup: 'kings-swal-popup',
        title: 'kings-swal-title',
        confirmButton: 'kings-swal-confirm'
      }
    });
  }
}

async function checkUser() {
  const userPin = localStorage.getItem("userPin");
  if (!userPin) {
    return;
  }
  
  const studentsRef = collection(db, "students");
  const q = query(studentsRef, where("userId", "==", parseInt(userPin)));
  
  try {
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      await Swal.fire({
        icon: 'error',
        title: 'Account Not Found',
        text: 'Your account has been deleted!',
        background: '#101727',
        color: '#ffffff',
        iconColor: '#f5c518',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#f5c518',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
          popup: 'kings-swal-popup',
          title: 'kings-swal-title',
          confirmButton: 'kings-swal-confirm'
        }
      });
      
      localStorage.removeItem("userPin");
      localStorage.removeItem('selectedExam');
      localStorage.removeItem('studentName');
      localStorage.removeItem('studentNumber');
      localStorage.removeItem('studentEmail');
      localStorage.removeItem('selectedPackage');
      localStorage.removeItem('selectDepartment');
      localStorage.removeItem('selectYear');
      localStorage.removeItem('userSubjects');
      localStorage.removeItem('selectedCount');
      localStorage.removeItem('selectedSubjects');
      localStorage.removeItem('amount');
      
      window.location.href = "index.html";
      return;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

async function fetchUserData() {
  const userPin = localStorage.getItem("userPin");
  if (!userPin) {
    return;
  }
  
  const studentsRef = collection(db, "students");
  const q = query(studentsRef, where("userId", "==", parseInt(userPin)));
  
  try {
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      document.getElementById("userId").textContent = data.userId;
      document.getElementById("examType").textContent = data.examType;
      document.getElementById("name").textContent = data.name;
      document.getElementById("phone").textContent = data.phone;
      document.getElementById("email").textContent = data.email;
      document.getElementById("packageType").textContent = data.packageType?.name || "N/A";
      document.getElementById("department").textContent = data.department;
      document.getElementById("examYear").textContent = data.examYear;
      
      const statusElement = document.getElementById("status");
      const status = data?.status?.toLowerCase() || "pending";
      statusElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      
      if (status === "approved") {
        statusElement.style.color = "green";
      } else if (status === "pending") {
        statusElement.style.color = "orange";
      } else if (status === "rejected") {
        statusElement.style.color = "red";
      } else if (status === "disabled") {
        statusElement.style.color = "gray";
      } else {
        statusElement.style.color = "black";
      }
      
      const subjectsList = document.getElementById("subjectsList");
      subjectsList.innerHTML = "";
      (data.subjects || []).forEach((subject) => {
        let li = document.createElement("li");
        li.textContent = subject;
        subjectsList.appendChild(li);
      });
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error fetching user data. Please try again.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#f5c518',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        popup: 'kings-swal-popup',
        title: 'kings-swal-title',
        confirmButton: 'kings-swal-confirm'
      }
    });
  }
}

async function checkUserAccess() {
  const userPinInput = document.getElementById("userPinInput");
  const userPin = userPinInput.value.trim();
  
  if (!userPin) {
    return Swal.fire({
      icon: 'warning',
      title: 'Missing PIN',
      text: 'Please enter your PIN.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#f5c518',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        popup: 'kings-swal-popup',
        title: 'kings-swal-title',
        confirmButton: 'kings-swal-confirm'
      }
    });
  }
  
  if (userPin === "08162347402") {
    userPinInput.value = "";
    window.location.href = "admin-dashboard.html";
    return;
  }
  
  const q = query(collection(db, "students"), where("userId", "==", parseInt(userPin)));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return Swal.fire({
      icon: 'error',
      title: 'Invalid PIN',
      text: 'Invalid PIN! Please check and try again.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#f5c518',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        popup: 'kings-swal-popup',
        title: 'kings-swal-title',
        confirmButton: 'kings-swal-confirm'
      }
    });
  }
  
  const userData = querySnapshot.docs[0].data();
  if (userData.status !== "approved") {
    return Swal.fire({
      icon: 'info',
      title: 'Access Denied',
      text: 'Your account is still pending approval.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#f5c518',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        popup: 'kings-swal-popup',
        title: 'kings-swal-title',
        confirmButton: 'kings-swal-confirm'
      }
    });
  }
  
  userPinInput.value = "";
  localStorage.setItem("userSubjects", JSON.stringify(userData.subjects));
  window.location.href = "answers.html";
}

async function displayUserSubjectImages(userId) {
  const userRef = doc(db, "students", userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const user = userSnap.data();
    const subjects = user.subjects;
    
    const subjectSelect = document.getElementById("subjectSelect");
    subjectSelect.addEventListener("change", () => {
      const selectedSubject = subjectSelect.value;
      if (subjects[selectedSubject]) {
        const imgContainer = document.getElementById("imageContainer");
        imgContainer.innerHTML = `<img src="${subjects[selectedSubject]}" alt="${selectedSubject} Image">`;
      }
    });
  }
}

async function verification() {
  const userPin = document.getElementById("inputPin").value.trim();
  if (!userPin) {
    await Swal.fire({
      icon: 'warning',
      title: 'PIN Required',
      text: 'Please enter your PIN.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#f5c518',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        popup: 'kings-swal-popup',
        title: 'kings-swal-title',
        confirmButton: 'kings-swal-confirm'
      }
    });
    return;
  }
  
  const q = query(collection(db, "students"), where("userId", "==", parseInt(userPin)));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    await Swal.fire({
      icon: 'error',
      title: 'Invalid PIN',
      text: 'Invalid PIN! Please check and try again.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#f5c518',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        popup: 'kings-swal-popup',
        title: 'kings-swal-title',
        confirmButton: 'kings-swal-confirm'
      }
    });
    return;
  }
  
  window.location.href = "details.html";
}

displayUserSubjectImages("user123");

window.checkUserAccess = checkUserAccess;
window.fetchUserData = fetchUserData;
window.uploadData = uploadData;
window.verification = verification;
window.checkUser = checkUser;