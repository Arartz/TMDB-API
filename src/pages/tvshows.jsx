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
    <div className="container">
      <h2>Trending</h2>
      <div className="line"></div>

      <div className="top" >
        {items.slice(0, 6).map((item, index) => (
          <div className="trigger-div" key={index} onClick={() => setActiveIndex(index)}>
            <img src={item.img} alt="" />
            <h3>{item.title}</h3>
            <div className="price">
              <div className="time">{item.year}</div>
              <div className="duration">{item.duration}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="low">
        {items.slice(6, 12).map((item, index) => (
          <div className="trigger-div" key={index + 6} onClick={() => setActiveIndex(index + 6)}>
            <img src={item.img} alt="" />
            <h3>{item.title}</h3>
            <div className="price">
              <div className="time">{item.year}</div>
              <div className="duration">{item.duration}</div>
            </div>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="overlay">
          <div className="overlay-content">
            <p>
            <div className="img">
              <video src={items[activeIndex].youtubeurl} controls autoPlay muted loop></video>
            </div>
            </p>
            <div className="overlay-text">
              <div className="left">
                Duration: {items[activeIndex].duration} <br />
                Genre: {items[activeIndex].genre} <br />
                Released: {items[activeIndex].released} <br />
              </div>
              <div className="right">
                <h2>{items[activeIndex].title}</h2>
                <p>{items[activeIndex].description}</p>
              </div>
            </div>
            <div className="close-div" onClick={() => setActiveIndex(null)}>+</div>
          </div>
        </div>
      )}
    </div>
  );
}
