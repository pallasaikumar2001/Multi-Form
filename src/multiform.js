document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll('.step');
    const nums = document.querySelectorAll('.number');
    let currentStep = 0;

    const updateStepDisplay = () => {
        steps.forEach((step, index) => {
            step.style.display = index === currentStep ? 'block' : 'none';
            nums[index].style.backgroundColor = index === currentStep ? 'hsl(206,94%,87%)' : 'transparent';
            nums[index].style.color = index === currentStep ? 'black' : 'hsl(206,94%,87%)';
        });
    };

    updateStepDisplay();

    // Navigation Buttons
    document.querySelectorAll('.next').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStepDisplay();
            }
        });
    });

    document.querySelectorAll('.prev').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateStepDisplay();
            }
        });
    });

    // Plan Selection
    const plans = document.querySelectorAll('.plan');
    let selectedPlan = { name: 'Arcade', price: 9, frequency: 'mo' };

    plans.forEach(plan => {
        plan.addEventListener('click', () => {
            plans.forEach(p => p.classList.remove('selected'));
            plan.classList.add('selected');
            const planName = plan.querySelector('h3').textContent;
            const planPrice = parseInt(plan.querySelector('.package').textContent.replace(/[^0-9]/g, ''));
            selectedPlan = { name: planName, price: planPrice, frequency: 'mo' };
            updateSummary();
        });
    });

    // Toggle Switch for Monthly/Yearly
    const toggle = document.getElementById('toggle');
    const togBall = document.getElementById('togBall');
    toggle.addEventListener('click', () => {
        const isYearly = toggle.checked;
        togBall.style.transform = isYearly ? 'translateX(32px)' : 'translateX(4px)';
        selectedPlan.frequency = isYearly ? 'yr' : 'mo';

        plans.forEach(plan => {
            const basePrice = parseInt(plan.querySelector('.package').textContent.replace(/[^0-9]/g, ''));
            const yearlyPrice = basePrice * 10;
            plan.querySelector('.package').textContent = isYearly ? `$${yearlyPrice}/yr` : `$${basePrice}/mo`;
            plan.querySelector('.free').classList.toggle('hidden', !isYearly);
        });

        updateSummary();
    });

    // Add-on Selection
    const addonCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const addOnPrices = document.querySelectorAll('.addon-price');
    const addOns = [];

    addonCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            const addonPriceText = addOnPrices[index]?.textContent || '+$0/mo';
            const addonPrice = parseInt(addonPriceText.replace(/[^0-9]/g, ''));

            if (checkbox.checked) {
                addOns.push({ index, price: addonPrice });
            } else {
                const addonIndex = addOns.findIndex(a => a.index === index);
                if (addonIndex !== -1) addOns.splice(addonIndex, 1);
            }

            updateSummary();
        });
    });

    // Update Summary Section
    const updateSummary = () => {
        const summaryPlan = document.getElementById('final');
        const totalPriceEl = document.querySelector('.text-blue-700.font-bold');

        summaryPlan.textContent = `${selectedPlan.name} (${selectedPlan.frequency === 'mo' ? 'Monthly' : 'Yearly'})`;
        const addOnTotal = addOns.reduce((acc, curr) => acc + curr.price, 0);
        const totalPrice = selectedPlan.frequency === 'mo'
            ? selectedPlan.price + addOnTotal
            : selectedPlan.price * 10 + addOnTotal * 10;

        totalPriceEl.textContent = `$${totalPrice}/${selectedPlan.frequency}`;
    };
});
