import {firebaseConfig} from './config.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const signupForm = document.querySelector('.registration.form');
const loginForm = document.querySelector('.login.form');
const forgotForm=document.querySelector('.forgot.form');
const container=document.querySelector('.container');
const signupBtn = document.querySelector('.signupbtn');
const anchors = document.querySelectorAll('a');
anchors.forEach(anchor => {
  anchor.addEventListener('click', () => {
    const id = anchor.id;
    switch(id){
    case 'loginLabel':
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
        break;
      case 'signupLabel':
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        forgotForm.style.display = 'none';
        break;
      case 'forgotLabel':
        signupForm.style.display = 'none';
        loginForm.style.display = 'none';
        forgotForm.style.display = 'block';
        break;
    }
  });
});

// Select the "Sign up with Google" button
const googleSignupBtn = document.querySelector('.button.signupbtn[value="Sign up with Google"]');

// Handle "Sign up with Google" button click
googleSignupBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;

      // Check if user is signing in for the first time
      if (result.additionalUserInfo.isNewUser) {
        const uid = user.uid;
        const name = user.displayName;
        const email = user.email;

        // Save new user's data to Firestore
        firestore.collection('users').doc(uid).set({
          name: name,
          email: email,
          usertype: 'User', // Default usertype (customize as needed)
        }).then(() => {
          console.log('New user data saved to Firestore');
        }).catch((error) => {
          console.error('Error saving user data to Firestore:', error.message);
        });
      }

      // Redirect to profile or desired page after successful signup
      console.log('User signed up with Google:', user.displayName);
      location.href = "profile.html"; // Redirect after successful signup
    })
    .catch((error) => {
      console.error('Error signing up with Google:', error.message);
      alert('Error signing up with Google: ' + error.message);
    });
});


const googleLoginBtn = document.querySelector('.button.loginbtn[value="Continue with Google"]');
googleLoginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;

      // Check if user is signing in for the first time
      if (result.additionalUserInfo.isNewUser) {
        const uid = user.uid;
        const name = user.displayName;
        const email = user.email;

        firestore.collection('users').doc(uid).set({
          name: name,
          email: email,
          usertype: 'User', // Default usertype (you can customize this)
        });
      }

      console.log('User signed in with Google:', user.displayName);
      location.href = "profile.html"; // Redirect after successful login
    })
    .catch((error) => {
      console.error('Error signing in with Google:', error.message);
      alert('Error signing in with Google: ' + error.message);
    });
});

signupBtn.addEventListener('click', () => {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;
  const usertype = document.querySelector('#usertype').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
        user.sendEmailVerification()
        .then(() => {
          alert('Verification email sent. Please check your inbox and verify your email before signing in.');
        })
        .catch((error) => {
          alert('Error sending verification email: ' + error.message);
        });
        console.log('User data saved to Firestore');
        firestore.collection('users').doc(uid).set({
          name: name,
          usertype: usertype,
          email: email,
      })
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
    })
    .catch((error) => {
      alert('Error signing up: '+error.message);
    });
});
const loginBtn = document.querySelector('.loginbtn');
loginBtn.addEventListener('click', () => {
  const email = document.querySelector('#inUsr').value.trim();
  const password = document.querySelector('#inPass').value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log('User is signed in with a verified email.');
        // location.href = "signout.html";
        location.href="profile.html";
      } else {
        alert('Please verify your email before signing in.');
      }
    })
    .catch((error) => {
      alert('Error signing in: ' + error.message);
    });
});
const forgotBtn=document.querySelector('.forgotbtn');
forgotBtn.addEventListener('click', () => {
  const emailForReset = document.querySelector('#forgotinp').value.trim();
 if (emailForReset.length>0) {
   auth.sendPasswordResetEmail(emailForReset)
 .then(() => {
   alert('Password reset email sent. Please check your inbox to reset your password.');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
    })
    .catch((error) => {
    alert('Error sending password reset email: ' + error.message);
  });
  }
});
