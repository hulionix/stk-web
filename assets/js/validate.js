var serialize=function(e){var t="";for(i=0;i<e.elements.length;i++){var s=e.elements[i];s.name&&!s.disabled&&"file"!==s.type&&"reset"!==s.type&&"submit"!==s.type&&"button"!==s.type&&(("checkbox"!==s.type&&"radio"!==s.type||s.checked)&&(t+="&"+encodeURIComponent(s.name)+"="+encodeURIComponent(s.value)))}return t};window.displayStatus=function(e){if(window.mcStatus=window.document.querySelector(".mc-status"),e.result&&e.msg){if(mcStatus.innerHTML=e.msg.replace("0 - ",""),"error"===e.result)return mcStatus.classList.remove("success-message"),void mcStatus.classList.add("error-message");mcStatus.classList.remove("error-message"),mcStatus.classList.add("success-message")}};var sendForm=function(e){var t=e.getAttribute("action");t=t.replace("/post?u=","/post-json?u="),t+=serialize(e)+"&c=displayStatus";var s=window.document.getElementsByTagName("script")[0],a=window.document.createElement("script");a.src=t,window.mcStatus=e.querySelector(".mc-status"),s.parentNode.insertBefore(a,s),a.onload=function(){this.remove()}};function validateEmail(e){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}function validate(e){return!!validateEmail(e)}document.addEventListener("submit",(function(e){e.preventDefault(),validateEmail(e.target.elements[0].value)?sendForm(e.target):window.displayStatus({result:"error",msg:"Email is not valid."})}),!1);
//# sourceMappingURL=validate.js.map