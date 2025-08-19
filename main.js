const urlParams = new URLSearchParams(window.location.search);
const ref = urlParams.get('ref');

if (ref) {
  localStorage.setItem('referralMarketer', ref);
}

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('menu');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});


document.addEventListener('click', (e) => {
  const isClickInsideMenu = navMenu.contains(e.target);
  const isClickOnToggle = menuToggle.contains(e.target);
  
  if (!isClickInsideMenu && !isClickOnToggle) {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

function togglePinVisibility() {
  const input = document.getElementById("userPinInput");
  const eyeOpen = document.getElementById("eyeOpen");
  const eyeSlash = document.getElementById("eyeSlash");
  
  if (input.type === "password") {
    input.type = "text";
    eyeOpen.style.display = "none";
    eyeSlash.style.display = "inline";
  } else {
    input.type = "password";
    eyeOpen.style.display = "inline";
    eyeSlash.style.display = "none";
  }
}


const inputs = document.querySelectorAll("nav.nav input, nav.nav textarea");

inputs.forEach(input => {
  input.addEventListener("focus", () => {
    setTimeout(() => {
      input.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 300);
  });
});

function main(param) {
  if (param === 'index') {
    window.location.href = 'index.html';
  } else if (param === 'back') {
    window.history.back();
  } else if (param === 'massageUs') {
    window.location.href = 'https://wa.me/2347057217535?text=I%20have%20made%20my%20payment%20in%20full%20here%20is%20my%20receipt........';
  } else if (param === 'group') {
    window.location.href = 'https://chat.whatsapp.com/BkbG13vukPd2qHYgCcthyr?mode=ac_t';
  } else if (param === 'proofs') {
    window.location.href = 'proofs.html';
  } else if (param === 'verification') {
    window.location.href = 'verification.html'
  } else if (param == 'past') {
    window.location.href = 'timer.html'
  }
}

function valid1(nextPage) {
  let filed = document.querySelectorAll('select');
  let isvalid = true;
  
  filed.forEach((selectField, index) => {
    if (selectField.value === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Selection',
        text: `Please select an option for the field`,
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
      
      isvalid = false;
    }
  });
  
  if (isvalid) {
    window.location.href = `${nextPage}`;
  }
}

function call() {
  let text = document.getElementById('text');
  let number = document.getElementById('number');
  
  if (text.value.length <= 3) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Name',
      text: 'Name must be more than 3 characters',
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
    return false;
  }
  else if (number.value.length <= 10) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Number',
      text: 'Phone number must be more than 10 digits',
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
    return false;
  }
  else if (number.value.length > 11) {
    Swal.fire({
      icon: 'warning',
      title: 'Too Long',
      text: 'Phone number should not be more than 11 digits',
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
    return false;
  }
  
  window.location.href = 'step3.html';
}

function work() {
  
  const selectElement = document.getElementById('options');
  const selectedOptionElement = document.getElementById('selected-option');
  const descriptionElement = document.getElementById('description');
  
  const descriptions = {
    "8,9 Science subjects pin": "<b>Description:</b> <em>This is for science students who determined to pass their 9 subjects with our help. Subscribers on this package will only get 9 subjects questions, Answers, Practical from our answer page but won't be added to our WhatsApp group but he/she can still join our subject groups through the links that will be displayed to him/her on the answer page.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦10,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 9",
    "8,9 Science subjects WhatsApp group": "<b>Description:</b> <em>This is the the most popular package. This is designed for candidates who want to subscribe either for their 9 subjects or less than that and prefer getting the answers from our answer page or our android app. Subscribers on this package will be getting password a day or midnight to any day he/she has exam which he/she can use to login to view his/her answers at least mid-night to the exam. All subscribers on this package will also be added to our WhatsApp group where they will get everything they needed for the exam.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦12,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 9",
    "8,9 Arts subjects pin": "<b>Description:</b> <em>This is for art students who determined to pass their 9 subjects with our help. Subscribers on this package will only get 9 subjects questions, Answers, Practical from our answer page but won't be added to our WhatsApp group but he or she can still join our subject groups through the links that will be displayed to him or her on the answer page.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦10,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 9",
    "8,9 Arts subjects WhatsApp group": "<b>Description:</b> <em>This is for arts students who determined to pass their 9 subjects with our help. Subscribers on this package will only get 9 subjects Questions & Answers from our answer page and he/she will be added to our WhatsApp group. In our WhatsApp group, the subscribers will get all they needed for the exam.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦12,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 9",
    "8,9 Commercial subjects pin": "<b>Description:</b> <em>This is for commercial students who determined to pass their 9 subjects with our help. Subscribers on this package will only get 9 subjects questions, Answers, Practical from our answer page but won't be added to our WhatsApp group but he or she can still join our subject groups through the links that will be displayed to him or her on the answer page.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦10,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 9",
    "8,9 Commercial subjects WhatsApp group": "<b>Description:</b> <em>This is for arts and commercial students who determined to pass their 9 subjects with our help. Subscribers on this package will only get 9 subjects Questions & Answers from our answer page and he/she will be added to our WhatsApp group. In our WhatsApp group, the subscribers will get all they needed for the exam.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦12,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 9",
    "1 subject only": "<b>Description:</b> <em>Only 1 subject . Note that if you choose English, Mathematics or Any subject that has practical, the price might change.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦1,500" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 1",
    "2 subject only": "<b>Description:</b> <em>This is package for all that needed only 2 subjects. Note that if you choose English, Mathematics or Any subject that has practical, the price might change.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦3,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 2",
    "3 subject only": "<b>Description:</b> <em>This is for people that wants 3 subjects only. Note that if you choose English, Mathematics or Any subject that has practical, the price might change.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦4,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 3",
    "4,5,6 subjects only": "<b>Description:</b> <em>This is 6 subjects subscription. This is for people who wants only 6 subject and want to get A1 in those subjects.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦7,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 6",
    "7 subject only": "<b>Description:</b> <em>This is 7 subjects subscription. This is for people who wants only 7 subject and want to get A1 in those subjects.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦8,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 7",
    "8 subject only": "<b>Description:</b> <em>This is 8 subjects subscription. This is for people who wants only 8 subject and want to get A1 in those subjects.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦9,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> 8",
    "All subjects pin": "<b>Description:</b> <em>You will receive pins to all the subject answers as text message midnight before the exams. The pins will be used to unlock each subject answers including questions and practical. All subscribers on this VIP Package receive our daily password to view the answers online via our answers page from the beginning till the end of the exams. Our answers come to subject WhatsApp Group but no guarantee for subject WhatsApp group for all the subjects. This is the best option for all that want both Science, Arts and Commercial answers passwords/pins instead of being added to WhatsApp Group.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦15,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> All",
    "VIP whatsapp group": "<b>Description:</b> <em>You will receive all the exam answers on WhatsApp mid-night to the exams including questions and practicals. All Our WhatsApp VIP subscribers also receive our daily password to view the answers online via our answers page if they wish. Our answers come to our WhatsApp Group or Private to you if you don't like WhatsApp group. This is the best option for all that want both Science, Arts and Commercial answers on WhatsApp with VIP treat attached.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦50,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> All",
    "Limited VIP whatsapp group": "<b>Description:</b> <em>You will receive all the exam answers on WhatsApp mid-night to the exams including questions and practicals. All Our WhatsApp VIP subscribers also receive our daily password to view the answers online via our answers page if they wish. Our answers come to our WhatsApp Group or Private to you if you don't like WhatsApp group. This is the best option for all that want both Science, Arts and Commercial answers on WhatsApp with VIP treat attached.</em><hr>" + "<br/>" + "<b>Normal Price:</b> ₦35,000" + "<br/>" + "<b>Promo Price:</b> ₦0.000" + "<br/>" + "<b>Promo Discount:</b> ₦0.000" + "<br/>" + "<b>Promo End Date:</b> Sat 31 th Jan 2025. <span>ended</span>" + "<br/><hr>" + "<b>Maximum Subjects:</b> All",
  };
  
  selectElement.addEventListener('change', function() {
    const selectedValue = this.value;
    const selectedText = this.options[this.selectedIndex].text;
    
    selectedOptionElement.innerHTML = `<strong>Selected Package:</strong> ${selectedText}`;
    descriptionElement.innerHTML = descriptions[selectedValue];
    descriptionElement.style.fontSize = '13px';
    selectedOptionElement.style.flontSize = '13px';
  });
}

function why() {
  const selectedOption = document.getElementById('options');
  if (selectedOption) {
    selectedOption.addEventListener('change', function() {
      const select = this.options[this.selectedIndex].text.trim().toLowerCase();
      
      const packageData = {
        '8,9 science subjects pin': { limit: 9, amount: '₦10,000' },
        '8,9 science subjects whatsapp group': { limit: 9, amount: '₦12,000' },
        '8,9 arts subjects pin': { limit: 9, amount: '₦10,000' },
        '8,9 arts subjects whatsapp group': { limit: 9, amount: '₦12,000' },
        '8,9 commercial subjects pin': { limit: 9, amount: '₦10,000' },
        '8,9 commercial subjects whatsapp group': { limit: 9, amount: '₦12,000' },
        '1 subject only': { limit: 1, amount: '₦1,500' },
        '2 subject only': { limit: 2, amount: '₦3,000' },
        '3 subject only': { limit: 3, amount: '₦4,000' },
        '4,5,6 subjects only': { limit: 6, amount: '₦7,000' },
        '7 subject only': { limit: 7, amount: '₦8,000' },
        '8 subject only': { limit: 8, amount: '₦9,000' },
        'all subjects pin': {
          limit: "You're expected to select all the subjects because the package you selected covers all subjects.",
          amount: '₦15,000'
        },
        'vip whatsapp group': {
          limit: "You're expected to select all the subjects because the package you selected covers all subjects.",
          amount: '₦50,000'
        },
        'limited vip whatsapp group': {
          limit: "You're expected to select all the subjects because the package you selected covers all subjects.",
          amount: '₦35,000'
        }
      };
      
      if (packageData[select]) {
        const { limit, amount } = packageData[select];
        localStorage.setItem('amount', JSON.stringify(amount));
        
        const selectedPackage = {
          name: select,
          maxSubjects: limit
        };
        
        localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
      } else {
        console.warn(`Selected option "${select}" not found in packageData`);
      }
    });
  }
}

function fname() {
  why();
  
  let selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'));
  
  if (!selectedPackage) return;
  
  const maxSubjects = selectedPackage.maxSubjects;
  document.querySelector('.package').textContent = selectedPackage.name;
  
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  function updateCheckboxState() {
    let selectedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    
    checkboxes.forEach(checkbox => {
      checkbox.disabled = selectedCount >= maxSubjects && !checkbox.checked;
    });
  }
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCheckboxState);
  });
  
  updateCheckboxState();
}

function countSelected() {
  let selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'));
  
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selectedCountDisplay = document.getElementById('selectedCount');
  const maxCountDisplay = document.getElementById('maxCount');
  
  maxCountDisplay.textContent = selectedPackage.maxSubjects;
  
  function updateSelectedCount() {
    const selectedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    
    selectedCountDisplay.textContent = selectedCount;
    localStorage.setItem('selectedCount', JSON.stringify(selectedCount))
    
    checkboxes.forEach(checkbox => {
      if (selectedCount >= selectedPackage.maxSubjects && !checkbox.checked) {
        checkbox.disabled = true;
      } else {
        checkbox.disabled = false;
      }
    });
  }
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateSelectedCount();
    });
  });
  
  updateSelectedCount();
}

