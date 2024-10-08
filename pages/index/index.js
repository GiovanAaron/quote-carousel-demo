
"use client";

import React, { useEffect, useState } from 'react';

const NotionData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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

        

        const quotes = rows.map((quote) => {

          let author = quote.properties.Author.title.length ? quote.properties.Author.title[0].plain_text : null;
          let quoteBody = quote.properties.Excerpt.rich_text.length ? quote.properties.Excerpt.rich_text[0].plain_text : null;
          let year = quote.properties.Year.number ? quote.properties.Year.number : null;
          let source = quote.properties.Source.rich_text.length ? quote.properties.Source.rich_text[0].plain_text : null;
          
          
        
          const quoteObj = {author: author,
            quoteBody: quoteBody,
            year: year,
            source: source
          }
          return quoteObj

        })

        console.log(quotes)

        setData(quotes);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <h3>{data[0].author}</h3>
      <h3>{data[0].quoteBody}</h3>
      <h3>{data[0].year}</h3>
      <h3>{data[0].source}</h3>
    </div>
  );
};

export default NotionData;
