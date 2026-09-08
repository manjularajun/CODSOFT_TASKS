
const viewProjectsButton = document.querySelector("#projects-btn");

viewProjectsButton.addEventListener("click", function () {
    document.querySelector("#projects").scrollIntoView({
        behavior: "smooth"
    });
});



const resumeButton = document.querySelector("#resume-btn");

resumeButton.addEventListener("click", function () {
    window.open("resume.pdf", "_blank");
});



const resumeSectionButton = document.querySelector("#resume-section-btn");

resumeSectionButton.addEventListener("click", function () {
    window.open("resume.pdf", "_blank");
});

