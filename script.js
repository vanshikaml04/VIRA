var typed = new Typed(".text", {
    strings: ["Backend Developer", "AI Engineer", "Full Stack Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});




var swiper = new Swiper(".slide-container", {
  slidesPerView: 3,
  spaceBetween: 35,  
  loop: true,
  centerSlide:'true',
  fade:'true',
  grabCursor:'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets:true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints:{
    0:{
        slidesPerView:1,
    },
    520:{
        slidesPerView:2,
    },
    950:{
        slidesPerView:3,
    },
  },
});



/*

*/




// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
const btn = document.querySelector("#listen-btn");

// Speak function
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1.2;
  window.speechSynthesis.speak(utterance);
}

// Handle commands
function handleCommand(command) {
  command = command.toLowerCase();

  let url = "";

  if (command.includes("open Leet Code")) url = "https://leetcode.com/u/raniVanshika/";
  else if (command.includes("open github")) url = "https://github.com/vanshikaml04";
  else if (command.includes("open linkedin")) url = "https://www.linkedin.com/in/vanshika-rani-4104aa2ab/";
  else if (command.includes("open geeks for geeks")) url = "https://www.geeksforgeeks.org/profile/ranivanskkgk?tab=activity";
  else if (command.includes("open unstop")) url = "https://unstop.com/u/vanshran5810";
  else {
  speak(
    "Hey there! I’m VIRA, your personal assistant. Vanshika Rani is my creator, a CS student at NIET Greater Noida. " +
    "She loves coding, building cool projects, and sharing knowledge. " +
    "Check out her GitHub, LinkedIn, LeetCode, and GeeksforGeeks profiles to see her work."
  );
  return; // stop further execution so window.open is not called
}


  speak(command.includes("open") ? `Discover Vanshika's work on ${command.replace("open ","")}. She hopes you like it` : `Searching Google for ${command}...`);

  // Use setTimeout to ensure speech starts before opening (optional)
  setTimeout(() => {
    window.open(url, "_blank");
  }, 500);
}

// Button click
btn.addEventListener("click", () => {
  // Stop any previous speech
  window.speechSynthesis.cancel();
  recognition.abort();

  // Speak VIRA's greeting
  const utterance = new SpeechSynthesisUtterance(
    "Hi, I’m VIRA — built by Vanshika Rani. Would you like to see her work, profiles, or projects?"
  );
  utterance.lang = "en-US";
  utterance.rate = 1.6;
  utterance.pitch = 1.2;

  utterance.onend = () => {
    // Start listening AFTER greeting ends
    btn.innerHTML = "Listening...👂";
    btn.classList.add("listening");
    recognition.start();
  };

  window.speechSynthesis.speak(utterance);
});


// Recognition result
recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log("Recognized:", command);
  handleCommand(command);
};

// Reset button when recognition ends
recognition.onend = () => {
  btn.innerHTML = "Start Listening";
  btn.classList.remove("listening");
};


function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}