function getSelectedSubjects() {
  const selectedSubjects = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  
  checkboxes.forEach(checkbox => {
    selectedSubjects.push(checkbox.value);
  });
  subjectsSelected()
  return selectedSubjects;
}

function subjectsSelected() {
  document.getElementById('next').addEventListener('click', () => {
    const selectedSubjects = getSelectedSubjects();
    
    console.log("Selected Subjects:", selectedSubjects);
    
    localStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));
  });
}

function getSelectedExam() {
  const selectElement = document.getElementById("examSelect");
  examSelect()
  return selectElement.value;
}

function getCountry() {
  const selectCountry = document.getElementById("country");
  examSelect()
  return selectCountry.value;
}

function newcountry() {
  document.getElementById("country").addEventListener("change", function() {
    const selectedCountry = getCountry();
  });
}

function newName() {
  document.getElementById("examSelect").addEventListener("change", function() {
    const selectedExam = getSelectedExam();
    
  });
}

function examSelect() {
  document.getElementById("next").addEventListener("click", function() {
    const selectedExam = getSelectedExam();
    const selectedCountry = getCountry();
    if (selectedExam && selectedCountry) {
      localStorage.setItem("selectedExam", JSON.stringify(selectedExam));
      localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
      
    } else {
      console.log(selectedExam)
      console.log(selectedCountry)
    }
  });
}

