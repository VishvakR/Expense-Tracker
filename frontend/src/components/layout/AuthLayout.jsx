import React from "react";

function AuthLayout( {children} ) {
  return (
    <div>
        <div className="w-screen h-screen">
            <h1>Auth Layout</h1>
            {children}
        </div>
    </div>
  ); 
}

export default AuthLayout;