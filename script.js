  let currentStep = 1;
    const totalSteps = 5;
    const selectedOptions = {};
    const basePrices = {};

    function selectOption(button, step, price) {
        const stepDiv = document.querySelector(`.step[data-step="${step}"]`);
        stepDiv.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedOptions[step] = button.textContent;
        basePrices[step] = price;
    }

    function nextStep() {
        if (!selectedOptions[currentStep]) {
            alert('Пожалуйста, выберите вариант!');
            return;
        }
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('hidden');
        currentStep++;
        if (currentStep <= totalSteps) {
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('hidden');
            document.getElementById('current-step').textContent = currentStep;
        } else {
            document.getElementById('next').classList.add('hidden');
            document.getElementById('calculate').classList.remove('hidden');
        }

        updateProgressBar();
    }

    function calculateTotal() {
        const summaryContent = document.getElementById('summary-content');
        summaryContent.innerHTML = '';
        let totalMin = 0;
        let totalMax = 0;

        Object.keys(selectedOptions).forEach(step => {
            summaryContent.innerHTML += `<p>${selectedOptions[step]}</p>`;
            totalMin += basePrices[step];
            totalMax += basePrices[step] * 1.2;
        });

        summaryContent.innerHTML += `<p>Итоговая стоимость: от ${totalMin} руб до ${totalMax.toFixed(2)} руб</p>`;
        document.getElementById('summary').classList.remove('hidden');
    }

    function updateProgressBar() {
        const progress = (currentStep - 1) / totalSteps * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
    }
</script>
