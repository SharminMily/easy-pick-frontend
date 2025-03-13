"use client"

import { useUser } from "@/context/UserContext";

//import { Button } from "@/components/ui/button"


const Home = () => {
  const user =useUser();
  console.log(user)
  return (
    <div>
      <h4>Easy Pick</h4>
      {/* <Button className="bg-fuchsia-600 text-white hover:bg-fuchsia-800">Button</Button> */}

      </div>
  )
}

export default Home