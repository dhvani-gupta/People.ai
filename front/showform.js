function showForm() {
    var formContainer = document.getElementById("formContainer");
    formContainer.style.display = "block"; // Show the form container
}

function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting

    var gender = document.querySelector('input[name="gender"]:checked').value;
    var phd = document.querySelector('input[name="phd"]:checked').value;
    var city = document.getElementById("cityInput").value;
    var experience = document.getElementById("experienceInput").value;
    var is_male = gender === "Male" ? 1 : 0;
    var is_phd = phd ==="Yes" ? 1 : 0;
    var is_jammu= city=== city.toLowerCase() === "jammu" ? 1 : 0;
    var columnNames = ["is_jammu", "is_male", "is_phd", "experience"];
    var data = [is_jammu, is_male, is_phd, experience];

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('POST', 'http://127.0.0.1:8000/api/btp', true);  // Replace with the URL of the API

    // Set the request headers (if required)
    xhr.setRequestHeader('Content-Type', 'application/json');  // Replace with the appropriate content type

    // Set up a callback function to handle the response
    xhr.onload = function() {
    if (xhr.status === 200) {
        // Request succeeded
        var response = xhr.response;
        // Process the response data
        let js = JSON.parse(response)
        document.getElementById("predcont").innerHTML = "<h3 style='margin-top:40px'>Thank you for applying. </h3> <br> <h1>Your Fitment Score: "+String(js["result"][0])+"</h1><br><h3> We will get back to you shortly!</h3>"
    } else {
        // Request failed
        console.log('Error:', xhr.status);
    }
    };

    // Create an object with the data fields
    var data = {
    is_jammu: data[0],
    is_male: data[1],
    is_phd: data[2],
    experience: data[3]
    };

    // Convert the data object to JSON
    var jsonData = JSON.stringify(data);

    // Send the request with the JSON data
    xhr.send(jsonData);

  // Convert the array to CSV format
  
//   var csvData = columnNames.join(",") + "\n" + data.join(",");

//   // Create a Blob with the CSV data
//   var blob = new Blob([csvData], { type: "text/csv" });

//   // Create a temporary link element to download the CSV file
//   var link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "data.csv";
//   link.click();


    // displayResult(gender, phd, city, experience,is_male,is_phd,is_jammu );
}

function displayResult(gender, phd, city, experience,is_male, is_phd, is_jammu) {
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <h3>Result:</h3>
        <p>Gender: ${gender}</p>
        <p>PhD: ${phd}</p>
        <p>City of Residence: ${city}</p>
        <p>Experience (in years): ${experience}</p>
        <p> is male: ${is_male } </p>
        <p> is phd: ${is_phd} </p>
        <p> is jammu: ${is_jammu} </p>
    `;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("analyzeBtn").addEventListener("click", function() {
        document.getElementById("loading").style.display = "block"; // Show the loading element

        setTimeout(function() {
            document.getElementById("loading").style.display = "none"; // Hide the loading element
            showForm(); // Show the form after 2 seconds delay
        }, 2000);
    });

    document.getElementById("inputForm").addEventListener("submit", submitForm);
});


// var formData = new FormData();
//     formData.append('gender', gender);
//     formData.append('phd', phd);
//     formData.append('city', city);
//     formData.append('experience', experience);

//     // Send a POST request to the Flask API endpoint
//     fetch('/process', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(result => {
//         displayResult(result.gender, result.phd, result.city, result.experience);
//     })
//     .catch(error => console.error(error));
