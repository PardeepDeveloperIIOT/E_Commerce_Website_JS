let login_btn = document.querySelector(".login");
let username = document.getElementById("username");
let password = document.getElementById("password");
let loginerror = document.querySelector(".login-error");
let login_status = document.querySelector(".login-status");
let login_website_conatiner = document.querySelector(
  ".login-website-conatiner"
);
let login_website_text = document.querySelector(".login-website-text");
let login_nav_item = document.querySelectorAll(".login-nav-item");
let account_name = document.querySelector(".account-name");
let logout = document.querySelector(".logout");
let products_scroll = document.querySelector(".products");
let aboutme_scroll = document.querySelector(".aboutme");
let contact_scroll = document.querySelector(".contact");
let home_scroll = document.querySelector(".home");
let nav_link = document.querySelectorAll(".nav-link");
let loader = document.getElementById("preloader");
let logoutAll = document.querySelectorAll(".LogoutAll");
let allcards = document.querySelectorAll(".card");
let showmebtn = document.querySelectorAll(".showmebtn");
let viewProduct_section = document.querySelector(".viewProduct-section");
let viewclose = document.querySelector(".viewclose");
let viewProductCard = document.querySelector(".viewProductCard");
let viewProductText = document.querySelector(".viewProductText");
let add_cart_main_all = document.querySelectorAll(".add-cart-main-all");
let cart_count = document.querySelector(".cart-count");
let add_cart_main_all_view = document.querySelector(".add-cart-main-all-view");
let cartPage_conatiner = document.querySelector(".cartPage-conatiner");
let cart_logo = document.querySelector(".cart-logo");
let mainPage = document.querySelector(".mainPage");
let back_page_main = document.querySelector(".back-page-main");
let addCartProduct = document.querySelector(".addCartProduct");
let product_delete = document.querySelector(".product-delete");
let totalPrice = document.querySelector(".totalPrice");
let product_Add = document.querySelector(".product_Add");
let product_Subtract = document.querySelector(".product_Subtract");
let product_show = document.querySelector(".product_show");
let doneToCart = document.querySelectorAll(".doneToCart");
let doneToCart1 = document.querySelectorAll(".doneToCart1");
let buyProductbtn = document.querySelector(".buyProductbtn");
let shopCollection = document.querySelector(".shopCollection");
let collectionNotAvaliable = document.querySelector(".collectionNotAvaliable");
let Form_sub_status = document.querySelector(".Form-sub-status");
let SubmitFormBtn = document.querySelector(".SubmitFormBtn");
let shopProductNowbtn = document.querySelector(".shopProductNowbtn");
let showIdPass = document.querySelector(".showIdPass");
let submitFormBtnHide = document.querySelector(".submitFormBtnHide");
let userpassword = document.querySelector(".userpassword");
let showpassbtn = document.querySelector(".showpassbtn");
let clearCart = document.querySelector(".clearCart");

//--------------------Global Variables-------------------
// user account details
const account1 = {
  username: "Pardeep1111",
  pin: "9023",
  name: "Pardeep Kumar",
};
const account2 = {
  username: "Jass921",
  pin: "2222",
  name: "Jassver Singh",
};
let addCartCount = [];
let allaccount = [account1, account2];
let curentaccount;

//---- Object Proudct deatils (Rs, Heading, image)
let productDetails = {
  clicked_Rupies_span: "er",
  clicked_H2: "",
  clickedImage: "",
  productCount: 1,
  TotalMoney: 0,
  cartpageAddMoney: 0,
  countUnique: 0,
};

//------------------ loading page ------------------------
window.addEventListener("load", () => {
  loader.style.display = "none";
});

