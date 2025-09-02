import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, browserLocalPersistence, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { deleteUser } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
const auth = getAuth(app);

function partner() {
  const phoneRules = {
    "Nigeria": { min: 10, max: 11, code: "+234" },
    "Ghana": { min: 9, max: 9, code: "+233" },
    "Liberia": { min: 7, max: 8, code: "+231" },
    "Gambia": { min: 7, max: 7, code: "+220" }
  };
  
  const showAlert = (icon, title, text) => {
    Swal.fire({
      icon,
      title,
      text,
      background: '#101727',
      color: '#ffffff',
      iconColor: icon === 'warning' ? '#f5c518' : '#00c3ff',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#f5c518'
    });
  };
  
  const form = document.getElementById("step1Form");
  const countryEl = document.getElementById("country");
  const prefixEl = document.getElementById("phonePrefix");
  const phoneEl = document.getElementById("phone");
  
  if (!form) {
    console.error("Form not found");
    return;
  }
  
  if (countryEl && prefixEl && phoneEl) {
    countryEl.addEventListener("change", () => {
      const selected = countryEl.value;
      if (phoneRules[selected]) {
        prefixEl.value = phoneRules[selected].code;
        prefixEl.readOnly = true;
      } else {
        prefixEl.value = "";
        prefixEl.readOnly = false;
      }
    });
  }
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const firstName = (document.getElementById("firstName")?.value || "").trim();
    const lastName = (document.getElementById("lastName")?.value || "").trim();
    let phone = (phoneEl?.value || "").trim();
    const email = (document.getElementById("email")?.value || "").trim();
    const password = document.getElementById("password")?.value || "";
    const confirmPassword = document.getElementById("confirmPassword")?.value || "";
    const country = countryEl?.value || "";
    const gender = (document.getElementById("gender")?.value || "");
    const phonePrefix = prefixEl?.value || "";
    
    if (!firstName || !lastName || !phone || !country || !gender || !email || !password || !confirmPassword) {
      return showAlert('error', 'Missing Information', 'Please fill in all fields.');
    }
    if (firstName.length < 3) return showAlert('warning', 'Invalid First Name', 'At least 3 characters.');
    if (lastName.length < 3) return showAlert('warning', 'Invalid Last Name', 'At least 3 characters.');
    if (password.length < 6) return showAlert('warning', 'Weak Password', 'At least 6 characters.');
    if (password !== confirmPassword) return showAlert('warning', 'Password Mismatch', 'Passwords do not match.');
    if (password == '123456') return showAlert('warning', 'Password too Weak', "Passwords can't be 123456");
    
    if (country !== "Nigeria") {
      return showAlert(
        'info',
        'Country Not Available',
        `${country} is not available yet. We are currently working on it.`
      );
    }
    
    if (phoneRules[country]) {
      const { min, max } = phoneRules[country];
      if (phone.startsWith("0")) phone = phone.substring(1);
      if (phone.length < min || phone.length > max || isNaN(phone)) {
        return showAlert('error', 'Invalid Phone Number', `${country} phone must be ${min}-${max} digits (no country code).`);
      }
    }
    
    Swal.fire({
      title: 'Creating your account...',
      background: '#101727',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        
        localStorage.setItem("uid", uid);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("phone", phone);
        localStorage.setItem("phonePrefix", phonePrefix);
        localStorage.setItem("email", email);
        localStorage.setItem("country", country);
        localStorage.setItem("gender", gender);
        localStorage.setItem("password", password);
        
        createPartnerAccount()
          .catch(async (err) => {
            console.error("Firestore error:", err);
            try {
              await deleteUser(userCredential.user);
            } catch (delErr) {
              console.error("Failed to delete user after Firestore error:", delErr);
            }
            Swal.fire('Error', 'Could not save your account. Please try again.', 'error');
          });
      })
      .catch((err) => {
        console.error("Auth error:", err);
        if (err.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: 'error',
            title: 'Account Already Exists',
            text: 'This email is already registered. Please sign in instead.',
            background: '#101727',
            color: '#ffffff',
            iconColor: '#f5c518',
            confirmButtonColor: '#f5c518',
          }).then(() => {
            window.location.href = "partnerSignin.html";
          });
        } else {
          showAlert('error', 'Sign Up Failed', err?.message || 'Unknown error');
        }
      });
  });
}

