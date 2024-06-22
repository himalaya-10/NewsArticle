import Image from "next/image";
import { Inter, Roboto, Open_Sans, Dancing_Script } from 'next/font/google';
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";
//5daed4d4891b47c6bd3afe546b1011f1
const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '600'] });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

export default function Home() {

  const [icon, setIcon] = useState(true);
  const egarticles = []
  const [articles, setArticles] = useState(egarticles);
  const [pages, setPages] = useState([])
  const [loader, setLoader] = useState(false)
  const [category, setCategory] = useState("latest");
  const [currentPage, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalres, setTotalres] = useState(0);
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // onSearch(e.target.value);
  };


  useEffect(() => {
    const tabs = document.getElementById("tabs");
    const notatab = document.getElementById("notatab");

    tabs.addEventListener("mouseenter", () => {
      tabs.classList.add("wide");
      setIcon(false)
    })
    tabs.addEventListener("click", () => {
      tabs.classList.add("wide");
      setIcon(false)
    })
    notatab.addEventListener("click", () => {
      tabs.classList.remove("wide");
      setIcon(true)
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
  }, [])
  useEffect(() => {
    const totalPages = Math.ceil(totalres / pageSize);
    const maxPages = Math.min(totalPages, 10);
    setPages(Array.from({ length: maxPages }, (_, index) => index + 1));
  }, [totalres])

  useEffect(() => {
    setLoader(true)
    axios.get(`https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&page=${currentPage}&pageSize=${pageSize}&apiKey=5daed4d4891b47c6bd3afe546b1011f1`)
      .then(function (response) {
        setArticles(response.data.articles);
        setTotalres(response.data.totalResults);
        console.log(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // console.log("Axios over!!")
        setLoader(false)
      });
  }, [category, currentPage])

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const formatTitle = (string) => {
    if(string){
      if (string.length < 50) {
        return string;
      } else {
        return string.substr(0, 50).concat("...");
      }
    }
    else{
      return null
    }
  };
  const formatContent = (string) => {
    if(string){
      if (string.length < 165) {
        return string;
      } else {
        return string.substr(0, 165).concat("...");
      }
    }
    else{
      return null;
    }
  };

  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }


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
        input {
            width: 150px;
            padding: 2px;
            font-size: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        input:focus{
        border-color: gray;
        }
        `}
      </style>
      <div id="tabs" className="fixed tabs box w-[50px] h-full border flex justify-center items-center transition-all ease 0.2s p-2 bg-white z-50">
        <div className="grid w-full h-[80%]">
          <div className={`h-fit w-[95%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'latest') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("latest");  }}>
            {icon ? <div className="w-[25px]"><Image src="/home.png" alt="Home Icon" width={100} height={100} /></div> : "Home"}
          </div>
          <div className={`h-fit w-[95%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'local') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("local") }}>
            {icon ? <div className="w-[25px]"><Image src="/local.png" alt="Home Icon" width={100} height={100} /></div> : "Local"}
          </div>
          <div className={`h-fit w-[95%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'india') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("india") }}>
            {icon ? <div className="w-[25px]"><Image src="/india.png" alt="Home Icon" width={100} height={100} /></div> : "India"}
          </div>
          <div className={`h-fit w-[95%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'world') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("world") }}>
            {icon ? <div className="w-[25px]"><Image src="/world.png" alt="Home Icon" width={100} height={100} /></div> : "World"}
          </div>
          <div className={`h-fit w-[95%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'business') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("business") }}>
            {icon ? <div className="w-[25px]"><Image src="/business.png" alt="Home Icon" width={100} height={100} /></div> : "Business"}
          </div>
          <div className={`h-fit w-[95%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'technology') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("technology") }}>
            {icon ? <div className="w-[25px]"><Image src="/technology.png" alt="Home Icon" width={100} height={100} /></div> : "Technology"}
          </div>
          <div className={`h-fit w-fit cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'entertainment') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("entertainment") }}>
            {icon ? <div className="w-[25px]"><Image src="/entertainment.png" alt="Home Icon" width={100} height={100} /></div> : "Entertainment"}
          </div>
          <div className={`h-fit w-[95%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'sports') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("sports") }}>
            {icon ? <div className="w-[25px]"><Image src="/sports.png" alt="Home Icon" width={100} height={100} /></div> : "Sports"}
          </div>
          <div className={`h-fit w-[95%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'science') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("science") }}>
            {icon ? <div className="w-[25px]"><Image src="/science.png" alt="Home Icon" width={100} height={100} /></div> : "Science"}
          </div>
          <div className={`h-fit w-[95%] cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-center ${(category === 'health') ? "bg-gray-200" : "bg-white"}`} onClick={() => { setCategory("health") }}>
            {icon ? <div className="w-[25px]"><Image src="/health.png" alt="Home Icon" width={100} height={100} /></div> : "Health"}
          </div>
        </div>

      </div>
      <div id="notatab" className="flex flex-col w-full h-full items-center p-2">
        <div className="h-[60px] rounded-lg w-[400px] flex justify-center items-center">
          <h1 className={`text-[40px] ${dancingScript.className}`}>News Articles</h1>
        </div>
        <div className="h-1 w-full bg-gray-200 rounded-full"></div>
        <div className="h-[60px] rounded-lg w-[80%] flex justify-between items-center">
          <h1 className={`text-[30px] ml-7 md:ml-0 ${dancingScript.className}`}>{formatCategory(category)}</h1>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search..."
            className=""
          />
        </div>
        <div className="w-[80%] md:h-[80%] sm:w-[90%] ml-10 sm:ml-0 flex flex-wrap justify-center gap-2 md:gap-3 mt-1 md:overflow-scroll hide-scrollbar">
          {
            loader !== true ? (articles.map((article, index) => {
              return (
                <Link
                href={{
                  pathname: `/news/[slug]`,
                  query: { source: article.source.name, author: article.author, title: article.title, description: article.description, content: article.content, url:article.url, urlToImage: article.urlToImage, publishedAt: article.publishedAt },
                }}
                as={`/news/${encodeURIComponent(article.title)}`}
                key={index} className="h-[350px] w-[270px] border border-gray-200 flex flex-col items-center rounded-lg hover:border-gray-400 p-2 cursor-pointer">
                  <h1 className={`font-serif relative h-fit w-full border bg-gray-50 rounded-lg flex items-center justify-center text-center text-sm`}>{article.source.name}</h1>
                  <h1 className={`${roboto.className} font-bold mt-2`}>{formatTitle(article.title)}</h1>
                  <div className="w-full h-[35%] flex justify-center bg-gray-100">{article.urlToImage ? <Image className="w-[95%] h-full" src={article.urlToImage} alt={article.title} width={100} height={200} /> : <Image className="w-[95%] h-full" src="/error.jpg" alt={article.title} width={100} height={100} />}</div>
                  <div className={`font-serif text-sm w-full mt-2`}>{formatContent(article.description)}</div>
                  <div className={`${roboto.className} mt-2 text-xs text-right w-full relative bottom-0`}>{formatDate(article.publishedAt)}</div>
                </Link>
              )
            })
            ) :
              (

                <div className="">
                  <div className="loader"></div>
                </div>

              )
          }

        </div>
        <div className="pagination flex justify-between h-[50px] w-[80%] mt-2 ml-10 sm:ml-0">
          <div className="left flex justify-center items-center cursor-pointer hover:bg-gray-100 rounded-lg">
            <button disabled={currentPage <= 1} onClick={() => { setPage(currentPage - 1) }} className="w-[25px]"><Image src="/left.png" alt="Home Icon" width={100} height={100} /></button>
          </div>
          <div className="pages w-[100%] flex justify-around ml-2 mr-2 text-sm overflow-scroll">
            {
              pages.map((page, index) => {
                return (
                  <div key={index} onClick={() => { setPage(page) }} className={`w-[25px] md:w-[40px] flex justify-center items-center cursor-pointer hover:bg-gray-100 rounded-lg ${currentPage === page ? 'bg-gray-200' : ''
                    }`}>
                    {page}
                  </div>
                )
              })

            }
          </div>
          <div className="left flex justify-center items-center cursor-pointer hover:bg-gray-100 rounded-lg">
            <button disabled={currentPage >= 10} onClick={() => { setPage(currentPage + 1) }} className="w-[25px]"><Image src="/right.png" alt="Home Icon" width={100} height={100} /></button>
          </div>
        </div>
      </div>

    </div>

  );
}
