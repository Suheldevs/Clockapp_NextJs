import React from 'react'

function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "1rem", borderTop: "1px solid #ccc" }}>
          <p>© {new Date().getFullYear()} Mohd Suhel. All rights reserved.</p>
        </footer>
  )
}

export default Footer