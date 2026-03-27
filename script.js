let cart = JSON.parse(localStorage.getItem("cart")) || []

function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.style.display = "none")
    document.getElementById(id).style.display = "block"
    window.scrollTo(0, 0)
}

showSection("casual")

function addToCart(name, price) {

    let item = cart.find(i => i.name === name)

    if (item) {
        item.qty++
    } else {
        cart.push({ name, price, qty: 1 })
    }

    updateCart()
    alert(name + " added")
}

function updateCart() {

    let list = document.getElementById("cartItems")
    list.innerHTML = ""

    let total = 0

    cart.forEach((item, index) => {

        total += item.price * item.qty

        let li = document.createElement("li")
        li.innerHTML = `${item.name} x${item.qty} - ₹${item.price * item.qty}`

        let btn = document.createElement("button")
        btn.textContent = "Remove"

        btn.onclick = () => {
            cart.splice(index, 1)
            updateCart()
        }

        li.appendChild(btn)
        list.appendChild(li)
    })

    document.getElementById("totalPrice").textContent = total

    localStorage.setItem("cart", JSON.stringify(cart))
}

function showAddress() {
    if (cart.length === 0) {
        alert("Cart is empty")
        return
    }
    showSection("addressSection")
}

function placeOrder() {

    let name = document.getElementById("name").value
    let phone = document.getElementById("phone").value
    let address = document.getElementById("address").value
    let payment = document.getElementById("payment").value

    if (!name || !phone || !address) {
        alert("Fill all details")
        return
    }

    let summary = cart.map(i => `${i.name} x${i.qty}`).join("\n")

    alert(`Order Placed!\n\n${summary}\nPayment: ${payment}`)

    cart = []
    localStorage.removeItem("cart")

    updateCart()
    showSection("casual")
}

updateCart()