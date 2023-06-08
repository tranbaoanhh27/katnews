const userAvatar = document.querySelector('.header-account-dropdown-toggle');
const userMenu = document.querySelector('.header__user-menu');

userAvatar.addEventListener('click', function() {
  userMenu.classList.toggle('header__user-menu--active');
//   console.log(userMenu);
});

document.addEventListener('click', function(event) {
  const isClickInside = userAvatar.contains(event.target) || userMenu.contains(event.target);
  if (!isClickInside) {
    userMenu.classList.remove('header__user-menu--active');
  }
});
