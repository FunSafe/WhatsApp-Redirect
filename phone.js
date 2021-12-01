
var telInput = $("#phone"),
  errorMsg = $("#error-msg"),
  validMsg = $("#valid-msg");

// initialise plugin
telInput.intlTelInput({

  allowExtensions: true,
  formatOnDisplay: true,
  autoFormat: true,
  autoHideDialCode: true,
  autoPlaceholder: true,
  defaultCountry: "auto",
  ipinfoToken: "yolo",

  nationalMode: false,
  numberType: "MOBILE",
  //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
  preferredCountries: ['sa', 'ae', 'qa', 'om', 'bh', 'kw', 'ma'],
  preventInvalidNumbers: true,
  separateDialCode: true,
  initialCountry: "ir",
  geoIpLookup: function (callback) {
    $.get("http://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "";
      callback(countryCode);
    });
  },
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
});

var reset = function () {
  telInput.removeClass("error");
  errorMsg.addClass("hide");
  validMsg.addClass("hide");
};

// on blur: validate
telInput.blur(function () {
  reset();
  if ($.trim(telInput.val())) {
    if (telInput.intlTelInput("isValidNumber")) {
      //validMsg.removeClass("hide");
    } else {
      //telInput.addClass("error");
      //errorMsg.removeClass("hide");
    }
  }
});

// on keyup / change flag: reset
telInput.on("keyup change", reset);

/* My Code */
const redirect = document.querySelector("#redirect");
redirect.addEventListener('click', doRedirect);
function doRedirect(e) {
  e.preventDefault();

  if (telInput.intlTelInput("isValidNumber")) {
    const phoneNumber = telInput.intlTelInput("getNumber");
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&app_absent=0`;
    a.click();
  } else {
    alert("Not a valid phone number")
  }
}

const copy = document.querySelector("#copy");
copy.addEventListener('click', doCopy);

function doCopy(e) {
  e.preventDefault();
  if (telInput.intlTelInput("isValidNumber")) {
    const phoneNumber = telInput.intlTelInput("getNumber");
    const link = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&app_absent=0`;
    CopyIt(link);
  } else {
    alert("Not a valid phone number")
  }
}

function CopyIt(input) {
  const str = input;

  /* Create the text field */
  const copyText = document.createElement('textarea');
  copyText.value = str;
  copyText.setAttribute('readonly', '');
  copyText.style.position = 'absolute';
  copyText.style.left = '-9999px';
  document.body.appendChild(copyText);

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("WhatsApp profile link copied!");
  document.body.removeChild(copyText);
}