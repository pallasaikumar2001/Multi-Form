document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll('step'); // Select all step containers
    let count = 0;
    console.log(steps)

    // Function to update step visibility
    const updateSteps = () => {
        steps.forEach((step, index) => {
            if (index === currentStep) {
                step.style.display = 'flex'; 
            } else {
                step.style.display = 'none'; 
            }
        });
    };
    const next=document.getElementsByClassName('next');
    next.addEventListener('click',function(){
        count=(count+1)%steps.length;
        updateSteps()
        console.log(count)
    })


    updateSteps();
});
