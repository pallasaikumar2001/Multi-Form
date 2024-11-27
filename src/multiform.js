

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
