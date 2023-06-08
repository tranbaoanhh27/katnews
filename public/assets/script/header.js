function toggleSearchForm() {
    let classes = document.querySelector(".header__search-form").classList;
    if (classes.contains("header__search-form--hidden"))
        document.querySelector(".header__search-form").classList.remove("header__search-form--hidden");
    else document.querySelector(".header__search-form").classList.add("header__search-form--hidden");
}

function toggleAccountMenu() {
    let menu = document.querySelector(".header-account-dropdown-menu");
    if (menu.classList.contains("header-account-dropdown-menu--hidden"))
        menu.classList.remove("header-account-dropdown-menu--hidden");
    else menu.classList.add("header-account-dropdown-menu--hidden");
}

function logOut() {
    localStorage.removeItem("user");
    window.location.replace(window.location.origin);
}

let user = localStorage.getItem("user");
if (user) {
    user = JSON.parse(user);
    document.querySelector(".navbar #auth").innerHTML = `
        <div class="header-account-dropdown-toggle" onclick="toggleAccountMenu()">
            <img src="/assets/images/default-user-icon.jpg" height="80%" alt="">
            <i class="fa-solid fa-caret-down"></i>
        </div>
        <div class="header-account-dropdown-menu header-account-dropdown-menu--hidden">
            <div class="header-account-dropdown-menu__user-info">
                <div>
                    <h5>${user.username}</h5>
                    <span class="premium-badge">Premium</span>
                </div>
                <img src="/assets/images/default-user-icon.jpg" height="75px" alt="">
            </div>
            <div>
                <a href="/pages/account/account.html">Quản lý tài khoản</a>
            </div>
            <div>
                <p onclick="logOut()">Đăng xuất</p>
            </div>
        </div>
    `;
} else {
    document.querySelector(".navbar #auth").innerHTML = `
        <a href="/pages/authentication/sign-in.html">
            <button class="btn btn-primary header__login-button" type="button">Đăng nhập</button>
        </a>
    `;
}
