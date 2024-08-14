import { useEffect, useState } from "react"




  

 

  
  export default function Example() {

    const [quotes, setQuotes] = useState()
    const [error, setError] = useState()

    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await fetch('/api/getquotes');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            
            JSON.stringify(result)
    
            
            
            const rows = result.results
            
    
            const quotesArr = rows.map((quote) => {
    
              let author = quote.properties.Author.title.length ? quote.properties.Author.title[0].plain_text : null;
              let quoteBody = quote.properties.Excerpt.rich_text.length ? quote.properties.Excerpt.rich_text[0].plain_text : null;
              let year = quote.properties.Year.number ? quote.properties.Year.number : "n/a";
              let source = quote.properties.Source.rich_text.length ? quote.properties.Source.rich_text[0].plain_text : null;
              let pageID = quote.id
              let imgURL = "/images/anon-pic.jpg"
              let medium = quote.properties.Medium.select
    

              const theme = quote.properties.Themes.multi_select.length ? quote.properties.Themes.multi_select : null

              

    
              
              if (quote.properties.Media.files.length) {
                switch (quote.properties.Media.files[0].type) {
                  case "file": imgURL = quote.properties.Media.files[0].file.url
                  break;
                  case "external": imgURL = quote.properties.Media.files[0].external.url
                  break;
                  default: console.log("you haven't referenced properly")
    
                }
              }
              
              
            
              const quoteObj = {
               
                    id: pageID,
                    title:source,
                    href: `#${pageID}`,
                    description: quoteBody,
                    date: year,
                    dateadded: null,
                    datetime: '2020-03-16',
                    theme: { title: theme ? theme[0].name : null, href: '#' },
                    medium: {title: medium ? medium.name : null, href: "#"},
                    author: {
                      name: author,
                      role: '-',
                      href: '#',
                      imageUrl:imgURL,
                    },
                  
              }


              return quoteObj
    
            })
    
            
            let randomIndex = Math.floor(Math.random() * quotesArr.length)
    
            setQuotes(quotesArr);
          } catch (error) {
            setError(error);
          }
        };
    
        fetchData();
      }, []);
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
      if (!quotes) {
        return <div>Loading...</div>;
      }


    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {quotes.map((quote) => (
              <article key={quote.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={quote.datetime} className="text-gray-500">
                    {quote.date}
                  </time>
                  <a
                    href={quote.theme.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {quote.theme.title}
                  </a>
                  <a
                    href={quote.medium.href}
                    className="relative z-10 rounded-full bg-sky-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {quote.medium.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={quote.href}>
                      <span className="absolute inset-0" />
                      {quote.title}
                    </a>
                  </h3>
                  <p className="mt-5  text-sm leading-6 text-gray-600 line-clamp-3">{quote.description}</p>
                </div>
                <div className="relative mt-4 flex items-center gap-x-4">
                  <img alt="" src={quote.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={quote.author.href}>
                        <span className="absolute inset-0" />
                        {quote.author.name}
                      </a>
                    </p>
                    {/* <p className="text-gray-600">{quote.author.role}</p> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  