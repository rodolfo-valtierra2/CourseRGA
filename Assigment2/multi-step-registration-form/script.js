window.onload = initMultiStepForm();


function initMultiStepForm() {
    const progressNumber = document.querySelectorAll(".step").length;
    const slidePage = document.querySelector(".slide-page");
    const submitBtn = document.querySelector(".submit");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const stepsNumber = pages.length;

    if (progressNumber !== stepsNumber) {
        console.warn(
            "Error, number of steps in progress bar do not match number of pages"
        );
    }

    document.documentElement.style.setProperty("--stepNumber", stepsNumber);

    let current = 0;

    for (let i = 0; i < nextButtons.length; i++) {
        nextButtons[i].addEventListener("click", function (event) {
            event.preventDefault();

            inputsValid = validateInputs(this);
            // inputsValid = true;

            if (inputsValid) {
                pages[current].classList.add('visually-hidden')
                pages[current+1].classList.remove('visually-hidden')
                bullet[current].classList.add("active");
                progressCheck[current].classList.add("active");
                progressText[current].classList.add("active");
                current += 1;
            }
        });
    }

    for (let i = 0; i < prevButtons.length; i++) {
        prevButtons[i].addEventListener("click", function (event) {
            event.preventDefault();
            //pages[current].style.display = 'inline';
            bullet[current - 1].classList.remove("active");
            progressCheck[current - 1].classList.remove("active");
            progressText[current - 1].classList.remove("active");
            current -= 1;
        });
    }

    submitBtn.addEventListener("click",  () => {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;

        setTimeout(function () {
            alert("Your Form Successfully Signed up");
            location.reload();
        }, 800);
        
        const data = document.getElementsByTagName('input').map(i => i.value);
        
        data.push(document.getElementsByTagName('select').map(s => s.value))
        window.localStorage.user = JSON.stringify(data);
        
    });

    function validateInputs(ths) {
        let inputsValid = true;

        const inputs =
            ths.parentElement.parentElement.querySelectorAll("input");

        for (let i = 0; i < inputs.length; i++) {
            const valid = inputs[i].checkValidity();
            if (!valid) {
                inputsValid = false;
                inputs[i].classList.add("invalid-input");
            } else {
                inputs[i].classList.remove("invalid-input");
            }
        }
        return inputsValid;
    }

}
