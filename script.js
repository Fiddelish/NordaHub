document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the button
    var preasleBtn = document.getElementById("preasleBtn");

    // Add click event listener
    preasleBtn.addEventListener("click", function () {
        // Navigate to Preasle.html
        window.location.href = "pok.html";
    });
});

// Replace this address with the actual address of the ERC20 wallet you want to track
const walletAddress = "0x7Cf34CABF453220E4a67a322987779fc9CBe62eb";

// Function to fetch wallet containments
async function fetchWalletContainments() {
    try {
        const response = await fetch(`https://api.ethplorer.io/getAddressInfo/${walletAddress}?apiKey=free`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching wallet containments:', error);
    }
}

// Function to update wallet data in the container
async function updateWalletData() {
    const walletDataContainer = document.getElementById('walletData');
    const data = await fetchWalletContainments();
    if (data) {
        walletDataContainer.innerHTML = `
            <p>Total $ containments: ${data.tokens.length}</p>
            <ul>
                ${data.tokens.map(token => `<li>${token.tokenInfo.symbol}: ${token.balance}</li>`).join('')}
            </ul>
        `;
    } else {
        walletDataContainer.innerHTML = `<p>Failed to fetch wallet data. Please try again later.</p>`;
    }
}

// Update wallet data initially
updateWalletData();

// Update wallet data every 5 minutes (300000 milliseconds)
setInterval(updateWalletData, 300000);


// Set the end date for the countdown (14th of June 2024, 23:59 Stockholm time)
const endDate = new Date('2024-06-14T21:59:00Z'); // Convert to UTC time

// Function to update the countdown
function updateCountdown() {
    const now = new Date();
    const timeDifference = endDate - now;

    // Calculate the remaining days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Display the countdown
    const countdownElement = document.getElementById('countdown');
    countdownElement.innerHTML = `Countdown: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;

    // Check if the countdown has reached zero
    if (timeDifference <= 0) {
        countdownElement.innerHTML = "Countdown has ended!";
        clearInterval(countdownInterval);
    }
}

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initial call to update countdown
updateCountdown();


document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the button
    var homeBtn = document.getElementById("Home");

    // Add click event listener
    homeBtn.addEventListener("click", function () {
        // Navigate to index.html
        window.location.href = "index.html";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the Presale address element
    var presaleAddressElement = document.getElementById("presaleAddress");

    // Add click event listener to the Presale address element
    presaleAddressElement.addEventListener("click", function () {
        // Create a temporary input element to copy the address
        var tempInput = document.createElement("input");
        tempInput.value = presaleAddressElement.textContent;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        // Alert the user that the address has been copied
        alert("Presale address copied to clipboard: " + presaleAddressElement.textContent);
    });
});

