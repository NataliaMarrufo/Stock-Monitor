var symbols = ["WMT", "MSFT", "FB", "TSLA", "AMZN", "GOOGL", "TWTR", "NFLX", "PYPL", "EBAY"];
        var stockItems= [];
        var companyName = [];

         var done = $.each(symbols, function(key){
    	   $(document).ready(function() {
    		  var symbol = symbols[key];
    		  var url =  "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22"+symbol+"%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    		 
    		  $.getJSON(url + "&callback=?", null, function(data) {
        		        
            	var items = [];
                
            	
                items.push("<table id='stockTable'><tr> <td> Open: </td><td>" + data.query.results.quote.Open + "</td></tr>");
                items.push("<tr> <td> Change: </td><td> " + data.query.results.quote.Change + "</td> </tr>");
                items.push("<tr> <td> Chg %: </td><td>" + data.query.results.quote.PercentChange + "</td></tr>");
                items.push("<tr> <td> Days High: </td> <td>" + data.query.results.quote.DaysHigh + "</td> </tr>");
                items.push("<tr> <td> Days Low: </td> <td>" + data.query.results.quote.DaysLow + "</td></tr><br>");
                items.push("<tr> <td> Year High: </td> <td> " + data.query.results.quote.YearHigh + " </td> </tr>");
                items.push("<tr> <td> Year Low: </td> <td>" + data.query.results.quote.YearLow + "</td> </tr></table>");
                items.push("<table id='stockTb2'> <tr> <td> Volume: </td><td>" + data.query.results.quote.Volume + "</td></tr>");
                items.push("<tr> <td> DividendYield: </td> <td>" + data.query.results.quote.DividendYield + "</td></tr>");
                items.push("<tr> <td> Div Share: </td><td>" + data.query.results.quote.DividendShare + "</td></tr>");
                items.push("<tr> <td> Days Range: </td><td>" + data.query.results.quote.DaysRange + "</td> </tr>");
                items.push("<tr> <td> EPS Year: </td><td>" + data.query.results.quote.EPSEstimateCurrentYear + "</td></tr>");
                items.push("<tr> <td> Market Cap: </td><td>" + data.query.results.quote.MarketCapitalization + "</td></tr>");
                items.push("<tr> <td> PE Ratio: </td><td>" + data.query.results.quote.PERatio + "</td></tr> </table>");
                companyName[key] = data.query.results.quote.Name;

                
                stockItems[key] = items;

                 $.when(done, news_url).done(function(){  
                        console.log(newArray[key]);
                        $("#results").append("<div id='stockData'><h2 id=stockTitle>" + companyName[key] + "</h2><div id='dataItems'>" + stockItems[key].join(' ') +" <br> <img id='graphImg' src='https://www.google.com/finance/getchart?q=" + symbols[key] + "&p=2M&i=86400'/></div><div id='news'><h3 id='newsTitle'>News</h3>"+newArray[key].join(' ')+"</div>");
                });
               
  			});
		  });  
        });

       
       var newArray = [];
       var newsStcok = [];
       
        
       var news_url = $.each(symbols, function(key){
            symbol = symbols[key];
            $.get("http://markets.financialcontent.com/stocks/action/rssfeed?Symbol="+ symbol, function(data) {
                var $xml = $(data);
                 var newsStock = [];
                $xml.find("item").each(function() {
                var $this = $(this),
                    item = {
                        title: $this.find("title").text(),
                        link: $this.find("link").text(),
                        description: $this.find("description").text(),
                        pubDate: $this.find("pubDate").text(),
                   
                    }

                    newsStock.push(item);
                 
              
                });
                newArray[key] = newsStock;

                $.when(news_url).done(function(){          
                        var newsDivs = [];
                        for(x=0; x <= 20; x++){  
                           
                            newsDivs.push("<div id='news_data'><b>" + newArray[key][x].title + "</b><br>" + newArray[key][x].pubDate + "<br>" + newArray[key][x].description +  "<br><br>"+ "<a href='" +newArray[key][x].link+ "'>" + newArray[key][x].link  +  "</a>" + "<br>" + "</div>");
                        }
                        newArray[key] = newsDivs;
                    
                });
            });
        });

       

       

    /*
    $(document).ready(function() {
    //feed to parse
    var feed = "http://markets.financialcontent.com/stocks/action/rssfeed?Symbol=FB";
    
    $.ajax(feed, {
        accepts:{
            xml:"application/rss+xml"
        },
        dataType:"xml",
        success:function(data) {
            //Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript

            $(data).find("item").each(function () { // or "item" or whatever suits your feed
                var el = $(this);
                console.log("------------------------");
                console.log("title      : " + el.find("title").text());
                console.log("link       : " + el.find("link").text());
                console.log("description: " + el.find("description").text());
            });
    

        }   
    });
    
})*/
