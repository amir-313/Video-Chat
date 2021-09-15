// asign the vairables
const socket = io("/");
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement("video");
const showChat = document.querySelector("shoeChat");
const bckBtn = document.querySelector("header__back");

myVideo.muted = true;

//Adding eventListner
bckBtn.addEventListener("click",()=>{
    document.querySelector(".main__right").style.display = "none";
    document.querySelector(".header__back").style.display = "none";
    document.querySelector(".main__left").style.display = "flex";
    document.querySelector(".main__left").style.flex = "1";
       
})
showChat.addEventListener("click",()=>{
    document.querySelector(".main__right").style.display = "flex";
    document.querySelector(".main__right").style.flex = "1";
    document.querySelector(".main__left").style.display = "none";
    document.querySelector(".header__back").style.display = "block";
})

const user = prompt("Enter Your Name");

var peer = new peer(undefined,{
    path : "/peerjs",
    host : "/",
    port : "443"
});

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    audio : true,
    video : true
})
.then((stream)=>{
    myVideoStream = stream;
    addVideoStream = (myvideo,stream);
    //Adding connection to peer
    peer.on("call",(call)=>{
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream",(userVideoStream)=>{
            addVideoStream(video, userVideoStream)
        })
    })
    //taking unique user and estability connection
    socket.on("userconnected", (userId) =>{
        connectToNewUser(userId, stream)
    })
    
})
const connectToNewUser = (userId, stream) =>{
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) =>{
        addVideoStream(video, userVideoStream);

    })
};
peer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id, user);
});

const addEventListener = (video,stream) =>{
    video,srcObject = stream;
    video.addEventListener("loadmetadata", () =>{
        video.play();
        videoGrid.append(video);
    })
};


// chat 

let text = document.querySelector("#chat_message");
let sned = document.getElementById("send");
let messages = document.querySelector(".messages");


