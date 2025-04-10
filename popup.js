document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "YOUR_METALPRICEAPI_KEY_HERE"; // Replace with your MetalpriceAPI key
  if (!apiKey || apiKey === "YOUR_METALPRICEAPI_KEY_HERE") {
    document.getElementById("price").textContent = "Error: Please set a valid API key in popup.js";
    document.getElementById("date").textContent = "";
    return;
  }
  const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&symbols=XAU,INR`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("API Response:", data); // Log the full response for debugging
      if (data.success && data.rates.XAU && data.rates.INR) {
        const goldPriceUSD = 1 / data.rates.XAU; // Price of 1 oz gold in USD
        const usdToInr = data.rates.INR;
        const goldPriceInrPerOz = goldPriceUSD * usdToInr;
        const goldPriceInrPerGram = goldPriceInrPerOz / 31.1035; // Convert to grams

        document.getElementById("price").textContent = `${goldPriceInrPerGram.toFixed(2)} INR/g`;
        document.getElementById("date").textContent = `Date: ${new Date().toLocaleDateString()}`; // Uses current date
      } else {
        document.getElementById("price").textContent = `Error: ${data.error || "Invalid data"}`;
        document.getElementById("date").textContent = "";
      }
    })
    .catch(error => {
      document.getElementById("price").textContent = "Network error";
      document.getElementById("date").textContent = "";
      console.error("Fetch error:", error);
    });
});