function getEnteredName() {
  inputText()
  return document.getElementById("text").value;
}

function inputText() {
  document.getElementById("next").addEventListener("click", function() {
    const name = getEnteredName();
    if (name.trim() !== "") {
      localStorage.setItem("studentName", JSON.stringify(name));
      
    } else {
      console.log(name);
    }
  });
}

function getEnteredNumber() {
  inputNumber()
  return document.getElementById("number").value;
}

function inputNumber() {
  document.getElementById("next").addEventListener("click", function() {
    const number = getEnteredNumber();
    if (number.trim() !== "" && !isNaN(number) && number > 0) {
      localStorage.setItem("studentNumber", JSON.stringify(number));
      
    } else {
      console.log(number);
    }
  });
}

function getEnteredEmail() {
  Email()
  return document.getElementById("studentEmail").value.trim() || 'null';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function Email() {
  document.getElementById("next").addEventListener("click", function() {
    const email = getEnteredEmail();
    if (isValidEmail(email)) {
      localStorage.setItem("studentEmail", JSON.stringify(email));
      
    } else {
      console.log(email)
    }
  });
  
}

function getSelectedDepartment() {
  const selectElement = document.getElementById("selectDepartment");
  Department()
  return selectElement.value;
}

function SON() {
  document.getElementById("selectDepartment").addEventListener("change", function() {
    const selectedDepartment = getSelectedDepartment();
    
  });
}

function Department() {
  document.getElementById("next").addEventListener("click", function() {
    const selectDepartment = getSelectedDepartment();
    if (selectDepartment) {
      localStorage.setItem("selectDepartment", JSON.stringify(selectDepartment));
      
    } else {
      console.log(selectDepartment)
    }
  });
}

function getSelectedYear() {
  const selectElement = document.getElementById("selectYear");
  Year()
  return selectElement.value;
}

function yearSON() {
  document.getElementById("selectYear").addEventListener("change", function() {
    const selectedDepartment = getSelectedYear();
    
  });
}

function Year() {
  document.getElementById("next").addEventListener("click", function() {
    const selectYear = getSelectedYear();
    if (selectYear) {
      localStorage.setItem("selectYear", JSON.stringify(selectYear));
      
    } else {
      console.log(selectYear)
    }
  });
}

function information() {
  let examType = document.getElementById('ExamType');
  let name = document.getElementById('Name');
  let phone = document.getElementById('Phone');
  let email = document.getElementById('Email');
  let packageType = document.getElementById('PackageType');
  let department = document.getElementById('Department');
  let examYear = document.getElementById('ExamYear');
  let sub = document.getElementById('Subjects');
  let count = document.getElementById('count');
  let selectedExam = JSON.parse(localStorage.getItem('selectedExam'));
  let studentName = JSON.parse(localStorage.getItem('studentName'));
  let studentNumber = JSON.parse(localStorage.getItem('studentNumber'));
  let studentEmail = JSON.parse(localStorage.getItem('studentEmail'));
  let selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'));
  let selectDepartment = JSON.parse(localStorage.getItem('selectDepartment'));
  let selectYear = JSON.parse(localStorage.getItem('selectYear'));
  let subjects = JSON.parse(localStorage.getItem('selectedSubjects'));
  let selectedCount = JSON.parse(localStorage.getItem('selectedCount'));
  
  examType.innerHTML = selectedExam;
  name.innerHTML = studentName;
  phone.innerHTML = studentNumber;
  email.innerHTML = studentEmail;
  packageType.innerHTML = selectedPackage.name;
  department.innerHTML = selectDepartment;
  examYear.innerHTML = selectYear;
  
  sub.innerHTML = "";
  
  subjects.forEach(subject => {
    const listItem = document.createElement("li");
    listItem.textContent = subject;
    sub.appendChild(listItem);
  });
  count.innerHTML = selectedCount;
}

function checkUserPin() {
  const userPin = localStorage.getItem("userPin");
  
  if (userPin) {
    Swal.fire({
      icon: 'info',
      title: 'Account Found',
      text: `You already have an account. Your User PIN: ${userPin}`,
      background: '#101727',
      color: '#ffffff',
      iconColor: '#f5c518',
      confirmButtonText: 'Proceed to Verify',
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
      window.location.href = "verification.html";
    });
  } else {
    window.location.href = "subscribe.html";
  }
}

function amounts() {
  document.querySelector('.Amount').innerHTML = JSON.parse(localStorage.getItem('amount'));
}

const images = document.querySelectorAll('.zoom-img');

images.forEach(img => {
  img.addEventListener('click', () => {
    if (img.classList.contains('expanded')) {
      img.classList.remove('expanded');
    } else {
      images.forEach(i => i.classList.remove('expanded'));
      img.classList.add('expanded');
    }
  });
});

function partnerHtml() {
  window.open("affiliateLanding.html", "_blank");
}