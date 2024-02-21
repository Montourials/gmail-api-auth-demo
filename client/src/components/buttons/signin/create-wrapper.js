///medium.com/@leonardosalles/a-guide-to-custom-google-sign-in-button-e7b02c2c5e4f
///developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.renderButton
export default function createWrapper() {
  const gsi = window.google?.accounts?.id;

  if (!gsi) {
    console.log("no gsi, could not create signin button");
    return;
  }

  //Create an invisible div which will render Google's button
  const wrapper = document.createElement("div");
  wrapper.style.display = "none";
  wrapper.classList.add("gsi-button-wrapper");

  //Append to html body (doesn't matter where it appears as it is invisible)
  window.document.body.appendChild(wrapper);

  //No need for second args as they apply styles and this button is invisible
  gsi.renderButton(wrapper, {});

  //Select the actual button element that is created by Google
  const button = wrapper.querySelector("div[role=button]");

  return { button, wrapper };
}
