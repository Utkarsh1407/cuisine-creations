document.addEventListener("DOMContentLoaded", function () {
    let cartArray = [];
  
    const buttons = document.getElementsByClassName("add-to-cart");
  
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        e.preventDefault();
        const button = e.target;
        const classes = button.classList;
        const productName = classes[1];
        const price = Number(classes[2]);
  
        const existingItem = cartArray.find(
          (item) => item.product === productName
        );
  
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          const newProductObj = {
            product: productName,
            price: price,
            quantity: 1,
          };
  
          cartArray.push(newProductObj);
        }
  
        console.log(cartArray);
  
        updateCartDisplay();
      });
    }
  
    function updateCartDisplay() {
      const cartContainer = document.getElementById("cart-container");
      cartContainer.innerHTML = "";
  
      let totalAmount = 0;
  
      if (cartArray.length > 0) {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart");
        console.log("over here");
  
        cartArray.forEach((item) => {
          console.log("for each");
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("cart-item");
          let capitalName =
            item.product.charAt(0).toUpperCase() + item.product.slice(1);
          itemDiv.innerHTML = `
            <span class="cart-item-name">${capitalName.replace(
              "-",
              " "
            )}&nbsp</span>
            <span class="cart-item-quantity">x ${item.quantity}&nbsp</span>
            <span class="cart-item-total">- Rs ${
              item.price * item.quantity
            }</span>
          `;
          totalAmount += item.price * item.quantity;
          cartDiv.appendChild(itemDiv);
        });
  
        cartContainer.appendChild(cartDiv);
        const totalDiv = document.createElement("div");
        totalDiv.classList.add("cart-total");
        totalDiv.innerHTML = `
            <span class="cart-item-name">Total - </span>
            <span class="cart-item-quantity">Rs ${totalAmount}</span>
          `;
        cartDiv.appendChild(totalDiv);
  
        const submitBtn = document.createElement("button");
        submitBtn.classList.add("submit-btn");
        submitBtn.innerHTML = "Place Order";
        submitBtn.addEventListener("click", () => {
          alert(`Total Amount : Rs ${totalAmount}\nOrder Completed`);
          cartArray = [];
          updateCartDisplay();
        });
        cartDiv.appendChild(submitBtn);
      }
    }
  });