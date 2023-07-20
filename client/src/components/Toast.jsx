// import { useRef } from "react";
// import "./Toast.css";

// function Toast() {
//   const toast = useRef();
//   const progress = useRef();

//   return (
//     <>
//       <div className="toast" ref={toast}>
//         <div className="toast-content">
//           <i className="fas fa-solid fa-check check"></i>

//           <div className="message1">
//             <span className="text1 text-1">Notification</span>
//             <span className="text1 text-2">You have some message from Bruce</span>
//           </div>
//         </div>

//         <div className="progress" ref={progress}></div>
//       </div>

//       <button onClick={() => {
//         toast.current.classList.add("active")
//         progress.current.classList.add("active")
//         setTimeout(() => {
//           toast.current.classList.remove("active")
//         }, 5000)
//         setTimeout(() => {
//           progress.current.classList.remove("active")
//         }, 5300)
//       }}>Show Toast</button>
//     </>
//   );
// }

// export default Toast;
