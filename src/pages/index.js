import Image from "next/image";
import { Inter, Roboto, Open_Sans, Dancing_Script } from 'next/font/google';
import { useEffect, useState } from "react";
import axios from 'axios';
//5daed4d4891b47c6bd3afe546b1011f1
const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '600'] });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

export default function Home() {

  const [icon, setIcon] = useState(true);
  const egarticles = [
    // { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }, { title: "", image: "", summary: "" }
  ]
  const [articles, setArticles] = useState(egarticles);
  const [pages, setPages] = useState([1, 2, 3, 4, 5])
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    const tabs = document.getElementById("tabs");
    tabs.addEventListener("mouseenter", () => {
      tabs.classList.add("wide");
      setIcon(false)
    })
    tabs.addEventListener("mouseleave", () => {
      tabs.classList.remove("wide");
      setIcon(true)
    })
    return () => {
      tabs.removeEventListener("mouseenter", () => {
        tabs.classList.add("wide");
        setIcon(false)
      })
      tabs.removeEventListener("mouseleave", () => {
        tabs.classList.remove("wide");
        setIcon(true)
      })
    }
  }, [articles])

  // useEffect(() => {
  //   setLoader(true)
  //     axios.get('https://newsapi.org/v2/everything?q=latest&from=2024-05-19&sortBy=publishedAt&pageSize=5&apiKey=5daed4d4891b47c6bd3afe546b1011f1')
  //   .then(function (response) {
  //     setArticles(response.data.articles)
  //     console.log(response.data.articles);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  //   .finally(function () {
  //     console.log("Axios over!!")
  //   });
  //   setLoader(false)
  // }, [])

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const formatTitle = (string) => {
    if (string.length < 50) {
      return string;
    } else {
      return string.substr(0, 50).concat("...");
    }
  };
  const formatContent = (string) => {
    if (string.length < 165) {
      return string;
    } else {
      return string.substr(0, 165).concat("...");
    }
  };
  
  return (

    <div className="md:flex grid bg-white h-[100vh]">
      <style jsx>
        {`
        .wide{
          width:130px;
          transition: all 0.2s ease; 

        }
        .box{
          box-shadow: 5px 0px 30px 1px rgba(0,0,0,0.1);
          -webkit-box-shadow: 5px 0px 30px 1px rgba(0,0,0,0.1);
          -moz-box-shadow: 5px 0px 30px 1px rgba(0,0,0,0.1);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .loader {
          width: 15px;
          aspect-ratio: 1;
          border-radius: 50%;
          animation: l5 1s infinite linear alternate;
        }
        @keyframes l5 {
            0%  {box-shadow: 20px 0 #000, -20px 0 #0002;background: #000 }
            33% {box-shadow: 20px 0 #000, -20px 0 #0002;background: #0002}
            66% {box-shadow: 20px 0 #0002,-20px 0 #000; background: #0002}
            100%{box-shadow: 20px 0 #0002,-20px 0 #000; background: #000 }
        }
        `}
      </style>
      <div id="tabs" className="fixed tabs box w-[50px] h-full border flex justify-center items-center transition-all ease 0.2s p-2 bg-white z-50">
        <div className="grid w-full h-[80%]">
          <div className="h-fit w-[90%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center">
            {icon ? <div className="w-[25px]"><Image src="/home.png" alt="Home Icon" width={100} height={100} /></div> : "Home"}
          </div>
          <div className="h-fit w-[90%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center">
            {icon ? <div className="w-[25px]"><Image src="/local.png" alt="Home Icon" width={100} height={100} /></div> : "Local"}
          </div>
          <div className="h-fit w-[90%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center">
            {icon ? <div className="w-[25px]"><Image src="/india.png" alt="Home Icon" width={100} height={100} /></div> : "India"}
          </div>
          <div className="h-fit w-[90%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center">
            {icon ? <div className="w-[25px]"><Image src="/world.png" alt="Home Icon" width={100} height={100} /></div> : "World"}
          </div>
          <div className="h-fit w-[90%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center">
            {icon ? <div className="w-[25px]"><Image src="/business.png" alt="Home Icon" width={100} height={100} /></div> : "Business"}
          </div>
          <div className="h-fit w-[90%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center">
            {icon ? <div className="w-[25px]"><Image src="/technology.png" alt="Home Icon" width={100} height={100} /></div> : "Technology"}
          </div>
          <div className="h-fit w-[90%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center">
            {icon ? <div className="w-[25px]"><Image src="/entertainment.png" alt="Home Icon" width={100} height={100} /></div> : "Entertainment"}
          </div>
          <div className="h-fit w-[90%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center">
            {icon ? <div className="w-[25px]"><Image src="/sports.png" alt="Home Icon" width={100} height={100} /></div> : "Sports"}
          </div>
        </div>

      </div>
      <div className="flex flex-col w-full h-full items-center p-2">
        <div className="h-[60px] rounded-lg w-[400px] flex justify-center items-center">
          <h1 className={`text-[40px] ${dancingScript.className}`}>News Articles</h1>
        </div>
        <div className="h-1 w-full bg-gray-200 rounded-full"></div>
        <div className="w-[80%] sm:w-[90%] ml-10 sm:ml-0 flex flex-wrap justify-center gap-2 md:gap-3 mt-5 overflow-scroll hide-scrollbar pt-3">
          {
            articles.length!==0 && articles.map((article, index) => {
              return (
                <div key={index} className="h-[350px] w-[270px] border border-gray-200 flex flex-col items-center rounded-lg hover:border-gray-400 p-2 cursor-pointer">
                  <h1 className={`font-serif relative h-fit w-full border bg-gray-50 rounded-lg flex items-center justify-center text-center text-sm`}>{article.source.name}</h1>
                  <h1 className={`${roboto.className} font-bold mt-2`}>{formatTitle(article.title)}</h1>
                  <div className="w-full h-[35%] flex justify-center bg-gray-100">{article.urlToImage ?<Image className="w-[95%] h-full" src={article.urlToImage} alt={article.title} width={100} height={200} />:<Image className="w-[95%] h-full" src="/error.jpg" alt={article.title} width={100} height={100} />}</div>
                  <div className={`font-serif text-sm w-full mt-2`}>{formatContent(article.content)}</div>
                  <div className={`${roboto.className} mt-2 text-xs text-right w-full relative bottom-0`}>{formatDate(article.publishedAt)}</div>
                </div>
              )
            })
          }
          {loader || articles.length===0 && (

            <div className="">
              <div className="loader"></div>
            </div>

          )
          }
        </div>
        <div className="pagination flex justify-between h-[50px] w-[80%] mt-2 ml-10 sm:ml-0">
          <div className="left flex justify-center items-center cursor-pointer hover:bg-gray-100 rounded-lg">
            <div className="w-[25px]"><Image src="/left.png" alt="Home Icon" width={100} height={100} /></div>
          </div>
          <div className="pages w-full flex gap-2 md:gap-5 ml-2 mr-2 text-sm">
            {
              pages.map((page, index) => {
                return (
                  <div key={index} className="w-[25px] flex justify-center items-center cursor-pointer hover:bg-gray-100 rounded-lg">
                    {page}
                  </div>
                )
              })

            }
          </div>
          <div className="left flex justify-center items-center cursor-pointer hover:bg-gray-100 rounded-lg">
            <div className="w-[25px]"><Image src="/right.png" alt="Home Icon" width={100} height={100} /></div>
          </div>
        </div>
      </div>

    </div>

  );
}
