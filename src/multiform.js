

document.addEventListener("DOMContentLoaded", function () { 
    const steps = document.querySelectorAll('.step'); 
    const nums = document.querySelectorAll('.number');
    console.log(nums)
    let count = 0; 
    console.log(steps); 
    const updateSteps = () => { 
        steps.forEach((step, index) => { 
            if (index === count) { 
                step.style.display = 'block'; 
                nums[index].style.backgroundColor = 'hsl(206,94%,87%) '; 
                nums[index].style.color ='black'
            } else { 
                step.style.display = 'none'; 
                nums[index].style.backgroundColor = 'transparent';  
                nums[index].style.color='hsl(206,94%,87%)'
            }
        // step.style.display = index === count ? 'block' : 'none';
    }); 
    }
    const price=document.querySelectorAll('.package')
    console.log(price);
    if (this.documentElement.getElementsByClassName('toggle input')== 'checked'){
        price.forEach((amount)=>{
            document.getElementsByClassName(amount).replace('amount')
        })
    }

    const toggle = document.getElementById('toggle');
    const togBall = document.getElementById('togBall');
    const prices = document.querySelectorAll('.package.price');
    const frees=document.querySelectorAll('.free')

    toggle.addEventListener('click', () => {
        if (toggle.checked) {
            togBall.style.transform = 'translateX(32px)';
            prices.forEach((priceElement,index) => {
                const monthlyPrice = parseInt(priceElement.textContent.replace(/[^0-9]/g, ''));
                const yearlyPrice = monthlyPrice * 10;
                priceElement.textContent = `$${yearlyPrice}/year`;
                frees[index].classList.remove('hidden')
            });
        } else {
            togBall.style.transform = 'translateX(4px)';
            prices.forEach((priceElement, index) => {
                const monthlyPrices = [9, 12, 15]; 
                priceElement.textContent = `$${monthlyPrices[index]}/mo`;
                frees[index].classList.add('hidden');
            });
        }
    });

            
    const nextButtons = document.querySelectorAll('.next'); 
    nextButtons.forEach((button) => { 
        button.addEventListener('click', function () { 
            if (count < steps.length - 1) { 
                count++; updateSteps(); 
            } 
        }); 
    }); 
    const prevButtons = document.querySelectorAll('.prev'); 
    prevButtons.forEach((button) => { 
        button.addEventListener('click', function () { 
            if (count > 0) { 
                count--; 
                updateSteps(); 
            } 
        }); 
    }); 
    updateSteps(); 
})
