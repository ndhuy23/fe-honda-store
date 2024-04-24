// Tính toán giá trị tiến trình cuộn trang và cập nhật thanh tiến trình
const calcScrollValue = () => {
  const scrollProgress = document.getElementById("progress");
  const progressValue = document.getElementById("progress-value");
  const pos = window.pageYOffset || document.documentElement.scrollTop;
  const calcHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#FF0000 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

// Gọi hàm calcScrollValue khi cuộn hoặc tải lại trang
window.addEventListener("scroll", calcScrollValue);
window.addEventListener("load", calcScrollValue);

// Hàm kiểm tra phần tử có trong khung nhìn của trình duyệt
function isInViewport(element) {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Hiển thị hiệu ứng khi phần tử guaranteeContent nằm trong khung nhìn
document.addEventListener("scroll", () => {
  const guaranteeContent = document.querySelector(".guarantee_content");
  if (isInViewport(guaranteeContent)) {
    guaranteeContent.classList.add("show");
    document.removeEventListener("scroll", calcScrollValue);
  }
});

// Hiển thị hiệu ứng khi phần tử maintenance_content nằm trong khung nhìn
document.addEventListener("scroll", () => {
  const maintenanceContent = document.querySelector(".maintenance_content");
  if (isInViewport(maintenanceContent)) {
    maintenanceContent.classList.add("show");
    document.removeEventListener("scroll", calcScrollValue);
  }
});

// Mở rộng hoặc thu gọn nội dung khi click vào policy_choice
document.addEventListener("DOMContentLoaded", () => {
  const policyChoices = document.querySelectorAll(".policy_choice");

  policyChoices.forEach((policyChoice) => {
    policyChoice.addEventListener("click", function () {
      this.classList.toggle("expanded");

      const policyContent = this.nextElementSibling;
      if (policyContent.innerHTML.trim() === "") {
        policyContent.style.maxHeight = "200px";
      }
    });
  });
});