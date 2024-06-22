import React, { useContext, useEffect } from 'react'
import { Inter, Roboto, Open_Sans, Dancing_Script } from 'next/font/google';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

export default function slug() {

    const router = useRouter();
    const { source, author, title, description, content, url, urlToImage, publishedAt } = router.query;
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };
    return (
        <div className='p-5 h-full w-full'>
            <div className="rounded-lg w-[100%] flex justify-center items-center"><h1 className={`text-[30px] ml-7 md:ml-0 font-serif`}>{title}</h1></div>

            <h1 className={`font-serif relative h-fit w-full border bg-gray-50 rounded-lg flex items-center justify-center text-center mt-4 mb-4`}>{source}</h1>

            <div className={`font-serif w-full mt-5 mb-5 text-center`}>{description}</div>

            <div className="flex justify-center bg-gray-100">{urlToImage ? <Image className="h-[300px] sm:h-[400px] md:h-[500px] w-auto" src={urlToImage} alt={title} width={2000} height={1000} /> : <Image className="h-[300px] sm:h-[400px] md:h-[500px] w-auto" src="/error.jpg" alt={title} width={1000} height={2000} />}</div>
            
            <div className={`font-serif w-full mt-5 mb-5`}>{content}</div>

            <Link href={`${url}`} className={`font-serif w-full mt-5 mb-5 underline`}>url: {url}</Link>

            <h1 className={`font-serif relative h-fit w-full border bg-gray-50 rounded-lg flex items-center justify-center text-center mt-4 mb-4`}>author: {author}</h1>

            <div className={`mt-2 text-xs text-right w-full relative bottom-0`}>published At: {formatDate(publishedAt)}</div>
        </div>
    )
}
