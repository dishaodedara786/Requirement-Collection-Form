const industrySelect = document.getElementById("industrySelect");

const ecommerce = document.getElementById("ecommerceSection");
const healthcare = document.getElementById("healthcareSection");
const education = document.getElementById("educationSection");
const proptech = document.getElementById("proptechSection");

industrySelect.addEventListener("change", function () {

  ecommerce.style.display = "none";
  healthcare.style.display = "none";
  education.style.display = "none";
  proptech.style.display = "none";

  if (this.value === "ecommerce") ecommerce.style.display = "block";
  if (this.value === "healthcare") healthcare.style.display = "block";
  if (this.value === "education") education.style.display = "block";
  if (this.value === "proptech") proptech.style.display = "block";
});
