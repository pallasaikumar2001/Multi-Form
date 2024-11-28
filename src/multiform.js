document.addEventListener("DOMContentLoaded", function () {
    let step = 1;
    const steps = document.querySelectorAll(".step");
    const nums = document.querySelectorAll(".number");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const toggleSwitch = document.getElementById("toggle");
    const plans = document.querySelectorAll(".plan");
    const addOns = document.querySelectorAll(".step-3 input[type='checkbox']");
    const finalPlanText = document.getElementById("final");
    const totalAmountText = document.querySelector(".text-blue-700.font-bold.text-xl");
    const confirmButton = document.querySelector(".step-4 button.px-5");
    const togBall = document.getElementById("togBall");

    let selectedPlan = {
        name: "Arcade",
        price: 9,
        interval: "Monthly",
        frequency: "mo",
        addOns: []
    };
    let totalAddOns = 0;

    function updateStepDisplay() {
        steps.forEach((stepDiv, index) => {
            stepDiv.classList.toggle("hidden", index + 1 !== step);
            if (nums[index]) {
                nums[index].style.backgroundColor = index + 1 === step ? "hsl(206,94%,87%)" : "transparent";
                nums[index].style.color = index + 1 === step ? "black" : "hsl(206,94%,87%)";
            }
        });
    }

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

    plans.forEach((plan) => {
        plan.addEventListener("click", () => {
            const planName = plan.querySelector("h3").innerText;
            const planPriceText = plan.querySelector(".package").innerText;
            const planPrice = parseInt(planPriceText.replace(/[^0-9]/g, ""));
            selectedPlan = {
                name: planName,
                price: planPrice,
                interval: toggleSwitch.checked ? "Yearly" : "Monthly",
                frequency: toggleSwitch.checked ? "yr" : "mo",
                addOns: [] // Reset add-ons whenever the plan is changed
            };
            updateFinalStep();
        });
    });

    toggleSwitch.addEventListener("change", () => {
        const isYearly = toggleSwitch.checked;
        togBall.style.transform = isYearly ? "translateX(32px)" : "translateX(4px)";

        plans.forEach((plan) => {
            const packageText = plan.querySelector(".package");
            const freeText = plan.querySelector(".free");
            const basePrice = parseInt(packageText.innerText.replace(/[^0-9]/g, ""));

            if (isYearly) {
                packageText.innerText = `$${basePrice * 10}/yr`;
                freeText.classList.remove("hidden");
                selectedPlan.interval = "Yearly";
                selectedPlan.frequency = "yr";
            } else {
                packageText.innerText = `$${basePrice / 10}/mo`;
                freeText.classList.add("hidden");
                selectedPlan.interval = "Monthly";
                selectedPlan.frequency = "mo";
            }
        });
        updateFinalStep();
    });

    addOns.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            const addOnPrice = parseInt(
                checkbox.closest(".flex").querySelector("p.text-blue-700").innerText.replace(/[^0-9]/g, "")
            );
            totalAddOns += checkbox.checked ? addOnPrice : -addOnPrice;

            const addonPriceText = checkbox.closest(".flex").querySelector(".addon-price").textContent || "+$0/mo";
            const addonPrice = parseInt(addonPriceText.replace(/[^0-9]/g, ""));

            if (checkbox.checked) {
                selectedPlan.addOns.push({ price: addonPrice });
            } else {
                const addonIndex = selectedPlan.addOns.findIndex((a) => a.price === addonPrice);
                if (addonIndex !== -1) selectedPlan.addOns.splice(addonIndex, 1);
            }

            updateFinalStep();
        });
    });

    function updateFinalStep() {
        const planText = `${selectedPlan.name} (${selectedPlan.interval})`;
        const planPriceText = `$${selectedPlan.price}${selectedPlan.interval === "Monthly" ? "/mo" : "/yr"}`;
        let totalAmount;
        if (selectedPlan.interval === "Monthly") {
            totalAmount = selectedPlan.price + totalAddOns;
        } else {
            totalAmount = selectedPlan.price + totalAddOns * 10;
        }

        if (finalPlanText) finalPlanText.innerText = planText;
        const planPriceElement = document.querySelector("#last p:last-child");
        if (planPriceElement) planPriceElement.innerText = planPriceText;
        if (totalAmountText) totalAmountText.innerText = `+$${totalAmount}${selectedPlan.frequency}`;
    }

    confirmButton.addEventListener("click", () => {
        step = 5;
        updateStepDisplay();
    });

    updateStepDisplay();
});