export async function createPartnerAccount() {
  const uid = localStorage.getItem("uid");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const phone = localStorage.getItem("phone");
  const email = localStorage.getItem("email");
  const country = localStorage.getItem("country");
  const gender = localStorage.getItem("gender");
  const prefix = localStorage.getItem("phonePrefix");
  const password = localStorage.getItem("password");
  
  if (!db) {
    console.error("Firestore service is not initialized.");
    return Swal.fire('Error', 'Service unavailable. Please refresh and try again.', 'error');
  }
  if (!getAuth()?.currentUser) {
    console.error("No authenticated user.");
    return Swal.fire('Error', 'You must be signed in to continue.', 'error');
  }
  
  if (!uid || !firstName || !lastName || !phone || !country || !gender || !prefix || !email || !password) {
    return Swal.fire({
      icon: 'error',
      title: 'Missing Data',
      text: 'Please complete Step 1 before continuing.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonColor: '#f5c518',
    }).then(() => {
      window.location.href = "step1.html";
    });
  }
  
  const last3 = phone.slice(-3);
  const referralCode = `${lastName.toLowerCase()}${last3}`;
  const fullReferralURL = `https://kingssolution.vercel.app/?ref=${referralCode}`;
  
  Swal.fire({
    title: 'Setting up your account...',
    background: '#101727',
    color: '#ffffff',
    iconColor: '#f5c518',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });
  
  if (typeof handleAuth === "function") {
    try {
      await handleAuth(email, password);
    } catch (authErr) {
      console.error("Re-authentication failed:", authErr);
      Swal.fire('Error', 'Could not verify your credentials. Please sign in again.', 'error');
      return;
    }
  }
  
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthName = monthNames[currentDate.getMonth()];
  
  const balance = 0;
  const totalEarned = 0;
  const earnings = [
    { "month": currentMonthName, "amount": 0 },
  ];
  
  try {
    await setDoc(doc(db, "affiliate", uid), {
      firstName,
      lastName,
      phone: `${prefix}${phone}`,
      email,
      country,
      password,
      gender,
      referralCode,
      totalEarned,
      balance,
      referralURL: fullReferralURL,
      signupDate: new Date().toISOString(),
      status: "Active"
    });
    
    for (const entry of earnings) {
      await setDoc(doc(db, "affiliate", uid, "earnings", entry.month), {
        month: entry.month,
        amount: entry.amount
      });
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Account Created',
      text: 'Your partner account has been set up successfully.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonColor: '#f5c518',
    }).then(() => {
      window.location.href = "partnerDashboard.html";
    });
    
  } catch (error) {
    console.error("Firestore error:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'There was a problem creating your account. Please try again.',
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonColor: '#f5c518',
    });
  }
}

function signin() {
  document.getElementById("signInForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
      await setPersistence(auth, browserSessionPersistence);;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      Swal.fire({
        icon: 'success',
        title: 'Sign-in Successful',
        text: `Welcome, ${user.email}`,
        background: '#101727',
        color: '#ffffff',
        iconColor: '#f5c518',
        confirmButtonColor: '#f5c518',
      }).then(() => {
        window.location.href = "partnerDashboard.html";
      });
      
    } catch (error) {
      let message = "Sign-in failed. Please try again.";
      
      if (error.code === "auth/user-not-found") {
        message = `No account found with this email: ${email}`;
      } else if (error.code === "auth/wrong-password") {
        message = "Wrong password. Please try again.";
      } else if (error.code === "auth/invalid-credential") {
        message = "Wrong password or invalid account.";
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Sign-in Failed',
        text: message,
        background: '#101727',
        color: '#ffffff',
        iconColor: '#f5c518',
        confirmButtonColor: '#f5c518',
      });
    }
  });
}

function resetPassword() {
  
  document.getElementById("resetPasswordLink").addEventListener("click", async (e) => {
  e.preventDefault();

  const { value: email } = await Swal.fire({
    title: "Reset Password",
    text: "Enter your email to receive a reset link:",
    input: "email",
    inputPlaceholder: "Enter your email address",
    background: '#101727',
    color: '#ffffff',
    confirmButtonText: "Send Reset Link",
    confirmButtonColor: "#f5c518",
    inputValidator: (value) => {
      if (!value) {
        return "Email is required!";
      }
    }
  });

  if (email) {
    try {
      await sendPasswordResetEmail(auth, email);

      Swal.fire({
        icon: "success",
        title: "Check your email",
        text: "A password reset link has been sent to " + email,
        background: '#101727',
        color: '#ffffff',
        iconColor: '#00c3ff',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#f5c518'
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        background: '#101727',
        color: '#ffffff',
        iconColor: '#f5c518',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#f5c518'
      });
    }
  }
});
}

window.signin = signin
window.partner = partner
window.resetPassword = resetPassword