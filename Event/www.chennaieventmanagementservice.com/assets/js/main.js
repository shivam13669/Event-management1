(function ($) {
    "use strict"; 
 
 
 
  window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

    
    //   AOS.init();
      
     AOS.init();
         

    
   var swiper = new Swiper(".bannersdmySwiper", {
  loop: true,
  loopedSlides: 3, // matches your total slides
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});




var swiper = new Swiper(".testi-mySwiper", {
  loop: true,
  slidesPerView: 3, // default for large screens
  spaceBetween: 20,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1, 
    },
    768: {
      slidesPerView: 2, 
    },
    900: {
      slidesPerView: 3, 
    },
    1200: {
      slidesPerView: 3, 
    },
    1600: {
      slidesPerView: 3, 
    },
  }
});




    //mobile-button
    
  $(".memnu-clos-open").click(function(){
        $(".mega-menu").toggleClass("shows");
    });
    
    
    
    
        // navigaition menu
 document.addEventListener('DOMContentLoaded', function() { 
// Add event listeners to all dropdown buttons 
document.querySelectorAll('.meun-dop-btn').forEach(function(button) {
 button.addEventListener('click', function() { 
// Close all other submenus
 document.querySelectorAll('.submenu').forEach(function(submenu) {
 if (submenu !== button.nextElementSibling) {
 submenu.classList.remove('visible'); } });
 // Toggle the visibility of the current submenu
 var submenu = button.nextElementSibling;
 submenu.classList.toggle('visible'); });
 });});    
    


var swiper = new Swiper(".servicesd-carousel", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
    breakpoints: {
        1600: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 3,
        },
        900: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 2, // Changed from 1 to 2 for mobile view
        }
    }
});



//planning-service-swiper

var swiper = new Swiper(".planning-service-swiper", {
          loop: true,
         slidesPerView: 3,
          spaceBetween: 50,
      pagination: {
        el: ".swiper-pagination",
         clickable: true,
      },
      autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
             breakpoints: {
            1200: {
                slidesPerView:3,
            },
          
            900: {
                slidesPerView:2,
            },
            768: {
                slidesPerView: 2,
                
            },
            575: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
        },
    });
    
    
    
    
    
// Set today's date in the 'YYYY-MM-DD' format for the date field validation
    var today = new Date().toISOString().split('T')[0];
   

    $("#contact-form").validate({
        rules: {
            // Name: Only alphabets and spaces allowed
            name: {
                required: true,
                pattern: /^[A-Za-z\s]+$/
            },
            // Phone: Only numbers, spaces, and '+' allowed (max 12 characters)
            Phone: {
                required: true,
                pattern: /^[\d\s\+]{1,12}$/
            },
            // Email: Must be a valid email format
            email: {
                required: true,
                email: true
            },
            // Service: Dropdown is mandatory
            services: {
            required: true
            },
            
            // evendate: Must be today or in the future
            evendate: {
                required: true,
                date: true,
                min: today // Ensure the date is today or in the future
            },
             // evendate: Must be today or in the future
            locatin: {
                required: true,
            },
            
            // Message: Disallow URLs (only normal text is allowed)
            massage: {
                required: true,
            pattern: /^(?!.*(?:https?|ftp):\/\/.*|www\..*\..{2,})/s  
            }
        },
        messages: {
            // Custom error messages
            name: {
                required: "Please enter your name.",
                pattern: "Name can only contain letters and spaces."
            },
            Phone: {
                required: "Please enter your phone number.",
                pattern: "Only numbers, spaces, and '+' are allowed, and the number should be up to 12 characters."
            },
            email: {
                required: "Please enter a valid email address.",
                email: "Please enter a valid email address."
            },
            services: {
                required: "Please select a services."
            },
          
            evendate: {
                required: "Please select your Event Date.",
                date: "Please enter a valid date.",
                min: "The Event Date must be today or in the future."
            },
            locatin: {
                required: "Please enter the Location.",
                pattern: "Location can only contain letters and spaces."
            },
            massage: {
                required: "Please enter a message.",
                pattern: "URLs are not allowed in the message."
            
            } 
        },
        submitHandler: function(form) {
            form.submit(); // Submit the form if validation passes
        }
    });
    // Initialize form validation

    $("#dagdte").attr("min", today);
    
    


 
    
})(jQuery);