const express = require('express');
const csv = require('csvtojson');
const { Router, request } = require('express');

const app = express();
app.use(express.json());
const router = express.Router;

app.use(express.static(__dirname + '/public'))

let genres_list = new Array();
let artists_list =new Array();
let albums_list = new Array();
let tracks_list =new Array();
let newtracks_list = new Array();
//let newtracks_list = new Array();


app.get('/',(req,res)=>{
    res.send('public/lab3.html')
})

function ReadCSVFile() {
    csv()
    .fromFile('./genres.csv')
    .then((json)=>{
        json.forEach((row) => {
            let o = new Object();
            o['Genre name'] =row.title;
            o['Genre id'] =row.genre_id;
            o['Parent id'] =row.parent;
            genres_list.push(o);
        }
        
        )
    })

    csv()
    .fromFile('./raw_artists.csv')
    .then((json)=>{
        json.forEach((row) => {
            let ob = new Object();
            ob['Artist_id'] =row.artist_id;
            ob['Artist_names'] = row.artist_name;
            ob['Artist_comments'] =row.artist_comments;
            ob['Artist_url'] = row.artist_url
            ob['Artist_images'] =row.artist_images;      
            ob['Artist_tags'] = row.tags;
            artists_list.push(ob)
        }
        )
    }
    )

    csv()
    .fromFile('./raw_tracks.csv')
    .then((json)=>{
        json.forEach((row) => {
            let obj = new Object();
            obj['Track_id'] =row.track_id;
            obj['Album_id'] = row.album_id;
            obj['Album_title'] =row.album_title;
            obj['Artist_id'] =row.artist_id;
            obj['Artist_names'] = row.artist_name;     
            obj['Artist_tags'] = row.tags;
            obj['Track_dateCreated'] =row.track_date_created;
            obj['Track_dateRecorded'] = row.track_date_recorded;
            obj['Track_duration'] =row.track_duration;
            obj['Track_genres'] = row.track_genres;
            obj['Track_number'] =row.track_number;
            obj['Track_title'] =row.track_title;
            tracks_list.push(obj)

        }
        )
    }
    )
}

//use the created function read the csv file
ReadCSVFile();

app.get("/genres",(req,res)=> {

     res.json(genres_list);
  })

app.get("/artists",(req,res)=> {

    res.json(artists_list);
  })
  
app.get("/tracks",(req,res)=> {

    res.json(tracks_list);
  })

app.get("/tracks/:track_id",(req,res) => {
   const id =req.params.track_id;
   console.log(`GET request for ${req.url}`);
   const trackID =tracks_list.find(i =>parseInt(i.Track_id) ===parseInt(id));
   if (trackID) {
    res.send(trackID);
   }
   else {
    res.status(404).send(`track_id ${id} was not found`)
   }
})


app.get("/track/:track_title",(req,res) => {
  const tt =req.params.track_title;
  console.log(`GET request for ${req.url}`);
  const trackTitle =tracks_list.find(f =>f.Track_title ===tt);
  if (trackTitle) {
   res.send(trackTitle);
  }
  else {
   res.status(404).send(`track name ${tt} was not found`)
  }
})

app.get("/albums/:album_title",(req,res) => {
  const ab =req.params.album_title;
  console.log(`GET request for ${req.url}`);
  const albumName =tracks_list.find(aaa =>aaa.Album_title ===ab);
  if (albumName) {
   res.send(albumName);
  }
  else {
   res.status(404).send(`album name ${ab} was not found`)
  }
})

app.get("/artists/:artist_name",(req,res) => {
    const n =req.params.artist_name;
    console.log(`GET request for ${req.url}`);
    const ArtistName =artists_list.find(a=>a.Artist_names === n)
      if (ArtistName) {
        res.send(ArtistName);
      } else {
        res.status(404).send(`artist_name ${n} was not found`)
      }
    
 })

app.get('/searchMusic/:track_title', (req,res)=> {
    const newtracks =req.params.track_title;
    //const newtracks =req.body.title;
    //newtracks.title = req.params.track_title;
    console.log(`GET request for ${req.url}`);
    const t=tracks_list.find(ti=>ti.Track_title ===newtracks)
      if(t) {
        res.send(newtracks);
      } else {
        res.status(404).send(`track_title ${newtracks} was not found`)
      }
      }
)

app.post(`/tracksByTitles`, (req,res)=> {
    const music = req.body.track_title;
    const tM=tracks_list.find(tM=>tM.Track_title ===music)
      if(tM) {
        res.send(music);
      } else {
        res.status(404).send(`music ${tM} was not found`)
      }
      }
)
app.get(`/tracksByTitles`, (req,res)=> {
  const musicNew = req.params.track_title;
  const mN=tracks_list.find(mN=>mN.Track_title ===musicNew)
    if(mN) {
      res.send(musicNew);
    } else {
      res.status(404).send(`music ${mN} was not found`)
    }
    }
)

//app.delete();
const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));