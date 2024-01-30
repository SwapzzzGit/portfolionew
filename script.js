const canvas = document.getElementById('renderSurface');
let myFluid = new Fluid(canvas);

myFluid.activate();

// Calling functions
// locomotive();
menuAnimation();





// Improtant functions
// function for locomotive
function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}


// Function for menu animation
function menuAnimation() {
  let menu = document.querySelector(".menu");
  let navLinks = document.querySelectorAll("#full-scr-nav li");

  let count = 1;
  menu.onclick = () => {
    menuAnimation();
  } 
  console.log("hello")

  navLinks.forEach((navLink) => {
    navLink.onclick = () => {
      menuAnimation();
    }
  })
  function menuAnimation() {
    if (count) {
      gsap.to(menu, {
        gap: 0,
        rotate: 180
      })

      gsap.to(".menu .line", {
        width: 20,
        rotate: 45,
      })

      gsap.to(".menu .line:nth-child(2)", {
        rotate: -45,
        y: -2
      })

      gsap.to("#full-scr-nav", {
        left: 0,
        ease: "none"
      })

      count--;
    } else {
      gsap.to(menu, {
        gap: 5,
        rotate: 0
      })

      gsap.to(".menu .line", {
        width: 30,
        rotate: 0,
      })

      gsap.to(".menu .line:nth-child(2)", {
        width: 20,
        rotate: 0,
        y: 0
      })

      gsap.to("#full-scr-nav", {
        left: "-100%",
        ease: "none"
      })

      count++;
    }
  }
}