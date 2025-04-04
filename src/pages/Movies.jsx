import { useState } from "react";

//image links
import Bee from "../assets/man.jpeg";
import knight from "../assets/knight.jpeg";
import begins from "../assets/begins.jpeg";
import ironman from "../assets/ironman.jpeg";
import avengers from "../assets/Avengers.jpeg";
import spider from "../assets/spider.jpeg";
import doctor from "../assets/doctor.jpeg";
import panther from "../assets/panther.jpeg";
import thor from "../assets/thor.jpeg";
import captain from "../assets/captain.jpeg";
import guardians from "../assets/flash.jpeg";
import pool from "../assets/pool.jpeg";

//video links
import superman from "../assets/Videos/superman.mp4";
import batman from "../assets/Videos/batman.mp4";

//other components
import "../App.css";

export default function ClickableOverlay() {
  const [activeIndex, setActiveIndex] = useState(null);

  const items = [
    { title: "Man Of Steel", img: Bee, year: "2024", duration: "104min", genre: "Action", released: "2020-03-12", description: "A hero faces his destiny in a battle of steel and honor.", youtubeurl: superman },
    { title: "Batman Begins", img: begins, year: "2005", duration: "140min", genre: "Action", released: "2005-06-15", description: "Bruce Wayne becomes Gotham's silent protector, the Batman.", youtubeurl: batman },
    { title: "The Dark Knight", img: knight, year: "2008", duration: "152min", genre: "Crime", released: "2008-07-18", description: "The Joker tests Batman’s limits in a chaotic Gotham.", youtubeurl: "" },
    { title: "Iron Man", img: ironman, year: "2008", duration: "126min", genre: "Sci-Fi", released: "2008-05-02", description: "Tony Stark builds an armored suit to fight crime.", youtubeurl: "" },
    { title: "Avengers", img: avengers, year: "2019", duration: "181min", genre: "Adventure", released: "2019-04-26", description: "Earth’s mightiest heroes take one last stand against Thanos.", youtubeurl: "" },
    { title: "Spider-Man", img: spider, year: "2021", duration: "148min", genre: "Fantasy", released: "2021-12-17", description: "Peter Parker deals with the consequences of his unmasked identity.", youtubeurl: "" },
    { title: "Doctor Strange", img: doctor, year: "2016", duration: "115min", genre: "Fantasy", released: "2016-11-04", description: "A surgeon discovers the power of magic and alternate dimensions.", youtubeurl: "" },
    { title: "Black Panther", img: panther, year: "2018", duration: "134min", genre: "Action", released: "2018-02-16", description: "T’Challa fights for Wakanda’s future as the Black Panther.", youtubeurl: "" },
    { title: "Thor: Ragnarok", img: thor, year: "2017", duration: "130min", genre: "Comedy", released: "2017-11-03", description: "Thor battles to save Asgard from destruction.", youtubeurl: "" },
    { title: "Captain America", img: captain, year: "2016", duration: "147min", genre: "Action", released: "2016-05-06", description: "Captain America and Iron Man clash over superhero regulation.", youtubeurl: "" },
    { title: "The Flash", img: guardians, year: "2024", duration: "121min", genre: "Adventure", released: "2014-08-01", description: "A misfit team of cosmic outlaws fights for good.", youtubeurl: "" },
    { title: "Deadpool", img: pool, year: "2016", duration: "108min", genre: "Comedy", released: "2016-02-12", description: "A mercenary with a twisted sense of humor seeks revenge.", youtubeurl: "" }
  ];

  return (
    <div class="mt-[45px] relative w-[100%] h-[600px] text-center mb-[75px] mt-[75px]">
      <h2 class="w-2/2 text-left font-thin text-[20px]">Trending</h2>
      <div class="border border-grey-2 border-t-[2px] border-gray-500 absolute w-[800px] mt-[-13px] ml-[90px]"></div>
      <div class="flex text-black gap-[10px] p-[10px] h-[50%] w-[100%]" >
        {items.slice(0, 6).map((item, index) => (
          <div class="flex-1 text-white rounded-[2px] bg-[#1e1d1d] font-smaller p-[5px] transition duration-[300ms] cursor-pointer shadow-[3px_3px_10px_black] transition-all duration-[300ms] hover:bg-[#333]" key={index} onClick={() => setActiveIndex(index)}>
            <img src={item.img} alt="" class="w-2/2 h-[80%]" />
            <h3 class="text-left font-100 text-[15px]">{item.title}</h3>
            <div class="flex text-[11px] font-100 justify-between text-[#8e8fad]">
              <div className="time">{item.year}</div>
              <div className="duration">{item.duration}</div>
            </div>
          </div>
        ))}
      </div>

      <div class="flex text-black gap-[10px] p-[10px] h-[50%] w-[100%]">
        {items.slice(6, 12).map((item, index) => (
          <div class="flex-1 text-white rounded-[2px] bg-[#1e1d1d] font-smaller p-[5px] transition duration-[300ms] cursor-pointer shadow-[2px_2px_10px_#000000] transition-all duration-[300ms] hover:bg-[#333]" key={index + 6} onClick={() => setActiveIndex(index + 6)}>
            <img src={item.img} alt="" class="w-2/2 h-[80%]" />
            <h3 class="text-left font-100 text-[15px]">{item.title}</h3>
            <div class="flex text-[11px] font-100 justify-between text-[#8e8fad]">
              <div className="time">{item.year}</div>
              <div className="duration">{item.duration}</div>
            </div>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div class="absolute top-0 left-0 w-2/2 h-2/2 bg-[rgba(0,0,0,0.5) flex items-center justify-center rounded-[10px]">
          <div className="bg-[rgba(112,105,105,0.933)] p-[20px] rounded-[10px] text-center shadow-[2px_2px_15px_rgba(34,34,34,0.3) w-[80%] h-[80%]">
            <p>
            <div class="h-[300px] bg-[length:100%_100%] bg-no-repeat bg-center overflow-hidden rounded-[10px] border-[2px] border-black-500 w-2/2 top-0 bg-[linear-gradient(to_top,#030303,rgba(0,0,0,0.433),rgba(0,0,0,0.849))]">
              <video class="w-full h-full" src={items[activeIndex].youtubeurl} controls autoPlay loop muted></video>
            </div>
            </p>
            <div className="text-black flex gap-[50px] mt-[20px]">
              <div class="text-left h-[110px] font-100 bg-[transparent]">
                Duration: {items[activeIndex].duration} <br />
                Genre: {items[activeIndex].genre} <br />
                Released: {items[activeIndex].released} <br />
              </div>
              <div class="text-left h-[110px] font-100 bg-[transparent]">
                <h2>{items[activeIndex].title}</h2>
                <p>{items[activeIndex].description}</p>
              </div>
            </div>
            <div class="absolute top-[10px] right-[10px] text-[30px] flex justify-center w-[50px] h-[50px] rounded-[50%] text-white cursor-pointer rotate-45 transition-all duration-[300ms]" onClick={() => setActiveIndex(null)}>+</div>
          </div>
        </div>
      )}
    </div>
  );
}
