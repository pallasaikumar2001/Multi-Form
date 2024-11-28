document.addEventListener("DOMContentLoaded",function(){
    let step=1
    const steps=document.querySelectorAll(".step");
    const nums=document.querySelectorAll('.number')
    const nextButtons=document.querySelectorAll('.next');
    const prevButtons=document.querySelectorAll('.prev');
    const toggleSwitch=document.getElementById('toggle');
    const togBall=document.getElementById('togBall')
    let selectedPlan = { name: "Arcade", price: 9, interval: "Monthly", frequency: 'mo' };
    const addons=document.querySelectorAll(".step3 input[type='checked']");
    const finalPlanText = document.getElementById("final");


    function updatestep(){
        steps.forEach((stepdiv,index)=>{
            stepdiv.classList.toggle('hidden',index+1 !==step);
            if (nums[index]){
                nums[index].style.backgroundColor = index+1 === step ? 'hsl(206,94%,87%)' : 'transparent';
                nums[index].style.color= index+1 ===step ? 'black' : 'hsl(206,94%,87%)';
            }
        })
    }
    console.log(steps)
    // updatestep()
    nextButtons.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            if (step<5){
                step++;
                updatestep()
            }
        })
    });
    prevButtons.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            if (step>1){
                step--;
                updatestep()
            }
        })
    })
    const plans = document.querySelectorAll('.plan');
    console.log(plans); 
    var pname={}

    var pprice=[]
    plans.forEach((plan) => { 
        // console.log(plan); 
        var pname=[]       
        plan.addEventListener('click', () => {
            plan.classList.toggle('border-blue-700'); 
            const pname=plan.querySelector('h3').innerText;
            const pprice=plan.querySelector('.package').innerText;
            const price=parseInt(pprice.replace(/[^0-9]/g, ''));
            selectedPlan={
                name: pname,
                price: pprice,
                interval: toggleSwitch.checked ? "Yearly" : "Monthly",
                frequency: toggleSwitch.checked ? 'yr':'mo'
            }
            console.log(selectedPlan)
            updateFinalstep()
        });
    });
    toggleSwitch.addEventListener('change',()=>{
        const isYearly=toggleSwitch.checked;
        togBall.style.transform= isYearly ? 'translateX(32px)':'translateX(4px)';
        plans.forEach((plan)=>{
            const packageText=plan.querySelector('.package');
            const freeText=plan.querySelector('.free');
            const basePrice=parseInt(packageText.innerText.replace(/[^0-9]/g,''));
            if (isYearly){
                packageText.innerText=`$${basePrice*10}/yr`;
                freeText.classList.remove('hidden');
                selectedPlan.interval='Yearly';
                selectedPlan.frequency='yr';
            }
            else{
                packageText.innerText=`$${basePrice/10}/mo`;
                freeText.classList.add('hidden');
                selectedPlan.interval='Monthly'
                selectedPlan.frequency='mo'
            }
        })
        updateFinalstep();
    })
    let totaladdons=0
    let addonprices=document.querySelectorAll('.addon-price');
    const addonlist=[]
    addons.forEach((checkbox,index)=>{
        checkbox.addEventListener('change',()=>{
            const addOnprice=parseInt(checkbox.closest('.flex').querySelector('p.text-blue-700').innerText.replace(/[^0-9]/g,''));
            totaladdons+=checkbox.checked ? addonprice : -addonprice;
            const addonpricetext=addonprices[index]?.this.textContent || '+$0/mo'
            const addonprice=parseInt(addonpricetext.replace(/[^0-9]/g,''));

            if (checkbox.checked){
                this.addEventListener.push({index,price:addonprice});

            }else{
                const addonIndex=addonlist.findIndex(a=>a.index === index);
                if (addonIndex !== -1) addonlist.splice(addonIndex,1);
            }
            updateFinalstep()
        })
    })
    function updateFinalstep() {
        const planText =`${selectedPlan.name}(${selectedPlan.interval})`;
        const planPriceText=`$${selectedPlan.price.price}${selectedPlan.interval==='Monthly' ? "/mo" : '/yr'}`;
        let totalAmount;
        if (selectedPlan.interval==='Monthly'){
            totalAmount=selectedPlan.price+totaladdons;
        }
        else{
            totalAmount=selectedPlan.price+totaladdons;
        }
        finalPlanText.innerText=planText;
        document.querySelector('# last p:last-child').innerText=planPriceText;
        totalAmountText.innerText=`+$${totalAmount}${selectedPlan.interval==='Monthly' ? "/mo" : '/yr'}`;

    }
    confirmButton.addEventListener('click',()=>{
        step=5;
        updatestep();
    })
    updatestep()

    
});
    