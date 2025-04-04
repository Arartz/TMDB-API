import React from 'react'
import logo from './logo.png'

export default function header() {
  return (
    <nav class="flex w-2/2  m-t-[30px] m-l-[100px] p-[20px] justify-between m-r-[110px] p-t[20px]">
      <div class="text-2xl flex gap-[5px] font-thin text-white">
        <img src={logo} alt="" class="w-[40px]"/>
        <h5>WarnerBros</h5>
        </div>
        <div class="flex relative gap-[20px]">
          <a href="#" class="text-white no-underline text-[15px] font-thin">Home</a>
          <a href="#" class="text-white no-underline text-[15px] font-thin">Explore</a>
          <a href="#" class="text-white no-underline text-[15px] font-thin">Genre</a>
          <a href="#" class="text-white no-underline text-[15px] font-thin">News</a>
          <a href="#" class="text-white no-underline text-[15px] font-thin">Movies</a>
          <a href="#" class="text-white no-underline text-[15px] font-thin">TV Shows</a>
        </div>
    </nav>
  )
}
