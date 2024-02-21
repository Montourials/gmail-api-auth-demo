// export default function oneTapPrompt(handleSuccess, handleFailure) {
//   const gsi = window.google?.accounts?.id;

//   if (!gsi) {
//     console.error("gsi script has not been loaded, cannot use OneTap");
//     return;
//   }

//   gsi.prompt((notification) => {
//     const failedToDisplay =
//       notification.isNotDisplayed() || notification.isSkippedMoment();

//     if (failedToDisplay) {
//       handleFailure(notification);
//     } else {
//       handleSuccess(notification);
//     }
//   });
// }
