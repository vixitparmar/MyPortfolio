
/* Back to top Button */
let mybutton = document.getElementById("myBtn");
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



/*download cv */
document.getElementById('downloadBtn').addEventListener('click', function () {
    // Replace 'path_to_cv.pdf' with the actual path to your CV file on the server
    const cvFilePath = '200430116088.pdf';

    // Use AJAX to request the PHP script that will handle the download
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'downloadcv.php?file=' + cvFilePath, true);
    xhr.responseType = 'blob';

    xhr.onload = function () {
        if (this.status === 200) {
            const blob = new Blob([this.response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'My_CV.pdf';
            document.body.appendChild(a);
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    };

    xhr.send();
});



/*Content View  After Scrolling*/
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 200;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);



  /* Hamburger menu creation */ 
  function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }



  /* TypeWriter Animation */
  const typedElement = document.querySelector('.typed');

  const typedItems = typedElement.getAttribute('data-typed-items').split(',');

  let currentIdx = 0; 
  let currentText = '';

  function type() {
    const currentItem = typedItems[currentIdx];

    if (currentText === currentItem) {
      setTimeout(backspace, 1000);
      return;
    }

    currentText = currentItem.substring(0, currentText.length + 1);
    typedElement.textContent = currentText;
    const typingSpeed = Math.floor(Math.random() * 150) + 50;
    setTimeout(type, typingSpeed);
  }

  function backspace() {
    currentText = currentText.substring(0, currentText.length - 1);

    typedElement.textContent = currentText;

    const backspacingSpeed = Math.floor(Math.random() * 100) + 50;

    if (currentText === '') {
      currentIdx = (currentIdx + 1) % typedItems.length; 
      setTimeout(type, 500); 
    } else {
      setTimeout(backspace, backspacingSpeed);
    }
  }
  type();




  /* Display Message on Webpage Afer Submit Send Message */
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = '<p>Sending email...</p>';

    fetch('Contactform.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            messageContainer.innerHTML = `${data.message}`;
        } else {
            messageContainer.innerHTML = `<p>${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageContainer.innerHTML = '<p>An error occurred while sending the email.</p>';
    });

    this.reset();
});