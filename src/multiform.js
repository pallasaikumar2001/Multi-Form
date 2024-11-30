document.addEventListener("DOMContentLoaded", function () {
    let step = 1;
    const steps = document.querySelectorAll(".step");
    const nums = document.querySelectorAll(".number");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const toggleSwitch = document.getElementById("toggle");
    const plans = document.querySelectorAll(".plan");
    const addOnCheckboxes = document.querySelectorAll(".step-3 input[type='checkbox']");
    const addonsPrices = document.querySelectorAll(".addoncost");
    const finalPlanText = document.getElementById("final");
    const totalAmountText = document.querySelector(".text-blue-700.font-bold.text-xl");
    const confirmButton = document.querySelector("#confirmbutton");
    const togBall = document.getElementById("togBall");
    const step4AddonsContainer = document.getElementById("step4-addons");

    // Selected plan details
    let selectedPlan = {
        name: "Arcade",
        price: 9,
        interval: "Monthly",
        frequency: "mo",
        addOns: [],
    };

    // Base prices for plans
    const planBasePrices = {
        Arcade: 9,
        Advanced: 12,
        Pro: 15,
    };

    // Prices for add-ons
    const addOnPrices = {
        onlineService: { monthly: 1, yearly: 10 },
        largeStorage: { monthly: 2, yearly: 20 },
        customProfile: { monthly: 2, yearly: 20 },
    };

    // Update step display
    function updateStepDisplay() {
        steps.forEach((stepDiv, index) => {
            stepDiv.classList.toggle("hidden", index + 1 !== step);
            if (nums[index]) {
                nums[index].style.backgroundColor = index + 1 === step ? "hsl(206,94%,87%)" : "transparent";
                nums[index].style.color = index + 1 === step ? "black" : "hsl(206,94%,87%)";
            }
        });
    }

    // Update plan prices and add-ons based on toggle
    function updatePlanAndAddOnPrices() {
        const isYearly = toggleSwitch.checked;
        selectedPlan.interval = isYearly ? "Yearly" : "Monthly";
        selectedPlan.frequency = isYearly ? "yr" : "mo";

        plans.forEach((plan) => {
            const packageText = plan.querySelector(".package");
            const freeText = plan.querySelector(".free");
            const basePrice = planBasePrices[plan.querySelector("h3").innerText];

            if (isYearly) {
                packageText.innerText = `$${basePrice * 10}/yr`;
                freeText.classList.remove("hidden");
            } else {
                packageText.innerText = `$${basePrice}/mo`;
                freeText.classList.add("hidden");
            }
        });

        addonsPrices.forEach((priceElement, index) => {
            const addOnKey = Object.keys(addOnPrices)[index];
            const price = addOnPrices[addOnKey][isYearly ? "yearly" : "monthly"];
            priceElement.textContent = `+$${price}/${isYearly ? "yr" : "mo"}`;
        });

        updateFinalStep();
    }

    // Update the final step summary
    function updateFinalStep() {
        const planText = `${selectedPlan.name} (${selectedPlan.interval})`;
        const planPrice = selectedPlan.interval === "Yearly" ? selectedPlan.price * 10 : selectedPlan.price;
        const planPriceText = `$${planPrice}/${selectedPlan.frequency}`;
        let totalAddOnPrice = 0;

        selectedPlan.addOns.forEach((addOn) => {
            totalAddOnPrice += addOn.price;
        });

        const totalAmount = planPrice + totalAddOnPrice;

        if (finalPlanText) finalPlanText.innerText = planText;
        const planPriceElement = document.querySelector("#last p:last-child");
        if (planPriceElement) planPriceElement.innerText = planPriceText;
        if (totalAmountText) totalAmountText.innerText = `+$${totalAmount}/${selectedPlan.frequency}`;

        updateStep4AddOns();
    }

    // Update Step 4 Add-Ons Display
    function updateStep4AddOns() {
        if (!step4AddonsContainer) {
            console.error("Step 4 Add-ons container not found!");
            return;
        }
    
        step4AddonsContainer.innerHTML = "";

        if (selectedPlan.addOns.length === 0) {
            step4AddonsContainer.style.display = "none";
        } else {
            step4AddonsContainer.style.display = "block";
            selectedPlan.addOns.forEach((addOn) => {
                const addOnElement = document.createElement("div");
                addOnElement.classList.add("addon-item","gap-y-4rem", "text-gray-500", "flex", "pl-7", "items-center", "justify-between", "h-3");
                addOnElement.innerHTML = `
                    <p class="text-sm">${addOn.name}</p>
                    <p class="text-sm">+$${addOn.price}/${selectedPlan.frequency}</p>
                `;
                step4AddonsContainer.appendChild(addOnElement);
            });
        }
    }
    

    // Add event listeners to plans
    plans.forEach((plan) => {
        plan.addEventListener("click", () => {
            const planName = plan.querySelector("h3").innerText;
            selectedPlan.name = planName;
            selectedPlan.price = planBasePrices[planName];
            updateFinalStep();
        });
    });

    addOnCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            const addOnKey = Object.keys(addOnPrices)[index];
            const price = addOnPrices[addOnKey][selectedPlan.frequency === "mo" ? "monthly" : "yearly"];
            if (checkbox.checked) {
                selectedPlan.addOns.push({ name: addOnKey, price });
            } else {
                selectedPlan.addOns = selectedPlan.addOns.filter((addOn) => addOn.name !== addOnKey);
            }

            updateFinalStep();
        });
    });

    // Toggle switch for monthly/yearly pricing
    toggleSwitch.addEventListener("change", () => {
        const isYearly = toggleSwitch.checked;
        togBall.style.transform = isYearly ? "translateX(32px)" : "translateX(4px)";
        updatePlanAndAddOnPrices();
    });

    // Navigation for next/previous steps
    nextButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (step < 5) {
                step++;
                updateStepDisplay();
            }
        });
    });

    prevButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (step > 1) {
                step--;
                updateStepDisplay();
            }
        });
    });

    confirmButton.addEventListener("click", () => {
        step = 5;
        updateStepDisplay();
    });

    updateStepDisplay();
    updatePlanAndAddOnPrices();
});