// ------------------Smooth Scrolling ------------
nav_link.forEach((e) => {
  e.addEventListener("click", (e) => {
    let allnav = e.target.childNodes[0]?.data ?? "sorry nav click";
    if (allnav === "Home") {
      home_scroll.scrollIntoView({ behavior: "smooth" });
    } else if (allnav === "Product") {
      products_scroll.scrollIntoView({ behavior: "smooth" });
    } else if (allnav === "About") {
      aboutme_scroll.scrollIntoView({ behaviour: "smooth" });
    } else if (allnav === "Contact Us") {
      contact_scroll.scrollIntoView({ behaviour: "smooth" });
    }
  });
});
buyProductbtn.addEventListener("click", (e) => {
  products_scroll.scrollIntoView({ behavior: "smooth" });
});
shopProductNowbtn.addEventListener("click", (e) => {
  products_scroll.scrollIntoView({ behavior: "smooth" });
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> User Login and Logout >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//-------After Login show
const updateLoginDetails = () => {
  account_name.innerText = `${curentaccount.name}`;
  login_status.innerText = `${curentaccount.name}`;
  login_status.style.color = "red";
  login_website_conatiner.classList.add("login-disable");
  login_website_text.classList.remove("login-disable");
  login_nav_item.forEach((e) => {
    e.classList.remove("login-disable");
  });
  logoutAll.forEach((e) => {
    e.classList.remove("login-disable");
  });
};
//-----After Logout show
const logoutLoginDetails = () => {
  alert("🔘Going To Logout Your account 🔐");
  account_name.innerText = "";
  login_status.innerText = "Please Login 🔑";
  login_status.style.color = "red";
  login_website_conatiner.classList.remove("login-disable");
  login_website_text.classList.add("login-disable");
  login_nav_item.forEach((e) => {
    e.classList.add("login-disable");
  });
  logoutAll.forEach((e) => {
    e.classList.add("login-disable");
  });
  mainPage.classList.remove("master-container");
  cartPage_conatiner.classList.add("master-container");
};

// username and password
login_btn.addEventListener("click", (e) => {
  try {
    e.preventDefault();
    curentaccount = allaccount.find((e) => {
      return e.username === username.value;
    });

    if (curentaccount?.pin === password.value) {
      console.log(`welcome : ${curentaccount.name}`);
      updateLoginDetails();
    } else {
      console.log("Incorrect try again");
      loginerror.innerText = "Incorrect try again";
      loginerror.style.color = "red";
    }
    username.value = "";
    password.value = "";
  } catch (error) {
    console.log("somthing wrong");
  }
});

//-------------Logout-------------------------------------->
logout.addEventListener("click", () => {
  loginerror.innerText = "";
  logoutLoginDetails();
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>Product Update to Cart>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//--------------------------Update Rs---------------------
const updateRs = () => {
  cart_count.innerText = addCartCount.length;
};
//--------------------ADD TotalRs --------------------------
const AddMoney = () => {
  const totalFinalRs = addCartCount.reduce(function (prev, currentV) {
    return prev + currentV;
  }, 0);
  totalPrice.innerText = `${totalFinalRs} Rs`;
};

//--------------------------- Add product to Cart Page -------
const ProductAddToCartPage = () => {
  productDetails.countUnique += 1;
  let cartProductHtml = `
  <tr id="${productDetails.countUnique}">
  <td class="myimg p-2" scope="row">
    <img class="cartImg img img-fluid" src="${productDetails.clickedImage}" alt="">
  </td>
  <td class=""  data-title="Product">${productDetails.clicked_H2}</td>
  <td class="" data-title="Rs">${productDetails.clicked_Rupies_span}</td>
  <td class="" data-title="Quantity" >
    <div class="btn-group" role="group" aria-label="Basic outlined example">
      <button type="button" class="btn btn-outline-danger  product_show_1" disabled>${productDetails.productCount}</button>
    </div>
  </td>
  <td class="" data-title="Total Money" >${productDetails.TotalMoney}</td>
  <td class=" >
  <button id="${productDetails.countUnique}" class="product-delete cursor-pointer btn btn-outline-light" style="cursor:not-allowed;">❌</button>
  </td>
</tr class="">`;
  addCartProduct.insertAdjacentHTML("afterbegin", cartProductHtml);
};

//----------------------View Product----------------------
showmebtn.forEach((e) => {
  e.addEventListener("click", (e) => {
    productDetails.TotalMoney = 0;
    productDetails.productCount = 1;
    product_show.innerText = productDetails.productCount;
    console.log(e);
    productDetails.clickedImage =
      e.target.offsetParent.children[0].attributes[0].textContent;
    productDetails.clicked_H2 =
      e.target.offsetParent.children[1].childNodes[1].innerText;
    productDetails.clicked_Rupies_span =
      e.target.offsetParent.children[1].childNodes[5].children[0].innerText;
    let clickedImageHTML = `<img src="${productDetails.clickedImage}" class="card-img-top" alt="...">`;
    let clickedTextHTML = `<h3 class="mb-3">${productDetails.clicked_H2}</h3>`;
    let clickedRupiesHTML = `<h4 class="rupies text-danger mb-3">💵 <span>${productDetails.clicked_Rupies_span}</span> Rs</h4>`;
    viewProduct_section.classList.remove("viewclosewindow");
    // image insert
    viewProductCard.insertAdjacentHTML("afterbegin", clickedImageHTML);
    // Rupies insert
    viewProductText.insertAdjacentHTML("afterbegin", clickedRupiesHTML);
    // text insert
    viewProductText.insertAdjacentHTML("afterbegin", clickedTextHTML);
    console.log(productDetails);
  });

  //---------------------------View Product window close
  viewclose.addEventListener("click", (e) => {
    productDetails.TotalMoney = 0;
    productDetails.productCount = 1;
    product_show.innerText = productDetails.productCount;
    viewProduct_section.classList.add("viewclosewindow");
    viewProductCard.removeChild(viewProductCard.children[0]);
    viewProductText.removeChild(viewProductText.children[0]);
    viewProductText.removeChild(viewProductText.children[0]);
  });
});

// ------------------- Add Cart btn --------------

add_cart_main_all.forEach((e) => {
  e.addEventListener("click", (e) => {
    console.log(e);
    productDetails.clickedImage =
      e.target.offsetParent.children[0].attributes[0].textContent;
    productDetails.clicked_H2 =
      e.target.offsetParent.children[1].childNodes[1].innerText;
    productDetails.clicked_Rupies_span =
      e.target.offsetParent.children[1].childNodes[5].children[0].innerText;
    addCartCount.push(Number(productDetails.clicked_Rupies_span));
    productDetails.TotalMoney = Number(productDetails.clicked_Rupies_span);
    updateRs();
    AddMoney();
    ProductAddToCartPage();
    console.log(e.target.children[0].classList[1]); //DONE TO CART 1
    console.log(e.target.children[1].children[0].classList[1]); //DONE TO CART 2

    e.target.children[1].children[0].classList.remove("done");
    setTimeout(() => {
      e.target.children[1].children[0].classList.add("done");
      e.target.children[0].classList.remove("done");
      setTimeout(() => {
        e.target.children[0].classList.add("done");
      }, 500);
    }, 1000);
  });
});

//------------------ view product (Add cart btn) Rs update
add_cart_main_all_view.addEventListener("click", (e) => {
  console.log(e);
  if (productDetails.TotalMoney <= 0) {
    addCartCount.push(Number(productDetails.clicked_Rupies_span));
    productDetails.TotalMoney = productDetails.clicked_Rupies_span;
  } else {
    addCartCount.push(productDetails.TotalMoney);
  }
  updateRs();
  AddMoney();
  ProductAddToCartPage();

  e.target.children[1].children[0].classList.remove("done");
  setTimeout(() => {
    e.target.children[1].children[0].classList.add("done");
    e.target.children[0].classList.remove("done");
    setTimeout(() => {
      e.target.children[0].classList.add("done");
    }, 500);
  }, 1000);
});

const Product_Add_Sub = () => {
  product_show.innerText = productDetails.productCount;
  productDetails.TotalMoney =
    productDetails.clicked_Rupies_span * productDetails.productCount;
};

//------------------ Increment Products --------------------
product_Add.addEventListener("click", (e) => {
  productDetails.productCount += 1;
  Product_Add_Sub();
});
//----------------- Increment from Cart page --------------
product_Subtract.addEventListener("click", (e) => {
  if (productDetails.productCount <= 1) {
    productDetails.productCount = 1;
  } else {
    productDetails.productCount -= 1;
  }
  Product_Add_Sub();
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>Cart Page Show>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//-------------Back to Main Page
back_page_main.addEventListener("click", (e) => {
  mainPage.classList.remove("master-container");
  cartPage_conatiner.classList.add("master-container");
});
cart_logo.addEventListener("click", (e) => {
  mainPage.classList.add("master-container");
  cartPage_conatiner.classList.remove("master-container");
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>> shopCollection >>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
shopCollection.addEventListener("click", (e) => {
  collectionNotAvaliable.innerText = "Currently Unavailable";
  collectionNotAvaliable.style.color = "red";
  setTimeout(() => {
    collectionNotAvaliable.innerText = "";
  }, 1500);
});

//>>>>>>>>>>>>>>>>> Form Validation >>>>>>>>>>>>>>>>>>>
function validateForm() {
  var name = document.getElementById("exampleInputText1").value;
  var email = document.getElementById("exampleInputEmail1").value;
  var textArea = document.getElementById("exampleFormControlTextarea1").value;

  if (name === "" || email === "" || textArea === "") {
    alert("Please fill all details");
  } else {
    Form_sub_status.classList.remove("submitFormBtnHide");
    setTimeout(() => {
      Form_sub_status.classList.add("submitFormBtnHide");
    }, 2000);
  }
}
//>>>>>>>>>>>>>>>>>>>>>> show id password
showIdPass.addEventListener("click", () => {
  userpassword.classList.toggle("submitFormBtnHide");
});

//>>>>>>>>>>>>>>>>> Password hide and show
showpassbtn.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

//>>>>>>>>>>>>> Cart Clear >>>>>>>>>>>>>>>>>>
clearCart.addEventListener("click", () => {
  for (let index = 0; index < addCartProduct.children.length; index++) {
    addCartProduct.querySelectorAll("*").forEach((n) => {
      console.log(n.remove());
    });
  }
  productDetails.TotalMoney = 0;
  addCartCount = [];
  updateRs();
  AddMoney();
});
