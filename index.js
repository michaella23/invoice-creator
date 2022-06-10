//buttons
const wash = document.getElementById("car-wash")
const lawn = document.getElementById("lawnmower")
const weeds = document.getElementById("pull-weeds")
const sendBtn = document.getElementById("send-btn")
sendBtn.addEventListener("click", sendInvoice)

//sections
const list = document.getElementById("list")
const notes = document.getElementById("notes")
let totalEl = document.getElementById("total")

// array that will hold service objects
let serviceArr = []

// onclick events create service objects
wash.addEventListener("click", () => {
    const serviceObj = {"service": "Wash Car", "cost": 10, "id": "washCar"}
    serviceArr.push(serviceObj)
    addService(serviceObj)
    wash.disabled = true
})

lawn.addEventListener("click", () => {
    const serviceObj = {"service": "Mow Lawn", "cost": 20, "id": "mowLawn"}
    serviceArr.push(serviceObj)
    addService(serviceObj)
    lawn.disabled = true
})

weeds.addEventListener("click", () => {
    const serviceObj = {"service": "Pull Weeds", "cost": 30, "id": "pullWeeds"}
    serviceArr.push(serviceObj)
    addService(serviceObj)
    weeds.disabled = true
})

// called when service button is clicked, creates an HTML element, adds to array, adds to list
function addService({service, cost, id}) {
    const serviceEl = document.createElement("article")
    serviceEl.setAttribute("class", "service-item")
    serviceEl.setAttribute("id", `${id}`) 
    serviceEl.innerHTML = `
        <div class="container" id="container">
            <h2>${service}</h2>
            <button class="btn" onclick="removeService('${id}')">Remove</button>
        </div>
        <h2 class="thin"><span class="dollar">$</span>${cost}</h2>
    `
    list.appendChild(serviceEl)
    totalCost()
}

function totalCost() {
    if (!serviceArr.length) {
        return sendInvoice()
    } else {
        const total = serviceArr.reduce((total, currentItem) => total + currentItem.cost, 0)
        notes.textContent = "We accept cash, credit card, or PayPal"
        totalEl.textContent = total
    }
}

// removes individual list items and adjusts total
function removeService(elementId) {
    document.getElementById(elementId).remove()
    serviceArr = serviceArr.filter(service => service.id !== elementId)
    if (elementId === "washCar") wash.disabled = false
    else if (elementId === "mowLawn") lawn.disabled = false
    else if (elementId === "pullWeeds") weeds.disabled = false 
    
    totalCost()
}

// resets invoice creator, not actually sending to a server
function sendInvoice() {
    serviceArr = []
    list.innerHTML = ""
    notes.textContent = ""
    wash.disabled = false
    lawn.disabled = false
    weeds.disabled = false
    totalEl.textContent = 0
}

