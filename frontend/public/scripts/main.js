document.addEventListener('DOMContentLoaded', () => {
  const objectionButton = document.getElementById('objection-button');
  objectionButton.addEventListener('click', handleObjection);

  const objectionRebuttals = [
    { objectionType: 'Price', rebuttal: 'Our pricing is competitive considering the value we provide.' },
    { objectionType: 'Product Features', rebuttal: 'Our product offers a comprehensive range of features that meet your needs.' },
    // Add more objection-rebuttal pairs as needed
  ];

  function handleObjection() {
    const objectionInput = document.getElementById('objection-input').value;
    const rebuttalElement = document.getElementById('rebuttal');

    const matchedRebuttal = objectionRebuttals.find(
      (pair) => pair.objectionType.toLowerCase() === objectionInput.toLowerCase()
    );

    if (matchedRebuttal) {
      rebuttalElement.textContent = matchedRebuttal.rebuttal;
    } else {
      rebuttalElement.textContent = 'Thank you for your objection. We will address it shortly.';
    }
  }
});
