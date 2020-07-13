var axios = require('axios')
var HtmlParser = require('node-html-parser')
var fs = require('fs')

var module_configurations = {
    defaultUrl : 'https://www.newworld.com',
    endpoint : '/en-us/news-load-more',
    filepath  : '..\\..\\files\\new_world\\',
    filename : 'newworld.json',
    auto_sync : true,
    sync_interval : 60000 * 60,
    InitializeAutoSync : () => {
        if(module_configurations.auto_sync){
            setInterval( ()  => {
                console.log(`[NewWorld Module] - Auto checking news ...`)
                methods.read_feeds()
             }, module_configurations.sync_interval);
        }
    }
};

var methods = {

    getNews : () => {

        var structure = {
            news : []
        };
        var filepath = __dirname + '/' + module_configurations.filepath + module_configurations.filename;
                
        axios.get(module_configurations.defaultUrl + module_configurations.endpoint)
        .then( r => { 
            if(r.status == 200){

                var RootData = HtmlParser.parse(r.data);

                var NewWorldRoot = RootData.childNodes.filter( e => e.nodeType == 1)[0];
                var News = NewWorldRoot.childNodes.filter( c => c.nodeType == 1);
    
                News.forEach( currentNew => {

                    var newStructure = {
                        title : currentNew.querySelector("h4").rawText.replace(/ /g,'').replace(/(\r\n|\n|\r)/gm," ").trim(),
                        date : currentNew.querySelector("span").rawText.replace(/ /g,'').replace(/(\r\n|\n|\r)/gm," ").trim(),
                        description : currentNew.querySelector(".ags-SlotModule-contentContainer-text").rawText.replace(/  /g,'').replace(/   /g,'').replace(/(\r\n|\n|\r)/gm," ").trim(),
                        imageUrl : ""
                    };
    
                    var NewsUrl = currentNew.querySelector("img").rawAttrs.split(" ").filter( e =>  e.includes('src="') )
    
                    if(NewsUrl.length > 0)
                        newStructure.imageUrl = NewsUrl[0].replace('src="',"").slice(0, -1);
    
                    structure.news.push(newStructure);
                });

                structure.news = structure.news.reverse();

                var file_saved = null;
                try{
                    file_saved = fs.readFileSync(__dirname + '/' + module_configurations.filepath + module_configurations.filename);
                }catch(ex){};

                if(file_saved){

                    var fileDataStringified = JSON.parse(file_saved);
                    //check for the data and save only the new news
                    var currentNewsSaved = fileDataStringified.news.map( n => n.date);

                    //validate the existing ones and add only the new news
                    var newNewsToSave = structure.news.filter ( n => !currentNewsSaved.includes(n.date));
                    console.log(`[NewWorld Module] - Updating news : inserting -> ` , newNewsToSave.map( m => m.date));

                    fileDataStringified.news.push(...newNewsToSave);

                    var savedfile = fs.writeFileSync(filepath,JSON.stringify(fileDataStringified));
               

                }else{
                    console.log("[NewWorld Module] - Saving the first page news");
                   
                    //check if the dir exists
                    if(!fs.existsSync(__dirname + '/' + module_configurations.filepath))
                        fs.mkdirSync(__dirname + '/' + module_configurations.filepath)

                    var savedfile = fs.writeFileSync(filepath,JSON.stringify(structure));
                }


            }
        })
        .catch( err => { })
    }
}

module.exports.methods = methods;
module.exports.configuration = module_configurations;
