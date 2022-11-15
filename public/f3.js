var block =document.createElement("div");



function checkArtists() {
   let a = document.getElementById("result");
   let artName = document.getElementById("artistName").value;
    fetch(`/artists/${artName}`)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        //ac=createTextNode(json);
        //a.appendChild(ac);
       
        x=document.getElementById("x")
       // x.appendChild()
             x.replaceChildren();
            
             ac =document.createElement("div");
             ac.textContent="Artist comment: " + json.Artist_comments;
     
             aid =document.createElement("div");
             aid.textContent="Artist id: " + json.Artist_id;
     
             ai =document.createElement("div");
             ai.textContent="Artist image: " + json.Artist_images;
     
             at =document.createElement("div");
             at.textContent="Artist tags: " + json.Artist_tags;
     
             au =document.createElement("div");
             au.textContent="Artist url: " + json.Artist_url;

             an= document.createElement("div");
             an.textContent="Artist name: " + json.Artist_names;
    x.appendChild(ac);
    x.appendChild(aid);
    x.appendChild(ai);
    x.appendChild(at);
    x.appendChild(au);
    x.appendChild(an);
    x.appendChild(block);
   
    })
    .catch(function(error) {
        console.log(error);
    })
    document.getElementById("artistName").value="";
}

function checkTracks() {

    let trName = document.getElementById("trackName").value;
    console.log(trName)
    fetch(`/track/${trName}`)
    .then((response)=>response.json())
    .then(json => {
        console.log(json)
        ttt=document.getElementById("ttt")
        ttt.replaceChildren();

        ti =document.createElement("div");
        ti.textContent="Track id: " + json.Track_id;

        tai=document.createElement("div")
        tai.textContent="Album id: "  + json.Album_id;

        tabt=document.createElement("div")
        tabt.textContent="Album title: "  + json.Album_title;

        tad =document.createElement("div");
        tad.textContent="Artist id: " + json.Artist_id;

        tat =document.createElement("div");
        tat.textContent="Artist tags: " + json.Artist_tags;

        tan= document.createElement("div");
        tan.textContent="Artist name: " + json.Artist_names;

        tdc =document.createElement("div");
        tdc.textContent="Track dateCreated: " + json.Track_dateCreated; 

        tdr =document.createElement("div");
        tdr.textContent="Track dateRecorded: " + json.Track_dateRecorded;

        td =document.createElement("div");
        td.textContent="Track duration: " + json.Track_duration;

        tg =document.createElement("div");
        tg.textContent="Track genres: " + json.Track_genres;

        tn =document.createElement("div");
        tn.textContent="Track number: " + json.Track_number;

        tt =document.createElement("div");
        tt.textContent="Track name: " + json.Track_title;

        ttt.appendChild(ti);
        ttt.appendChild(tai);
        ttt.appendChild(tabt);
        ttt.appendChild(tad);
        ttt.appendChild(tat);
        ttt.appendChild(tan);
        ttt.appendChild(tdc);
        ttt.appendChild(tdr);
        ttt.appendChild(td);
        ttt.appendChild(tg);
        ttt.appendChild(tn);
        ttt.appendChild(tt);

    })
    .catch(function(error) {
        console.log(error);
    })
    document.getElementById("trackName").value="";
}

function checkAlbum() {
    let trAlbum = document.getElementById("albumName").value;
    fetch(`/albums/${trAlbum}`)
    .then((response)=>response.json())
   // .then((res) =>console.log(res.json))
    .then(json => { 
        console.log(json)
        ca=document.getElementById("ca")
        ca.replaceChildren();

        ai =document.createElement("div");
        ai.textContent="Track id: " + json.Track_id;

        cai=document.createElement("div")
        cai.textContent="Album id: "  + json.Album_id;

        cabt=document.createElement("div")
        cabt.textContent="Album title: "  + json.Album_title;

        cad =document.createElement("div");
        cad.textContent="Artist id: " + json.Artist_id;

        cat =document.createElement("div");
        cat.textContent="Artist tags: " + json.Artist_tags;

        can= document.createElement("div");
        can.textContent="Artist name: " + json.Artist_names;

        cdc =document.createElement("div");
        cdc.textContent="Track dateCreated: " + json.Track_dateCreated; 

        cdr =document.createElement("div");
        cdr.textContent="Track dateRecorded: " + json.Track_dateRecorded;

        cd =document.createElement("div");
        cd.textContent="Track duration: " + json.Track_duration;

        cg =document.createElement("div");
        cg.textContent="Track genres: " + json.Track_genres;

        cn =document.createElement("div");
        cn.textContent="Track number: " + json.Track_number;

        ct =document.createElement("div");
        ct.textContent="Track name: " + json.Track_title;

        ca.appendChild(ai);
        ca.appendChild(cai);
        ca.appendChild(cabt);
        ca.appendChild(cad);
        ca.appendChild(cat);
        ca.appendChild(can);
        ca.appendChild(cdc);
        ca.appendChild(cdr);
        ca.appendChild(cd);
        ca.appendChild(cg);
        ca.appendChild(cn);
        ca.appendChild(ct);
       
    })
    .catch(function(error) {
        console.log(error);
    })
}




function searchMu() {
    fetch('/tracks')
    .then((response)=>response.json())
    .then(function(data){
        addDataToTable(data);
    })
    .catch(function(error) {
        console.log(error);
    })
}

 
 async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
        
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return response.json();
 }


 async function searchMusic() {
     let sM= document.getElementById("searchM").value;
     await fetch(`/tracksByTitles/${sM}`, {
         method: 'POST', 
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(sM),
       })
         .then((response) => response.json())
         .then((sM) => {
           console.log('Success:', sM);
         })
         .catch((error) => {
           console.error('Error:', error);
         });
     
 }

function addToFav () {
    let track=[];
    let title =document.getElementById("favourList").value;
    postData(`/tracksByTitles/${title}`,{title:title})
    .then(function(data){})
    //.then((response)=>response.json())
    //.then(json => {
    //.then((data) => {
    // se =document.getElementById("search");
    // st =document.createElement("div");
     //st.textContent="Track name: " + json.Track_title;
    // se.appendChild(st);
    //})
    //.catch(function(error) {
      .catch((error) => {
     console.log(error);
 });
     document.getElementById("favourList").value ="";
}