export const SocialLogin = ({ onGoogleSuccess }) => {
    return (
      <div className="space-y-3">
        {/* Google Login */}
        {/* <GoogleLogin
          onSuccess={onGoogleSuccess}
          onError={() => console.error("Google login failed")}
          text="signin_with"
          shape="pill"
          useOneTap
        /> */}
  
        {/* Facebook Login using modern package */}
        {/* <FacebookLogin
  appId="YOUR_FACEBOOK_APP_ID"
  onSuccess={(response) => {
    console.log("Facebook login success:", response);
  }}
  onFail={(error) => {
    console.error("Facebook login error:", error);
  }}
  onProfileSuccess={(profile) => {
    console.log("Facebook profile:", profile);
  }}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg font-semibold transition duration-200 text-center"
>
  Continue with Facebook
</FacebookLogin> */}
      </div>
    )
  }
  