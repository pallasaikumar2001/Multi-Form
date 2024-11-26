document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll('.step'); // Select all steps
    let count = 0;
    console.log(steps)

    // Function to show/hide steps
    const updateSteps = () => {
        steps.forEach((step, index) => {
            step.style.display = index === count ? 'block' : 'none';
        });
    };

    // Handle Next button
    const nextButtons = document.querySelectorAll('.next'); // Select all "Next" buttons
    nextButtons.forEach((button) => {
        button.addEventListener('click', function () {
            if (count < steps.length - 1) {
                count++;
                updateSteps();
            }
        });
    });

    // Handle Previous button
    const prevButtons = document.querySelectorAll('.prev'); // Select all "Previous" buttons
    prevButtons.forEach((button) => {
        button.addEventListener('click', function () {
            if (count > 0) {
                count--;
                updateSteps();
            }
        });
    });

    // Initialize to show the first step
    updateSteps();
});
