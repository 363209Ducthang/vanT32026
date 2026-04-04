
// Nội dung bức thư Valentine ngắn gọn (khoảng 150 ký tự)
var letterContent = `Kính gửi cô Vương Thị Huyền Ly,

Em viết thư này để gửi đến cô lời cảm ơn chân thành nhất. Nhờ những bài giảng tận tâm của cô, em không chỉ hiểu bài hơn mà còn dần yêu thích môn Văn. Cô luôn kiên nhẫn hướng dẫn, giúp chúng em biết cách cảm nhận cái hay, cái đẹp trong từng tác phẩm. Những lời động viên của cô đã giúp em có thêm động lực cố gắng trong học tập.

Em chúc cô luôn mạnh khỏe, hạnh phúc và tiếp tục truyền cảm hứng cho nhiều thế hệ học sinh.

Em xin cảm ơn cô!

`;

// Tốc độ viết chữ
var durationWrite = 25;

// Biến để kiểm soát hiệu ứng viết chữ
var isWriting = false;
var writeTimeouts = [];

// Hiệu ứng viết chữ từ từ
function effectWrite() {
    if (isWriting) return;
    
    isWriting = true;
    var boxLetter = document.querySelector(".letterContent");
    var letterContentSplited = letterContent.split("");
    
    // Xóa nội dung cũ và dừng timeout cũ
    stopWritingEffect();
    boxLetter.innerHTML = "";
    
    // Thêm từng ký tự với hiệu ứng
    letterContentSplited.forEach(function(val, index) {
        var timeout = setTimeout(function() {
            boxLetter.innerHTML += val;
            
            // Tự động scroll xuống cuối
            var rightContent = document.querySelector(".letterContent");
            rightContent.scrollTop = rightContent.scrollHeight;
            
            // Kiểm tra đã viết xong chưa
            if (index === letterContentSplited.length - 1) {
                isWriting = false;
            }
        }, durationWrite * index);
        
        writeTimeouts.push(timeout);
    });
}

// Dừng hiệu ứng viết chữ
function stopWritingEffect() {
    writeTimeouts.forEach(function(timeout) {
        clearTimeout(timeout);
    });
    writeTimeouts = [];
    isWriting = false;
}

// Reset nội dung thư
function resetLetterContent() {
    var boxLetter = document.querySelector(".letterContent");
    boxLetter.innerHTML = "";
    stopWritingEffect();
}

// Khởi tạo khi trang load xong
window.addEventListener("load", function() {
    setTimeout(function() {
        document.querySelector(".container").classList.add("active");
        console.log("Website Valentine đã sẵn sàng!");
    }, 500);
});

// Xử lý sự kiện cho nút mở thiệp
var openBtn = document.querySelector(".openBtn");
openBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    
    // Hiệu ứng nhấn nút
    this.style.transform = "translateY(0) scale(0.95)";
    setTimeout(() => {
        this.style.transform = "translateY(0) scale(1)";
    }, 150);
    
    // Hiển thị thiệp
    var card = document.querySelector(".cardValentine");
    card.classList.add("active");
    
    // Ẩn tiêu đề và nút
    document.querySelector(".container").classList.add("close");
    
    console.log("Thiệp đã được hiển thị!");
});

// Xử lý sự kiện cho thiệp (mở thiệp)
var cardValentine = document.querySelector(".cardValentine");
cardValentine.addEventListener("click", function(e) {
    if (e.target.closest('.close-card-btn')) return;
    
    // Chỉ mở thiệp khi chưa mở
    if (!this.classList.contains("open")) {
        this.classList.add("open");
        console.log("Thiệp đang mở...");
        
        // Bắt đầu hiệu ứng viết chữ sau 0.3s
        setTimeout(effectWrite, 300);
    }
});

// Xử lý nút đóng thiệp
var closeCardBtn = document.querySelector(".close-card-btn");
closeCardBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    
    var card = document.querySelector(".cardValentine");
    
    // Đóng thiệp nếu đang mở
    if (card.classList.contains("open")) {
        card.classList.remove("open");
        setTimeout(resetLetterContent, 200);
    }
    
    // Ẩn thiệp
    setTimeout(() => {
        card.classList.remove("active");
        document.querySelector(".container").classList.remove("close");
    }, 300);
    
    console.log("Thiệp đã đóng");
});

// Thêm hiệu ứng hover cho card (chỉ trên desktop)
if (window.innerWidth > 768) {
    cardValentine.addEventListener("mouseenter", function() {
        if (this.classList.contains("active") && !this.classList.contains("open")) {
            this.style.transform = "translate(-50%, -50%) scale(1.02)";
        }
    });
    
    cardValentine.addEventListener("mouseleave", function() {
        if (this.classList.contains("active") && !this.classList.contains("open")) {
            this.style.transform = "translate(-50%, -50%) scale(1)";
        }
    });
}

// Thêm hiệu ứng cho các trái tim bay
function addHeartHoverEffect() {
    var hearts = document.querySelectorAll('.paperHeart');
    hearts.forEach(function(heart) {
        heart.addEventListener('mouseenter', function() {
            this.style.filter = "drop-shadow(0 0 20px #ffccd5)";
        });
        
        heart.addEventListener('mouseleave', function() {
            this.style.filter = "drop-shadow(0 0 15px white)";
        });
    });
}

// Gọi hàm sau khi trang load
setTimeout(addHeartHoverEffect, 3000);

// Kiểm tra xem có hình ảnh trái tim không
window.addEventListener("error", function(e) {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('paperHeart')) {
        console.warn("Không tìm thấy hình ảnh trái tim, đang sử dụng icon thay thế...");
        e.target.style.display = 'none';
        
        var icon = document.createElement('i');
        icon.className = 'fas fa-heart';
        icon.style.cssText = `
            position: absolute;
            font-size: 50px;
            color: pink;
            filter: drop-shadow(0 0 15px white);
            animation: hiddenHeart 3.1s linear forwards, flyHeart 5s ease-in-out calc(${e.target.style.getPropertyValue('--time')} + 3.1s) infinite;
            z-index: 1;
            pointer-events: none;
        `;
        e.target.parentNode.appendChild(icon);
    }
}, true);

// Thêm hiệu ứng nhấp nháy cho tiêu đề
function addTitleBlinkEffect() {
    var title = document.querySelector('.boxTitle');
    if (title) {
        setInterval(function() {
            title.style.textShadow = "0 0 20px " + (Math.random() > 0.5 ? "#ffccd5" : "#ffffff");
        }, 1500);
    }
}

// Kích hoạt hiệu ứng sau khi tiêu đề xuất hiện
setTimeout(addTitleBlinkEffect, 2500);

// Xử lý responsive khi thay đổi kích thước cửa sổ
window.addEventListener("resize", function() {
    // Điều chỉnh chiều cao thiệp cho mobile
    var card = document.querySelector(".cardValentine");
    if (window.innerWidth <= 768) {
        card.style.height = "380px";
    } else {
        card.style.height = "500px";
    }
});

// Khởi tạo chiều cao thiệp ban đầu
if (window.innerWidth <= 768) {
    document.querySelector(".cardValentine").style.height = "380px";
}

// Kiểm tra và log trạng thái
console.log("Valentine Card đã được khởi tạo thành công!");
console.log("Hướng dẫn sử dụng:");
console.log("1. Click vào nút 'Mở thiệp nè' để hiển thị thiệp");
console.log("2. Click vào thiệp để mở và xem thư tình");
console.log("3. Click vào nút X để đóng thiệp");
document.querySelector(".cardValentine").style.transform = "translate(-50%, -50%) rotate(-2deg)";