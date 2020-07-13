let axios = require('axios')
let Parser = require('rss-parser')
let fs = require('fs')
let path = require('path')

let parser = new Parser()

var rssfeeds = {
    pplware : {
        url : "https://pplware.sapo.pt/feed/",
        dir : "..\\..\\files\\news\\",
        file : "pplware.json"
    },
    jnpt : {
        url : "http://feeds.jn.pt/JN-Ultimas",
        dir : "..\\..\\files\\news\\",
        file : 'jn-pt.json'
    }
};

var methods = {
    read_feeds : async () => {
        Object.keys(rssfeeds).forEach( async (feed_name) => {
            
            let feed_details = rssfeeds[feed_name];
            let feed = await parser.parseURL(feed_details.url);

            let directory = __dirname + '/' + feed_details.dir;
            //check if the file directory exists, if not create it
            if(!fs.existsSync(directory))
                fs.mkdirSync(directory)

            let file_json = null;
            var structure = { news : [] };

            try{
              file_json = fs.readFileSync(directory + feed_details.file);
            }catch(ex){ file_json = null; }
            
            if(file_json != null){
                //compare the actual data with the saved data
                var data_file = JSON.parse(file_json);

                if(data_file.news){
                    
                    var saved_guids =  data_file.news.map( t => t.guid );

                    var newdata = feed.items.filter ( i => !saved_guids.includes(i.guid));
                    
                    console.log(`adding the news --> `, newdata.map ( t => t.guid ));

                    data_file.news.push( ... newdata);
                    structure.news = data_file.news;

                    var saved_data = fs.writeFileSync(directory + feed_details.file, JSON.stringify(structure) );
                }
            }else{
                structure.news = feed.items;
                var saved_data = fs.writeFileSync(directory + feed_details.file, JSON.stringify(structure) );
            }

        });
    }
}

methods.read_feeds();

module.exports = methods;