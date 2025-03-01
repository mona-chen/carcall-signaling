'use strict';

// Janus Library (Ensure janus.js is included in your project)
let sfutest = null;
let opaqueId = "videoroom-" + Janus.randomString(12);

let localStream = null;
let remoteStream = null;

let janus, videocall;
let myUsername = "user1"; // Change dynamically
let peerUsername = "user2"; // Change dynamically

// UI Elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');

const clientIdP = document.getElementById('clientId');
const peerConnectionStatusP = document.getElementById('peerConnectionStatus');
const calleeIdInput = document.getElementById('calleeIdInput');

Janus.init({
    debug: "all",
    callback: function () {
        janus = new Janus({
            server: "wss://janus.conf.meetecho.com/ws",
            success: function () {
                janus.attach({
                    plugin: "janus.plugin.videocall",
                    success: function (pluginHandle) {
                        videocall = pluginHandle;
                        console.log("Plugin attached!", videocall);
                    },
                    error: function (error) {
                        console.error("Error attaching plugin:", error);
                    }
                });
            },
            error: function (error) {
                console.error("Janus initialization failed:", error);
            }
        });
    }
});


function registerUser(username) {
    let register = { request: "register", username: username };
    videocall.send({ message: register });
}


function callUser(targetUser) {
    let call = { request: "call", username: targetUser };
    videocall.send({ message: call });
}


videocall.onmessage = function (msg, jsep) {
    let event = msg["videocall"];
    if (event === "incomingcall") {
        let caller = msg["username"];
        console.log("Incoming call from", caller);

        // Accept the call
        let accept = { request: "accept" };
        videocall.send({ message: accept, jsep: jsep });
    }
};

function toggleMute() {
    let muted = videocall.isAudioMuted();
    videocall.muteAudio(!muted);
}


function endCall() {
    let hangup = { request: "hangup" };
    videocall.send({ message: hangup });
}




// Call Button Handler
callButton.addEventListener("click", function () {
    // joinRoom();
});

// Hangup Button Handler
hangupButton.addEventListener("click", function () {

});
