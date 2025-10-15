import React, { forwardRef } from 'react'



const AboutUs = forwardRef<HTMLDivElement>((_, ref) => {
    
  return (
      <section
        id="about-us" ref={ref}
        className='relative flex min-h-screen w-full'
        >
        <div className='flex flex-col items-center mb-10 justify-center gap-4 p-10 w-full lg:w-2/3'>
          <h2 className='text-6xl'>About Us</h2>
          <article>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis sed assumenda excepturi dignissimos officiis. Facilis recusandae eum sapiente, quasi nesciunt dolores expedita, natus unde laborum in fugiat quo, veritatis qui.
          </article>
        </div>
       
        <div
  className="
    absolute top-0 right-0
    lg:w-1/3 h-full
    bg-pink-500
    bg-center bg-cover bg-no-repeat
    bg-fixed
    z-0
  "
  style={{
    backgroundImage: "url('blob.svg')",
  }}
></div>
      </section>
    )
  }) 

export default AboutUs