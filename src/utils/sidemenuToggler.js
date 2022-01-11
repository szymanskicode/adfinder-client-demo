// Toggle sidemenu
export const toggleSideMenu = async () => {
  async function checkOff() {
    return new Promise((resolve) => {
      const el = Array.from(document.getElementsByClassName('sidemenu-off'));
      if (Array.isArray(el) && el.length > 0) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  }

  async function bodyEl() {
    return new Promise((resolve) => {
      const el = document.getElementById('body');
      if (el) {
        return resolve(el);
      } else {
        return resolve(false);
      }
    });
  }

  async function toggle() {
    const off = await checkOff();
    const body = await bodyEl();

    const width = window.innerWidth;

    if (off && width >= 1200) {
      body.classList.remove('sidemenu-off');
      body.classList.remove('sidemenu');
    } else if (off && width < 1200) {
      body.classList.remove('sidemenu-off');
      body.classList.add('sidemenu');
    } else {
      body.classList.toggle('sidemenu');
    }
  }

  toggle();
};

// Hide sidemenu
export const hideSideMenu = () => {
  const width = window.innerWidth;

  if (width < 1199) {
    const body = document.getElementById('body');
    body.classList.add('sidemenu-off');
  }
};
