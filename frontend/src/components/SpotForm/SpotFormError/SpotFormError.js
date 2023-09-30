const imageUrls = ["https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg", "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg"]

const HandleUrls = (imageUrls) => {
    for (let i = 0; i < imageUrls.length; i++) {
        const urlEnding = imageUrls[i].split("").pop().toLowerCase();
        console.log(urlEnding);
    }
    return;
}


HandleUrls(imageUrls);
