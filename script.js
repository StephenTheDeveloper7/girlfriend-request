// Mother's Girlfriend Request Website JavaScript

// Create floating elements
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const elements = ['🌸', '💕', '🌟', '💖', '🌹'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDuration = (Math.random() * 15 + 15) + 's';
        element.style.animationDelay = Math.random() * 10 + 's';
        element.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(element);
    }
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'flex';
}

// Close success modal
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// Show alert modal
function showAlertModal() {
    const modal = document.getElementById('alertModal');
    modal.style.display = 'flex';
}

// Close alert modal
function closeAlertModal() {
    const modal = document.getElementById('alertModal');
    modal.style.display = 'none';
}

// Show live modal
function showLiveModal() {
    const modal = document.getElementById('liveModal');
    modal.style.display = 'flex';
}

// Close live modal
function closeLiveModal() {
    const modal = document.getElementById('liveModal');
    modal.style.display = 'none';
}

// Close live panel
function closeLivePanel() {
    document.getElementById('livePanel').style.display = 'none';
}

// Toggle between quiz and live conversation
function showQuiz() {
    document.getElementById('quizPanel').style.display = 'block';
    document.getElementById('livePanel').style.display = 'none';
    document.getElementById('quizToggle').classList.add('active');
    document.getElementById('liveToggle').classList.remove('active');
}

function showLive() {
    document.getElementById('quizPanel').style.display = 'none';
    document.getElementById('livePanel').style.display = 'block';
    document.getElementById('quizToggle').classList.remove('active');
    document.getElementById('liveToggle').classList.add('active');
}

// Mother's Questions Form Handling
document.getElementById('motherQuestionsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate form - check if ALL question blocks have at least one answer
    const questionBlocks = document.querySelectorAll('#motherQuestionsForm .question-block');

    for (let i = 0; i < questionBlocks.length; i++) {
        const block = questionBlocks[i];
        const selectedRadio = block.querySelector('input[type="radio"]:checked');
        const textArea = block.querySelector('textarea');

        if (!selectedRadio && (!textArea || textArea.value.trim() === '')) {
            showAlertModal();
            return;
        }
    }

    // Show sending indicator
    const submitBtn = document.getElementById('motherSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'Sending... 🤝';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Build detailed message with questions and answers
    let detailedMessage = "Mitchelle's Mother's Response to Girlfriend Request:\n\n";
    
    questionBlocks.forEach((block, index) => {
        const questionTitle = block.querySelector('.question-title').textContent;
        const selectedRadio = block.querySelector('input[type="radio"]:checked');
        const textArea = block.querySelector('textarea');
        
        detailedMessage += `Question ${index + 1}: ${questionTitle}\n`;
        
        if (selectedRadio) {
            detailedMessage += `Answer: ${selectedRadio.value}\n`;
        }
        
        if (textArea && textArea.value.trim()) {
            detailedMessage += `Additional thoughts: ${textArea.value.trim()}\n`;
        }
        
        detailedMessage += "\n---\n\n";
    });

    // Use the existing FormData and just update the message
    const formData = new FormData(this);
    formData.set('message', detailedMessage);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            document.getElementById('motherQuestionsForm').style.display = 'none';
            document.getElementById('motherSuccess').style.display = 'block';
            showSuccessModal();
        } else {
            console.error('Form submission failed:', response.status);
            alert('There was an error submitting the form. Please try again.');
            btnText.textContent = 'Send Your Response to Stephen 🤝';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    }).catch(error => {
        console.error('Error submitting form:', error);
        // Reset button on error
        btnText.textContent = 'Send Your Response to Stephen 🤝';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    });
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const successModal = document.getElementById('successModal');
    const alertModal = document.getElementById('alertModal');
    const liveModal = document.getElementById('liveModal');
    
    if (e.target === successModal) {
        closeSuccessModal();
    }
    if (e.target === alertModal) {
        closeAlertModal();
    }
    if (e.target === liveModal) {
        closeLiveModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    
    // Make functions globally accessible
    window.closeSuccessModal = closeSuccessModal;
    window.closeAlertModal = closeAlertModal;
    window.closeLiveModal = closeLiveModal;
    window.closeLivePanel = closeLivePanel;
    window.showQuiz = showQuiz;
    window.showLive = showLive;
});
