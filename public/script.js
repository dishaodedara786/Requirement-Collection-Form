// ===== ACCORDION =====
function toggleSection(id) {
  const sec = document.getElementById(id);
  sec.classList.toggle("open");
}

// ===== INDUSTRY SHOW/HIDE =====
function handleIndustryChange(value) {
  const industryMap = {
    ecommerce: "sec-ecommerce",
    healthcare: "sec-healthcare",
    education: "sec-education",
    proptech: "sec-proptech",
    fintech: "sec-fintech",
  };

  // Hide all industry sections
  document.querySelectorAll(".industry-section").forEach((el) => {
    el.classList.remove("visible", "open");
  });

  // Show relevant one
  if (industryMap[value]) {
    const target = document.getElementById(industryMap[value]);
    if (target) {
      target.classList.add("visible", "open");
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  updateProgress();
}

// ===== ECOMMERCE MODEL CHANGE (NEW) =====
function handleEcomModelChange(value) {
  const isCatalogOnly = value === "simple_catalog";

  // Get all the sections that should be hidden for catalog-only
  const paymentSection = document.getElementById("payment-section");
  const checkoutSection = document.getElementById("checkout-section");
  const taxSection = document.getElementById("tax-section");
  const shippingSection = document.getElementById("shipping-section");
  const inventorySection = document.getElementById("inventory-section");

  // Get the inquiry section (show for catalog-only)
  const inquirySection = document.getElementById("inquiry-section");

  if (isCatalogOnly) {
    // Hide transactional sections
    if (paymentSection) paymentSection.style.display = "none";
    if (checkoutSection) checkoutSection.style.display = "none";
    if (taxSection) taxSection.style.display = "none";
    if (shippingSection) shippingSection.style.display = "none";
    if (inventorySection) inventorySection.style.display = "none";

    // Show inquiry section
    if (inquirySection) inquirySection.style.display = "block";
  } else {
    // Show transactional sections
    if (paymentSection) paymentSection.style.display = "block";
    if (checkoutSection) checkoutSection.style.display = "block";
    if (taxSection) taxSection.style.display = "block";
    if (shippingSection) shippingSection.style.display = "block";
    if (inventorySection) inventorySection.style.display = "block";

    // Hide inquiry section
    if (inquirySection) inquirySection.style.display = "none";
  }
}

// ===== PROGRESS BAR =====
function updateProgress() {
  const allInputs = document.querySelectorAll(
    'input[type="radio"]:checked, input[type="checkbox"]:checked',
  );
  const allTextInputs = document.querySelectorAll(
    'input[type="text"], textarea, select',
  );
  let filled = allInputs.length;
  allTextInputs.forEach((el) => {
    if (el.value.trim()) filled++;
  });

  // simple heuristic: 60 total "units" for 100%
  const pct = Math.min(100, Math.round((filled / 60) * 100));
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = pct + "% complete";
}

document.querySelectorAll("input, select, textarea").forEach((el) => {
  el.addEventListener("change", updateProgress);
  el.addEventListener("input", updateProgress);
});

// ===== OPEN FIRST SECTION =====
document.getElementById("sec1").classList.add("open");
